import React from 'react';
import './App.css';
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import Header from "../components/Header/Header";
import {Container, LinearProgress} from "@mui/material";
import {useAppSelector} from "./store";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";

function App() {
    const status = useAppSelector<string>(state => state.app.status)

    return (
        <div className="App">

            <ErrorSnackbar/>

            <Header/>

            {status === 'loading' && <LinearProgress color="secondary"/>}

            <Container fixed>
                <TodolistsList/>
            </Container>
        </div>
    );
}


export default App;
