import express from "express";
import morgan from "morgan";
import cors from "cors";
import { connectToDatabase } from "./models/index.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
// app.use(express.static("data/images")); // static file server
app.use(express.json()); // body parser

try {
  await connectToDatabase();
  const PORT = 3020;
  app.listen(PORT, () => console.log("Server listening at port", PORT));
} catch (err) {
  console.log(err);
  process.exit();
}
