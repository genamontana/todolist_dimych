import React from 'react';
import './App.css';
import {Todolist} from './Todolist';

function App() {

    let tasks = [
        {id: 1, title: 'CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
        {id: 4, title: 'Redux', isDone: false},
    ]

    function removeTask(id: number) {
        tasks = tasks.filter(t => t.id !== id)
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasks}
                removeTask={removeTask}
            />
        </div>
    );
}

export default App;
