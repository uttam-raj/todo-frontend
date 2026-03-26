import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Store/auth";
import { toast } from "react-toastify";



export const TodoRegister =()=>{
    const [userReg,setUserReg] = useState({
        name:"",
        gender:"",
        email:"",
        phone:"",
        password:"",
        confirmpassword:""
    })
    // const [error,setError] = useState("");
    const navigate = useNavigate();
    const {storeTokenInLS, storeEmailInLS} = useAuth()

    const handleChange = (e)=>{
       const {name , value} = e.target;
       setUserReg((prev)=>({...prev,[name]:value}));
    }
    

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const {name, gender, email, phone, password, confirmpassword} = userReg;
        
        if (!name || !gender || !email || !phone || !password || !confirmpassword) {
        //setError("Please fill all the fields.");
        toast.error("Please fill all the fields.");
        return;
        }

        if (password !== confirmpassword) {
        toast.error("Passwords do not match.");    
        // setError("Passwords do not match.");
        return;
          }

        // Don't send confirmpassword to backend
        const { confirmpassword: _, ...sendData } = userReg;  //This line remove the confirmpassword to send in the backend

        console.log("Sending Data:", sendData);


        try {
            const response =await fetch(`${import.meta.env.VITE_API_URL}/auth/register`,
                {
                    method:"POST",
                    headers: {
                    "Content-Type": "application/json"
                    },
                    body:JSON.stringify(sendData),
                });
                // const res_data = await response.json();
                // console.log(res_data);

                
                const res_data = await response.json();
                

                if(response.ok){
                    
                    storeTokenInLS(res_data.token);
                    storeEmailInLS(sendData.email);
                    // Save email to localStorage
                    // localStorage.setItem("verifyEmail", sendData.email);

                    setUserReg({
                        name:"",
                        gender:"",
                        email:"",
                        phone:"",
                        password:"",
                        confirmpassword:""
                    })
                    toast.success(res_data.message || "Otp send");
                    navigate("/verify-otp");
                    // console.log(res_data);
                }else{
                    toast.error(res_data.message || "Registraton failed");
                    //setError(res_data.message || "Registration failed");
                }
        } catch (error) {
            // toast.error(error);
            console.log("register",error);   
        }
    }
    return(
        <form className="auth-form" onSubmit={handleSubmit}>
            <div className="input-group">
             <i className="bx bxs-user"></i>
            <input type="text"
            name="name"
            placeholder="Enter your name"
            value={userReg.name}
            onChange={handleChange} />
            </div>

            <div className="input-group">
            <i className="bx bx-male"></i>
            <select name="gender" value={userReg.gender} onChange={handleChange}>
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>
            </div>

            <div className="input-group">
            <i className="bx bx-mail-send"></i>
            <input type="email"
            name="email"
            placeholder="Enter your email id"
            value={userReg.email}
            onChange={handleChange} />
            </div>


            <div className="input-group">
            <i className="bx bxs-phone"></i>
            <input type="text"
            name="phone"
            placeholder="Enter your phone number"
            value={userReg.phone}
            onChange={handleChange} />
            </div>

            <div className="input-group">
            <i className="bx bxs-lock-alt"></i>
            <input type="password"
            name="password"
            placeholder="Enter your password"
            value={userReg.password}
            onChange={handleChange} />
            </div>

            <div className="input-group">
            <i className="bx bxs-lock-alt"></i>
            <input type="password"
            name="confirmpassword"
            placeholder="Confirm password"
            value={userReg.confirmpassword}
            onChange={handleChange} />
            </div>

            <button type="submit">Register</button>
        </form>
    )
}