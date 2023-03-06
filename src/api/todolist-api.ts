import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'e7e136a6-8e6e-4c40-93aa-a3e78322d4dd'
    }
})

type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type DataType = {
    item: TodolistType
}

export type ResponseTodolistType<D = {}> = {
    resultCode: number,
    messages: string[],
    data: D
}

export const todolistAPI = {
    getTodolists() {
        return instance.get<TodolistType>('todo-lists')
            .then(res => res.data)
    },
    createTodolist(title: string) {
        return instance.post<ResponseTodolistType<DataType>>('todo-lists', {title})
            .then(res => res.data)
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseTodolistType>(`todo-lists/${todolistId}`)
            .then(res => res.data)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseTodolistType>(`todo-lists/${todolistId}`, {title})
            .then(res => res.data)
    }
}

export const tasksAPI = {
    getTasks(todolistId: string) {
        return instance.get<{ items: TaskType[], totalCount: number, error: string }>(`todo-lists/${todolistId}/tasks`)
            .then(res => res.data)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseTasksType<TaskDataType>>(`todo-lists/${todolistId}/tasks`, {title})
            .then(res => res.data)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseTasksType>(`todo-lists/${todolistId}/tasks/${taskId}`)
            .then(res => res.data)
    },
    updateTask(todolistId: string, taskId: string, title: string) {
        return instance.put<ResponseTasksType>(`todo-lists/${todolistId}/tasks/${taskId}`, {title})
            .then(res => res.data)
    }
}

type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type TaskDataType = {
    item: TaskType
}

type ResponseTasksType<D = {}> = {
    resultCode: number
    messages: string[]
    data: D
}
