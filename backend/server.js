import express from "express"
import {v2 as cloudinary} from 'cloudinary';
import dotenv from "dotenv" 
import cookieParser from "cookie-parser";


import authRoutes from "./routes/auth.routes.js"
import usershRoutes from "./routes/user.routes.js"
import connetMongoDB from "./db/connectToMongo.js";

dotenv.config()
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET
})

const app = express(); 
const PORT = process.env.PORT || 5000
app.use(express.json()) // to parse requests
app.use(express.urlencoded({extended:true})) // to accepte the urlencoded type 
app.use(cookieParser())

app.use("/api/auth",authRoutes)
app.use("/api/users",usershRoutes)


app.listen(PORT,()=>{
  console.log("server is running at port",PORT)
  connetMongoDB()
})