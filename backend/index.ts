import express from "express";
import connectToMongoDB from "./connect.js";

const app = express();

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "CopyIt API is running",
  });
});

const PORT = 3000;

connectToMongoDB('mongodb://127.0.0.1:27017/copyit');

app.listen(PORT, () => {
  console.log(`Server is up and running on http://localhost:${PORT}`);
});