import {AddTodolistActionType, GetTodolistsActionType, RemoveTodolistActionType} from "./todolists-reducer";
import {TaskPriorities, tasksAPI, TaskStatuses, TaskType, UpdateTaskType} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../app/store";
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

type ActionsTasksType = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | GetTodolistsActionType
    | ReturnType<typeof getTasksAC>
    | ReturnType<typeof changeTaskAC>
    | ReturnType<typeof changeTaskEntityStatusAC>

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsTasksType): TasksStateType => {
    switch (action.type) {
        case "CHANGE-TASK-ENTITY-STATUS":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, entityStatus: action.entityStatus} : t)
            }
        case "GET-TASKS":
            const newTasks = action.tasks.map(t => ({...t, entityStatus: 'idle' as RequestStatusType}))
            return {...state, [action.todolistId]: newTasks}
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
                [action.tasks.todoListId]: [{...action.tasks, entityStatus: 'idle'}, ...state[action.tasks.todoListId]]
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
export const changeTaskEntityStatusAC = (todolistId: string, taskId: string, entityStatus: RequestStatusType) => {
    return {type: 'CHANGE-TASK-ENTITY-STATUS', todolistId, taskId, entityStatus} as const
}


export const getTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    tasksAPI.getTasks(todolistId)
        .then((res) => {
            dispatch(getTasksAC(todolistId, res.items))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}
export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTaskEntityStatusAC(todolistId, taskId, 'loading'))
    tasksAPI.deleteTask(todolistId, taskId)
        .then(res => {
            dispatch(removeTaskAC(taskId, todolistId))
            dispatch(setAppStatusAC('succeeded'))
            dispatch(changeTaskEntityStatusAC(todolistId, taskId, 'succeeded'))
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
            dispatch(changeTaskEntityStatusAC(todolistId, taskId, 'failed'))
        })
}
export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    tasksAPI.createTask(todolistId, title)
        .then(res => {
            if (res.resultCode === 0) {
                dispatch(addTaskAC(res.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
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

        dispatch(setAppStatusAC('loading'))
        dispatch(changeTaskEntityStatusAC(todolistId, taskId, 'loading'))
        tasksAPI.updateTask(todolistId, taskId, domainModel)
            .then(res => {
                if (res.resultCode === 0) {
                    dispatch(changeTaskAC(taskId, model, todolistId))
                    dispatch(changeTaskEntityStatusAC(todolistId, taskId, 'succeeded'))
                } else {
                    handleServerAppError(res, dispatch)
                    dispatch(changeTaskEntityStatusAC(todolistId, taskId, 'failed'))
                }
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch)
                dispatch(changeTaskEntityStatusAC(todolistId, taskId, 'failed'))
            })
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

export type TasksStateType = {
    [key: string]: TaskDomainType[]
}

export type TaskDomainType = TaskType & { entityStatus: RequestStatusType }
