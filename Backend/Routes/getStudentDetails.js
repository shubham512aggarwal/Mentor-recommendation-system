const express = require('express');
const Student = require("../models/student");
const authmiddleware = require("../middlewares/auth");

const router = express.Router();

router.get("/getStudentDetails", authmiddleware, async (req, res)=>{
    try{
        const student = await Student.findById(req.user.id).select("-password");
        if(!student){
            return res.status(401).json({message: "Student not found!"});
        }
        res.status(200).json(student);
    }
    catch(error){
        console.log("Error in getting the student details! ", error);
        res.status(500).json({message: "Error in getting the student details!"});
    }
});

module.exports = router;