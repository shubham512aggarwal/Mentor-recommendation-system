import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DeleteConfirmationModal from "./DeleteProject";

const Home = () => {

  const [projects, setProjects] = useState([]);

  const fetchProjects = async() =>{
    try{
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/students/getProjects", {
        headers: {Authorization: `Bearer ${token}`}
      });
      setProjects(response.data.projects);
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

  const handleEditProject = (project) => {
    navigate("/addProject", { state: { project } });
  };

  const [showModal, setShowModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(projectToDelete._id);
      await axios.delete(`http://localhost:5000/api/students/delete/${projectToDelete._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShowModal(false);
      setProjectToDelete(null);
      fetchProjects(); // Refresh project list
    } catch (error) {
      console.log("Error deleting project", error);
    }
  };

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
              <td>{project.project_name}</td>
              <td>{project.project_idea}</td>
              <td>{project.tech_stack.join(", ")}</td>
              <td>
                {project.mentor ? (
                  <span className="mentor-name">
                    {project.mentor} <FaEdit className="icon edit-icon" />
                  </span>) : (
                  <FaPlus className="icon add-icon" title="Assign Mentor" />)
                }
              </td>
              <td>
                <span className={`status ${project.status}`}>{project.status}</span>
              </td>
              <td className="action-icons">
                <FaEdit className="icon edit-icon" onClick={()=> handleEditProject(project)}/>
                <FaTrash className="icon delete-icon" onClick={() => {setProjectToDelete(project); setShowModal(true);}}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <DeleteConfirmationModal
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setProjectToDelete(null);
        }}
        onDelete={handleDelete}
        projectName={projectToDelete?.project_name}
      />
    </>
  );
};

export default Home;
