import express from "express";
import questionRouter from "./question.mjs";
import authRouter from "./auth.mjs";



const router = express.Router();
//router.use("/auth",authRouter);
router.use("/question",questionRouter);
router.use("/auth",authRouter);


export default router;