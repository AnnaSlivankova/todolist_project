import {todolistAPI, TodolistType} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type GetTodolistsActionType = ReturnType<typeof getTodolistsAC>
export type ActionsTodolistsType = RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | GetTodolistsActionType
    | ReturnType<typeof changeTodolistEntityStatusAC>

export type FilterValueType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & { filter: FilterValueType, entityStatus: RequestStatusType }

const initialState: TodolistDomainType[] = []

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: ActionsTodolistsType): TodolistDomainType[] => {
    switch (action.type) {
        case "CHANGE-TODOLIST-ENTITY-STATUS":
            return state.map(el => el.id === action.id ? {...el, entityStatus: action.entityStatus} : el)
        case "GET-TODOLISTS": {
            return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        }
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all' as FilterValueType, entityStatus: 'idle'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        default:
            return state
    }
}

export const removeTodolistAC = (todolistId: string) => {
    return {type: 'REMOVE-TODOLIST', id: todolistId} as const
}
export const addTodolistAC = (todolist: TodolistType) => {
    return {type: 'ADD-TODOLIST', todolist} as const
}
export const changeTodolistTitleAC = (todolistId: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: todolistId, title: title} as const
}
export const changeTodolistFilterAC = (todolistId: string, filter: FilterValueType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: todolistId, filter} as const
}
export const getTodolistsAC = (todolists: TodolistType[]) => {
    return {type: 'GET-TODOLISTS', todolists} as const
}
export const changeTodolistEntityStatusAC = (id: string, entityStatus: RequestStatusType) => {
    return {type: 'CHANGE-TODOLIST-ENTITY-STATUS', id, entityStatus} as const
}

export const getTodolistsTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.getTodolists()
        .then(res => {
            dispatch(getTodolistsAC(res))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}
export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
    todolistAPI.deleteTodolist(todolistId)
        .then(res => {
            dispatch(removeTodolistAC(todolistId))
            dispatch(setAppStatusAC('succeeded'))
            dispatch(changeTodolistEntityStatusAC(todolistId, 'succeeded'))
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
            dispatch(changeTodolistEntityStatusAC(todolistId, 'failed'))
        })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.createTodolist(title)
        .then(res => {
            if (res.resultCode === 0) {
                dispatch(addTodolistAC(res.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}
export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.updateTodolist(todolistId, title)
        .then(res => {
            if(res.resultCode === 0) {
                dispatch(changeTodolistTitleAC(todolistId, title))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}