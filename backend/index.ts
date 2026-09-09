import express from "express";
import connectToMongoDB from "./connect.js";
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "CopyIt API is running",
  });
});

const PORT = 3000;

connectToMongoDB(process.env.MONGO_URI!);

app.listen(PORT, () => {
  console.log(`Server is up and running on http://localhost:${PORT}`);
});