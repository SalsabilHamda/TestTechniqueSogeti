/**
 * @jest-environment jsdom
 */


import React from 'react'
import { render, screen, waitFor } from '@testing-library/react';
import Home from './Home';
import ToDo from '../components/ToDoList';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';





test('renders toDoList', () => {
    render(
        <Router>
            <Home></Home>
        </Router>
    );
    const data = document.querySelectorAll('.task');
    expect(data).not.toBeNull()

});


test('change toDo state', async () => {
    render(
        <Router>
            <Home>
                <ToDo></ToDo>
            </Home>
        </Router>
    );
    const data = await screen.findAllByLabelText('State :');
    data[0].dispatchEvent(new MouseEvent('input', { bubbles: true }))

    expect(data[0].state).not.toBeNull()

});
test('click on toDo to see details', async () => {
    const result = render(
        <Router>
            <Home></Home>
        </Router>
    );
    const data = await screen.findAllByTestId('toDoDiv');

    act(() => {
        data[0].dispatchEvent(new MouseEvent('click', { bubbles: true }))

    })
    const todoDetails = screen.findByTestId('Task')

    expect(todoDetails).not.toBeNull()

});

