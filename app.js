import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import studentRouter from "./routes/student.route.js";
import courseRouter from "./routes/course.route.js";
import branchRouter from "./routes/branch.route.js";
import infoRouter from "./routes/info.route.js";
import adminRouter from "./routes/admin.route.js";

const app = express();
const PORT = process.env.PORT;
const dbUrl = process.env.URL;

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl);
  } catch (err) {
    console.log("Failed to connect DB", err);
  }
};

connectDB().then(() => {
  console.log("Mongo DB connected successfully");
});

app.get("/", (req, res) => {
  res.send("Student Home page");
});
app.use(express.urlencoded({ extended: true }));

app.use("/student", studentRouter);
app.use("/courses", courseRouter);
app.use("/branch", branchRouter);
app.use("/info", infoRouter);
app.use("/admin", adminRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
