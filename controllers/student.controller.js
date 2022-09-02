import Student from "../models/student.model.js";
import Course from "../models/course.model.js";

const loginStatusCheck = async (studentNo) => {
  try {
    const check = await Student.find({
      studentRollNo: studentNo,
      loginStatus: true,
    });
    if (typeof check !== "undefined" && check.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

export const loginAccount = async (req, res) => {
  const rollNo = req.body.rollNo;
  const password = req.body.password;
  try {
    const studentInfo = await Student.findOneAndUpdate(
      { studentRollNo: rollNo, studentPassword: password },
      { loginStatus: true }
    );
    if (typeof studentInfo !== "undefined" && studentInfo.length > 0) {
      res.send("User logged in");
    } else {
      res.send("Not logged in");
    }
  } catch (err) {
    console.log(err);
  }
};

export const registerAccount = async (req, res) => {
  const studentObj = req.body;
  const dept = req.body.studentDepartment;
  const rollNo = req.body.studentRollNo;

  try {
    const studentInfo = await Student.create(studentObj);
    const coursesInfo = await Course.find({ departmentName: dept });
    console.log(coursesInfo);
    const assignCourses = await Student.findOneAndUpdate(
      { studentRollNo: rollNo },
      { courses: coursesInfo[0].coursesName }
    );
    if (
      studentInfo.length > 0 &&
      typeof studentInfo !== "undefined" &&
      assignCourses.length > 0 &&
      typeof assignCourses !== "undefined"
    ) {
      res.send("Account Registered");
    } else {
      res.send("Cannot registered");
    }
  } catch (err) {
    console.log(err);
    return;
  }
};

export const getAccountInfo = async (req, res) => {
  const rollNo = req.query.rollNo;
  const loginStatus = loginStatusCheck(rollNo);
  if (loginStatus) {
    try {
      const studentInfo = await Student.find({ studentRollNo: rollNo });
      studentInfo
        ? res.send(studentInfo)
        : res.send("User record in not in database");
    } catch (err) {
      console.log(err);
      return;
    }
  } else {
    res.send("Not logged in");
  }
};

export const updateAccount = async (req, res) => {
  const rollNo = req.query.rollNo;
  const changedProperty = req.body.property;
  const newValue = req.body.value;
  const loginStatus = loginStatusCheck(rollNo);
  if (loginStatus) {
    if (
      changedProperty === "hobby" ||
      changedProperty === "studentAddress" ||
      changedProperty === "studentContact" ||
      changedProperty === "studentPassword"
    ) {
      const studentInfo = await Student.findOneAndUpdate(
        { studentRollNo: rollNo },
        { changedProperty: newValue },
        { new: true }
      );
      res.send(studentInfo);
    } else {
      res.send("Cannot update read only value");
    }
  } else {
    res.send("Not logged in");
  }
};

export const studentLogout = async (req, res) => {
  loginStatus = false;
  res.send("Student logout");
};
