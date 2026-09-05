import express from "express";
import {getAllbooksHandler , getBookbyIdHandler} from "./controllers/books.js"

const booksRouter = express.Router();

booksRouter.get("/books", getAllbooksHandler)
booksRouter.get("/books/:id", getBookbyIdHandler)

export default booksRouter