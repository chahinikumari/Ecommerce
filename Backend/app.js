import express from "express";
const app = express();
import dotenv from "dotenv"
import { connectDatabase } from "./config/dbconnect.js"
import errorMiddleware from "./middlewares/error.js";

//handle un
process.on("uncaughtException",(err)=>{
    console.log(`ERROR: ${err}`);
    console.log("shutting down server due to uncaught Exception");
    
        process.exit(1);

})
dotenv.config({path:"backend/config/config.env"})
connectDatabase();
app.use(express.json());

//imports all routes
import productRoute from "./routes/Products.js";
import authRoute from "./routes/auth.js"
app.use("/api/v1",productRoute)
app.use("/api/v1",authRoute)

app.use(errorMiddleware);

const server=app.listen(process.env.PORT,()=>{
    console.log(`srever started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})

//handle promise rejection
process.on("unhandledRejection",(err)=>{
    console.log(`ERROR: ${err}`);
    console.log("shutting down server due to unhandled promise Rejection");
    server.close(()=>{ 
        process.exit(1);
    });

});