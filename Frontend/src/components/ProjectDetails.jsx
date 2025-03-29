import { useLocation, useNavigate } from "react-router-dom";
import "./deleteProject.css"
import { useState } from "react";


const ProjectDetails = () => {    

    const navigate = useNavigate();
    const location = useLocation();
    const project = location.state?.project;

    const [mentors, setMentors] = useState([]);
    const [showMentors, setShowMentors] = useState(false);

    const getMentorRecommendations = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/students/getMentor", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(project)
            });

            const data = await response.json();
            if (data && response.ok) {
                setMentors(data?.recommended_mentors);
                setShowMentors(true);
            }
            else{
                alert("No mentor found!");
                navigate("/");
            }
        } catch (err) {
            console.error("Error fetching mentors:", err);
        }
    };

    const handleAddMentor = (mentor) => {
        console.log("Adding mentor:", mentor);
        alert(`Mentor ${mentor.name} added successfully!`);
    };


    return(
        <>
            <div className="container" style={{width: "max-Content"}}>
                {!showMentors ? (
                    <div className="card">
                        <h1>{project.project_name}</h1>
                        <p><strong>Idea:</strong> {project.project_idea}</p>
                        <p><strong>Tech Stack:</strong> {project.tech_stack.join(", ")}</p>
                        <h2>Student Details</h2>
                        <p><strong>Name:</strong> {project.student.name}</p>
                        <p><strong>Institute:</strong> {project.student.institute}</p>
                        <p><strong>Course:</strong> {project.student.course}</p>
                        <p><strong>Major:</strong> {project.student.major}</p>
                        <p><strong>Roll Number:</strong> {project.student.rollNumber}</p>
                        <div className="buttons">
                            <button className="primary" onClick={() => getMentorRecommendations()}>Get Mentor</button>
                            <button className="secondary" onClick={() => navigate(-1)}>Back</button>
                        </div>
                        
                    </div>
                ) : (
<div className="mentor-table">
                    <h2>Recommended Mentors</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Qualification</th>
                                <th>Projects Done</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mentors.map((mentor, index) => (
                                <tr key={index}>
                                    <td>{mentor.name}</td>
                                    <td>{mentor.qualification}</td>
                                    <td>{mentor.projects_done}</td>
                                    <td>
                                        <button 
                                            className="btn add-mentor-btn"
                                            onClick={() => handleAddMentor(mentor)}
                                        >
                                            Add Mentor
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                )}
            </div>
        </>
    )
}

export default ProjectDetails;