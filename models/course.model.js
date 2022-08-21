import mongoose from "mongoose";

const coursesSchema = mongoose.Schema({
    departmentName:{type :String,required: true,unique:true},
    courseName:{type:String,required:true,unique:true}
},{timestamps:true})

const Course = mongoose.model("Courses",coursesSchema);

export default Course;