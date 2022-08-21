import Branch from "../models/branch.model.js";
import Admin from "../models/admin.model.js";
import {adminStatus}  from "./admin.controller.js";

export const addBranch = async(req,res)=>{
    const dept = String(req.params[0]);
    let deptArrWithSigns = dept.split(/[/:]/);
    let deptArr = deptArrWithSigns.filter(e => e);
    
    // console.log(deptArr);
    const branchObj = new Branch({
        branchName : String(req.params.name),
        branchContact :String(req.params.contact),
        departments : deptArr
    });

    if(adminStatus){
        try{
            await branchObj.save();
            res.send("Branch added");
        }catch(err){
            console.log(err);
        }
    }
    else{
        res.send("Admin not logged in");
    }
}

export const getAllBranch = async(req,res)=>{
    try{
        let branchInfo = await Branch.find({});
        res.send(branchInfo);
    }catch(err){
        console.log(err);
    }   
    
}

export const getBranch = async(req,res)=>{
    const brCntct = String(req.params.contact);
    try{
        let branchInfo = await Branch.findOne({branchContact : brCntct})
        res.send(branchInfo);
    }catch(err){
        console.log(err);
    }   
}

export const updateBranch = async(req,res)=>{
    const brCntct = String(req.params.contact);
    let property = String(req.params.property).slice(1);
    const value = String(req.params.val);

    // console.log(changeProperty);

    if(adminStatus){
        try{
            let branchInfo = await Branch.findOneAndUpdate({branchContact : brCntct},{ property: "value"},{new:true});
            res.send(branchInfo);
            // console.log(branchInfo);
        }catch(err){
            console.log(err);
        }   
    }else{
        res.send("admin user not logged in");
    }

}

export const delBranch = async(req,res)=>{
    const brCntct = String(req.params.contact);

    if(adminStatus){
        try{
            let branchInfo = await Branch.findOneAndDelete({branchContact : brCntct})
            res.send(branchInfo);
        }catch(err){
            console.log(err);
        }   
    }else{
        res.send("admin use not logged in");
    }
}
