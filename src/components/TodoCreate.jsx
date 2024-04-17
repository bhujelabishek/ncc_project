import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function TodoCreate() {
    const [taskName, setTaskName] = useState("");
    const [task_status, setTaskStatus] = useState("");
    const navigate= useNavigate();

    function _handleTaskNameChange(event){
        event.preventDefault();
        // console.log(event.target.value);
        setTaskName(event.target.value);
    }
    function _handleTaskStatusChange(event) {
        event.preventDefault();
        // console.log(event.target.value);
        setTaskStatus(event.target.value);
    }

    async function createTask(data){
        const authorizationToken= localStorage.getItem("access_token"); 

        const res= await axios.post("/api/todos/",data,{headers:{authorization: authorizationToken}
    });
     navigate("/todos");

        setTaskName(response.data);
        return res;
    }
    function _handleCreateTask(event) {
        
        event.preventDefault();
        console.log(taskName);
        console.log(task_status);
        try{
            createTask({name:taskName, status:task_status});
        }catch(e){
            console.log(e);
        }
    }
    return (
        <>
        <form>
            <input type="text" placeholder="name"  onChange={_handleTaskNameChange} />
            <input type="text" placeholder="task_status" onChange={_handleTaskStatusChange} />
            <button type="submit" onClick={_handleCreateTask}>Create Task</button>
        </form>

        </>
    );
}
export default TodoCreate;