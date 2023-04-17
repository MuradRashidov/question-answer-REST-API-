import express from "express";
import { getAccessToRoute } from "../middlewares/authorization/auth.mjs";
import { addNewAnswerToQuestion } from "../controllers/answer.mjs";

const answerRouter = express.Router({mergeParams:true});
answerRouter.post("/",getAccessToRoute,addNewAnswerToQuestion)
export default answerRouter;