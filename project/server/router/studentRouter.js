const express = require("express");
const router = express.Router();
const Students = require("../models/studentSchema");

router.get("/students", async (req, res) => {
  try {
    const students = await Students.find({});
    res.send(students);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
