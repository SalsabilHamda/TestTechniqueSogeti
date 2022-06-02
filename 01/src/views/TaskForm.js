import { Button, Card, CardContent, Checkbox, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addOne } from "../models/ToDoModel";
import SendIcon from '@mui/icons-material/Send';

const TaskForm = () => {

    let [title, setTitle] = useState("")
    let [state, setState] = useState(false)
    let [desc, setDesc] = useState("")
    let [eventDate, setEventDate] = useState("")

    let [error, setError] = useState("")

    let naviguate = useNavigate()

    const handleForm = (e) => {

        if (title) {
            addOne(title, state, desc, eventDate).then((res) => {

            })
            naviguate('/')
        } else {
            e.preventDefault();
            setError("Enter a title please")

        }



    }

    return (<div id="TaskForm">

        <Link to="/" style={{ padding: "0.5rem", border: "1px white solid", display: "block", width: "8%", textAlign: "center" }}> retour</Link>
        <Card elevation={12}>
            <CardContent>


                <h1>Add a Task</h1>
                <div id="error">{error}</div>
                <form onSubmit={(e) => handleForm(e)}>

                    <TextField type="text" name="title" label="Title" value={title} onChange={(e) => { setTitle(e.target.value) }} />

                    <label>State :
                        <Checkbox label="State" type="checkbox" name="state" value={state} onChange={(e) => { setState(e.target.value) }} />
                    </label>

                    <TextField label="Description" multiline rows={6} type="text" name="desc" value={desc} onChange={(e) => { setDesc(e.target.value) }} />

                    <Typography>
                        <p>Event Date</p>
                        <TextField placeholder={""} type="date" name="date" value={eventDate} onChange={(e) => { setEventDate(e.target.value) }} />

                    </Typography >

                    <Button type="submit" endIcon={<SendIcon />}>
                        Ajouter
                    </Button>
                </form>
            </CardContent>
        </Card>
    </div>);
}

export default TaskForm;