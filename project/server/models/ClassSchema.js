const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  roomNumber: {
    type: String,
    required: true,
    trim: true,
  },
  timeFrom: {
    type: String,
    required: true,
    trim: true,
  },
  timeTo: {
    type: String,
    required: true,
    trim: true,
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
});

const Class = mongoose.model("Classes", classSchema);

module.exports = Class;
