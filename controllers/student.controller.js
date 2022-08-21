import Student from "../models/student.model.js";
import Course from "../models/course.model.js";

let loginStatus = false;

export const loginAccount = async (req,res)=>{
    const rollNo = String(req.params.rollNo);
    const password = String(req.params.password);
    try{
        loginChecked = await Student.find({studentRollNo:rollNo,studentPassword:password});
        if(loginChecked){
            loginStatus = true;
            res.send("Account logged in");
        }
        else{
            res.send("Incorrect credentials");
        }
    }catch(err){
        console.log(err);
    }
}

export const registerAccount = async (req,res)=>{
    const hobbies  = String(req.params[0]);
    const hobbiesWithSign = hobbies.split(/[/:]/);
    let hobbiesArr = hobbiesWithSign.filter(e => e);

    const studentObj = new Student({
        studentName : String(req.params.name),
        studentPassword : String(req.params.password),
        studentRollNo : String(req.params.rollNo),
        studentAge : String(req.params.age),
        studentDepartment : String(req.params.dept),
        studentAddress : String(req.params.address),
        studentContact : String(req.params.contact),
        hobby : hobbiesArr
    })
    
    try{
        await studentObj.save();
        let courses = await Course.find({departmentName:String(req.params.dept)})
        courses.forEach((course)=>{
            Student.findOneAndUpdate({studentRollNo:String(req.params.rollNo)},{$push:{courses:course}})
        })
        res.send("Account Registered");
    }
    catch(err){
        console.log(err);
        return;
    }
}

export const getAccountInfo = async (req,res)=>{
    const rollNo = String(req.params.rollNo);
    if(loginStatus){
        try{
            const studentInfo = await Student.find({studentRollNo:rollNo});
            studentInfo ? res.send(studentInfo) :res.send("User record in not in database");
        }
        catch(err){
            console.log(err);
            return;
        }
    }
    else{
        res.send("Not logged in");
    }   
}

export const updateAccount = async (req,res)=>{
    const rollNo= String(req.params.rollNo);
    const changedProperty = String(req.params.property);
    const newValue = String(req.params.value)
    if(loginStatus){
        if(changedProperty === "hobby" || 
            changedProperty === "studentAddress" || 
            changedProperty === "studentContact" || 
            changedProperty === "studentPassword")
            {
            const studentInfo = await Student.findOneAndUpdate({studentRollNo:rollNo},{changedProperty:newValue})
            res.send(studentInfo);
        }
        else{
            res.send("Cannot update read only value")
        }
    }
    else{
        res.send("Not logged in");
    }

}

export const studentLogout = async(req,res)=>{
    loginStatus = false;
    res.send("Student logout")
}