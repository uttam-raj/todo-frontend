import { useState } from "react"
import { Link } from "react-router-dom";
 import { useNavigate } from "react-router-dom";
 import { useAuth } from "../Store/auth";
import { toast } from "react-toastify";
 

export const TodoLogin =({onLogin})=>{
    const [user,setUser] = useState({
        email:"",
        password:""
    })
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const {storeTokenInLS} = useAuth();

    const handleInputChange =(e)=>{
        const {name,value} = e.target;
        setUser((prev)=>({...prev,[name]:value}));
    }

    const handleSubmit= async(e)=>{

        try {
            e.preventDefault();
        const {email, password} = user;

        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({email,password}),
        });

        const res_data = await response.json();

        if(response.ok && res_data.token){
            
            storeTokenInLS(res_data.token);
            setUser({
                email:"",
                password:""
            })
            onLogin();  // Marks authenticated
            toast.success(res_data.message);
            navigate("/todo");
        }else {
            toast.error(res_data.message || "Invalid creadential");
                // setError(res_data.message || "Invalid credential");
    
        }
        } catch (error) {
                
                //   console.log("Invalid credential", error);
                  setError("Something went wrong.");
        }

        //setError("");

    }
    return(
        <form className="auth-form" onSubmit={handleSubmit}>
            <div className="input-group">
            <i className="bx bxs-user"></i>
            <input type="email"
            name="email"
            placeholder="Enter your registered email"
            value={user.email}
            onChange={handleInputChange} 
            required/>
            </div>
            
            <div className="input-group">
            <i className="bx bxs-lock-alt"></i>
            <input type="password"
            name="password"
            placeholder="Enter your password"
            value={user.password}
            onChange={handleInputChange} 
            required/>
            </div>

            {/* {error && <p className="error-text">{error}</p>} */}
            <button type="submit">Sign-in</button>
            <p className="auth-link">
            Forgot password? <Link to="/forgot">Recover it</Link>
            </p>
        </form>
    )
}