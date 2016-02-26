# secure-communication-example
------------------------------

This example demonstrates the use of two key pairs to ensure confidentiality and non-repudiation throughout a message's lifecycle. The sender's payload includes the encrypted message and a signature. The sender encrypts the message to ensure no external actors can read it. Using the sender's public key, the receiver can validate the signature was generated with the sender's private key. Assuming the sender has sufficently protected their private key, the signature validate's the message's origin.

Message lengths are capped at n/8 - 11 bytes, where n is the key size in bits.
Example: 1024-bit key: 1024/8 - 11 = 117 bytes.

Getting started
---------------

```
npm install
npm start
```

Example output
--------------

```
> npm start

Message (plaintext): This is a secret message. 

Payload sent to receiver: {
  "message": "3eY2N3TycXBObZ/+1YzUwdj5Nb+BDq06mUB0OyddUJ3SUChdaqol9L/CbdcjgSXYmXIQP6M/+MEJpb6qLj7ptrC0gi5mDEEkMSX+AzLyqmaEYVN41mtl2UtmVvL/aFcNwXqUoz1SsbORyxVAqUnMLVmF4NSJZCQgzUa43+ZSqNE=",
  "signature": "Nla6d0vSZf8lrAouZ9VzVRvokUTzFvuWRLxCzImnH+Y73xq/PaatqSv8uX/m1WY3zlUzhtIab4btaTMf0HBI/YpJ96OD+lFYebEPy24kpOFw4yDiE/A7xAru16mH4UndqgUv8QTk1l5VNvMbBrEHnR6rR/2M/8NnsJFU1ck8sYA="
} 

Signature verified.
Message (decrypted): This is a secret message. 

```
