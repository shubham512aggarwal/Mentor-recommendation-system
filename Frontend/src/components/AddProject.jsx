import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const AddProject = () => {
    const [studentData, setStudentData] = useState({
        name: "",
        college: "",
        major: "",
        course: "",
        rollNumber: ""
    });

    const navigate = useNavigate();

    const [projectData, setProjectData] = useState({
        project_name: "",
        project_idea: "",
        tech_stack: [] 
    });

    const [techStackInput, setTechStackInput] = useState("");

    const getStudentDetails = async(token) => {
        try{
            const response = await axios.get("http://localhost:5000/api/students/getStudentDetails", {
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data;
        }
        catch(error){
            console.log("Getting error while fetching student data!", error);
            return null;
        }
    }

    useEffect(()=>{
        const fetchStudentData = async() =>{
            try{
                const token = localStorage.getItem("token");
                const response = await getStudentDetails(token);
                if(response){
                    console.log(response)
                    setStudentData({
                        name: response.name,
                        college: response.institute,
                        major: response.major,
                        course: response.course,
                        rollNumber: response.rollNumber
                    });
                }

            }
            catch(error){
                console.log("Error in fetching logged in student data", error);
            }
        }
        fetchStudentData();
    },[]);

    const handleChange = (e) =>{
        setProjectData({...projectData, [e.target.name]: e.target.value});
    };

    const handleTechStackAdd = () => {
        if (techStackInput.trim()) {
            const newTech = techStackInput.trim().toLowerCase(); // Convert input to lowercase
    
            if (!projectData.tech_stack.some(tech => tech.toLowerCase() === newTech)) {
                setProjectData({
                    ...projectData,
                    tech_stack: [...projectData.tech_stack, techStackInput.trim()]
                });
            }
    
            setTechStackInput("");
        }
    };

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
            const token = localStorage.getItem("token");
            const response = await axios.post("http://localhost:5000/api/students/addNewProject",
                {...studentData, ...projectData},
                {headers: {Authorization: `Bearer ${token}`}}
            );

            console.log("Project added successfully", response.data);
            setProjectData({project_name:"", project_idea: "", tech_stack: []});
            navigate("/home");
        }
        catch(error){
            console.log("Error in submitting project form", error);
        }
    }

    return(
        <div className="container">
            <h2>Add Project</h2>
            <form onSubmit={handleSubmit}>
                {/* Pre-filled Student Fields */}
                <input type="text" value={studentData.name} disabled className="input-field" />
                <input type="text" value={studentData.college} disabled className="input-field" />
                <input type="text" value={studentData.course} disabled className="input-field" />
                <input type="text" value={studentData.major} disabled className="input-field" />

                {/* Project Fields */}
                <input
                type="text"
                name="project_name"
                placeholder="Project Name"
                className="input-field"
                value={projectData.project_name}
                onChange={handleChange}
                required
                />

                <textarea
                name="project_idea"
                placeholder="Project Idea"
                className="input-field"
                value={projectData.project_idea}
                onChange={handleChange}
                required
                />

                {/* Tech Stack (Array Input) */}
                <div>
                    <input
                        type="text"
                        placeholder="Tech Stack (e.g., React, Python)"
                        className="input-field"
                        value={techStackInput}
                        onChange={(e) => setTechStackInput(e.target.value)}
                    />                    

                    {/* Display Tech Stack List */}
                    <ul style={{ listStyleType: "none", padding:"0px", overflow:"overlay", display:"flex"}}>
                    {projectData.tech_stack.map((tech, index) => (
                        <li key={index} className="tech_stack_item">{tech}</li>
                    ))}
                    </ul>

                    <button type="button" onClick={handleTechStackAdd} className="btn" style={{marginBottom: "10px"}}>
                        Add Tech
                    </button>
                </div>
                <button type="submit" className="btn">Submit Project</button>
            </form>
        </div>
    )
}

export default AddProject;