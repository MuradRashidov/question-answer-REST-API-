import { sendJwtToClient } from "../helpers/authorization/tokenHelpers.mjs";
import CustomError from "../helpers/error/CustomError.mjs";
import { comparePassword, validateUserInput } from "../helpers/input/inputHelpers.mjs";
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
   res.status(200).json({
      success:true,
      message:"Image upload is successful"

   })
})

export {register,getUser,login,logaut,imageUpload}