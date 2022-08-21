import mongoose from "mongoose";

const branchSchema = mongoose.Schema({
    branchName:{type :String,required: true},
    branchContact:{type:String,unique:true},
    departments:[{type:String,required:true}]
},{timestamps:true})

const Branch = mongoose.model("Branch",branchSchema);

export default Branch;