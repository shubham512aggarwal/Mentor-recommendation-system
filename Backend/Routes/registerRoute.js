const express = require("express");
const bcrypt = require("bcryptjs");
const student = require("../models/student");

const Router = express.Router();

Router.post("/register", async (req, res) => {
    try {
      const { name, email, password, institute, course, major, rollNumber, gender, dob } = req.body;
      // Check if email or roll number already exists
      const existingStudent = await student.findOne({ $or: [{ email }, { rollNumber }] });
      if (existingStudent) {
        return res.status(400).json({ message: "Email or Roll Number already exists" });
      }
  
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create new student
      const newStudent = new student({
        name,
        email,
        password: hashedPassword,
        institute,
        course,
        major,
        rollNumber,
        gender,
        dob,
      });
  
      // Save to DB
      await newStudent.save();
  
      res.status(201).json({ message: "Student registered successfully" });
    } catch (error) {
      console.error("Registration Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  module.exports = Router;