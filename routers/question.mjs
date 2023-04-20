import express from "express";
import { askNewQuestion, deleteQuestion, editQuestion, getAllQuestions, getSinleQuestion, likeQuestion, undoLikeQuestion } from "../controllers/question.mjs";
import { getAccessToRoute, getQuestionOwnerAccess } from "../middlewares/authorization/auth.mjs";
import { checkQuestionExcist } from "../middlewares/databases/databaseErrorHelper.mjs";
import answerRouter from "./answer.mjs";
import Question from "../models/Question.mjs";
import { questionQueryMidleware } from "../middlewares/query/questionQueryMidleware.mjs";

const questionRouter = express.Router();
questionRouter.get("/:id/like",[getAccessToRoute,checkQuestionExcist],likeQuestion);
questionRouter.get("/:id/undo_like",[getAccessToRoute,checkQuestionExcist],undoLikeQuestion);
questionRouter.get("/",questionQueryMidleware(Question,{
    populate:{
        path:"user",
        select:"name profile_image"
    }
}),getAllQuestions);
questionRouter.get("/:id",checkQuestionExcist,getSinleQuestion);
questionRouter.post("/ask",getAccessToRoute,askNewQuestion);
questionRouter.put("/:id/edit",[getAccessToRoute,checkQuestionExcist,getQuestionOwnerAccess],editQuestion);
questionRouter.delete("/:id/delete",[getAccessToRoute,checkQuestionExcist,getQuestionOwnerAccess],deleteQuestion);
questionRouter.use("/:question_id/answers",checkQuestionExcist,answerRouter)

export default questionRouter;