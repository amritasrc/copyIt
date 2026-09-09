import express from "express";

const app = express();

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "CopyIt API is running",
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is up and running on http://localhost:${PORT}`);
});