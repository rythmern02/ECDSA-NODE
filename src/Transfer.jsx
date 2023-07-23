import { useState } from "react";
import server from "./server";
import { secp256k1 } from "@noble/curves/secp256k1";
import { toHex } from "ethereum-cryptography/utils";
import { sha256 } from "@noble/hashes/sha256";
import { Buffer } from "buffer";

function Transfer({ address, setBalance, privateKey, msgHash, sigma, setSigma }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");


  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();
    try {
      const msgHashBytes = Uint8Array.from(Buffer.from(msgHash, "hex"));
      const signature = secp256k1.sign(msgHashBytes, privateKey);
      console.log("msgh =>", msgHash, "signature: ", signature);
      const rec_p = toHex(signature.recoverPublicKey(msgHash).toRawBytes());
      const sigma = toHex(signature.toDERRawBytes());
      setSigma(sigma);
      
      console.log(sigma);
      const sig = sigma.recoverPublicKey(msgHash).toRawBytes();
      console.log("sig: ", sig)
      console.log(rec_p);
    } catch (error) {
      error: {error};
    }
    

    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        amount: parseInt(sendAmount),
        recipient,

      });
      setBalance(balance);
      
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>
      <label>
        signature: {sigma}
        
      </label>
      

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
