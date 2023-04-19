import CustomError from "../../helpers/error/CustomError.mjs";
import Answer from "../../models/Answer.mjs";
import Question from "../../models/Question.mjs";
import User from "../../models/User.mjs";
import asyncErrorWrapper from "express-async-wrapper";
const checkUserExcist = asyncErrorWrapper(async (req,res,next) => {
    const {id} = req.params;
    const user = await User.findById(id);
    //console.log(1,user)
    if(!user){
        return next(new CustomError("There is no such user with that id",400))
    }
    next();

});
const checkQuestionExcist = asyncErrorWrapper(async (req,res,next) => {
    const question_id = req.params.id || req.params.question_id;

    //console.log(req.params);
    const question = await Question.findById(question_id);
    //console.log(question)
    if(!question){
        return next(new CustomError("There is no such question with that id",400));
    }
    next();

});
const checkQuestionAndAnswerExcist = asyncErrorWrapper(async (req,res,next) => {
    const question_id = req.params.id || req.params.question_id;
    const answer_id = req.params.id || req.params.answer_id;

    //console.log(req.params);
    const answer = await Answer
    .findOne({
        _id:answer_id,
        question:question_id
    })
    ;
    //console.log(answer)
    if(!answer){
        return next(new CustomError("There is no such answer associated with question with that id",400));
    }
    next();

});

export {
    checkUserExcist,
    checkQuestionExcist,
    checkQuestionAndAnswerExcist
}