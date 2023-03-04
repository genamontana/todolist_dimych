import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import Counter from './Counter/Counter';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {Container, Grid, Paper,} from '@mui/material';
import {AppBarMenu} from './AppBarMenu';

export type FilterValuesType = 'all' | 'completed' | 'active';

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

function AppWithReducers() {

    const removeTask = (id: string, todoListId: string) => {
        let task = tasksObj[todoListId]
        let filteredTasks = task.filter(t => t.id !== id)
        tasksObj[todoListId] = filteredTasks
        setTasksObj({...tasksObj})
    }

    const addTask = (title: string, todoListId: string) => {
        let task = {id: v1(), title, isDone: false}
        let tasks = tasksObj[todoListId]
        let newTasks = [task, ...tasks]
        tasksObj[todoListId] = newTasks
        setTasksObj({...tasksObj})
    }

    const changeStatus = (id: string, isDone: boolean, todoListId: string) => {
        let tasks = tasksObj[todoListId]
        let task = tasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
            setTasksObj({...tasksObj})
        }
    }
    const changeTaskTitle = (id: string, newTitle: string, todoListId: string) => {
        let tasks = tasksObj[todoListId]
        let task = tasks.find(t => t.id === id)
        if (task) {
            task.title = newTitle
            setTasksObj({...tasksObj})
        }
    }

    const changeFilter = (value: FilterValuesType, todoListId: string) => {
        let todoList = todoLists.find(tl => tl.id === todoListId)
        if (todoList) {
            todoList.filter = value
            setTodoLists([...todoLists])
        }
    }

    let removeTodoList = (todoListId: string) => {
        let filteredTodoList = todoLists.filter(tl => tl.id !== todoListId)
        setTodoLists(filteredTodoList)
        delete tasksObj[todoListId]
        setTasksObj({...tasksObj})
    }

    function changeTodoListTitle(id: string, newTitle: string) {
        const todoList = todoLists.find(tl => tl.id === id)
        if (todoList) {
            todoList.title = newTitle
            setTodoLists([...todoLists])
        }
    }

    let todoListId1 = v1()
    let todoListId2 = v1()

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'}
    ])

    let [tasksObj, setTasksObj] = useState<TasksStateType>({
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

    function addTodoList(title: string) {
        let todoList: TodoListType = {
            id: v1(),
            filter: 'all',
            title: title,
        }
        setTodoLists([todoList, ...todoLists])
        setTasksObj({...tasksObj, [todoList.id]: []})
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

export default AppWithReducers;
