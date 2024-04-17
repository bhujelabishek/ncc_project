import { Navigate, Outlet } from "react-router-dom";
import {useAuth} from "../contexts/authContext";

export const PrivateRoute= ()=>{
    const auth = useAuth();
    if(!auth.token) return <Navigate to="/signin"/>;
    return <Outlet/>;
};
