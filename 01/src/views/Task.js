import { getOne, deleteOne, updateOne } from "../models/ToDoModel";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Task = () => {

    let params = useParams();
    let [dataTask, setDataTask] = useState("")
    let naviguate = useNavigate()

    // Get la TODOs en fonction du parametre en URL
    const getData = async () => {

        const promise = await getOne(params.taskId)

        setDataTask(promise)

        if (promise.status == '404') {
            naviguate('/')
        }

    }
    // Supprime la TODO et redirect vers l'accueil
    const handleDeleteButton = () => {
        deleteOne(dataTask.id)
        naviguate('/')
    }

    // Change le state de la TODOs
    const handleCheckedInput = (task) => {

        updateOne(task.id, "state", !task.state, task).then(() => {
            getData()

        })


    }

    useEffect(() => {
        getData()
    }, [])


    return (
        <div id="Task" data-testid="Task" >
            <Link to="/">Retour</Link>
            <div>
                <h1>{dataTask && dataTask.title}</h1>
                <label htmlFor="state">
                    State :
                    <input type="checkbox" name="state" id="state" checked={dataTask && dataTask.state} onChange={() => { handleCheckedInput(dataTask) }} />

                </label>

            </div>
            <div>
                <p>Task writed on : {dataTask && new Date(dataTask.entryDate).toUTCString()}</p>
                <p> {dataTask && dataTask.eventDate ? "Event date :" + dataTask.eventDate : ""}</p>
            </div>
            <p>{dataTask && dataTask.desc ? "Task description : " + dataTask.desc : "There is no description"}</p>

            <div className="buttonTask">
                <button onClick={() => { handleDeleteButton() }}>Delete the task</button>

            </div>
        </div>
    );
}

export default Task;