import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {AddTodoListActionType, RemoveTodoListActionType} from './todolists-reducer';


type ActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodoListActionType
    | RemoveTodoListActionType


export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    id: string
    todolistId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    id: string
    isDone: boolean
    todolistId: string
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    id: string
    title: string
    todolistId: string
}

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let todoListTasks = state[action.todolistId]
            state[action.todolistId] = todoListTasks.filter(task => task.id !== action.id)
            return {...state}
        }
        case 'ADD-TASK': {
            const task = {id: v1(), title: action.title, isDone: false}
            let todoListTasks2 = state[action.todolistId]
            state[action.todolistId] = [task, ...todoListTasks2]
            return {...state}
        }
        case 'CHANGE-TASK-STATUS': {
            const todoListTasks = state[action.todolistId]
            state[action.todolistId] = todoListTasks
                .map(t => t.id === action.id
                    ? {...t, isDone: action.isDone}
                    : t)
            return {...state}
        }
        case 'CHANGE-TASK-TITLE': {
            const todoListTasks = state[action.todolistId]
            state[action.todolistId] = todoListTasks
                .map(t => t.id === action.id
                    ? {...t, title: action.title}
                    : t)
            return {...state}
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state}
            stateCopy[action.id] = []
            return stateCopy
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            return state
    }
}


export const removeTaskAC = (taskID: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', id: taskID, todolistId: todolistId}
}

export const addTaskAC = (newTittle: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title: newTittle, todolistId: todolistId}
}

export const changeTaskStatusAC = (taskID: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {
        type: 'CHANGE-TASK-STATUS',
        id: taskID,
        isDone,
        todolistId,
    }
}

export const changeTaskTitleAC = (id: string, newTitle: string, todolistId: string): ChangeTaskTitleActionType => {
    return {
        type: 'CHANGE-TASK-TITLE',
        id,
        title: newTitle,
        todolistId
    }
}

