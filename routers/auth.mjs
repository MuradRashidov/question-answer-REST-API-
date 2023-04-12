import express from "express";

const authRouter = express.Router();
authRouter.get("/",(req,res)=>res.send("Auth home page"));
authRouter.get("/register",(req,res)=>res.send("Auth register page"));

export default authRouter;