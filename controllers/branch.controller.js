import Branch from "../models/branch.model.js";
import { adminStatus } from "./admin.controller.js";

export const addBranch = async (req, res) => {
  const branchObj = req.body;

  if (adminStatus) {
    try {
      let branchInfo = await Branch.create(branchObj);
      res.send(branchInfo);
    } catch (err) {
      console.log(err);
    }
  } else {
    res.send("Admin not logged in");
  }
};

export const getAllBranch = async (req, res) => {
  try {
    let branchInfo = await Branch.find({});
    res.send(branchInfo);
  } catch (err) {
    console.log(err);
  }
};

export const getBranch = async (req, res) => {
  const brCntct = req.query.contact;
  try {
    let branchInfo = await Branch.findOne({ branchContact: brCntct });
    res.send(branchInfo);
  } catch (err) {
    console.log(err);
  }
};

export const updateBranch = async (req, res) => {
  const brCntct = req.query.contact;
  const name = req.body.name;

  if (adminStatus) {
    try {
      let branchInfo = await Branch.findOneAndUpdate(
        { branchContact: brCntct },
        { branchName: name },
        { new: true }
      );
      res.send(branchInfo);
    } catch (err) {
      console.log(err);
    }
  } else {
    res.send("admin user not logged in");
  }
};

export const updateDeptAdd = async (req, res) => {
  const brCntct = req.query.contact;
  const dept = req.body.dept;

  if (adminStatus) {
    try {
      let branchInfo = await Branch.findOneAndUpdate(
        { branchContact: brCntct },
        { $push: { departments: dept } },
        { new: true }
      );
      res.send(branchInfo);
    } catch (err) {
      console.log(err);
    }
  } else {
    res.send("admin user not logged in");
  }
};

export const updateDeptDel = async (req, res) => {
  const brCntct = req.query.contact;
  const dept = req.body.dept;

  if (adminStatus) {
    try {
      let branchInfo = await Branch.findOneAndUpdate(
        { branchContact: brCntct },
        { $pull: { departments: dept } },
        { new: true }
      );
      res.send(branchInfo);
    } catch (err) {
      console.log(err);
    }
  } else {
    res.send("admin user not logged in");
  }
};

export const updateDept = async (req, res) => {
  const brCntct = req.query.contact;
  const deptOld = req.body.deptOld;
  const deptNew = req.body.deptNew;

  if (adminStatus) {
    try {
      const branchInfo = await Branch.find({ branchContact: brCntct });
      let updateArray = branchInfo.departments;
      const index = updateArray.indexOf(deptOld);
      updateArray[index] = deptNew;
      const updatedDept = await Branch.findOneAndUpdate(
        { branchContact: brCntct },
        { departments: updateArray },
        { new: true }
      );
      res.send(updatedDept);
    } catch (err) {
      console.log(err);
    }
  } else {
    res.send("admin user not logged in");
  }
};

export const delBranch = async (req, res) => {
  const brCntct = req.query.contact;

  if (adminStatus) {
    try {
      let branchInfo = await Branch.findOneAndDelete({
        branchContact: brCntct,
      });
      res.send(branchInfo);
    } catch (err) {
      console.log(err);
    }
  } else {
    res.send("admin use not logged in");
  }
};
