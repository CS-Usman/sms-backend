import express from "express";
import { addCourse,getCourse,getAllCourse,updateCourse,delCourse } from "../controllers/course.controller.js";
const courseRouter = express.Router();

courseRouter.get("/get-courses/",getAllCourse);
courseRouter.get("/get-course/:courseName",getCourse);
courseRouter.post("/add-course/:deptName/:course",addCourse);
courseRouter.patch("/update-course/:courseName/:property/:val",updateCourse);
courseRouter.delete("/delete-course/:courseName",delCourse);

export default courseRouter;