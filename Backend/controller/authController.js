import User from "../model/user.js"
import ErrorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/sendToken.js";

export const registerUser =async(req,res,next)=>{
const{name,email,password}=req.body;
const user= await User.create(
    {name,email,password}
)
sendToken(user,201,res)

}


//login user

export const loginUser =async(req,res,next)=>{
    const{email,password}=req.body;
    if(!email || !password){
        return next(new ErrorHandler("please enter email and password",400))
    }
      //find the user in the database
    const user= await User.findOne(
        {email}).select("+password")
    

    if(!user){
        return next(new ErrorHandler("invalid email or password",401))
    }

    const isPasswordMatched = await user.comparePassword(password)
    if(!isPasswordMatched){
        return next(new ErrorHandler("invalid password",401))
    }
    sendToken(user,201,res);
    
    }
    
