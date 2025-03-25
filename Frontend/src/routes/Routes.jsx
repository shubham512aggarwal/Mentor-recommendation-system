import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../components/Login";
import Signup from "../components/Signup";
import Home from "../components/Home";
import ProtectedRoute from "./ProtectedRoutes";
import AddProject from "../components/AddProject";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<ProtectedRoute/>} >
        <Route path="/home" element={<Home />} />
        <Route path="/AddProject" element={<AddProject/>}/>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
