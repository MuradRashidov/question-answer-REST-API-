import expressAsyncWrapper from "express-async-wrapper";
import Question from "../models/Question.mjs";
const askNewQuestion = expressAsyncWrapper(async(req,res,next) => {
   const information = req.body;
   const question = await Question.create({
    ...information,
    user:req.user.id
   });
   res.status(200).json({success:true,data:question})
 })
 export {askNewQuestion}