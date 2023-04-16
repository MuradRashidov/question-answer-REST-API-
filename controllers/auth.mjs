import { sendJwtToClient } from "../helpers/authorization/tokenHelpers.mjs";
import CustomError from "../helpers/error/CustomError.mjs";
import { comparePassword, validateUserInput } from "../helpers/input/inputHelpers.mjs";
import { sendEmail } from "../helpers/libraries/sendEmail.mjs";
import User from "../models/User.mjs";
import asyncErrorWrapper from "express-async-wrapper";
const register = asyncErrorWrapper(async (req,res,next) => {
   const {name,email,password,role} = req.body;
   //console.log(req.body)
   
   let user = await User.create({
      name,
      email,
      password,
      role,
   });
   sendJwtToClient(user,res); 
  
  
   
})
const login = asyncErrorWrapper(async (req,res,next) => {
   const {email,password} = req.body;
   if(!validateUserInput(email,password)){
         return next(new CustomError("Inputlarını yoxla",400));
   }
   const user = await User.findOne({email}).select("+password");
   console.log(comparePassword(password,user.password),"test")
   if(!comparePassword(password,user.password)){
      return next(new CustomError("Email və ya şifrə yanlışdır",400));
   }
   sendJwtToClient(user,res); 

});
const logaut = asyncErrorWrapper(async (req,res,next) => {
   const {NODE_ENV} = process.env;
   return (
      res.status(200)
   .cookie({
      httpOnly:true,
      expires:new Date(Date.now()),
      secure:NODE_ENV==="devolopment"?false:true
   })
   .json({
      success:true,
      message:"Logaut is successful"
   })
   )
})
const getUser = (req,res,next) => {
   res.json({
      success:true,
      data:{
         id:req.user.id,
         name:req.user.name
      }
   })
}
const imageUpload = asyncErrorWrapper(async (req,res,next) => {
   let user = await User.findByIdAndUpdate(req.user.id,{
      "profile_image":req.savedProfileImage
   },
   {
      new:true,
      runValidators:true
   })
   res.status(200).json({
      success:true,
      message:"Image upload is successful",
      data:user

   })
})
const forgetPassword = asyncErrorWrapper(async (req,res,next) => {
   const reserEmail = req.body.email;
   const user = await User.findOne({email:reserEmail});
   if(!user){
      return next(new CustomError("There is not find any uset with this email",401))
   }
   const resetPasswordToken = user.getResetPasswordTokenFromUser();
   await user.save();
   const resetPasswordUrl = `http://localhost:5002/api/auth/resetpassword?resetPasswordToken=${resetPasswordToken}`
   const emailTemplate = `
        <h3>Reset your password</h3>
        <p>This <a href=${resetPasswordUrl} target="_blank">link</a> will expire in 1 hour</p>
   `
   try{
      await sendEmail({
         from:process.env.SMTP_USER,
         to:reserEmail,
         subject:"Reset your password",
         html:emailTemplate
      })
      res.status(200).json({
         success:true,
         message:"Token sent your email"
      })
   }
   catch(err){
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
      return next(new CustomError(err,500))
      
   }
   
});

const resetPassword = asyncErrorWrapper(async (req,res,next) => {
         const {resetPasswordToken} = req.query;
         const {password} = req.body;
         if(!resetPasswordToken){
            return next(new CustomError("Please prowide a valid token",400));
         }
         const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire:{$gt:Date.now()}
         });
         if(!user){
            return next(new CustomError("Invalid token session expired",404));
         }
         user.password = password;
         user.resetPasswordToken = undefined;
         user.resetPasswordExpire = undefined;
         await user.save();
         return res
         .status(200)
         .json({
            success:true,
            message:"Reset password process is successful"
         })
})

export {register,getUser,login,logaut,imageUpload,forgetPassword,resetPassword}