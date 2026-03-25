import { useState } from "react"
import { useNavigate } from "react-router-dom";
import './TodoForgot.css';

export const TodoForgotPassword = ()=>{
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
   const handleSubmit = async(e)=>{
    e.preventDefault();
    setMessage("");
    setError("");

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/forgotPassword`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({email}),
        });

        const res_data = await response.json();

        if(response.ok){
            setMessage(res_data.Message);
            localStorage.setItem("resetEmail",email);
            navigate("/reset-password");
        }else {
        setError(res_data.message);
      }
    } catch (error) {
        setError("Something went wrong");
    }
   }
    return(
<div className="forgot-auth-container">
  <form className="forgot-form" onSubmit={handleSubmit}>
    <h2>Forgot Password</h2>
    <input 
      type="email" 
      placeholder="Enter your email" 
      value={email}  
      onChange={(e)=> setEmail(e.target.value)} 
    />
    {error && <p className="error-text">{error}</p>}
    {message && <p className="success-text">{message}</p>}
    <button type="submit">Forgot Password</button>
  </form>
</div>

    )
}