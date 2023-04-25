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
   
    
    return (
        res
        .status(200)
        .json(res.queryResults)
    )


})

export {getSingleUser,getAllUsers}
