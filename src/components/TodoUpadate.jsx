function TodoUpdate() {
    const [taskName, setTaskName] = useState("");
    const [task_status, setTaskStatus] = useState("");

    function _handleTaskNameChange(event) {
        event.preventDefault();
        // console.log(event.target.value);
        setTaskName(event.target.value);
    }

    function _handleTaskStatusChange(event) {
        event.preventDefault();
        // console.log(event.target.value);
        setTaskStatus(event.target.value);
    }

    async function createTask(data) {
        const res = await axios.post("/api/todos/", data);
        return res;
        //     const response=await axios.get(url);
    }
    function _handleCreateTask(event) {

        event.preventDefault();
        console.log(taskName);
        console.log(task_status);
        try {
            createTask({ name: taskName, status: task_status });
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <>
            <form>
                <input type="text" placeholder="name" onChange={_UpdateName} />
                <input type="text" placeholder="task_status" onChange={_UpdateTask} />
                <button type="submit" onClick={_updateTaskStatus}>Create Task</button>
            </form>


        </>
    );
}

export default TodoUpdate