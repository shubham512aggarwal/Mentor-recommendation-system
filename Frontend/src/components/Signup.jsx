import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const Signup = () => {

  const[formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    institute: "",
    course: "",
    major: "",
    rollNumber: "",
    gender: "",
    dob: "",
  });

  const[error, setError] = useState("");
  const[success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>{
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await axios.post("http://localhost:5000/api/students/register", formData);
      setSuccess(res.data.message);
      navigate("/login");
    }
    catch(error){
      setError(error.response?.data?.message || "Registation failed");
      console.log(error.response?.data?.message || "Registation failed");
    }
  };

  return (
    <div className="container">
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Full Name" className="input-field" name="name" onChange={handleChange} required  />
        <input type="text" placeholder="Institute Name" className="input-field" name="institute" onChange={handleChange} required  />
        <input type="email" name="email" placeholder="Email" className="input-field" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" className="input-field" onChange={handleChange} required />
        <input type="text" placeholder="Current Qualification" className="input-field" name="course" onChange={handleChange} required  />

        <select className="input-field" name="major" onChange={handleChange} required >
          <option value="" disabled selected>
            Major of Qualification
          </option>
          <option value="CS">Computer Science</option>
          <option value="ME">Mechanical</option>
          <option value="CE">Civil</option>
          <option value="EE">Electrical</option>
        </select>

        <input type="text" placeholder="Institute Roll Number" className="input-field" name="rollNumber" onChange={handleChange} required />

        <div className="radio-group" name="gender">
          <label>Gender:</label>
          <label><input type="radio" name="gender" value="Male" onChange={handleChange} required /> Male</label>
          <label><input type="radio" name="gender" value="Female" onChange={handleChange} required /> Female</label>
        </div>

        <input type="date" className="input-field" name="dob" onChange={handleChange} required />

        <button className="btn" type="submit">Sign Up</button>
        <p>
          If you already have an account? <Link to="/login">Login</Link>
        </p>
    </form>
    </div>
  );
};

export default Signup;
