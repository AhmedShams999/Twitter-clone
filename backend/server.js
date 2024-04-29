import express from "express"
import authRoutes from "./routes/auth.routes.js"
import dotenv from "dotenv" 
import connetMongoDB from "./db/connectToMongo.js";
import cookieParser from "cookie-parser";

dotenv.config()

const app = express(); 
const PORT = process.env.PORT || 5000
app.use(express.json()) // to parse requests
app.use(express.urlencoded({extended:true})) // to accepte the urlencoded type 
app.use(cookieParser())

app.use("/api/auth",authRoutes)


app.listen(PORT,()=>{
  console.log("server is running at port",PORT)
  connetMongoDB()
})