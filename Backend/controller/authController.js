import catchAsyncError from "../middlewares/catchAsyncError.js";
import User from "../model/user.js"
import { getResetPasswordTemplate } from "../utils/emailTemplate.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendEmail from "../utils/sendEmail.js";
import sendToken from "../utils/sendToken.js";
import crypto from "crypto";

export const registerUser =async(req,res,next)=>{
const{name,email,password}=req.body;
const user= await User.create(
    {name,email,password}
)
sendToken(user,201,res)

}


//login user

export const loginUser =catchAsyncError(async(req,res,next)=>{
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
    
    })
    
  //logout user

  export const logout = catchAsyncError(async(req,res,next)=>{
    res.cookie("token",null,{
      expires:new Date(Date.now()),
      httpOnly:true
    });

    res.status(200).json(
        {
            message:"Logged"
        }
    )

  })

  //Forget password => /api/v1/password/forgot

  export const forgotPassword =catchAsyncError(async(req,res,next)=>{
    const {hju} = req.body
      //find the user in the database
      console.log(hju)
    const user= await User.findOne({email:req.body.email})
    console.log("user",user)
    

    if(!user){
        return next(new ErrorHandler("user not found with this email",404))
    }

    //get reset password token
    const resetToken = user.getResetPasswordToken();
    await user.save();

    //create reset password url

    const resetUrl = `${process.env.FRONTEND_URL}/api/v1/password/reset/${resetToken}`;


    const message = getResetPasswordTemplate(user?.name,resetUrl);

    try{
      await sendEmail({
        email:user.email,
        subject:"ShopIT password Recovery",
        message,
      });

      res.status(200).json({
        message:`Email sent to: ${user.email}`,
      });
    }
    catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpired = undefined;

        await user.save();
        return next(new ErrorHandler(error?.message,500));
    }
    
    
    
    })


    //reset password

    export const resetPassword =catchAsyncError(async(req,res,next)=>{
        constresetPasswordToken = crypto.createHash("sha256").
        update(req.params.token).
        digest("hex");

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpired:{$gt:Date.now()},
        });

        if(!user){
            return next(new ErrorHandler("password reset token is invalid or has been expired",400))

        }
       if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("password does notmatch",400))
       }

       //Set the new password
       user.password = req.body.password;

       user.resetPasswordToken = undefined;
       user.resetPasswordExpired = undefined;

       await user.save();

       sendToken(user,200,res);

    });

    //Get Current user profile => /api/v1/me

    export const getUserProfile = catchAsyncError(async(req,res,next)=>{
        const user = await User.findById(req?.user?._id);
        

        res.status(200).json({
            user,
        });
    });

    //Update password => /api/v1/password/update

    export const updatePassword = catchAsyncError(async(req,res,next)=>{
        const user = await User.findById(req?.user?._id).select("+password");

        //Check the previous user password

        const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

        if(!isPasswordMatched){
            return next(new ErrorHandler("Old Password is incorrect", 400));
        }
        user.password = req.body.password;
        await user.save();

        res.status(200).json({
            success: true,
        });
    });


    
    export const updateProfile = catchAsyncError(async(req,res,next)=>{
        
         const newUserData = {
            name: req.body.name,
            email: req.body.email
         };

         const user = await User.findByIdAndUpdate(req.user._id,newUserData,{
            new:true,
         })
        res.status(200).json({
            user
        });
    });



    
     //Get all Users - ADMIN => /api/v1/admin/users

     export const allUsers = catchAsyncError(async(req,res,next)=>{
        const users = await User.find();

        console.log("current user",users)
        res.status(200).json({
            users,
        });
    });

//Get User Details- ADMIN => /api/v1/admin/user/:id
    export const getUserDetails = catchAsyncError(async(req,res,next)=>{
        const user = await User.findById(req.param._id);

        
        if(!user){
            return next(new ErrorHandler(`User not found with id: ${req.param.id}`, 400));
        }
      
        res.status(200).json({
        user,
        });
    });

  //update User route 

  export const updateUser = catchAsyncError(async(req,res,next)=>{
    const newuserData = {
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    }
    const user = await User.findByIdAndUpdate(req.param.id,newUserData,{
        new:true
    });

    
    res.status(200).json({
    user,
    });
});


    //Delete the user => api/v1/admin/users/:id

    export const deleteUser = catchAsyncError(async(req,res,next)=>{
        const user = await User.findById(req.param._id);

        
        if(!user){
            return next(new ErrorHandler(`User not found with id: ${req.param.id}`, 400));
        }

        //todo- Remove user avatar
        await user.deleteOne()
      
        res.status(200).json({
        success:true
        });
    });


