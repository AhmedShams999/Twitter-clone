import express from "express"
import {v2 as cloudinary} from 'cloudinary';
import dotenv from "dotenv" 
import cookieParser from "cookie-parser";


import authRoutes from "./routes/auth.route.js"
import usersRoutes from "./routes/user.route.js"
import postsRoutes from "./routes/post.route.js"
import notificationsRoutes from "./routes/notification.route.js"
import connetMongoDB from "./db/connectToMongo.js";

dotenv.config()
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET
})

const app = express(); 
const PORT = process.env.PORT || 5000
app.use(express.json({limit:"5mb"})) // to parse requests
// limit the uploaded pictures to 5mb but not TO LARGE as there some kind of attacks called DoS
app.use(express.urlencoded({extended:true})) // to accepte the urlencoded type 
app.use(cookieParser())

app.use("/api/auth",authRoutes)
app.use("/api/users",usersRoutes)
app.use("/api/posts",postsRoutes)
app.use("/api/notifications",notificationsRoutes)


app.listen(PORT,()=>{
  console.log("server is running at port",PORT)
  connetMongoDB()
})