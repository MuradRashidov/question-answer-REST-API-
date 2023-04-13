import express from "express";
import { register } from "../controllers/auth.mjs";

const authRouter = express.Router();
authRouter.post("/register",register);
authRouter.get("/error");

export default authRouter;