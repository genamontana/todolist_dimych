import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import Counter from './Counter/Counter';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {Container, Grid, Paper,} from '@mui/material';
import {AppBarMenu} from './AppBarMenu';
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todoListsReducer
} from './state/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/tasks-reducer';

export type FilterValuesType = 'all' | 'completed' | 'active';

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

function AppWithRedux() {
    let todoListId1 = v1()
    let todoListId2 = v1()

    let [todoLists, dispatchToTodoListsReducer] = useReducer(todoListsReducer, [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'}
    ])

    let [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer, {
            [todoListId1]: [
                {id: v1(), title: 'CSS', isDone: true},
                {id: v1(), title: 'JS', isDone: true},
                {id: v1(), title: 'ReactJS', isDone: false},
                {id: v1(), title: 'Redux', isDone: false},],
            [todoListId2]: [
                {id: v1(), title: 'Book', isDone: false},
                {id: v1(), title: 'Milk', isDone: true},
            ]
        }
    )

    const removeTask = (id: string, todoListId: string) => {
        dispatchToTasksReducer(removeTaskAC(id, todoListId))
    }
    const addTask = (title: string, todoListId: string) => {
        dispatchToTasksReducer(addTaskAC(title, todoListId))
    }
    const changeStatus = (id: string, isDone: boolean, todoListId: string) => {
        dispatchToTasksReducer(changeTaskStatusAC(id, isDone, todoListId))
    }
    const changeTaskTitle = (id: string, newTitle: string, todoListId: string) => {
        dispatchToTasksReducer(changeTaskTitleAC(id, newTitle, todoListId))
    }
    const changeFilter = (value: FilterValuesType, todoListId: string) => {
        dispatchToTodoListsReducer(changeTodoListFilterAC(todoListId, value))
    }
    let removeTodoList = (todoListId: string) => {
        const action = removeTodoListAC(todoListId)
        dispatchToTodoListsReducer(action)
        dispatchToTasksReducer(action)
    }

    function changeTodoListTitle(id: string, newTitle: string) {
        dispatchToTodoListsReducer(changeTodoListTitleAC(id, newTitle))
    }

    function addTodoList(title: string) {
        const action = addTodoListAC(title)
        dispatchToTodoListsReducer(action)
        dispatchToTasksReducer(action)
    }


    return (
        <div className="App">
            <AppBarMenu/>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoLists.map(tl => {
                        let tasksForTodolist = tasksObj[tl.id]
                        if (tl.filter === 'completed') {
                            tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
                        }
                        if (tl.filter === 'active') {
                            tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
                        }
                        return <Grid item>
                            <Paper style={{padding: '10px'}}>
                                <Todolist
                                    key={tl.id}
                                    id={tl.id}
                                    title={tl.title}
                                    tasks={tasksForTodolist}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeStatus={changeStatus}
                                    changeTaskTitle={changeTaskTitle}
                                    filter={tl.filter}
                                    removeTodoList={removeTodoList}
                                    changeTodoListTitle={changeTodoListTitle}
                                />
                            </Paper>
                        </Grid>
                    })}
                </Grid>
            </Container>
            <Counter/>
        </div>
    );
}

export default AppWithRedux;
