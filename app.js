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

/**
 * @openapi
 * /:
 *   get:
 *     summary: Health check
 *     tags:
 *       - Root
 *     responses:
 *       200:
 *         description: Server is running
 */
app.get("/", (req, res) => {
  return res.status(200).json({ message: "server is runing" });
});

/**
 * @openapi
 * /books:
 *   get:
 *     summary: Get all books
 *     tags:
 *       - Books
 *     responses:
 *       200:
 *         description: A list of books
 *       500:
 *         description: Internal server error
 */
app.get("/books", getAllbooksHandler);

/**
 * @openapi
 * /books/{id}:
 *   get:
 *     summary: Get a book by id
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The book id
 *     responses:
 *       200:
 *         description: The requested book
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error
 */
app.get("/books/:id", getBookbyIdHandler);

/**
 * @openapi
 * /authors:
 *   get:
 *     summary: Get all authors
 *     tags:
 *       - Authors
 *     responses:
 *       200:
 *         description: A list of authors
 *       500:
 *         description: Internal server error
 */
app.get("/authors", getAllAuthorsHandler);

/**
 * @openapi
 * /authors/{id}:
 *   get:
 *     summary: Get an author by id
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The author id
 *     responses:
 *       200:
 *         description: The requested author
 *       404:
 *         description: Author not found
 *       500:
 *         description: Internal server error
 */
app.get("/authors/:id", getAuthorByIdHandler);

/**
 * @openapi
 * /authors:
 *   post:
 *     summary: Create a new author
 *     tags:
 *       - Authors
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               birthYear:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Author created
 *       400:
 *         description: name is required
 *       500:
 *         description: Internal server error
 */
app.post("/authors", createAuthorHandler);

/**
 * @openapi
 * /authors/{id}:
 *   put:
 *     summary: Update an author by id
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The author id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               birthYear:
 *                 type: integer
 *     responses:
 *       204:
 *         description: Author updated
 *       404:
 *         description: Author not found
 *       500:
 *         description: Internal server error
 */
app.put("/authors/:id", updateAuthorHandler);

/**
 * @openapi
 * /authors/{id}:
 *   delete:
 *     summary: Delete an author by id
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The author id
 *     responses:
 *       204:
 *         description: Author deleted
 *       404:
 *         description: Author not found
 *       500:
 *         description: Internal server error
 */
app.delete("/authors/:id", deleteAuthorHandler);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(spec));

app.use(errorHandler);

export default app;
