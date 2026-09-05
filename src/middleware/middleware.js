import express from "express"
const app = express();

const errorHandler = ((error, req, res, next) => {
  if (error.type === "entity.parse.failed") {
    return res.status(400).json({ message: "Invalid JSON in request body" });
  }
  return res.status(500).json({ message: "Something went wrong" });
});


export default errorHandler