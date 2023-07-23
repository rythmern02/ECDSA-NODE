// import server from "./server";
// import {secp256k1} from "@noble/curves/secp256k1"
// import {toHex} from "ethereum-cryptography/utils"
// import { sha256 } from '@noble/hashes/sha256';
// import Transfer from "./Transfer";

// function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey, message, setMessage }) {
//   async function onChange(evt) {
//     const privateKey = evt.target.value;
//     setPrivateKey(privateKey);
//     const address = toHex(secp256k1.getPublicKey(privateKey));
//     setAddress(address);
//     console.log(address);
//     if (address) {
//       const {
//         data: { balance },
//       } = await server.get(`balance/${address}`);
//       setBalance(balance);
//     } else {
//       setBalance(0);
//     }
//   }
//   async function onChangeMessage(evt) {
//     const message = evt.target.value;
//     setMessage(message);
//   }

//   const msgHash = toHex(sha256(message));



//   return (
//     <div className="container wallet">
//       <div>
//         <Transfer msgHash={msgHash} />
//       </div>
//       <h1>Your Wallet</h1>

//       <label>
//         Wallet Address
//         <input placeholder="Type in Private Key : " value={privateKey} onChange={onChange}></input>
//       </label>
//       <label>
//         message : 
//         <input placeholder="Type in Message : " value={message} onChange={onChangeMessage}></input>
//       </label>
//         <div>
//           <h3>message Hash : {msgHash} </h3>
//         </div>

//       <div className="balance">Balance: {balance}</div>
//     </div>
//   );
// }

// export default Wallet;

import server from "./server";
import { secp256k1 } from "@noble/curves/secp256k1";
import { useState } from "react"; // Import useState
import { toHex } from "ethereum-cryptography/utils";
import { sha256 } from "@noble/hashes/sha256";
import Transfer from "./Transfer";

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey, message, setMessage }) {
  const [msgHash, setMsgHash] = useState(""); // Add useState for msgHash

  async function onChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);
    const address = toHex(secp256k1.getPublicKey(privateKey));
    setAddress(address);
    console.log(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  async function onChangeMessage(evt) {
    const message = evt.target.value;
    setMessage(message);
    const msgHash = toHex(sha256(message)); // Calculate msgHash and set it
    setMsgHash(msgHash);
  }

  // Remove const msgHash = toHex(sha256(message));

  return (
    <div className="container wallet">
      <div>
        <Transfer msgHash={msgHash} privateKey={privateKey} /> {/* Pass msgHash and privateKey */}
      </div>
      //       <h1>Your Wallet</h1>

      <label>
        Wallet Address
        <input placeholder="Type in Private Key : " value={privateKey} onChange={onChange}></input>
      </label>
      <label>
        message :
        <input placeholder="Type in Message : " value={message} onChange={onChangeMessage}></input>
      </label>
      <div>
        <h3>message Hash : {msgHash} </h3>
      </div>

      <div className="balance">Balance: {balance}</div>
    </div>

  );
}

export default Wallet;
