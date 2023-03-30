import {
    addTaskAC,
    changeTaskAC,
    removeTaskAC,
    tasksReducer, TasksStateType
} from './tasks-reducer'
import {removeTodolistAC} from "./todolists-reducer";
import {TaskStatuses} from "../../api/todolist-api";
import {RequestStatusType} from "../../app/app-reducer";

let startState: TasksStateType

beforeEach(() => {
    startState = {
        'todolistId1': [
            {
                id: '1',
                title: 'CSS',
                status: TaskStatuses.New,
                description: '',
                addedDate: '',
                deadline: '',
                order: 0,
                startDate: '',
                priority: 0,
                todoListId: '',
                entityStatus: 'idle'
            },
            {
                id: '2',
                title: 'JS',
                status: TaskStatuses.Completed,
                description: '',
                addedDate: '',
                deadline: '',
                order: 0,
                startDate: '',
                priority: 0,
                todoListId: '',
                entityStatus: 'idle'
            },
            {
                id: '3',
                title: 'React',
                status: TaskStatuses.New,
                description: '',
                addedDate: '',
                deadline: '',
                order: 0,
                startDate: '',
                priority: 0,
                todoListId: '',
                entityStatus: 'idle'
            },
        ],
        'todolistId2': [
            {
                id: '1',
                title: 'bread',
                status: TaskStatuses.New,
                description: '',
                addedDate: '',
                deadline: '',
                order: 0,
                startDate: '',
                priority: 0,
                todoListId: '',
                entityStatus: 'idle'
            },
            {
                id: '2',
                title: 'milk',
                status: TaskStatuses.Completed,
                description: '',
                addedDate: '',
                deadline: '',
                order: 0,
                startDate: '',
                priority: 0,
                todoListId: '',
                entityStatus: 'idle'
            },
            {
                id: '3',
                title: 'tea',
                status: TaskStatuses.New,
                description: '',
                addedDate: '',
                deadline: '',
                order: 0,
                startDate: '',
                priority: 0,
                todoListId: '',
                entityStatus: 'idle'
            },
        ]
    }
})

test('correct task should be deleted from correct array', () => {
    const action = removeTaskAC('2', 'todolistId2')
    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        'todolistId1': [
            {
                id: '1',
                title: 'CSS',
                status: TaskStatuses.New,
                description: '',
                addedDate: '',
                deadline: '',
                order: 0,
                startDate: '',
                priority: 0,
                todoListId: ''
            },
            {
                id: '2',
                title: 'JS',
                status: TaskStatuses.Completed,
                description: '',
                addedDate: '',
                deadline: '',
                order: 0,
                startDate: '',
                priority: 0,
                todoListId: ''
            },
            {
                id: '3',
                title: 'React',
                status: TaskStatuses.New,
                description: '',
                addedDate: '',
                deadline: '',
                order: 0,
                startDate: '',
                priority: 0,
                todoListId: ''
            },
        ],
        'todolistId2': [
            {
                id: '1',
                title: 'bread',
                status: TaskStatuses.New,
                description: '',
                addedDate: '',
                deadline: '',
                order: 0,
                startDate: '',
                priority: 0,
                todoListId: ''
            },
            {
                id: '3',
                title: 'tea',
                status: TaskStatuses.New,
                description: '',
                addedDate: '',
                deadline: '',
                order: 0,
                startDate: '',
                priority: 0,
                todoListId: ''
            },
        ]
    })
})

test('correct task should be added to correct array', () => {
    const action = addTaskAC({
        id: '1',
        title: 'juce',
        status: TaskStatuses.New,
        description: '',
        addedDate: '',
        deadline: '',
        order: 0,
        startDate: '',
        priority: 0,
        todoListId: 'todolistId2'
    })

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juce')
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
})

test('status of specified task should be changed', () => {
    const action = changeTaskAC('2', {status: TaskStatuses.New}, 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New)
    expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed)
    // expect(endState['todolistId1'][1].status).toBe(TaskStatuses.New)
})

test('title of specified task should be changed', () => {
    const action = changeTaskAC('2', {title: 'false'}, 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].title).toBe('false')
    expect(endState['todolistId1'][1].title).toBe('JS')
})

// test('new array should be added when new todolist is added', () => {
//     const action = addTodolistAC({
//         id: 'todolistId1',
//         addedDate: '',
//         order: 0,
//         title: 'new todolist'
//     })
//
//     const endState = tasksReducer(startState, action)
//
//     const keys = Object.keys(endState)
//     const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
//     if (!newKey) {
//         throw Error('new key should be added')
//     }
//
//     expect(keys.length).toBe(3)
//     expect(endState[newKey]).toEqual([])
// })

test('property with todolistId should be deleted', () => {
    const action = removeTodolistAC('todolistId2')

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})