import express from "express";
import { getAllUsers, getSingleUser } from "../controllers/user.mjs";
import { checkUserExcist } from "../middlewares/databases/databaseErrorHelper.mjs";
const userRouter = express.Router();

userRouter.get("/:id",checkUserExcist,getSingleUser)
userRouter.get("/",getAllUsers)
export default userRouter;