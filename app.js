import express from "express";
import {
  getAllbooksHandler,
  getBookbyIdHandler,
} from "./src/controllers/books.js";
import {
  getAllAuthorsHandler,
  getAuthorByIdHandler,
  createAuthorHandler,
  updateAuthorHandler,
  deleteAuthorHandler,
} from "./src/controllers/authors.js";
import errorHandler from "./src/middleware/middleware.js";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: { title: "Web Service API", version: "1.0.0" },
  },
  apis: ["./src/**/*.js", "./app.js"],
};

const spec = swaggerJSDoc(options);

const app = express();
const router = express.Router();

app.use(express.json());
app.use(router);

//Routes
app.get("/", (req, res) => {
  return res.status(200).json({ message: "server is runing" });
});

app.get("/books", getAllbooksHandler);
app.get("/books/:id", getBookbyIdHandler);
app.get("/authors", getAllAuthorsHandler);
app.get("/authors/:id", getAuthorByIdHandler);
app.post("/authors", createAuthorHandler);
app.put("/authors/:id", updateAuthorHandler);
app.delete("/authors/:id", deleteAuthorHandler);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(spec));

app.use(errorHandler);

export default app;
