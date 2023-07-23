# ECDSA Node - Basic Blockchain Application

ECDSA Node is a blockchain project that provides a hands-on experience in developing a basic blockchain application. The project consists of three key components: Wallet, Transfer, and Output, which work together to enable secure transactions between accounts.

## Wallet Component

The Wallet component serves as the user interface for managing user accounts. It allows users to:

* View their wallet address, balance, and private key.
* Input their private key, and the component uses the `ethereum-cryptography` library to generate the corresponding wallet address.
* Enter a message that they want to sign for transaction verification.

## Transfer Component

The Transfer component is responsible for facilitating secure transactions between accounts. The process involves:

* Generating the message hash of the transaction using the `ethereum-cryptography` library.
* Using the `secp256k1` library from the `@noble/curves` package to sign the message hash with the user's private key, producing a digital signature.
* The digital signature ensures that only the user with the correct private key can authorize the transaction.

## Output Component

The Output component provides visual feedback to users by displaying the details of the transaction, including:

* The sender's address.
* The recipient's address.
* The signature generated during the transaction.
* Additionally, the Output component shows the resulting balance after a successful transfer.

## Key Features

* **Public Key Cryptography:** The project leverages public key cryptography provided by the `ethereum-cryptography` library to create secure transactions. This ensures that transfers can only be completed with a valid signature from the private key owner.
* **Digital Signatures:** The `secp256k1` library from the `@noble/curves` package is utilized to generate digital signatures for each transaction. These signatures are used to verify the authenticity of the transactions and prevent unauthorized access.

## Disclaimer

Please note that this project is designed for educational purposes and is not intended for production use. As it operates on a single centralized server, it assumes trust in the server operator for this learning exercise. However, in real-world blockchain applications, decentralized networks and consensus mechanisms are critical to ensuring security and trust.
