import axios from "axios";
import { useState } from "react";
import { useAuth } from "../contexts/authContext";
import { Navigate } from "react-router-dom";

// async function getAllTodos(){
//     const url="/api/todos";
//     const response=await axios.get(url);
//     console.log(response);
// }
// getAllTodos();

// const todos=getAllTodos();
// console.log("Todos");
// console.log(todos);

 function Todolist(){
    const [todos, setTodos]=useState([]);
    const auth= useAuth();
    if(!auth.token) return <Navigate to="/signin"/>;
    
    async function getAllTodos(){
        const authorizationToken= localStorage.getItem("access_token"); 

        const url="/api/todos";
        const response=await axios.get(url,{
            headers:{authorization: authorizationToken},
        });
        setTodos(response.data);
    }
    function deleteTaskEvent(id){
        // event.preventDefault();

        console.log(id)
        deleteTask(id);
    }

    async function deleteTask(id){
        const authorizationToken= localStorage.getItem("access_token"); 
        const res= await axios.delete(`/api/todos/${id}`,{
            headers:{authorization: authorizationToken},
        });
        return res;
    }
    return(   
        <>
        <button onClick={auth.logOut}> Logout</button>
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Delete</th>
            </tr>
            </thead>
            <tbody>
                {todos.map((todos)=>{
                return(
                    <tr key={todos.name}>
                        <td>{todos.name}</td>
                        <td>{todos.task_status}</td>
                        <td><button onClick={()=>deleteTaskEvent(todos.id)}>Delete</button></td><br></br>
                    
                    </tr>
                    
               );
               })} 

            </tbody>
        </table><br></br>
        <button onClick={getAllTodos}>Click me</button>
        </>
    );
}

export default Todolist