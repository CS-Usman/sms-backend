import Course from "../models/course.model.js";
import { adminStatus } from "./admin.controller.js";

export const addCourse = async(req,res)=>{
    const courseObj = new Course({
        departmentName : String(req.params.deptName),
        courseName : String(req.params.course)        
    })

    if(adminStatus){
        try{
            await courseObj.save();
            res.send("Course added");
        }catch(err){
            console.log(err);
        }
    }
    else{
        res.send("Admin not logged in");
    }
    

}
export const getCourse = async(req,res)=>{
    const name = String(req.params.courseName);

    try{
        let courseInfo = await Course.findOne({courseName : name});
        res.send(courseInfo);
    }catch(err){
        console.log(err);
    }
}

export const getAllCourse = async(req,res)=>{
    try{
        let courseInfo = await Course.find({});
        res.send(courseInfo);
    }catch(err){
        console.log(err);
    }
}

export const updateCourse = async(req,res)=>{
    const name = String(req.params.courseName);
    const changeProperty = String(req.params.property).slice(1);
    const value = String(req.params.val);

    if(adminStatus){
        try{
            let courseInfo = await Branch.findOneAndUpdate({courseName : name},{changeProperty:val});
            res.send(courseInfo);
        }catch(err){
            console.log(err);
        }   
    }else{
        res.send("admin user not logged in");
    }

}

export const delCourse = async(req,res)=>{
    const name = String(req.params.courseName);

    if(adminStatus){
        try{
            let courseInfo = await Course.findOneAndDelete({courseName : name})
            res.send(courseInfo);
        }catch(err){
            console.log(err);
        }   
    }else{
        res.send("admin use not logged in");
    }
}