const express = require("express");
const projectSchema = require("../models/project")


const router = express.Router();

router.post("/addNewProject", async(req, res) => {
    try{
        const { name, college, major, course, rollNumber, project_name, project_idea, tech_stack } = req.body;
        console.log(req.body)
        if (!name || !college || !major || !course || !rollNumber || !project_name || !project_idea || tech_stack.length === 0) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newProject = new projectSchema({
            student: { name, institute: college, major, course, rollNumber },
            project_name,
            project_idea,
            tech_stack
        });

        await newProject.save();
        res.status(200).json({message: "Project added successfully!", project: newProject});
    }
    catch(error){
        console.log("Error in adding new project!", error);
        res.status(500).json({message: "Error in saving new project! ", error});
    }
});

module.exports = router; 