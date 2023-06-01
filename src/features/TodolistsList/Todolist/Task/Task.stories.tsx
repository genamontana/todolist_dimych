import {action} from '@storybook/addon-actions';
import React from 'react';
import {Task} from './Task';
import {TaskPriorities, TaskStatuses} from '../../../../api/todolists-api';

export default {
    title: 'Task Component',
    component: Task
}

const changeTaskStatusCallback = action('Status changed')
const changeTaskTitleCallback = action('Title changed')
const removeTaskCallback = action('Task removed')

export const TaskBaseExample = () => {
    return <>
        <Task
            task={{
                id: '1',
                status: TaskStatuses.Completed,
                title: 'CSS',
                todoListId: 'todoListId_2',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            }}
            changeTaskStatus={changeTaskStatusCallback}
            changeTaskTitle={changeTaskTitleCallback}
            removeTask={removeTaskCallback}
            todolistId={'todoListId_2'}
        />
        <Task
            task={{
                id: '2',
                status: TaskStatuses.New,
                title: 'JS',
                todoListId: 'todoListId_2',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            }}
            changeTaskStatus={changeTaskStatusCallback}
            changeTaskTitle={changeTaskTitleCallback}
            removeTask={removeTaskCallback}
            todolistId={'todoListId_2'}
        />
    </>

}