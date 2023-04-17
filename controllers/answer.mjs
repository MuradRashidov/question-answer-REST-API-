import expressAsyncWrapper from "express-async-wrapper";
import Answer from "../models/Answer.mjs";

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
export  {
    addNewAnswerToQuestion
};