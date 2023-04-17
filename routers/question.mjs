import express from "express";
import { askNewQuestion } from "../controllers/question.mjs";
import { getAccessToRoute } from "../middlewares/authorization/auth.mjs";

const questionRouter = express.Router();
questionRouter.post("/ask",getAccessToRoute,askNewQuestion);

export default questionRouter;