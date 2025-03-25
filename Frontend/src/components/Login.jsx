import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState } from "react";

const Login = () => {

  const [formData, setFormData] = useState({
    username : "", 
    password: ""
  });

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]: e.target.value});
  }

  const handleLogin = async(e) => {
    e.preventDefault();
    try{
      const res =  await axios.post("http://localhost:5000/api/students/login", formData);
      setSuccess(res.data.message);
      localStorage.setItem("token", res.data.token);
      navigate("/home");
    }
    catch(error){
      setError(error);
      console.log(error);
    }
  };

  return (
    <div className="container">      
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="text" name="username" placeholder="Email" className="input-field" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" className="input-field" onChange={handleChange} />
        <button className="btn" type="submit">Login</button>
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
