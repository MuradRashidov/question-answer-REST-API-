import expressAsyncWrapper from "express-async-wrapper";
import Answer from "../models/Answer.mjs";
import { json } from "express";
import Question from "../models/Question.mjs";

const addNewAnswerToQuestion = expressAsyncWrapper(async(req,res,next)=>{
      const {question_id} = req.params;
      const userId = req.user.id;
      const information = req.body;

      const answer = await Answer.create({
        ...information,
        question:question_id,
        user:userId
      })
      return res
      .status(200)
      .json({
        success:true,
        data:answer
      })
});
const getAllAnswerByQuestion = expressAsyncWrapper(async(req,res,next)=>{
  const {question_id} = req.params;
  console.log(question_id)
  const question = await Question.findById(question_id).populate("answers");
  const answers = question.answers;
  return (res
    .status(200)
    .json({
      success:true,
      data:answers,
      count:answers.length
      
    }))
  

})
export  {
    addNewAnswerToQuestion,getAllAnswerByQuestion
};