import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import Counter from './Counter/Counter';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'completed' | 'active';
type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    const removeTask = (id: string, todoListId:string) => {
        let task = tasksObj[todoListId]
        let filteredTasks = task.filter(t => t.id !== id)
        tasksObj[todoListId] = filteredTasks
        setTasksObj({...tasksObj})
    }

    const addTask = (title: string, todoListId:string) => {
        let task = {id: v1(), title, isDone: false}
        let tasks = tasksObj[todoListId]
        let newTasks = [task, ...tasks]
        tasksObj[todoListId]=newTasks
        setTasksObj({...tasksObj})
    }

    const changeStatus = (id: string, isDone: boolean,todoListId:string) => {
        let tasks = tasksObj[todoListId]
        let task = tasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
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

    let todoListId1 = v1()
    let todoListId2 = v1()

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId1, title: 'What to learn', filter: 'active'},
        {id: todoListId2, title: 'What to buy', filter: 'completed'}
    ])

    let [tasksObj, setTasksObj] = useState({
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

    return (
        <div className="App">
            {todoLists.map(tl => {
                let tasksForTodolist = tasksObj[tl.id]
                if (tl.filter === 'completed') {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
                }
                if (tl.filter === 'active') {
                    tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
                }
                return <Todolist
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeStatus={changeStatus}
                    filter={tl.filter}
                />
            })}
            <Counter/>
        </div>
    );
}

export default App;
