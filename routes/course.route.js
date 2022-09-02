import express from "express";
import {
  addCourse,
  getCourse,
  getAllCourses,
  updateCourseAdd,
  updateCourseDel,
  updateCourse,
  delCourse,
} from "../controllers/course.controller.js";
const courseRouter = express.Router();

courseRouter.get("/get-courses/", getAllCourses);
courseRouter.get("/get-course/", getCourse);
courseRouter.post("/add-course/", addCourse);
courseRouter.patch("/update-course/edit/add-course", updateCourseAdd);
courseRouter.patch("/update-course/edit/del-course", updateCourseDel);
courseRouter.patch("/update-course/edit/update-course", updateCourse);
courseRouter.delete("/delete-course/", delCourse);

export default courseRouter;
