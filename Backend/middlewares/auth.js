import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "./catchAsyncError.js";
import User from "../model/user.js";
//check user is authenticated or not

export const isAuthenticate = catchAsyncError(async(req,res,next)=>{
  const {token} = req.cookies;
  console.log(token);
  if(!token){
    return (new ErrorHandler("Login First to excess this resources",404))
  }

  const decode = jwt.verify(token,process.env.JWT_SECRET)
  req.user = await User.findById(decode.id)
  next();
})