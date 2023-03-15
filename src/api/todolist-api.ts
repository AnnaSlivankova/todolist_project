import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'e7e136a6-8e6e-4c40-93aa-a3e78322d4dd'
    }
})

// api
export const todolistAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists')
            .then(res => res.data)
    },
    createTodolist(title: string) {
        return instance.post<ResponseTodolistType<{item: TodolistType}>>('todo-lists', {title})
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
        return instance.get<{ items: TaskType[],
            totalCount: number,
            error: string }>(`todo-lists/${todolistId}/tasks`)
            .then(res => res.data)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseTasksType<{item: TaskType}>>(`todo-lists/${todolistId}/tasks`, {title})
            .then(res => res.data)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseTasksType>(`todo-lists/${todolistId}/tasks/${taskId}`)
            .then(res => res.data)
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskType) {
        return instance.put<ResponseTasksType>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
            .then(res => res.data)
    }
}


// types
export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
type ResponseTodolistType<D = {}> = {
    resultCode: number,
    messages: string[],
    data: D
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
export type TaskType = {
    id: string
    title: string
    description: string
    todoListId: string
    order: number
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    addedDate: string

}
type ResponseTasksType<D = {}> = {
    resultCode: number
    messages: string[]
    data: D
}
export type UpdateTaskType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

