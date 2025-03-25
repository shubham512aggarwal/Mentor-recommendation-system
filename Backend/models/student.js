const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  institute: { type: String, required: true },
  course: { type: String, required: true },
  major: { type: String, required: true },
  rollNumber: { type: String, required: true, unique: true },
  gender: { type: String, enum: ["Male", "Female"], required: true },
  dob: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Student", studentSchema);
