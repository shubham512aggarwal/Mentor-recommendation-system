const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/student");
const session = require("express-session");

const router = express.Router();
router.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie:{maxage:15*60*1000}
  })
);

// Login API
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find student by email or roll number
    const student = await Student.findOne({ 
      $or: [{ email: username }, { rollNumber: username }] 
    });

    if (!student) {
      return res.status(400).json({ message: "Invalid email/roll number or password" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email/roll number or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: student._id, email: student.email, rollNumber: student.rollNumber },
      process.env.SECRET_KEY,
      { expiresIn: "15m" }
    );

    req.session.user = {id: student._id, email: student.email};
    req.session.token = token;

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const authenticateUser = (req, res, next) =>{
  if(!req.session.user){
    return res.status(401).json({message: "Session expired. Please login again."});
  }
  next();
};

router.get("/refresh-token",authenticateUser, (req, res) =>{
  req.session._garbage = Date(),
  req.session.touch();
  req.json({message: "Session refreshed"})
});

router.post("/logout", (req, res)=>{
  req.session.destroy((err) =>{
    if(err){
      return res.status(500).json({message: "Error in loggin out the user."})
    }
    res.status(200).json({message: "Logged out successfully!"});
  })
});

module.exports = router;
