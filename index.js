const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "03b843f88925692415f62a8fcf24045750ba40fd0ce0642effb3e1461389985547": 100,
  "03573537f03a8f54608c4eb9a4d66724006323b829e66a85399f95ae3518a6b537": 50,
  "031c780ea45b8878311e28c22f1cb85a92d782ad993d9d4af9d76bb8f824e979fb": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;
  
  //TO-DO tasks:
  // get a signature from client side application
  // recover a public address from the signature

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
