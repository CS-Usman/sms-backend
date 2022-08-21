import mongoose from "mongoose";

const studentSchema = mongoose.Schema({

    studentName:{type :String,required: true},
    studentPassword:{type :String,required: true},
    studentRollNo:{type :String,required: true,unique:true},
    studentAge:{type :String,required: true},
    studentAddress:{type :String,required: true},
    studentContact:{type :String,required: true},
    studentDepartment:{type :String,required: true},
    courses:[{type:String}],
    hobby:[{type:String}]
    
},{timestamps:true})

const Student = mongoose.model("Student",studentSchema);

export default Student;