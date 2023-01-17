import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {TasksType, TodoList} from "./ToDoList";

export type FilterValueType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}

export type TasksStateType = {
    [key: string]: TasksType[]
}

function App() {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
            {id: todolistID1, title: "What to learn", filter: "all"},
            {id: todolistID2, title: "What to read", filter: "all"}
        ]
    )

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Rest API", isDone: true},
            {id: v1(), title: "GraphQL", isDone: false}
        ],
        [todolistID2]: [
            {id: v1(), title: 'Head first', isDone: false},
            {id: v1(), title: 'JavaScript for kids', isDone: true},
            {id: v1(), title: 'HTML/CSS', isDone: false},
        ]
    })

    function removeTask(taskId: string, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = todolistTasks.filter(t => t.id !== taskId)
        setTasks({...tasks})
    }

    function addNewTask(title: string, todolistId: string) {
        const newTask = {id: v1(), title: title, isDone: false}
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = [newTask, ...todolistTasks]
        setTasks({...tasks})
    }

    function changeTaskStatus(taskId: string, isDone: boolean, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    function changeFilter(value: FilterValueType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    function removeTodolist(todolistId: string) {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    return (
        <div className="App">
            {
                todolists.map(todolists => {
                    let allTodolistTasks = tasks[todolists.id]
                    let tasksForTodolist = allTodolistTasks

                    if (todolists.filter === 'active') {
                        tasksForTodolist = allTodolistTasks.filter(t => !t.isDone)
                    }
                    if (todolists.filter === 'completed') {
                        tasksForTodolist = allTodolistTasks.filter(t => t.isDone)
                    }

                    return <TodoList key={todolists.id}
                                     id={todolists.id}
                                     title={todolists.title}
                                     tasks={tasksForTodolist}
                                     removeTask={removeTask}
                                     changeFilter={changeFilter}
                                     addTask={addNewTask}
                                     changeTaskStatus={changeTaskStatus}
                                     filter={todolists.filter}
                                     removeTodolist={removeTodolist}
                    />
                })
            }
        </div>
    );
}


export default App;
