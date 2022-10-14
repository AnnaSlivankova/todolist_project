import React from 'react';
import './App.css';
import {TodoList} from "./ToDoList";

function App() {
    return (
        <div className="App">
            <TodoList title='What to learn' tasks={tasks1}/>
        </div>
    );
}

const tasks1 = [
    {id: 1, title: "HTML&CSS", isDone: true},
    {id: 2, title: "JS", isDone: true},
    {id: 3, title: "React", isDone: false},
    {id: 4, title: "Rest API", isDone: true},
    {id: 5, title: "GraphQL", isDone: false},
]


export default App;
