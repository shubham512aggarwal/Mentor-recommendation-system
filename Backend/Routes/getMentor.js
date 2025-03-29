const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/getMentor", async (req, res) => {
    try {
        const { project_name, project_idea, tech_stack } = req.body;
        if (!project_name || !project_idea || tech_stack.length === 0) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const response = await axios.post(process.env.PYTHON_API_URL, {
            project_name,
            project_idea,
            tech_stack
        });
        return res.status(200).json(response.data);
    } 
    catch (error) {
        console.error("Error fetching mentor recommendations:", error);
        return res.status(500).json({ message: "Error in mentor recommendation", error: error });
    }
});

module.exports = router;
