import app from "./app.js";
import { connectToDb } from "./src/db/connect.js";

const PORT = process.env.PORT;

if (!PORT) {
  throw new Error("PORT IS undefined");
}

const startServer = async () => {
  try {
    await connectToDb();
    app.listen(PORT, () => {
      console.log(`Server listening at http://localhost:127.0.0.1:${PORT}`);
    });
  } catch (error) {
    console.log("Database connection failed", error.message);
    process.exit(1);
  }
};

await startServer();
export default connectToDb;
