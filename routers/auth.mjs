import express from "express";
import { getUser, imageUpload, logaut, login, register} from "../controllers/auth.mjs";
import { getAccessToRoute } from "../middlewares/authorization/auth.mjs";
import { profileImageUpload } from "../middlewares/libraries/profileImageUpload.mjs";

const authRouter = express.Router();
authRouter.post("/register",register);
authRouter.post("/login",login);
authRouter.get("/error");
authRouter.get("/profile",getAccessToRoute,getUser);
authRouter.get("/logaut",getAccessToRoute,logaut);
authRouter.post("/upload",[getAccessToRoute,profileImageUpload.single("profile_image")],imageUpload);

export default authRouter;