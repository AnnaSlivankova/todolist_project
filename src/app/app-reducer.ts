import {Dispatch} from "redux";
import {authAPI} from "../api/todolist-api";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isInitialized: false as boolean
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case "APP/SET-IS-INITIALIZED-STATUS":
            return {...state, isInitialized: action.isInitialisedStatus}
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => {
    return {type: 'APP/SET-STATUS', status: status} as const
}
export const setAppErrorAC = (error: string | null) => {
    return {type: 'APP/SET-ERROR', error} as const
}
export const setIsInitializedStatusAC = (isInitialisedStatus: boolean) => {
    return {type: 'APP/SET-IS-INITIALIZED-STATUS', isInitialisedStatus} as const
}

export const initializeAppTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.authMe()
        .then(res => {
            if (res.resultCode === 0) {
                dispatch(setIsLoggedInAC(true));
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
        .finally(() => dispatch(setIsInitializedStatusAC(true)))
}


type ActionsType = SetAppStatusActionType
    | SetAppErrorActionType
    | ReturnType<typeof setIsInitializedStatusAC>

export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>