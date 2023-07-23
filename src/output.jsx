import server from "./server";
import { secp256k1 } from "@noble/curves/secp256k1";
import { useState } from "react";
import {secp} from "ethereum-cryptography/secp256k1";
import {toHex} from "ethereum-cryptography/utils";
function Output({ signature, setSignature, outputM, setOutputM, rec_p, setRec_p }) {
  

  function onchangeinputsig(evt) {
    const signature = evt.target.value;
    setSignature(signature);

  }

  function onchangeinputmsg(evt) {
    const outputM = evt.target.value;
    setOutputM(outputM);
  }

  function onclickbutton() {
    const rec_p = secp256k1.recoverPublicKey(msgHash, signature).toRawBytes();
  
    setRec_p(rec_p);
  }

  return (
    <div className="container">
      <h1>OutCome of transaction</h1>

      <label>
        signature:
        <input placeholder="Type in a Signature : " onChange={onchangeinputsig}></input>
      </label>
      <label>
        message hash:
        <input placeholder="Type in a message : " onChange={onchangeinputmsg}></input>
      </label>
      <label>
        recovered public key is : {rec_p}
      </label>

      <button type="submit" className="button" placeholder="recover public key" onClick={onclickbutton}></button>
    </div>
  );
}

export default Output;
