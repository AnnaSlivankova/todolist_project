import {useEffect, useState} from "react";
import {tasksAPI, todolistAPI} from "../api/todolist-api";

export default {
    title: 'API/API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistAPI.getTodolists()
            .then(res => setState(res))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const title = 'new todolist title'

    useEffect(() => {
        todolistAPI.createTodolist(title)
            .then(res => setState(res))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '66f4175e-288e-4d25-9ce6-b3f07c1e5dd1'

    useEffect(() => {
        todolistAPI.deleteTodolist(todolistId)
            .then(res => setState(res))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '66f4175e-288e-4d25-9ce6-b3f07c1e5dd1'
    const title = 'updated todolist title'

    useEffect(() => {
        todolistAPI.updateTodolist(todolistId, title)
            .then(res => setState(res))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '5716ed0a-e67e-4cd1-acb0-d18895816e52'

    useEffect(() => {
        tasksAPI.getTasks(todolistId)
            .then(res => setState(res))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '5716ed0a-e67e-4cd1-acb0-d18895816e52'
    const title = 'new task title'

    useEffect(() => {
        tasksAPI.createTask(todolistId, title)
            .then(res => setState(res))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '5716ed0a-e67e-4cd1-acb0-d18895816e52'
    const taskId = 'a2bd82e8-390a-427e-8185-a4c678df89c6'

    useEffect(() => {
        tasksAPI.deleteTask(todolistId, taskId)
            .then(res => setState(res))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '5716ed0a-e67e-4cd1-acb0-d18895816e52'
    const taskId = '8d8650b3-9b70-4ef8-87f2-9681ef353e3d'
    const title = 'updated task title'

    useEffect(() => {
        tasksAPI.updateTask(todolistId, taskId, title)
            .then(res => setState(res))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}