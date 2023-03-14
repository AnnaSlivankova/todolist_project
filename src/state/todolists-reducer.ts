import {v1} from "uuid";
import {TodolistType} from "../api/todolist-api";

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type ActionsTodolistsType = RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>

export type FilterValueType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & { filter: FilterValueType }

const initialState: TodolistDomainType[] = []

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: ActionsTodolistsType): TodolistDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            const newTodolist = {
                id: action.todolistId,
                title: action.title,
                filter: 'all' as FilterValueType,
                addedDate: '',
                order: 0
            }
            return [...state, newTodolist]
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
export const addTodolistAC = (title: string) => {
    return {type: 'ADD-TODOLIST', title: title, todolistId: v1()} as const
}
export const changeTodolistTitleAC = (todolistId: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: todolistId, title: title} as const
}
export const changeTodolistFilterAC = (todolistId: string, filter: FilterValueType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: todolistId, filter} as const
}