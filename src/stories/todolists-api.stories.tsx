import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {todolistsAPI} from '../api/todolists-api';

export default {
    title: 'API'
}

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '4874dc4c-d559-4574-8754-ba7d375822a7'
    }
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistsAPI.getTodolists()
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.createTodolist('Gena TodoList')
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'e19ac7fd-70c4-4096-ac4e-536eefc0e877'
        todolistsAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '4df548bd-e20a-4aa3-be4d-2629f9f3ba10'
        todolistsAPI.updateTodolist(todolistId, 'Hello')
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = '4df548bd-e20a-4aa3-be4d-2629f9f3ba10'
        todolistsAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')

    const deleteTask = () => {
        todolistsAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'}
                   value={todolistId}
                   onChange={(e)=>setTodolistId(e.currentTarget.value)}
                   type="text"/>
            <input placeholder={'taskId'}
                   value={taskId}
                   onChange={(e)=>setTaskId(e.currentTarget.value)}
                   type="text"/>
            <button onClick={deleteTask}></button>
        </div>
    </div>
}