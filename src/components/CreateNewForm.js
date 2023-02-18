import Axios from "axios"
import React, { useState, useRef } from "react"

function CreateNewForm(props) {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [deadline, setDeadline] = useState("")

    async function submitHandler(e) {
        e.preventDefault()
        const data = new FormData()

        data.append("name", name)
        data.append("description", description)
        data.append("deadline", deadline)
        setName("")
        setDescription("")
        setDeadline("")

        const newTask = await Axios.post("/create-task", data, { headers: { 'Content-Type': 'application/json' } })
        props.setTasks(prev => prev.concat([newTask.data]))
    }

    return (
        <form className="card" onSubmit={submitHandler}>
            <div className="card-body">

                <div className="mb-2">
                    <input onChange={e => setName(e.target.value)} value={name} type="text" className="form-control" placeholder="Task Name" />
                </div>
                <div className="mb-2">
                    <input onChange={e => setDescription(e.target.value)} value={description} type="text" className="form-control" placeholder="Description" />
                </div>
                <div className="mb-2">
                    <input onChange={e => setDeadline(e.target.value)} value={deadline} type="date" className="form-control" placeholder="Deadline" />
                </div>

                <button className="btn btn-success">Create New Task</button>
            </div>
        </form>
    )
}

export default CreateNewForm