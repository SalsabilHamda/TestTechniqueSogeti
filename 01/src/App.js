import React from 'react'
import './style/style.css'
import { createTheme, ThemeProvider } from '@mui/material/styles'


import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";


import TaskForm from './views/TaskForm';
import Home from "./views/Home";
import Task from './views/Task';


const App = () => {
  return (<BrowserRouter>

    <ThemeProvider theme={createTheme({ palette: { mode: 'dark' } })}>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/addTask" element={<TaskForm />} />
        <Route path="/task/:taskId" element={<Task />} />
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </ThemeProvider>
  </BrowserRouter>
  );
}

export default App; <>
</>