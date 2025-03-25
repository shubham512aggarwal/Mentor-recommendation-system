import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
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

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">Mentor Recommendation</div>
        <div className="navbar-right">
          <button className="btn add-project" onClick={() => alert("Add Project Clicked")}>Add Project</button>
          <button className="btn logout" onClick={handleLogout}>Logout</button>
        </div>
      </nav>
    </>
  );
};

export default Home;
