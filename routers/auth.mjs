import express from "express";
import { editDetails, forgetPassword, getUser, imageUpload, logaut, login, register, resetPassword} from "../controllers/auth.mjs";
import { getAccessToRoute } from "../middlewares/authorization/auth.mjs";
import { profileImageUpload } from "../middlewares/libraries/profileImageUpload.mjs";

const authRouter = express.Router();
authRouter.post("/register",register);
authRouter.post("/login",login);
authRouter.get("/error");
authRouter.get("/profile",getAccessToRoute,getUser);
authRouter.get("/logaut",getAccessToRoute,logaut);
authRouter.post("/upload",[getAccessToRoute,profileImageUpload.single("profile_image")],imageUpload);
authRouter.post("/forgetpassword",forgetPassword);
authRouter.put("/resetpassword",resetPassword);
authRouter.put("/edit",getAccessToRoute,editDetails);


export default authRouter;