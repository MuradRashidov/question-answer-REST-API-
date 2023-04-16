import CustomError from "../../helpers/error/CustomError.mjs";
import User from "../../models/User.mjs";
import asyncErrorWrapper from "express-async-wrapper";
const checkUserExcist = asyncErrorWrapper(async (req,res,next) => {
    const {id} = req.params;
    const user = await User.findById(id);
    console.log(1,user)
    if(!user){
        return next(new CustomError("There is no such user with that id",400))
    }
    next();

});

export {checkUserExcist}