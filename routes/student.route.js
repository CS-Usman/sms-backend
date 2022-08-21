import express from "express";
import {loginAccount,registerAccount,getAccountInfo,updateAccount} from "../controllers/student.controller.js"
const studentRouter = express.Router();

studentRouter.get("/login-account/:rollNo/:password",loginAccount);
studentRouter.post("/register-account/:name/:password/:rollNo/:age/:dept/:address/:contact/*",registerAccount);
studentRouter.get("/account-info/:rollNo",getAccountInfo);
studentRouter.patch("/account-update/:rollNo/:property/:value",updateAccount);
studentRouter.get("/logout/:rollNo",loginAccount);

export default studentRouter;