import express from "express";
import router from '../routes/user.js'

const app = express();

app.use(express.urlencoded());
app.use(express.json());

app.use('/api/users', router)

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "CopyIt API is running",
  });
});

export default app;