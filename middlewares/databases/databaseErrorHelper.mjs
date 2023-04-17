import CustomError from "../../helpers/error/CustomError.mjs";
import Question from "../../models/Question.mjs";
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
const checkQuestionExcist = asyncErrorWrapper(async (req,res,next) => {
    const question_id = req.params.id || req.params.question_id;

    //console.log(req.params);
    const question = await Question.findById(question_id);
    console.log(question)
    if(!question){
        return next(new CustomError("There is no such question with that id",400));
    }
    next();

});

export {checkUserExcist,checkQuestionExcist}