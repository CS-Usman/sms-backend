import express from "express";
import { getAllBranch,getBranch,addBranch,updateBranch,delBranch } from "../controllers/branch.controller.js";
const branchRouter = express.Router();

branchRouter.get("/get-branch/:contact",getBranch);// read
branchRouter.get("/get-branch/",getAllBranch);//read
branchRouter.post("/add-branch/:name/:contact/*",addBranch); //create
branchRouter.patch("/update-branch/:contact/:property/:val",updateBranch); // update
branchRouter.delete("/delete-branch/:contact",delBranch);//delete

export default branchRouter;