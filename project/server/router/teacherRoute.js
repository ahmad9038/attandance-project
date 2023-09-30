const express = require("express");
const router = express.Router();
const Teachers = require("../models/TeacherSchema");

router.get("/teachers", async (req, res) => {
  try {
    const teachers = await Teachers.find({});
    res.send(teachers);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
