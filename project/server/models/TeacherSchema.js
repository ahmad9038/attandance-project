const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Teacher = mongoose.model("teacher", teacherSchema);
module.exports = Teacher;
