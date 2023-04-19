import expressAsyncWrapper from "express-async-wrapper";
import Answer from "../models/Answer.mjs";
import { json } from "express";
import Question from "../models/Question.mjs";
import CustomError from "../helpers/error/CustomError.mjs";

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
  //console.log(question_id)
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
const getSingleAnswer = expressAsyncWrapper(async(req,res,next)=>{
  const {answer_id} = req.params;
  const answer =  await Answer
  .findById(answer_id)
  .populate({
    path:"user",
    select:"title name profile_image"
  })
  .populate({
    path:"question",
    select:"title"
  })
  ;
  return(res.status(200).json({success:true,data:answer}));
});
const editAnswer = expressAsyncWrapper(async(req,res,next)=>{
  const {answer_id} = req.params;
  const newContent = req.body.content;
  let answer =  await Answer.findById(answer_id);
  answer.content = newContent;
  await answer.save();
  
  return(res.status(200).json({success:true,data:answer}));
})
const deleteAnswer = expressAsyncWrapper(async(req,res,next)=>{
  const {answer_id} = req.params;
  const {question_id} = req.params;
  await Answer.findByIdAndRemove(answer_id);
  //await answer.save();
  const question = await Question.findById(question_id);
  question.answers.splice(question.answers.indexOf(answer_id),1);
  question.answerCount = question.answers.length; 
  await question.save();
  return res.status(200).json({success:true,message:"answer deleting successful"});
});
const likeAnswer = expressAsyncWrapper(async(req,res,next) => {
  let {answer_id} = req.params;
  let answer = await Answer.findById(answer_id);
  if(answer.likes.includes(req.user.id)){
    return next(new CustomError("You have alredy been like this answer"));
  }
  answer.likes.push(req.user.id);
  await answer.save();
  console.log(answer.likes)

  return res
   .status(200)
   .json({success:true,data:answer});
});
const undoLikeAnswer = expressAsyncWrapper(async(req,res,next) => {
  let {answer_id} = req.params;
  let answer = await Answer.findById(answer_id);
  if(!answer.likes.includes(req.user.id)){
    return next(new CustomError("You haven't liked this answer anyway"));
  }
  const index = answer.likes.indexOf(req.user.id);
  answer.likes.splice(index,1);
  answer = await answer.save()
  await answer.save();
  return (
    res
   .status(200)
   .json({success:true,data:answer})
  )
})

export  {
    addNewAnswerToQuestion,getAllAnswerByQuestion,getSingleAnswer,editAnswer,deleteAnswer,likeAnswer,undoLikeAnswer
};