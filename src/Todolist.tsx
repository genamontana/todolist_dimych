import React, {ChangeEvent, useCallback} from 'react'
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

type PropsType = {
    id: string
    title: string,
    tasks: Array<TaskType>,
    removeTask: (id: string, todoListId: string) => void,
    changeStatus: (id: string, isDone: boolean, todoListId: string) => void,
    changeTaskTitle: (id: string, newTitle: string, todoListId: string) => void,
    changeFilter: (value: FilterValuesType, todoListId: string) => void,
    addTask: (title: string, todoListId: string) => void,
    filter: FilterValuesType,
    removeTodoList: (todoListId: string) => void
    changeTodoListTitle: (id: string, newTitle: string) => void
}

export const Todolist = React.memo((props: PropsType) => {
    console.log('TodoList is called')

    const onAllClickHandler = useCallback(() => props.changeFilter('all', props.id),
        [props.changeFilter, props.id])
    const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.id),
        [props.changeFilter, props.id])
    const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.id),
        [props.changeFilter, props.id])

    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])

    const changeTodoListTitle = useCallback((newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle)
    }, [props.changeTodoListTitle, props.id])

    let tasksForTodolist = props.tasks

    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.isDone)
    }
    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => !t.isDone)
    }

    return (
        <div>
            <h3>
                <EditableSpan
                    title={props.title}
                    onChange={changeTodoListTitle}/>
                <IconButton
                    onClick={removeTodoList}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>{
                props.tasks.map(t => <Task key={t.id}
                                           removeTask={props.removeTask}
                                           changeStatus={props.changeStatus}
                                           changeTaskTitle={props.changeTaskTitle}
                                           task={t}
                                           todoListId={props.id}/>)
            }
            </ul>
            <div>
                <Button
                    color="inherit"
                    variant={props.filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}>
                    All
                </Button>
                <Button
                    color="info"
                    variant={props.filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}>
                    Active
                </Button>
                <Button
                    color="secondary"
                    variant={props.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}>
                    Completed
                </Button>
            </div>
        </div>
    )
})

type TaskPropsType = {
    removeTask: (id: string, todoListId: string) => void,
    changeStatus: (id: string, isDone: boolean, todoListId: string) => void,
    changeTaskTitle: (id: string, newTitle: string, todoListId: string) => void,
    task: TaskType,
    todoListId: string
}

const Task = (props: TaskPropsType) => {

    const onRemoveHandler = () => props.removeTask(props.task.id, props.todoListId)
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeStatus(props.task.id, newIsDoneValue, props.todoListId)
    }
    const onChangeTitleHandler = (newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todoListId)
    }

    return <li key={props.task.id} className={props.task.isDone ? 'is-done' : ''}>
        <Checkbox color="primary"
                  onChange={onChangeStatusHandler}
                  checked={props.task.isDone}/>
        <EditableSpan
            title={props.task.title}
            onChange={onChangeTitleHandler}
        />
        <IconButton onClick={onRemoveHandler}>
            <Delete/>
        </IconButton>
    </li>
}
