import express from "express";

const questionRouter = express.Router();
questionRouter.get("/",(req,res)=>res.send("Question home page"));
questionRouter.get("/delete",(req,res)=>res.send("Question delete page"));

export default questionRouter;