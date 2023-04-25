import express from "express";
import { getAllUsers, getSingleUser } from "../controllers/user.mjs";
import { checkUserExcist } from "../middlewares/databases/databaseErrorHelper.mjs";
import { userQueryMidleware } from "../middlewares/query/userQueryMiddleware.mjs";
import User from "../models/User.mjs";
const userRouter = express.Router();

userRouter.get("/:id",checkUserExcist,getSingleUser)
userRouter.get("/",userQueryMidleware(User),getAllUsers)
export default userRouter;