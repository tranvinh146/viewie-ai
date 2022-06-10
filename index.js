import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

const app = express();
dotenv.config();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.post("/summarization", async (req, res) => {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/sshleifer/distilbart-cnn-12-6",
    {
      headers: { Authorization: `Bearer ${process.env.API_TOKEN}` },
      method: "POST",
      body: JSON.stringify(req.body),
    }
  );
  const result = await response.json();
  return res.status(201).json(result[0]);
});

// app.get("/translation", async (req, res) => {
//   const response = await fetch(
//     "https://api-inference.huggingface.co/models/Helsinki-NLP/opus-mt-en-vi",
//     {
//       headers: { Authorization: `Bearer ${process.env.API_TOKEN}` },
//       method: "POST",
//       body: JSON.stringify(req.query),
//     }
//   );
//   const result = await response.json();
//   return res.status(201).json(result[0]);
// });

// app.get("/movies", async (req, res) => {
//   const titleList = [];
//   for (let page = 1; page < 100; page++) {
//     await fetch(
//       `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY_TMDB}&language=en-US&page=${page}`
//     )
//       .then((response) => {
//         return response.json();
//       })
//       .then((data) => {
//         data["results"].forEach((movie) => {
//           titleList.push({ name: movie["title"] });
//         });
//       });
//   }
//   res.status(200).json(titleList);
// });

app.use("*", (req, res) => {
  res.status(404).json({ error: "not found" });
});

app.listen(port, () => {
  console.log("Server is running on port", port);
});
