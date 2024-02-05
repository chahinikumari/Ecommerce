import Product from "../model/product.js"
import APIFilters from "../utils/apiFilter.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "../middlewares/catchAsyncError.js";



 export const getProducts = catchAsyncError(async (req,res,next)=>{
    const resPerPage = 4;
    const apiFilters = new APIFilters(Product,req.query).search().filters();
    console.log("req.user",req?.user)
    let products = await apiFilters.query;
    let filterProductCount=products.length;

    //return next(new ErrorHandler("product error",404))

    apiFilters.pagination(resPerPage);
    products = await apiFilters.query.clone();


    //const products = await Product.find();
    res.status(200).json({
        resPerPage,
        filterProductCount,
        products,
    })
 })

 export const newProducts = catchAsyncError(async (req,res)=>{

    req.body.user = req.body._id
    console.log(req.body.user)

      const product = await Product.create(req.body)

    res.status(200).json({
        product,
    })
 })

 //Get  product details

 export const getProductDetails = catchAsyncError(async (req,res,next)=>{
    
    const product = await Product.findById(req?.params?.id)

    if(!product){
        return next (new ErrorHandler("product not found",404))
       // return res.status(404).json({
         //  error :"product not found"
        //})

    }

    res.status(200).json({
        product,
    })
 })


 //update the products

 export const updateProduct = catchAsyncError(async (req,res)=>{
    let product = await Product.findById(req?.params?.id)

    if(!product){

    return res.status(404).json({
        error :"product not found"
    })}


    product = await Product.findByIdAndUpdate(req?.params?.id,req.body,{new:true})
    res.status(200).json({
        product,
    })
 })


 

 export const deleteProduct = catchAsyncError(async (req,res)=>{
    const product = await Product.findById(req?.params?.id)

    if(!product){

       
    return res.status(404).json({
        error :"product not found"
    })}


    await product.deleteOne()
    res.status(200).json({
        message:"product deleted"
    })
 })