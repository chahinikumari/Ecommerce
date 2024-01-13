import mongoose from "mongoose";
import Product from "../model/product.js";
import product from "./data.js"

const seedProducts = async ()=>{
   try{

    await mongoose.connect("mongodb://127.0.0.1:27017/shopit-v2")
    await Product.deleteMany();
    console.log("products are deleted")

    await Product.insertMany(product);
    console.log("products are inserted")

    process.exit();
   }
    catch(error){
    console.log(error.message)
     process.exit();
 }
}

seedProducts();