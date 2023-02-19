import React, { useState, useEffect } from "react"
import { createRoot } from "react-dom/client"
import Axios from "axios";

import HeaderBar from "./components/HeaderBar";
import CreateNewForm from "./components/CreateNewForm";
import TaskCard from "./components/TaskCard";
import ReactJkMusicPlayer from "react-jinke-music-player";
import 'react-jinke-music-player/assets/index.css';

function App() {
    const [tasks, setTasks] = useState([])
    const [users, setUsers] = useState([])

    useEffect(() => {
        async function go() {
            const taskResponse = await Axios.get("/api/tasks")
            const userResponse = await Axios.get("/api/users")
            setTasks(taskResponse.data)
            setUsers(userResponse.data)
        }
        go()
    }, [])

    return (
        <div>
            <HeaderBar email={users.email} />
            <div className="container">
                <div className="task-grid">
                    <CreateNewForm setTasks={setTasks} />
                    {tasks.map(function (task) {
                        return <TaskCard key={task._id} name={task.name} description={task.description} deadline={task.deadline} id={task._id} setTasks={setTasks} />
                    })}
                </div>
            </div>
            <ReactJkMusicPlayer toggleMode={false} mode="full" />
        </div>
    );
}


const root = createRoot(document.querySelector("#app"));
root.render(<App />);