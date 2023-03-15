import React, {useCallback, useEffect} from 'react';
import './App.css';
import {TodoList} from "./ToDoList";
import {AddItemForm} from "./AddItemForm";
import Header from "./Header";
import {Container, Grid, Paper} from "@mui/material";
import {
    addTodolistTC,
    changeTodolistFilterAC, changeTodolistTitleTC, FilterValueType, getTodolistsTC,
    removeTodolistTC, TodolistDomainType,
} from "./state/todolists-reducer";
import {
    addTaskTC,
    changeTaskTC,
    removeTaskTC
} from "./state/tasks-reducer";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "./state/store";
import {TaskStatuses, TaskType} from "./api/todolist-api";

export type TasksStateType = {
    [key: string]: TaskType[]
}

function AppWithRedux() {
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useAppDispatch()

    const removeTask = useCallback((taskId: string, todolistId: string) => {
        dispatch(removeTaskTC(todolistId, taskId))
    }, [dispatch])

    const addNewTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskTC(todolistId, title))
    }, [dispatch])

    const changeTaskStatus = useCallback((taskId: string, status: TaskStatuses, todolistId: string) => {
        dispatch(changeTaskTC(todolistId, taskId, {status}))
    }, [dispatch])

    const changeTaskTitle = useCallback((taskId: string, newTitle: string, todolistId: string) => {
        dispatch(changeTaskTC(todolistId, taskId, {title: newTitle}))
    }, [dispatch])

    const changeFilter = useCallback((value: FilterValueType, todolistId: string) => {
        const action = changeTodolistFilterAC(todolistId, value)
        dispatch(action)
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistTC(todolistId))
    }, [dispatch])

    const changeTodolistTitle = useCallback((newTitle: string, todolistId: string) => {
        dispatch(changeTodolistTitleTC(todolistId, newTitle))
    }, [dispatch])

    useEffect(() => {
        dispatch(getTodolistsTC())
    }, [])

    return (
        <div className="App">
            <Header/>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(todolists => {
                            let allTodolistTasks = tasks[todolists.id]

                            return <Grid item key={todolists.id}>
                                <Paper style={{padding: '10px'}}>
                                    <TodoList
                                        id={todolists.id}
                                        title={todolists.title}
                                        tasks={allTodolistTasks}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addNewTask}
                                        changeTaskStatus={changeTaskStatus}
                                        filter={todolists.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}


export default AppWithRedux;
