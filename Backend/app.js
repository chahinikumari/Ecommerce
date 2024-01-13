import express from "express";
const app = express();
import dotenv from "dotenv"
import { connectDatabase } from "./config/dbconnect.js"

dotenv.config({path:"backend/config/config.env"})
connectDatabase();
app.use(express.json());

//imports all routes
import productRoute from "./routes/Products.js";
app.use("/api/v1",productRoute)


app.listen(process.env.PORT,()=>{
    console.log(`srever started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})