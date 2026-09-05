import {getDb} from "../db/connect.js"
import {ObjectId} from "mongodb"

const getAllBooks = async () =>{
    const db = getDb();
    const collection = db.collection("books");
    const books = await collection.find({}).toArray()
    return books
}

const getBookbyId = async (bookId) =>{
    if(!ObjectId.isValid(bookId)){
        return null
    }
    const db = getDb()
    const collection = db.collection("books")
    const book = await collection.findOne({_id : new ObjectId(bookId) })
    return book
}

export {getAllBooks , getBookbyId}