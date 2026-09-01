import express from "express";
const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  return res.status(200).json({ message: "server runing" });
});

export default app;
