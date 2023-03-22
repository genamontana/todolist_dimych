import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from '@mui/material';
import {EditableSpan} from './EditableSpan';
import {Delete} from '@mui/icons-material';
import {TaskType} from './Todolist';

type TaskPropsType = {
    removeTask: (id: string, todoListId: string) => void,
    changeStatus: (id: string, isDone: boolean, todoListId: string) => void,
    changeTaskTitle: (id: string, newTitle: string, todoListId: string) => void,
    task: TaskType,
    todoListId: string
}
export const Task = React.memo((props: TaskPropsType) => {

    const onRemoveHandler = () => props.removeTask(props.task.id, props.todoListId)
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeStatus(props.task.id, newIsDoneValue, props.todoListId)
    }
    const onChangeTitleHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todoListId)
    },[props.changeTaskTitle,props.task.id,props.todoListId])

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
})