import {Provider} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {combineReducers, createStore} from "redux";
import {v1} from "uuid";
import {todolistsReducer} from "../../features/TodolistsList/todolists-reducer";
import {tasksReducer} from "../../features/TodolistsList/tasks-reducer";
import {TaskStatuses} from "../../api/todolist-api";
import {appReducer} from "../../app/app-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer
})

const initialGlobalState = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'}
    ],
    tasks: {
        ['todolistId1']: [
            {id: v1(),
                title: 'HTML&CSS',
                description: '',
                status: TaskStatuses.Completed,
                priority: 0,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 0,
                addedDate: '',
                entityStatus: 'idle'
            },
            {id: v1(),
                title: 'JS',
                status: TaskStatuses.Completed,
                description: '',
                priority: 0,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 0,
                addedDate: '',
                entityStatus: 'idle'
            }
        ],
        ['todolistId2']: [
            {id: v1(),
                title: 'Milk',
                status: TaskStatuses.Completed,
                description: '',
                priority: 0,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 0,
                addedDate: '',
                entityStatus: 'idle'
            },
            {id: v1(),
                title: 'React Book',
                status: TaskStatuses.Completed,
                description: '',
                priority: 0,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 0,
                addedDate: '',
                entityStatus: 'idle'
            }
        ]
    },
    app: {status: 'idle', error: null}
}

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType)


export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}