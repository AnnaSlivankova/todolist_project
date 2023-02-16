import React, {useCallback} from 'react';
import './App.css';
import {TasksType, TodoList} from "./ToDoList";
import {AddItemForm} from "./AddItemForm";
import Header from "./Header";
import {Container, Grid, Paper} from "@mui/material";
import {
    addTodolistAC,
    changeTodolistFilterAC, changeTodolistTitleAC,
    removeTodolistAC,
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterValueType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}
export type TasksStateType = {
    [key: string]: TasksType[]
}

function AppWithRedux() {
    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const removeTask = useCallback((taskId: string, todolistId: string) => {
        const action = removeTaskAC(taskId, todolistId)
        dispatch(action)}, [dispatch])

    const addNewTask = useCallback((title: string, todolistId: string) => {
        const action = addTaskAC(title, todolistId)
        dispatch(action)}, [dispatch])

    const changeTaskStatus = useCallback((taskId: string, isDone: boolean, todolistId: string) => {
        const action = changeTaskStatusAC(taskId, isDone, todolistId)
        dispatch(action)}, [dispatch])

    const changeTaskTitle = useCallback((taskId: string, newTitle: string, todolistId: string) => {
        const action = changeTaskTitleAC(taskId, newTitle, todolistId)
        dispatch(action)}, [dispatch])

    const changeFilter = useCallback((value: FilterValueType, todolistId: string) => {
        const action = changeTodolistFilterAC(todolistId, value)
        dispatch(action)}, [dispatch])

    const addTodolist = useCallback((title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)}, [dispatch])

    const removeTodolist = useCallback((todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)}, [dispatch])

    const changeTodolistTitle = useCallback((newTitle: string, todolistId: string) => {
        const action = changeTodolistTitleAC(todolistId, newTitle)
        dispatch(action)}, [dispatch])

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
                            let tasksForTodolist = allTodolistTasks

                            return <Grid item key={todolists.id}>
                                <Paper style={{padding: '10px'}}>
                                    <TodoList
                                              id={todolists.id}
                                              title={todolists.title}
                                              tasks={tasksForTodolist}
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
