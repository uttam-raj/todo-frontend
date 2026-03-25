import { useContext, useState } from "react";
// import { children } from "react";
import { createContext } from "react";

 const AuthContext = createContext();

export const AuthProvider = ({children})=>{

    const [token, setToken] = useState(localStorage.getItem("token"));

    const storeTokenInLS= (serverToken)=>{
              localStorage.setItem("token", serverToken);
              setToken(serverToken);
    }
    const storeEmailInLS = (serverEmail)=>{
        return localStorage.setItem("verifyEmail",serverEmail);   //Storeing email in the localstorage.
    }

        const Logout = ()=>{
        setToken("");
        return localStorage.removeItem("token");
            }
    return <AuthContext.Provider value={{storeTokenInLS,storeEmailInLS,Logout,token}}>
            {children}
    </AuthContext.Provider>
};

export const useAuth =()=>{
    const AuthContextValue = useContext(AuthContext);
    if(!AuthContextValue){
        throw  new Error("useAuth used outside of the Provider");
    }
    return AuthContextValue;

};