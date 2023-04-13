import { sendJwtToClient } from "../helpers/authorization/sendJwtToClient.mjs";
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

export {register}