import React from 'react'
import { useEffect, useState } from "react";
import { getData, getOne, deleteOne, updateOne } from "../models/ToDoModel";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import { Checkbox, IconButton, Paper, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ToDo = () => {

    let naviguate = useNavigate()
    let [toDo, setToDo] = useState([])

    // Function de tri des TODOs (tri par date et si en bas si validé)
    const sortFunction = (table) => {
        let sort = [...table]

        sort.sort((a, b) => {
            return new Date(b.entryDate) - new Date(a.entryDate)
        })

        sort.sort((a, b) => {
            return a.state - b.state;
        })


        return sort
    }
    // Get Toutes les TODOs
    const asyncGetData = async () => {
        const data = await getData()

        setToDo(sortFunction(data))

    }
    // Function qui change le state d'une TODOs
    const handleCheckedInput = (e, task) => {

        updateOne(task.id, "state", !task.state, task).then(() => {
            asyncGetData()

        })


    }
    // Function qui supprime une TODO 
    const handleDeleteButton = (e, task) => {
        e.stopPropagation();
        deleteOne(task.id).then((res) => {
            asyncGetData()
        })
    }
    // Function redirect vers la TODOs sélectionné
    const handleTask = (id) => {
        return naviguate('/task/' + id)
    }




    useEffect(() => {
        asyncGetData()

    }, [])


    return (
        <Paper id="ListDiv" elevation={18} >
            <Link className="add" to='/addTask'>Add a Task</Link>
            {toDo ? toDo.map((task) => {

                return (
                    <Paper data-testid="toDoDiv" key={task.id} className="task " onClick={() => handleTask(task.id)} >

                        <div>
                            <Typography variant="h5" component="div">{task.title}
                            </Typography>
                            <Typography color="text.secondary">
                                Date entry : {new Date(task.entryDate).toUTCString()}

                            </Typography>
                        </div>
                        <div className='buttonDiv'>
                            <label htmlFor="state"> State :
                                <Checkbox
                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 48 } }}
                                    type="checkbox"
                                    name="state"
                                    id="state"
                                    checked={task.state}
                                    onClick={e => e.stopPropagation()}
                                    onChange={(e) => {
                                        handleCheckedInput(e, task)
                                    }}
                                />
                            </label>
                            <IconButton
                                aria-label="delete"
                                onClick={(e) => {
                                    handleDeleteButton(e, task)
                                }}
                                sx={{ '& .MuiSvgIcon-root': { fontSize: 48 } }}>
                                <DeleteIcon />
                            </IconButton>

                        </div>





                    </Paper>
                )
            }) : <p>There is no task, add a new task</p>
            }
        </Paper >
    );
}

export default ToDo;