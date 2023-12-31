const mongoose = require("mongoose");
require("dotenv").config();

// Create a Mongoose schema
const verificationTokenSchema = new mongoose.Schema({
  //   userId: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Student",
  //     required: true,
  //   },
  token: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    expires: 3600,
    default: Date.now(),
  },
});

// Create a model from the schema
const VerificationToken = mongoose.model(
  "VerificationToken",
  verificationTokenSchema
);

// Export the VerificationToken model
module.exports = VerificationToken;
