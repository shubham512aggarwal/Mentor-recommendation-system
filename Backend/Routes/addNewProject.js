const express = require("express");
const projectSchema = require("../models/project")


const router = express.Router();

router.post("/addNewProject", async(req, res) => {
    try{
        const { _id, name, college, major, course, rollNumber, project_name, project_idea, tech_stack } = req.body;
        if (!name || !college || !major || !course || !rollNumber || !project_name || !project_idea || tech_stack.length === 0) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if(_id){
            const updateProject = await projectSchema.findByIdAndUpdate(_id, {
                student: {name, institute: college, major, course, rollNumber},
                project_name,
                project_idea,
                tech_stack
            },
            {new : true}
            );

            if(!updateProject)
                return res.status(401).json({message: "Project not found"});
            return res.status(200).json({message: "Project updated successfully", project: updateProject})
        }
        else{
            const newProject = new projectSchema({
                student: { name, institute: college, major, course, rollNumber },
                project_name,
                project_idea,
                tech_stack
            });
    
            await newProject.save();
            res.status(200).json({message: "Project added successfully!", project: newProject});
        }

    }
    catch(error){
        console.log("Error in adding new project!", error);
        res.status(500).json({message: "Error in saving new project! ", error});
    }
});

router.delete("/delete/:id", async (req, res) => {
    try {
        const projectId = req.params.id;
        const deleted = await projectSchema.findByIdAndDelete(projectId);
        if (!deleted) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.status(200).json({ message: "Project deleted successfully!" });
    } catch (error) {
        console.log("Error in deleting project!", error);
        res.status(500).json({ message: "Error deleting project", error });
    }
});

module.exports = router; 