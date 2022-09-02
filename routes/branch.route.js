import express from "express";
import {
  getAllBranch,
  getBranch,
  addBranch,
  updateBranch,
  delBranch,
  updateDeptAdd,
  updateDeptDel,
} from "../controllers/branch.controller.js";
const branchRouter = express.Router();

branchRouter.get("/get-branch/", getBranch); // read
branchRouter.get("/get-all-branch/", getAllBranch); //read
branchRouter.post("/add-branch/", addBranch); //create
branchRouter.patch("/update-branch/", updateBranch); // update
branchRouter.delete("/delete-branch/", delBranch); //delete

branchRouter.delete("/branch/update-department/add", updateDeptAdd); //update dept
branchRouter.delete("/branch/update-department/del", updateDeptDel); //del dept
branchRouter.delete("/branch/update-department", delBranch); //add dept

export default branchRouter;
