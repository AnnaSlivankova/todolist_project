import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
    'API-KEY': 'e7e136a6-8e6e-4c40-93aa-a3e78322d4dd'
  }
})

// api
export const authAPI = {
  login(loginParams: LoginParamsType) {
    return instance.post<ResponseType<{ userId: number }>>('auth/login', loginParams)
      .then(res => res.data)
  },
  authMe() {
    return instance.get<ResponseType<AuthMeResponseDataType>>('auth/me')
      .then(res => res.data)

  },
  logout() {
    return instance.delete<ResponseType>('auth/login')
      .then(res => res.data)
  }
}

export const todolistAPI = {
  getTodolists() {
    return instance.get<TodolistType[]>('todo-lists')
      .then(res => res.data)
  },
  createTodolist(title: string) {
    return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title})
      .then(res => res.data)
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
      .then(res => res.data)
  },
  updateTodolist(todolistId: string, title: string) {
    return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
      .then(res => res.data)
  }
}

export const tasksAPI = {
  getTasks(todolistId: string) {
    return instance.get<{
      items: TaskType[],
      totalCount: number,
      error: string
    }>(`todo-lists/${todolistId}/tasks`)
      .then(res => res.data)
  },
  createTask(todolistId: string, title: string) {
    return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title})
      .then(res => res.data)
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
      .then(res => res.data)
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskType) {
    return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
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
type AuthMeResponseDataType = {
  id: number
  email: string
  login: string
}
type LoginParamsType = {
  email: string
  password: string
  rememberMe?: boolean
  captcha?: boolean
}
export type ResponseType<D = {}> = {
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

