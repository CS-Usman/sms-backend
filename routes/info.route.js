import express from "express";
const infoRouter = express.Router();

infoRouter.get("/", (req, res) => {
  res.send("About Us");
});
infoRouter.get("/staff", (req, res) => {
  res.send("About Staff");
});
infoRouter.get("/labs", (req, res) => {
  res.send("About labs");
});
infoRouter.get("/achievements", (req, res) => {
  res.send("About achievements");
});

export default infoRouter;
