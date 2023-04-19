import expressAsyncWrapper from "express-async-wrapper";
import Question from "../models/Question.mjs";
import CustomError from "../helpers/error/CustomError.mjs";
import { parse } from "dotenv";
const getAllQuestions = expressAsyncWrapper(async(req,res,next) => {
  //let questions = await Question.find().where({title:"Questions 8 - Title"});
  let query = Question.find().where()
  let questions;
  const populate = true;
  let populateObject = {
    path:"user",
    select:"name profile_image"
  };
  if(req.query.search){
       const searchObject = {};
       const regex = new RegExp(req.query.search,"i");
       searchObject["title"]  = regex;
       query = query.where(searchObject);
  }
  if(populate){
    query = query.populate(populateObject);
  }
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const startIndex = (page-1)*limit;
  const endIndex = page*limit;
  let pagination = {};
  const total = await Question.countDocuments();
  if(startIndex>0){
      pagination.previous = {
        page:page-1,
        limit:limit
      };
  }
  if(endIndex<total){
    pagination.next = {
      page:page+1,
      limit:limit
    };

}
 query = query.skip(startIndex).limit(limit);
  questions = await query;

  return(
    res
    .status(200)
    .json({
      success:true,
      count:questions.length,
      pagination,
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
  question.likeCount = question.likes.length;
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
  question.likeCount = question.likes.length;

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