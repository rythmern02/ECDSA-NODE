import Wallet from "./Wallet";
import Transfer from "./Transfer";
import Output from "./output";
import "./App.scss";
import { useState } from "react";
import {toHex} from "ethereum-cryptography/utils"
import {sha256} from "@noble/hashes/sha256"

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [message, setMessage] = useState("");
  const [sigma, setSigma] = useState("");
  const [signature, setSignature] = useState("");
  const [outputM, setOutputM] = useState("");
  const [rec_p, setRec_p] = useState("");

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
        privateKey={privateKey}
        setPrivateKey={setPrivateKey}
        message={message}
        setMessage={setMessage}
      />
      
      <Transfer
        address={address}
        setBalance={setBalance}
        msgHash={toHex(sha256(message))}
        privateKey={privateKey}
        sigma = {sigma}
        setSigma = {setSigma}
      />

      <Output 
      signature= {signature}
      setSignature = {setSignature}
      outputM ={outputM}
      setOutputM = {setOutputM}
      rec_p = {rec_p}
      setRec_p = {setRec_p}
      />
    </div>
  );
}


export default App;
