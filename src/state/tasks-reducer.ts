import {AddTodolistActionType, GetTodolistsActionType, RemoveTodolistActionType} from "./todolists-reducer";
import {TasksStateType} from "../AppWithRedux";
import {TaskPriorities, tasksAPI, TaskStatuses, TaskType, UpdateTaskType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

type ActionsTasksType = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | GetTodolistsActionType
    | ReturnType<typeof getTasksAC>
    | ReturnType<typeof changeTaskAC>

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsTasksType): TasksStateType => {
    switch (action.type) {
        case "GET-TASKS": {
            return {
                ...state,
                [action.todolistId]: action.tasks
            }
        }
        case "GET-TODOLISTS": {
            let stateCopy = {...state}
            action.todolists.forEach(tl => stateCopy[tl.id] = [])
            return stateCopy
        }
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            }
        case 'ADD-TASK':
            return {
                ...state,
                [action.tasks.todoListId]: [{...action.tasks}, ...state[action.tasks.todoListId]]
            }
        case "CHANGE-TASK":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    ...action.model
                } : t)
            }
        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.todolist.id]: []
            }
        case 'REMOVE-TODOLIST':
            const {[action.id]: [], ...rest} = {...state}
            return rest
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: 'REMOVE-TASK', taskId, todolistId} as const
}
export const addTaskAC = (tasks: TaskType) => {
    return {type: 'ADD-TASK', tasks} as const
}
export const changeTaskAC = (taskId: string, model: UpdateTaskDomainType, todolistId: string) => {
    return {type: 'CHANGE-TASK', todolistId, taskId, model} as const
}
export const getTasksAC = (todolistId: string, tasks: TaskType[]) => {
    return {type: 'GET-TASKS', todolistId, tasks} as const
}

export const getTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    tasksAPI.getTasks(todolistId)
        .then((res) => {
            dispatch(getTasksAC(todolistId, res.items))
        })
}
export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    tasksAPI.deleteTask(todolistId, taskId)
        .then(res => dispatch(removeTaskAC(taskId, todolistId)))
}
export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    tasksAPI.createTask(todolistId, title)
        .then(res => dispatch(addTaskAC(res.data.item)))
}
export const changeTaskTC = (todolistId: string, taskId: string, model: UpdateTaskDomainType) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const task = getState().tasks[todolistId].find(el => el.id === taskId)

    if (task) {
        const domainModel: UpdateTaskType = {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...model
        }

        tasksAPI.updateTask(todolistId, taskId, domainModel)
            .then(res => dispatch(changeTaskAC(taskId, model, todolistId)))
    }
}

type UpdateTaskDomainType = {
    id?: string
    title?: string
    description?: string
    todoListId?: string
    order?: number
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
    addedDate?: string
}