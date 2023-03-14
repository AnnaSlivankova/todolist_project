import {Provider} from "react-redux";
import {AppRootStateType, store} from "../../state/store";
import {combineReducers, createStore} from "redux";
import {v1} from "uuid";
import {todolistsReducer} from "../../state/todolists-reducer";
import {tasksReducer} from "../../state/tasks-reducer";
import {Completed} from "../../api/todolist-api";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '', order: 0}
    ],
    tasks: {
        ['todolistId1']: [
            {id: v1(),
                title: 'HTML&CSS',
                completed: Completed.done,
                description: '',
                status: 0,
                priority: 0,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 0,
                addedDate: ''
            },
            {id: v1(),
                title: 'JS',
                completed: Completed.done,
                description: '',
                status: 0,
                priority: 0,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 0,
                addedDate: ''
            }
        ],
        ['todolistId2']: [
            {id: v1(),
                title: 'Milk',
                completed: Completed.done,
                description: '',
                status: 0,
                priority: 0,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 0,
                addedDate: ''
            },
            {id: v1(),
                title: 'React Book',
                completed: Completed.done,
                description: '',
                status: 0,
                priority: 0,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 0,
                addedDate: ''
            }
        ]
    }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType)


export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}