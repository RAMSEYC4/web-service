import express from "express";
import {getAllbooksHandler} from "./controllers/books.js"

const booksRouter = express.Router();

booksRouter.get("/books", getAllbooksHandler)

export default booksRouter