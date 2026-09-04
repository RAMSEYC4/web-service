import express from "express";
import { getDb } from "./src/db/connect.js";
import { ObjectId } from 'mongodb';
const app = express();
app.use(express.json());

app.get("/", async (req, res) => {  
  return res.status(200).json({ message: "server runing" });
});

app.get("/trails", async (req, res) => {
  try {
    const trails = await getDb().collection("books").find({}).toArray();
    return res.status(200).json(trails);
  } catch (error) {``
    console.error("Failed to retrieve trails:", error.message);
    return res.status(500).json({ message: "Failed to retrieve trails" });
  }
});

app.use((err, req, res, next) => {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ message: "Invalid JSON in request body" });
  }
  return res.status(500).json({ message: "Something went wrong" });
});

export default app;

