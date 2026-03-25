import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import './AuthWrapper.css';
import './OtpVerify.css';

export const OtpVerify = ({onVerified})=>{
    const [otp,setOtp] = useState("");
    const [email, setEmail] = useState("");
    // const [error,setError] = useState("");
    const navigate = useNavigate();

  // ✅ Load email from localStorage on component mount
  useEffect(() => {
    const storedEmail = localStorage.getItem("verifyEmail");
    if (storedEmail) setEmail(storedEmail);
  }, []);

    const handleSubmit = async (e) => {
    e.preventDefault();
      try {
        const response =await fetch("http://localhost:3000/api/auth/verifiedOtp",{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({email, otp}),
        });

        const res_data = await response.json();

        if(response.ok){
          localStorage.removeItem("verifyEmail"); // optional: clear after success
          onVerified?.(); // optional chaining in case it's not passed
          toast.success(res_data.message || "User register sucessfully");
          navigate("/todo");
        }else {
          toast.error(res_data.message || "Invalid OTP");
          //setError(res_data.message || "Invalid OTP");
      }
        
      } catch (error) {
        toast.error("OTP verify error", error);
      // console.log("OTP verify error", error);
      // setError("Something went wrong.");
        
      }
    // if (otp === "123456") {
    //   onVerified();
    //   navigate("/todo"); // You can't use <Link> here
    // } else {
    //   setError("Invalid OTP");
    // }
  };
    return(
<div className="otp-auth-container">
  <form className="otp-form" onSubmit={handleSubmit}>
    <h2>Verify OTP</h2>
    <input
      type="text"
      value={otp}
      onChange={(e) => setOtp(e.target.value)}
      placeholder="Enter the OTP"
    />
    <button type="submit">Verify OTP</button>
  </form>
</div>

    )
}