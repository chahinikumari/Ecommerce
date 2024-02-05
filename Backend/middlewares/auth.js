import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "./catchAsyncError.js";
import User from "../model/user.js";
//check user is authenticated or not

export const isAuthenticate = catchAsyncError(async(req,res,next)=>{
  const {token} = req.cookies;
  //console.log(token);
  if(!token){
    return next(new ErrorHandler("Login First to excess this resources",404))
  }

  const decode = jwt.verify(token,process.env.JWT_SECERT)
  console.log(decode);
  req.user = await User.findById(decode.id)
  next();
})


//Authorize user roles
export const authorizeRoles = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(
                new ErrorHandler(
                    `Role ${req.user.role} is not allowed to access this resources`, 403
                )
            );
        }
        next();
    }
}