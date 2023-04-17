import express from "express";
import questionRouter from "./question.mjs";
import authRouter from "./auth.mjs";
import userRouter from "./user.mjs";
import adminRouter from "./admin.mjs";



const router = express.Router();
//router.use("/auth",authRouter);
router.use("/questions",questionRouter);
router.use("/auth",authRouter);
router.use("/users",userRouter);
router.use("/admin",adminRouter);


export default router;