import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import './TodoReset.css';

export const TodoResetPassword =()=>{
    const [resetPassowrd,setResetPassowrd] = useState({
        otp:"",
        newPassword:"",
        confirmPassword:""
    })
    const [email,setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error,setError] = useState("");
    const navigate = useNavigate();


    const handleChange = (e)=>{
        const {name, value} = e.target;
        setResetPassowrd((perv)=>({...perv, [name]:value}));
    }

    useEffect(()=>{
            const storeEmail = localStorage.getItem("resetEmail");
            if(storeEmail) setEmail(storeEmail);
        },[]);

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const {otp, newPassword, confirmPassword} = resetPassowrd;
        setError("");
        setMessage("");

        if(newPassword != confirmPassword){
            return setError("Password do not match");
        }

        try {
            const response = await fetch("http://localhost:3000/api/auth/resetPassword",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({email,otp,newPassword,confirmPassword}),
            });

            const res_data = await response.json();

            if(response.ok){
                setMessage(res_data.message);
                localStorage.removeItem("resetEmail");
                navigate("/");
            }else{
                setError(res_data.message);
            }
            
        } catch (error) {
            setError("Something went wrong.");
        }



    }

    return(
        <div className="reset-auth-container">
        <form className="reset-form" onSubmit={handleSubmit}>
            <h2>Reset Password</h2>
            <input type="text" name="otp" placeholder="Enter OTP" value={resetPassowrd.otp} onChange={handleChange} />
            <input type="password" name="newPassword" placeholder="Enter new password" value={resetPassowrd.newPassword} onChange={handleChange} />
            <input type="password" name="confirmPassword" placeholder="Enter new confirmPassword" value={resetPassowrd.confirmPassword} onChange={handleChange}/>
                  {error && <p className="error-text">{error}</p>}
                  {message && <p className="success-text">{message}</p>}
            <button type="submit">Reset password</button>
        </form>
        </div>
    )
}