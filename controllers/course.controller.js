import Course from "../models/course.model.js";
import { adminStatus } from "./admin.controller.js";

export const addCourse = async (req, res) => {
  const courseObj = req.body;
  if (adminStatus) {
    try {
      let courseInfo = await Course.create(courseObj);
      res.send(courseInfo);
    } catch (err) {
      console.log(err);
    }
  } else {
    res.send("Admin not logged in");
  }
};
export const getCourse = async (req, res) => {
  const name = req.query.deptName;
  try {
    let courseInfo = await Course.findOne({ departmentName: name });
    res.send(courseInfo);
  } catch (err) {
    console.log(err);
  }
};

export const getAllCourses = async (req, res) => {
  try {
    let courseInfo = await Course.find({});
    res.send(courseInfo);
  } catch (err) {
    console.log(err);
  }
};

export const updateCourseAdd = async (req, res) => {
  const deptName = req.query.dept;
  const course = req.body.course;

  if (adminStatus) {
    try {
      let courseInfo = await Course.findOneAndUpdate(
        { departmentName: deptName },
        { $push: { coursesName: course } },
        { new: true }
      );
      res.send(courseInfo);
    } catch (err) {
      console.log(err);
    }
  } else {
    res.send("admin user not logged in");
  }
};

export const updateCourseDel = async (req, res) => {
  const deptName = req.query.dept;
  const course = req.body.course;

  if (adminStatus) {
    try {
      let courseInfo = await Course.findOneAndUpdate(
        { departmentName: deptName },
        { $pull: { coursesName: course } },
        { new: true }
      );
      res.send(courseInfo);
    } catch (err) {
      console.log(err);
    }
  } else {
    res.send("admin user not logged in");
  }
};

export const updateCourse = async (req, res) => {
  const deptName = req.query.dept;
  const courseOldValue = req.body.courseOld;
  const courseNewValue = req.body.courseNew;

  if (adminStatus) {
    try {
      const courseInfo = await Course.find({ departmentName: deptName });
      let updateArray = courseInfo[0].coursesName;
      console.log(updateArray);
      const index = updateArray.indexOf(courseOldValue);
      console.log(index);
      updateArray[index] = courseNewValue;
      const updatedCourses = await Course.findOneAndUpdate(
        { departmentName: deptName },
        { coursesName: updateArray },
        { new: true }
      );
      res.send(updatedCourses);
    } catch (err) {
      console.log(err);
    }
  } else {
    res.send("admin user not logged in");
  }
};

export const delCourse = async (req, res) => {
  const deptName = req.query.deptName;

  if (adminStatus) {
    try {
      let courseInfo = await Course.findOneAndDelete({
        departmentName: deptName,
      });
      res.send(courseInfo);
    } catch (err) {
      console.log(err);
    }
  } else {
    res.send("admin user not logged in");
  }
};
