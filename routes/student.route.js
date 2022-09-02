import express from "express";
import {
  loginAccount,
  registerAccount,
  getAccountInfo,
  updateAccount,
} from "../controllers/student.controller.js";
const studentRouter = express.Router();

studentRouter.get("/login-account/", loginAccount);
studentRouter.post("/register-account/", registerAccount);
studentRouter.get("/account-info/", getAccountInfo);
studentRouter.patch("/account-update/", updateAccount);
studentRouter.get("/logout/", loginAccount);

export default studentRouter;
