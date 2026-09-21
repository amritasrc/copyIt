import express from "express";
import cors from "cors";
import router from './routes/user.js'
import snippetRouter from "./routes/snippet.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://copy-it-iota.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());

app.use('/api/users', router);
app.use('/api/snippets', snippetRouter);

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "CopyIt API is running.",
  });
});

app.use(errorHandler);

export default app;