import React from 'react';
import {FilterValuesType} from './App';


export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

type PropsType = {
    title: string,
    tasks: Array<TaskType>,
    removeTask: (id: string) => void,
    changeFilter: (value: FilterValuesType) => void,
    addTask: () => void,
}

export function Todolist(props: PropsType) {

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button onClick={()=>{props.addTask()}}>+</button>
            </div>
            <ul>{props.tasks.map(t =>
                <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>{t.title}
                    <button onClick={() => {
                        props.removeTask(t.id)
                    }}>✖️
                    </button>
                </li>)}
            </ul>
            <div>
                <button onClick={() => {
                    props.changeFilter('all')
                }}>All
                </button>
                <button onClick={() => {
                    props.changeFilter('active')
                }}>Active
                </button>
                <button onClick={() => {
                    props.changeFilter('completed')
                }}>Completed
                </button>
            </div>
        </div>
    )
}