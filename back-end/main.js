import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { router as indexRouter } from "./routes/index.js";
import dotenv from "dotenv";
dotenv.config();
const PORT = 8080;
const app = express();
app.use(express.json());
app.use(cors());
const dburi = process.env.DBURI;
app.use("/", indexRouter);

const server = async () => {
  try {
    await mongoose.connect(dburi).then(() => {
      console.log("Connected to the database");
    });
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

server();
