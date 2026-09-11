import express from "express";
import {getAllbooksHandler , getBookbyIdHandler} from "./controllers/books.js"
import { getAllAuthors } from './controllers/authors.js';

const booksRouter = express.Router();

booksRouter.get("/books", getAllbooksHandler)
booksRouter.get("/books/:id", getBookbyIdHandler)
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
 *         description: Unable to retrieve authors
 */
booksRouter.get('/authors', getAllAuthors);

export default booksRouter