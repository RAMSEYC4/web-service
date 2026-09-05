import express from "express"
import { getAllbooksHandler } from "./src/controllers/books.js"
import errorHandler from "./src/middleware/middleware.js"
const app = express();
const router = express.Router()


app.use(express.json());
app.use(router)

//Routes
app.get("/",(req,res)=>{
    return res.status(200).json({message : "server is runing"})
})

app.get("/trails", getAllbooksHandler)


app.use(errorHandler)

export default app;

