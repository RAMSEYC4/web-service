import app from "./app.js";

const PORT = process.env.PORT;

if (!PORT) {
  throw new Error("PORT IS undefined");
}

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:127.0.0.1:${PORT}`);
});
