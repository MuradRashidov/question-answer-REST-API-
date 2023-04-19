import express from "express";
import { getAccessToRoute, getAnswerOwnerAccess } from "../middlewares/authorization/auth.mjs";
import { addNewAnswerToQuestion, getAllAnswerByQuestion, getSingleAnswer,editAnswer,deleteAnswer,likeAnswer,undoLikeAnswer} from "../controllers/answer.mjs";
import { checkQuestionAndAnswerExcist } from "../middlewares/databases/databaseErrorHelper.mjs";

const answerRouter = express.Router({mergeParams:true});
answerRouter.post("/",getAccessToRoute,addNewAnswerToQuestion);
answerRouter.get("/",getAccessToRoute,getAllAnswerByQuestion);
answerRouter.get("/:answer_id",checkQuestionAndAnswerExcist,getSingleAnswer);
answerRouter.get("/:answer_id/like",checkQuestionAndAnswerExcist,getAccessToRoute,likeAnswer);
answerRouter.get("/:answer_id/undo_like",checkQuestionAndAnswerExcist,getAccessToRoute,undoLikeAnswer);
answerRouter.put("/:answer_id/edit",[checkQuestionAndAnswerExcist,getAccessToRoute,getAnswerOwnerAccess],editAnswer);
answerRouter.delete("/:answer_id/delete",[checkQuestionAndAnswerExcist,getAccessToRoute,getAnswerOwnerAccess],deleteAnswer);
export default answerRouter;