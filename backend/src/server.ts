import app from "./app.js";
import connectToMongoDB from "./connect.js";

const PORT = 3000;

connectToMongoDB("mongodb://127.0.0.1:27017/copyit");

app.listen(PORT, () => {
  console.log(`Server is up and running on http://localhost:${PORT}`);
});