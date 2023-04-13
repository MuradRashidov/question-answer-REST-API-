import express from "express";
import { getAllQuestions } from "../../controllers/question.mjs";

const questionRouter = express.Router();
questionRouter.get("/",getAllQuestions);
questionRouter.get("/delete",(req,res)=>res.send("Question delete page"));

export default questionRouter;