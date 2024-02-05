import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import crypto from "crypto"
const userSchema = new mongoose.Schema({
    name:{
      type:String,
      required:[true,"please enter your name"],
      maxLength:[50,"your name cannot exceed 50 character"]
    },
    email:{
       type:String,
      required:[true,"please enter your email"],
      unique:true

    },
    password:{
        type:String,
      required:[true,"please enter your email"],
      maxLength:[6,"your password must be longer than 6 character"],
      select:false

    },
    avatar:{
        public_id:String,
        url:String

    },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken:String,
    resetPasswordExpired:Date,


},{timestamps:true}
);

//Encrypting password before saving the user
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
     next();
    }
    this.password = await bcrypt.hash(this.password,10)
});

//return jwt token

userSchema.methods.getJwtToken = function(){
   return jwt.sign({id:this._id},process.env.JWT_SECERT,{
    expiresIn:process.env.JWT_EXPIRES_TIME
   })
}


//campare user password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}


//Generate password reset token

userSchema.methods.getResetPasswordToken = function () {
    //Generate token
    const resetToken = crypto.randomBytes(20).toString("hex")

    //hash and set to resetPasswordToken field

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    //set token expire time

    this.resetPasswordExpired = Date.now() + 30 * 60 * 1000;

    return resetToken;
}
export default mongoose.model('User',userSchema);