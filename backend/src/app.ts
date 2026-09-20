import express from "express";
import cors from "cors";
import router from './routes/user.js'
import snippetRouter from "./routes/snippet.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(express.urlencoded());
app.use(express.json());
const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter(Boolean) as string[];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true
  })
);

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