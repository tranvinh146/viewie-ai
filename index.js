import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }));

async function query(data) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/gpt2",
    {
      headers: { Authorization: `Bearer ${process.env.API_TOKEN}` },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  return result;
}

app.get("/summarization", async (req, res) => {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
    {
      headers: { Authorization: `Bearer ${process.env.API_TOKEN}` },
      method: "POST",
      body: JSON.stringify(req.query),
    }
  );
  const result = await response.json();
  return res.status(201).json(result);
});

app.get('/translation', async (req, res) => {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/Helsinki-NLP/opus-mt-en-vi",
    {
      headers: { Authorization: `Bearer ${process.env.API_TOKEN}` },
      method: "POST",
      body: JSON.stringify(req.query),
    }
  );
  const result = await response.json();
  return res.status(201).json(result);
})

app.use("*", (req, res) => {
  res.status(404).json({ error: "not found" });
});

app.listen(port, () => {
  console.log("Server is running on port", port);
});
