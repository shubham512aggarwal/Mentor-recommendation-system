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
  
  return (
    <AppRoutes />
  )
}

export default App
