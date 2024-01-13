import Product from "../model/product.js"
 export const getProducts = async (req,res)=>{
    const products = await Product.find();
    res.status(200).json({
        products,
    })
 }

 export const newProducts = async (req,res)=>{

      const product = await Product.create(req.body)

    res.status(200).json({
        product,
    })
 }

 //Get  product details

 export const getProductDetails = async (req,res)=>{
    const product = await Product.findById(req?.params?.id)

    if(!product){

    return res.status(404).json({
        error :"product not found"
    })}

    res.status(200).json({
        product,
    })
 }


 //update the products

 export const updateProduct = async (req,res)=>{
    let product = await Product.findById(req?.params?.id)

    if(!product){

    return res.status(404).json({
        error :"product not found"
    })}


    product = await Product.findByIdAndUpdate(req?.params?.id,req.body,{new:true})
    res.status(200).json({
        product,
    })
 }


 

 export const deleteProduct = async (req,res)=>{
    const product = await Product.findById(req?.params?.id)

    if(!product){

    return res.status(404).json({
        error :"product not found"
    })}


    await product.deleteOne()
    res.status(200).json({
        message:"product deleted"
    })
 }