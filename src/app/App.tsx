import React from 'react';
import './App.css';
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import Header from "../components/Header/Header";
import {Container} from "@mui/material";


function App() {
    return (
        <div className="App">
            <Header/>
            <Container fixed>
                <TodolistsList/>
            </Container>
        </div>
    );
}


export default App;
