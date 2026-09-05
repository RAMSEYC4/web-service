import {getAllBooks , getBookbyId } from "../models/books.js"

const getAllbooksHandler = async (req,res) => {
  try{
    const books = await getAllBooks()
    return res.status(200).json(books)
  }catch(error){
    console.log("GET /books failed:", error.message)
    return res.status(500).json({message : "internal server error"})
  }
}

const getBookbyIdHandler = async (req ,res ) => {
  const reqId = req.params.id
  try{
    const book  = await getBookbyId(reqId)
    if(!book){
      return   res.status(404).json({message : "Book not found"})
    }
    return res.status(200).json(book)
  }catch(error){
    console.error("GET /books/:id failed",error.message)
    return res.status(500).json({message : "internal server error"})
  }
}

export {getAllbooksHandler,getBookbyIdHandler}