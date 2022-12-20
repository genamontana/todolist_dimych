import React, {ChangeEvent} from 'react'
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
    changeFilter: (value: FilterValuesType, todoListId: string) => void,
    addTask: (title: string, todoListId: string) => void,
    changeStatus: (id: string, isDone: boolean, todoListId: string) => void,
    changeTaskTitle: (id: string, newTitle: string, todoListId: string) => void,
    filter: FilterValuesType,
    removeTodoList: (todoListId: string) => void
    changeTodoListTitle: (id: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {

    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id)
    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const changeTodoListTitle = (newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle)
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
            <ul>{props.tasks.map(t => {
                const onRemoveHandler = () => props.removeTask(t.id, props.id)
                const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    let newIsDoneValue = e.currentTarget.checked
                    props.changeStatus(t.id, newIsDoneValue, props.id)
                }
                const onChangeTitleHandler = (newValue: string) => {
                    props.changeTaskTitle(t.id, newValue, props.id)
                }

                return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                    <Checkbox color="primary"
                              onChange={onChangeStatusHandler}
                              checked={t.isDone}/>
                    <EditableSpan
                        title={t.title}
                        onChange={onChangeTitleHandler}
                    />
                    <IconButton onClick={onRemoveHandler}>
                        <Delete/>
                    </IconButton>
                </li>
            })}
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
}

