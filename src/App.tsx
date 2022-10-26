import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {TodoList} from "./ToDoList";

export type FilterValueType = 'all' | 'active' | 'completed'

function App() {
    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Rest API", isDone: true},
        {id: v1(), title: "GraphQL", isDone: false},
    ])

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }

    let [filter, setFilter] = useState<FilterValueType>('all')


    function addNewTask(title: string) {
        const newTask = {id: v1(), title: title, isDone: false}
        setTasks([...tasks, newTask])
    }

    // function addNewTask() {
    //     const newTask = {id: v1(), title: "new task", isDone: false}
    //     let newTasksArr = [...tasks, newTask]
    //     setTasks(newTasksArr)
    //     console.log(newTasksArr)
    // }

    let tasksForTodolist = tasks
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone)
    }

    function changeFilter(value: FilterValueType) {
        setFilter(value)
    }

    return (
        <div className="App">
            <TodoList title='What to learn'
                      tasks={tasksForTodolist}
                      changeFilter={changeFilter}
                      removeTask={removeTask}
                      addTask={addNewTask}
            />
        </div>
    );
}


export default App;
