import asyncErrorWrapper from "express-async-wrapper";
import User from "../models/User.mjs";
import CustomError from "../helpers/error/CustomError.mjs";

const getSingleUser = asyncErrorWrapper(async (req,res,next) => {
    const {id} = req.params;
    const user = await User.findById(id);
    
    return (
        res
        .status(200)
        .json({
            success:true,
            data:user
        })
    )


})
const getAllUsers = asyncErrorWrapper(async (req,res,next) => {
   
    const user = await User.find();
    
    return (
        res
        .status(200)
        .json({
            success:true,
            data:user
        })
    )


})

export {getSingleUser,getAllUsers}
