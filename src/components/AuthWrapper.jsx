import { useState } from "react";
import { TodoLogin } from "./TodoLogin";
import { TodoRegister } from "./TodoRegister";
import  './AuthWrapper.css';

export const AuthWrapper = ({onLogin, onRegister}) =>{
    const [isSignIn, setIsSign] = useState(false);

    return(
        <div className={`container ${isSignIn?"sign-in":"sign-up"}`} id="container">
            <div className="row">
                {/* SIGN UP COLUMN */}
                <div className="col align-items-center flex-col sign-up">
                    <div className="form-wrapper align-items-center">
                        <div className="form sign-up">
                            <TodoRegister onRegister={onRegister}/>
                            <p>
                                <span>Already have an account?</span>
                                <b onClick={()=>setIsSign(true)} className="pointer">
                                    sign in here
                                </b>
                            </p>
                        </div>
                    </div>
                </div >


                {/* SIGN IN COLUMN */}
                <div className="col align-items-center flex-col sign-in">
                    <div className="form-wrapper align-items-center">
                            <div className="form sign-in">
                                <TodoLogin onLogin={onLogin}/>
                                <p>
                                    <span>Don't have an account?</span>
                                    <b onClick={()=>setIsSign(false)} className="pointer">
                                        Sign up here
                                    </b>
                                </p>
                            </div>
                    </div>
                </div>
            </div>

            {/* CONTENT SECTION */}
            <div className="row content-row">
                <div className="col align-items-center flex-col">
                    <div className="text sign-in">
                        <h2>Welcome</h2>
                        <div className="img sign-in"></div>
                    </div>
                </div>

                <div className="col align-items-center flex-col">
                    <div className="img sign-up"></div>
                        <div className="text sign-up">
                            <h2>Join with us</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}