import { useState } from "react";
import axios  from "axios";
import { toast } from "react-toastify";
import {useAuth} from "../contexts/authContext";
import { Navigate, useNavigate } from "react-router-dom";
const SignInform= () =>{
    const navigate =useNavigate();
    const auth= useAuth();
    const [username, setUsername]=useState("");
    const[password, setPassword]=useState("");
    if(auth.token) return <Navigate to="/todos"/>;

    const handleUserName= (event)=>{
        setUsername(event.target.value);
    };

    const handlePassword = (event)=>{
        setPassword(event.target.value);
    };


    async function login(data){
        try{
            auth.loginAction(data);
            // const res =await axios.post("/api/signin", data);
            // localStorage.setItem("access_token", res.data.access_token);
            toast("Successfully logged in");
        
           
        }
        catch(e){
            // toast("Successfully logged in");
            console.log(e);
            
        }
       
       
    }

    const handleSubmit=(event)=>{
        event.preventDefault();

        const requestBody={
            username:username,
            password: password
        };
        login(requestBody);
    };

    return(
        <>
        <div>
            <form className="forms">
                <h1>Login Form!</h1>
                <div>
                    <input type="text" placeholder="username" className="username" value={username} onChange={handleUserName}></input>
                </div>
                <br></br>
                <div>
                    <input type="password" placeholder="password" className="password" value={password} onChange={handlePassword}></input>
                </div>
                <br></br>
                <div>
                    <button type="submit" className="buttons" onClick={handleSubmit}>Login</button>
                </div>
            </form>
        </div>
        </>
    );
}

export default SignInform