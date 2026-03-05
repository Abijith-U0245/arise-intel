const express = require("express");
const cors = require("cors");
const blockchain = require("./blockchain/blockchain");

const app = express();

app.use(cors());
app.use(express.json());

/* TEST ROUTE */
app.get("/", (req, res) => {
  res.send("ARISE Backend Running");
});

/* BLOCKCHAIN API */
app.post("/predict-risk", (req, res) => {

  const { studentId, riskScore } = req.body;

  const newBlock = blockchain.addBlock({
    studentId,
    riskScore
  });

  console.log("New blockchain block created:", newBlock);

  res.json({
    message: "Prediction stored on blockchain",
    block: newBlock
  });

});

/* VIEW BLOCKCHAIN */
app.get("/chain", (req, res) => {
  res.json(blockchain.getChain());
});

/* START SERVER */
app.listen(4000, () => {
  console.log("Backend running on port 4000");
});