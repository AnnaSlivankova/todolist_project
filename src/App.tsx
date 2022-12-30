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

    function changeStatus(id: string, isDone: boolean) {
        let task = tasks.find(el => el.id === id)
        if (task) {
            task.isDone = isDone
            setTasks([...tasks])
        }
    }

    return (
        <div className="App">
            <TodoList title='What to learn'
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addNewTask}
                      changeTaskStatus={changeStatus}
                      filter={filter}
            />
        </div>
    );
}


export default App;
