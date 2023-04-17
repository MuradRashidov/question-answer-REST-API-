import expressAsyncWrapper from "express-async-wrapper";
import Question from "../models/Question.mjs";
import CustomError from "../helpers/error/CustomError.mjs";
const getAllQuestions = expressAsyncWrapper(async(req,res,next) => {
  let questions = await Question.find();
  return(
    res
    .status(200)
    .json({
      success:true,
      data:questions
    })
  )


});
const getSinleQuestion = expressAsyncWrapper(async(req,res,next) => {
    let {id} = req.params
    let question = await Question.findById(id);
    res
    .status(200)
    .json({success:true,data:question});
})

const editQuestion = expressAsyncWrapper(async(req,res,next) => {
     const {id} = req.params;
     const {title,content} = req.body;
     let question = await Question.findById(id);
     question.title = title;
     question.content = content;

     question = await question.save();
     return res
     .status(200)
     .json({success:true,data:question});
})

const deleteQuestion = expressAsyncWrapper(async(req,res,next) => {
    let id = req.params.id;
    await Question.findByIdAndDelete(id);
    return res
     .status(200)
     .json({success:true,message:"Question delete operation is successful"});
});
const likeQuestion = expressAsyncWrapper(async(req,res,next) => {
  let id = req.params.id;
  let question = await Question.findById(id);
  if(question.likes.includes(req.user.id)){
    return next(new CustomError("You have alredy been like this question"));
  }
  question.likes.push(req.user.id);
  await question.save();
  return res
   .status(200)
   .json({success:true,data:question});
});
const undoLikeQuestion = expressAsyncWrapper(async(req,res,next) => {
  let id = req.params.id;
  let question = await Question.findById(id);
  if(!question.likes.includes(req.user.id)){
    return next(new CustomError("You haven't like this question"));
  }
  const index = question.likes.indexOf(req.user.id);
  question.likes.splice(index,1);
  question = await question.save()
  await question.save();
  return (
    res
   .status(200)
   .json({success:true,data:question})
  )
})

const askNewQuestion = expressAsyncWrapper(async(req,res,next) => {
   const information = req.body;
   const question = await Question.create({
    ...information,
    user:req.user.id
   });
 return  res.status(200).json({success:true,data:question})
 })
 export {
  askNewQuestion,
  getAllQuestions,
  getSinleQuestion,
  editQuestion,
  deleteQuestion,
  likeQuestion,
  undoLikeQuestion
};