import { useEffect } from "react";
import { useAuth } from "../Store/auth"
import { Navigate } from "react-router-dom";

export const Logout = ({onLogout})=>{
    const {Logout} = useAuth();

    useEffect(()=>{
        Logout();
        onLogout?.();
    },[Logout, onLogout()]);

    return <Navigate to="/"/>
}