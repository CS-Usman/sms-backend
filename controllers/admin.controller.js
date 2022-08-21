import Admin from "../models/admin.model.js";


export let adminStatus = false;

export const createAdmin = async(req,res)=>{
    const adminObj = new Admin({
        username:"admin",
        password:"admin123"
    });

    adminObj.save();
    res.send("Admin user created");
}
export const adminLogin = async(req,res)=>{
    const adminName = String(req.params.user);
    const adminPassword = String(req.params.password);
    try{
        let status = await Admin.find({username:adminName.slice(1),password:adminPassword.slice(1)});
        if(status){
            adminStatus = true;
            res.send("Admin user logged in");
        }
        else{
            res.send("Wrong password");
        }
    }catch(err){
        console.log(err);
    }
}
export const logOutAdmin = async(req,res)=>{
    adminStatus =  false;
    res.send("Admin logout")
}

export const forgotPassword = async(req,res)=>{
    const name = String(req.params.username);
    const newPassword = String(req.params.newPassword);

    try{
        let adminUser = await Admin.findOne({username:name.slice(1)});
        if(adminUser){
            adminUser.password = newPassword;
        }else{
            res.send("admin not found");
        }
        res.send(adminUser);
    }catch(err){
        console.log(err);
    }
}