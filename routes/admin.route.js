import express from "express";
import { adminLogin,createAdmin,forgotPassword, logOutAdmin } from "../controllers/admin.controller.js";
const adminRouter = express.Router();

adminRouter.post("/create-admin/",createAdmin);
adminRouter.get("/login/:username/:newPassword",adminLogin);
adminRouter.patch("/change-password/:username/:newPassword",forgotPassword);
adminRouter.get("/logout",logOutAdmin);

export default adminRouter;