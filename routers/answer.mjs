import express from "express";
import { getAccessToRoute } from "../middlewares/authorization/auth.mjs";
import { addNewAnswerToQuestion, getAllAnswerByQuestion } from "../controllers/answer.mjs";

const answerRouter = express.Router({mergeParams:true});
answerRouter.post("/",getAccessToRoute,addNewAnswerToQuestion);
answerRouter.get("/",getAccessToRoute,getAllAnswerByQuestion);
export default answerRouter;