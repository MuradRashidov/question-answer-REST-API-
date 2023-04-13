import express from "express";
import { getAllQuestion } from "../controllers/question.mjs";

const questionRouter = express.Router();
questionRouter.get("/",getAllQuestion);

export default questionRouter;