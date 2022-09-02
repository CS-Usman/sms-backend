import Admin from "../models/admin.model.js";

export let adminStatus = true;

export const createAdmin = async (req, res) => {
  const adminObj = req.body;
  let adminData = await Admin.create(adminObj);
  res.send(adminData);
};
export const adminLogin = async (req, res) => {
  const adminName = req.body.name;
  const adminPassword = req.body.password;
  console.log(adminPassword);
  try {
    let status = await Admin.find({
      username: adminName,
      password: adminPassword,
    });
    if (typeof status !== "undefined" && status.length > 0) {
      adminStatus = true;
      res.send("Admin user logged in");
    } else {
      res.send("Wrong credentials");
    }
  } catch (err) {
    console.log(err);
  }
};
export const logOutAdmin = async (req, res) => {
  const adminName = req.body.name;
  const adminPassword = req.body.password;
  try {
    let status = await Admin.find({
      username: adminName,
      password: adminPassword,
    });
    if (adminStatus) {
      if (typeof status !== "undefined" && status.length > 0) {
        adminStatus = false;
        res.send("Admin user logged out");
      } else {
        res.send("Wrong credentials");
      }
    } else {
      res.send("Admin not logged in");
    }
  } catch (err) {
    console.log(err);
  }
};

export const forgotPassword = async (req, res) => {
  const adminName = req.body.name;
  const adminNewPassword = req.body.newPassword;

  try {
    let adminUser = await Admin.findOneAndUpdate(
      { username: adminName },
      { password: adminNewPassword },
      { new: true }
    );
    adminUser ? res.send(adminUser) : res.send("admin not found");
  } catch (err) {
    console.log(err);
  }
};
