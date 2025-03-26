import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const [projects, setProjects] = useState([]);

  const fetchProjects = async() =>{
    try{
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/students/getProjects", {
        headers: {Authorization: `Bearer ${token}`}
      });
      setProjects(response.data.projects);
      console.log(" Hi ", response.data);
    }
    catch(error){
      console.log("Error in fetching projects!", error);
    }
  }

  useEffect(()=>{
    fetchProjects();
  }, []);

  const navigate = useNavigate();

  const handleLogout = async() => {
    try{
      await axios.post("http://localhost:5000/api/students/logout")
      localStorage.removeItem("token");
      navigate("/login"); // Redirect to login page
    }
    catch(error){
      console.log("Error occured in logging out the user.", error);
    }
  };

  const demoprojects = [
    {
      id: 1,
      name: "AI Chatbot",
      idea: "A chatbot that uses NLP to answer queries.",
      techStack: ["Python", "TensorFlow"],
      mentor: "Dr. Smith",
      status: "inprogress",
    },
    {
      id: 2,
      name: "E-commerce App",
      idea: "A full-stack app for online shopping.",
      techStack: ["React", "Node.js", "MongoDB"],
      mentor: "Prof. Johnson",
      status: "submitted",
    },
    {
      id: 3,
      name: "Blockchain Voting",
      idea: "A secure voting system using blockchain.",
      techStack: ["Solidity", "Ethereum"],
      mentor: "Ms. Brown",
      status: "ideation",
    },
  ];

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">Mentor Recommendation</div>
        <div className="navbar-right">
          <button className="btn add-project" onClick={() => navigate("/AddProject")}>Add Project</button>
          <button className="btn logout" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <div className="mt-6 overflow-x-auto">
      <table className="projects-table">
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Project Idea</th>
            <th>Tech Stack</th>
            <th>Assigned Mentor</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project._id}>
              <td>{project.student.name}</td>
              <td>{project.project_idea}</td>
              <td>{project.tech_stack.join(", ")}</td>
              <td></td>
              <td>
                {/* <span className={`status ${project.status}`}>{project.status}</span> */}
              </td>
              <td className="action-icons">
                <FaEdit className="icon edit-icon" />
                <FaTrash className="icon delete-icon" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </>
  );
};

export default Home;
