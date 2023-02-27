import React, { useState, useEffect } from "react"
import { createRoot } from "react-dom/client"
import Axios from "axios";

import HeaderBar from "./components/HeaderBar";
import CreateNewForm from "./components/CreateNewForm";
import TaskCard from "./components/TaskCard";
import ReactJkMusicPlayer from "react-jinke-music-player";
import 'react-jinke-music-player/assets/index.css';
import PomodoroTimer from "./components/PomodoroTimer";
import FacialLandmarks from "./components/FacialLandmarks";


function App() {
    const [tasks, setTasks] = useState([])
    const [users, setUsers] = useState([])
    let [toggleDetection, setToggleDetection] = useState(false); //

    useEffect(() => {
        async function go() {
            const taskResponse = await Axios.get("/api/tasks")
            const userResponse = await Axios.get("/api/users")
            setTasks(taskResponse.data)
            setUsers(userResponse.data)
        }
        go()
    }, [])

    const audioList = [
        {
            musicSrc: "./music/letter-to-a-friend.mp3",
            cover: "./music/letter-to-a-friend.jpeg",
            name: "Letter to a Friend",
            singer: "Robert Gromotka"
        },
        {
            musicSrc: "./music/leaves-from-the-vine.mp3",
            cover: "./music/leaves-from-the-vine.jpeg",
            name: "Leaves from the Vine",
            singer: "Samuel Kim"
        }]

        const toggleFaceDetection = () => {
            return setToggleDetection(!toggleDetection);
          };

    return (
        <div>
            <HeaderBar email={users.email} />
            <div className="container">
                <div className="task-grid">
                    <CreateNewForm setTasks={setTasks} />
                    <PomodoroTimer />
                    {tasks.map(function (task) {
                        return <TaskCard key={task._id} name={task.name} description={task.description} deadline={task.deadline} id={task._id} setTasks={setTasks} />
                    })}
                    {toggleDetection ? <FacialLandmarks /> : ""}
                </div>
            </div>
            <ReactJkMusicPlayer audioLists={audioList} extendsContent={<button className="btn btn-primary" onClick={toggleFaceDetection}>Toggle Detection</button>} theme="dark" mode="full" autoPlay={false} toggleMode={false} responsive={false} showThemeSwitch={false} showDownload={false} showPlayMode={false} showReload={false} />
        </div>
    );
}


const root = createRoot(document.querySelector("#app"));
root.render(<App />);