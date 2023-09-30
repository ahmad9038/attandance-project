const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  rollNo: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  semester: {
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
  phone: {
    type: String,
    required: true,
  },
  registeredAt: {
    type: Date,
    default: Date.now,
  },
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
