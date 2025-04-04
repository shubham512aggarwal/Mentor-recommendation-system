import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../components/Login";
import Signup from "../components/Signup";
import Home from "../components/Home";
import ProtectedRoute from "./ProtectedRoutes";
import AddProject from "../components/AddProject";
import ProjectDetails from "../components/ProjectDetails";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<ProtectedRoute/>} >
        <Route path="/" element={<Home />} />
        <Route path="/AddProject" element={<AddProject/>}/>
        <Route path="/ProjectDetails" element={<ProjectDetails/>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
