import express from"express";
import { getAccessToRoute, getAdminAccess } from "../middlewares/authorization/auth.mjs";
import { blockUser, deleteUser } from "../controllers/admin.mjs";
import { checkUserExcist } from "../middlewares/databases/databaseErrorHelper.mjs";


const adminRouter = express.Router();
adminRouter.use([getAccessToRoute,getAdminAccess]);
adminRouter.get("/block/:id",checkUserExcist,blockUser)
adminRouter.get("/delete/:id",checkUserExcist,deleteUser)
export default adminRouter;