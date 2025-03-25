import { useEffect } from 'react'
import './App.css'
import AppRoutes from './routes/Routes'
import { useNavigate } from 'react-router-dom'

function App() {

  const navigate = useNavigate();
  
  useEffect(()=>{
    const interval = setInterval(async() =>{
      try{
        await axios.get("http://localhost:5000/api/students/refresh-session", { withCredentials: true });
      }
      catch(error){
        console.log("Session expired.")
        navigate("/login");
      }
    }, 5*60*1000)
    return clearInterval(interval);
  }, [navigate]);
  
  
  useEffect(() => {
    let timeout;

    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        localStorage.removeItem("token"); // Remove token
        console.log("Session expired.");
        navigate("/login");
      }, 15 * 60 * 1000); // 15 minutes
    };

    document.addEventListener("mousemove", resetTimer);
    document.addEventListener("keypress", resetTimer);

    resetTimer(); // Start timer

    return () => {
      clearTimeout(timeout);
      document.removeEventListener("mousemove", resetTimer);
      document.removeEventListener("keypress", resetTimer);
    };
  }, [navigate]);
  
  return (
    <AppRoutes />
  )
}

export default App
