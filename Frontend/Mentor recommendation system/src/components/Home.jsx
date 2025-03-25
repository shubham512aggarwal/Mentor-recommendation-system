import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove JWT token
    navigate("/login"); // Redirect to login page
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
