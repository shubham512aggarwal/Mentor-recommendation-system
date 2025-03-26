const express = require("express");
const Project = require("../models/project");
const authmiddleware = require("../middlewares/auth");

const router = express.Router();

router.get("/getProjects", authmiddleware, async(req, res) =>{
    try{
        const rollnumber = req.user.rollNumber;
        if (!rollnumber) {
            return res.status(400).json({ message: "Invalid request. Roll number is missing from token." });
        }
        const projects = await Project.find({"student.rollNumber": rollnumber});
        res.status(200).json({ success: true, projects });
    }
    catch(error){
        console.log("Error in fetch project api! ", error);
        res.status(500).json({message: "Error in fetch project api!"});
    }
});

module.exports = router;