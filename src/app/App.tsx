import React, {useEffect} from 'react';
import './App.css';
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import Header from "../components/Header/Header";
import {CircularProgress, Container, LinearProgress} from "@mui/material";
import {useAppDispatch, useAppSelector} from "./store";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {Login} from "../features/Login/Login";
import {Navigate, Route, Routes} from "react-router-dom";
import {initializeAppTC} from "./app-reducer";

function App() {
    const status = useAppSelector<string>(state => state.app.status)
    const isInitialized = useAppSelector<boolean>(state => state.app.isInitialized)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className="App">

            <ErrorSnackbar/>

            <Header/>

            {status === 'loading' && <LinearProgress color="secondary"/>}

            <Container fixed>
                <Routes>
                    <Route path='/' element={<TodolistsList/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/404' element={<h1>404: PAGE NOT FOUND</h1>}/>
                    <Route path='*' element={<Navigate to='/404'/>}/>
                </Routes>
            </Container>
        </div>
    );
}


export default App;
