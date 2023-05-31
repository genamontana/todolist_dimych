import React, {useCallback, useEffect} from 'react'
import './App.css';
import {Todolist} from '../Todolist';
import {AddItemForm} from '../components/AddItemForm/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodolistTC,
    TodolistDomainType
} from '../state/todolists-reducer';
import {
    addTaskTC,
    removeTaskTC, updateTaskTC
} from '../state/tasks-reducer';
import {useSelector} from 'react-redux';
import {AppRootStateType, useAppDispatch} from '../state/store';
import {TaskStatuses, TaskType} from '../api/todolists-api';


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

/*
const Fake = React.memo(function() {
    console.log("FAKE")
    const arr = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks.count)
    return <h1>{arr.length}</h1>
})
*/

function App() {
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <TodolistsList/>
            </Container>
        </div>
    );
}


type TodolistsListPropsType = {}

const TodolistsList: React.FC<TodolistsListPropsType> = (props) => {

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [dispatch])

    const removeTask = useCallback(function (id: string, todolistId: string) {
        dispatch(removeTaskTC(todolistId, id))
    }, [dispatch]);

    const addTask = useCallback(function (title: string, todolistId: string) {
        dispatch(addTaskTC(title, todolistId));
    }, [dispatch]);

    const changeStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
        dispatch(updateTaskTC(id, {status}, todolistId));
    }, [dispatch]);

    const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
        dispatch(updateTaskTC(id, {title: newTitle}, todolistId));
    }, [dispatch]);

    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(todolistId, value);
        dispatch(action);
    }, [dispatch]);

    const removeTodolist = useCallback(function (id: string) {
        dispatch(removeTodolistTC(id));
    }, [dispatch]);

    const changeTodolistTitle = useCallback((id: string, title: string) => {
        dispatch(changeTodolistTitleTC(id, title));
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title));
    }, [dispatch]);

    return (
        <>
            <Grid container style={{padding: '20px'}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={3}>
                {
                    todolists.map(tl => {

                        return (
                            <Grid item key={tl.id}>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasks[tl.id]}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>)
                    })
                }
            </Grid>
        </>
    )

}

export default App;
