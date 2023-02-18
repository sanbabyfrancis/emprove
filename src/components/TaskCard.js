import Axios from "axios"
import React, {useState} from "react"

function TaskCard(props) {
    const [isEditing, setIsEditing] = useState(false)
    const [draftName, setDraftName] = useState("")
    // const [file, setFile] = useState()
    const [draftDescription, setDraftDescription] = useState("")
    const [draftDeadline, setDraftDeadline] = useState("")

    async function submitHandler(e) {
        e.preventDefault()
        setIsEditing(false)
        props.setTasks(prev =>
            prev.map(function (task) {
                if (task._id == props.id) {
                    return { ...task, name: draftName, description: draftDescription, deadline: draftDeadline }
                }
                return task
            })
        )
        const data = new FormData()
        // if (file) {
        //     data.append("photo", file)
        // }
        data.append("_id", props.id)
        data.append("name", draftName)
        data.append("description", draftDescription)
        data.append("deadline", draftDeadline)
        // const newPhoto = await Axios.post("/update-animal", data, { headers: { "Content-Type": "multipart/form-data" } })
        // if (newPhoto.data) {
        //     props.setAnimals(prev => {
        //         return prev.map(function (animal) {
        //             if (animal._id == props.id) {
        //                 return { ...animal, photo: newPhoto.data }
        //             }
        //             return animal
        //         })
        //     })
        // }
    }

    return (
        <div className="card">
            {/* <div className="our-card-top">
                {isEditing && (
                    <div className="our-custom-input">
                        <div className="our-custom-input-interior">
                            <input onChange={e => setFile(e.target.files[0])} className="form-control form-control-sm" type="file" />
                        </div>
                    </div>
                )}
                <img src={props.photo ? `/uploaded-photos/${props.photo}` : "/fallback.png"} className="card-img-top" alt={`${props.species} named ${props.name}`} />
            </div> */}
            <div className="card-body">
                {!isEditing && (
                    <>
                        <h4>{props.name}</h4>
                        <p className="text-muted small">{props.description}</p>
                        <p className="text-muted small">Deadline: {props.deadline}</p>
                        {!props.readOnly && (
                            <>
                                <button
                                    onClick={() => {
                                        setIsEditing(true)
                                        setDraftName(props.name)
                                        setDraftDescription(props.description)
                                        setDraftDeadline(props.deadline)
                                        // setFile("")
                                    }}
                                    className="btn btn-sm btn-primary"
                                >
                                    Edit
                                </button>{" "}
                                <button
                                    onClick={async () => {
                                        const test = Axios.delete(`/task/${props.id}`)
                                        props.setTasks(prev => {
                                            return prev.filter(task => {
                                                return task._id != props.id
                                            })
                                        })
                                    }}
                                    className="btn btn-sm btn-outline-danger"
                                >
                                    Delete
                                </button>
                            </>
                        )}
                    </>
                )}
                {isEditing && (
                    <form onSubmit={submitHandler}>
                        <div className="mb-1">
                            <input autoFocus onChange={e => setDraftName(e.target.value)} type="text" className="form-control form-control-sm" value={draftName} />
                        </div>
                        <div className="mb-2">
                            <input onChange={e => setDraftDescription(e.target.value)} type="text" className="form-control form-control-sm" value={draftDescription} />
                        </div>
                        <div className="mb-2">
                            <input onChange={e => setDraftDeadline(e.target.value)} type="date" className="form-control form-control-sm" value={draftDeadline} />
                        </div>
                        <button className="btn btn-sm btn-success">Save</button>{" "}
                        <button onClick={() => setIsEditing(false)} className="btn btn-sm btn-outline-secondary">
                            Cancel
                        </button>
                    </form>
                )}
            </div>
        </div>
    )
}

export default TaskCard