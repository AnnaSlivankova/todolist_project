import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './tasks-reducer'
import {addTodolistAC, removeTodolistAC} from "./todolists-reducer";
import {TasksStateType} from "../AppWithRedux";
import {Completed} from "../api/todolist-api";

let startState: TasksStateType

beforeEach(() => {
    startState = {
        'todolistId1': [
            {id: '1', title: 'CSS', completed: Completed.notDone, description: '', addedDate: '', deadline: '', order: 0, startDate: '', priority: 0, status: 0, todoListId: ''},
            {id: '2', title: 'JS', completed: Completed.done, description: '', addedDate: '', deadline: '', order: 0, startDate: '', priority: 0, status: 0, todoListId: ''},
            {id: '3', title: 'React', completed: Completed.notDone, description: '', addedDate: '', deadline: '', order: 0, startDate: '', priority: 0, status: 0, todoListId: ''},
        ],
        'todolistId2': [
            {id: '1', title: 'bread', completed: Completed.notDone, description: '', addedDate: '', deadline: '', order: 0, startDate: '', priority: 0, status: 0, todoListId: ''},
            {id: '2', title: 'milk', completed: Completed.done, description: '', addedDate: '', deadline: '', order: 0, startDate: '', priority: 0, status: 0, todoListId: ''},
            {id: '3', title: 'tea', completed: Completed.notDone, description: '', addedDate: '', deadline: '', order: 0, startDate: '', priority: 0, status: 0, todoListId: ''},
        ]
    }
})

test('correct task should be deleted from correct array', () => {
    const action = removeTaskAC('2', 'todolistId2')
    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        'todolistId1': [
            {id: '1', title: 'CSS', completed: Completed.notDone, description: '', addedDate: '', deadline: '', order: 0, startDate: '', priority: 0, status: 0, todoListId: ''},
            {id: '2', title: 'JS', completed: Completed.done, description: '', addedDate: '', deadline: '', order: 0, startDate: '', priority: 0, status: 0, todoListId: ''},
            {id: '3', title: 'React', completed: Completed.notDone, description: '', addedDate: '', deadline: '', order: 0, startDate: '', priority: 0, status: 0, todoListId: ''},
        ],
        'todolistId2': [
            {id: '1', title: 'bread', completed: Completed.notDone, description: '', addedDate: '', deadline: '', order: 0, startDate: '', priority: 0, status: 0, todoListId: ''},
            {id: '3', title: 'tea', completed: Completed.notDone, description: '', addedDate: '', deadline: '', order: 0, startDate: '', priority: 0, status: 0, todoListId: ''},
        ]
    })
})

test('correct task should be added to correct array', () => {
    const action = addTaskAC('juce', 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juce')
    expect(endState['todolistId2'][0].completed).toBe(Completed.notDone)
})

test('status of specified task should be changed', () => {
    const action = changeTaskStatusAC('2', Completed.notDone, 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].completed).toBe(Completed.notDone)
    expect(endState['todolistId1'][1].completed).toBe(Completed.done)
})

test('title of specified task should be changed', () => {
    const action = changeTaskTitleAC('2', 'false', 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].title).toBe('false')
    expect(endState['todolistId1'][1].title).toBe('JS')
})

test('new array should be added when new todolist is added', () => {
    const action = addTodolistAC('new todolist')

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
    const action = removeTodolistAC('todolistId2')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})