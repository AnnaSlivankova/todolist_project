import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./ToDoList";

export type FilterValueType = 'all' | 'active' | 'completed'

function App() {
    let [tasks, setTasks] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false},
        {id: 4, title: "Rest API", isDone: true},
        {id: 5, title: "GraphQL", isDone: false},
    ])

    function removeTask(id: number) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }


    let [filter, setFilter] = useState<FilterValueType>('all')
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
                      removeTask={removeTask}/>
        </div>
    );
}


export default App;
