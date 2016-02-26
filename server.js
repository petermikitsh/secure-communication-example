var fs = require('fs'),
    ursa = require('ursa');

var senderKeyPair = ursa.generatePrivateKey(Math.pow(2, 10), 65537);
var receiverKeyPair = ursa.generatePrivateKey(Math.pow(2, 10), 65537);

// sender has its private key and receiver's public key
var privkeysender = ursa.createPrivateKey(senderKeyPair.toPrivatePem());  // fs.readFileSync('./sender/privkey.pem');
var pubkeyreceiver = ursa.createPublicKey(receiverKeyPair.toPublicPem()); // fs.readFileSync('./receiver/pubkey.pem');

// receiver has its private key and sender's public key
var privkeyreceiver = ursa.createPrivateKey(receiverKeyPair.toPrivatePem()); // fs.readFileSync('./receiver/privkey.pem')
var pubkeysender = ursa.createPublicKey(senderKeyPair.toPublicPem()); // fs.readFileSync('./sender/pubkey.pem')

var msg = "This is a secret message.";
console.log("\nMessage (plaintext):" , msg, '\n');

/*
 * Acting as sender
 */

var payload = {
  // Encrypt the message using receiver's public key
  message: pubkeyreceiver.encrypt(msg, 'utf8', 'base64'),
  // Create signature with message using Federation server's private key
  signature: privkeysender.hashAndSign('sha256', msg, 'utf8', 'base64')
};
console.log('Payload sent to receiver:', JSON.stringify(payload, null, 2), '\n');

/*
 * Acting as receiver
 */

// Decrypt the payload using receiver's private key
var decryptedMessage = privkeyreceiver.decrypt(payload.message, 'base64', 'utf8');
// Verify the signature using sender's public key
if (!pubkeysender.hashAndVerify('sha256', new Buffer(decryptedMessage).toString('base64'), payload.signature, 'base64')) {
  throw new Error("Invalid signature.");
} else {
  console.log('Signature verified.');
  console.log("Message (decrypted):", decryptedMessage, '\n');
}
