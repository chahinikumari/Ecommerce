import mongoose from "mongoose";
console.log("hello")

export const connectDatabase = async()=>{
    let DB_URI="";
   
    if(process.env.NODE_ENV==="DEVELOPMENT") DB_URI = process.env.DB_LOCAL_URI;
    if(process.env.NODE_ENV==="PRODUCTION") DB_URI = process.env.DB_URI;

    


    mongoose.connect(DB_URI).then((con)=>{
       console.log("hello mogo")
        console.log(`Mongoose database is connected to host ${con?.connection?.host}`)
    })
}
