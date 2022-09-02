import express from "express";
import {
  adminLogin,
  createAdmin,
  forgotPassword,
  logOutAdmin,
} from "../controllers/admin.controller.js";
const adminRouter = express.Router();

adminRouter.post("/create-admin/", createAdmin);
adminRouter.post("/login/", adminLogin);
adminRouter.patch("/change-password/", forgotPassword);
adminRouter.post("/logout", logOutAdmin);

export default adminRouter;
