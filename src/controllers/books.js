import {getAllBooks} from "../models/books.js"

const getAllbooksHandler = async (req,res) => {
  try{
    const books = await getAllBooks()
    return res.status(200).json(books)
  }catch(error){
    console.log("GET /books failed:", error.message)
    return res.status(500).json({message : "internal server error"})
  }
}

export {getAllbooksHandler}