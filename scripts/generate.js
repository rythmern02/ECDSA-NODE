const {secp256k1} = require("@noble/curves/secp256k1");
const {toHex} = require("ethereum-cryptography/utils");

const PRIVATE_KEY = secp256k1.utils.randomPrivateKey();
console.log(`Private Key => ${toHex(PRIVATE_KEY)}`);

const PUBLIC_KEY = secp256k1.getPublicKey(PRIVATE_KEY);
console.log(`Public Key => ${toHex(PUBLIC_KEY)}`);

const msg = Uint8Array.from("helloworldhowis");
const sig = secp256k1.sign(msg, PRIVATE_KEY);
const isValid = secp256k1.verify(sig, msg, PUBLIC_KEY) === true;
console.log("Recovered Public Key is =>", toHex(sig.recoverPublicKey(msg).toRawBytes()));
console.log(`msg => ${(msg)} /n signature => ${toHex(sig.toDERRawBytes())}`);



