import { getAccessTokenTokenFromHeader, isTokenIncluded } from "../../helpers/authorization/tokenHelpers.mjs";
import CustomError from "../../helpers/error/CustomError.mjs";
import expressAsyncWrapper from "express-async-wrapper";
import jwt from "jsonwebtoken";
import User from "../../models/User.mjs"
import Question from "../../models/Question.mjs";
import Answer from "../../models/Answer.mjs";
const getAccessToRoute = (req,res,next) => {

    const {JWT_SECRET_KEY} = process.env;
   if(!isTokenIncluded(req)) {
    return next(new CustomError("You are unauthorized",401));
    
   }
  const accessToken =  getAccessTokenTokenFromHeader(req);
  jwt.verify(accessToken,JWT_SECRET_KEY,(err,decoded)=>{
    if(err){
        return next(new CustomError("You are unauthorized",401));
    }
    //console.log(decoded);
    req.user ={
        id:decoded.id,
        name:decoded.name
    }
    next();
  });
}
const getAdminAccess = expressAsyncWrapper(async(req,res,next) => {
    const {id} = req.user;
    const user = await User.findById(id);

    if(user.role !== "admin"){
        return next(new CustomError("Only admin can access this route",403))
    }
    next();
});
const getQuestionOwnerAccess = expressAsyncWrapper(async(req,res,next) => {
    let userId = req.user.id;
    let questionId = req.params.id;
    
    let question = await Question.findById(questionId);
    if(question.user != userId){
        return next(new CustomError("Only admin can handle this route",403));
    }
    next();
});
const getAnswerOwnerAccess = expressAsyncWrapper(async(req,res,next) => {
    let userId = req.user.id;
    let {answer_id} = req.params;
    
    let answer = await Answer.findById(answer_id);
    console.log(answer)

    if(answer.user != userId){
        return next(new CustomError("Only admin can handle this route",403));
    }
    next();
});
export {
    getAccessToRoute,
    getAdminAccess,
    getQuestionOwnerAccess,
    getAnswerOwnerAccess
};