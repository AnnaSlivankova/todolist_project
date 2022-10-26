import React, {useState, ChangeEvent, KeyboardEvent, MouseEvent} from 'react';
import {FilterValueType} from "./App";

type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type ToDoListType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValueType) => void
    addTask: (title: string) => void
}


export function TodoList(props: ToDoListType) {
    const [title, setTitle] = useState("")
    //добавление таски с проверкой на пустую строку
    // const addTask = () => {
    //     const trimmedTitle = title.trim()
    //     if (trimmedTitle) {
    //         props.addTask(trimmedTitle)
    //     }
    //     setTitle("")
    // }

    //добавление таски с проверкой на пустую строку и алертом через if/else
    // const addTask = () => {
    //     const trimmedTitle = title.trim()
    //     if (trimmedTitle) {
    //         props.addTask(trimmedTitle)
    //     } else {alert("Type your task here")}
    //     setTitle("")
    // }

//добавление таски с проверкой на пустую строку и алертом через тернарный оператор
    const addTask = () => {
        const trimmedTitle = title.trim()
        trimmedTitle !== ""
            ? props.addTask(trimmedTitle)
            : alert("You need to type your task here")
        setTitle("")
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTask()
        }
    }
    const onClickButtonHandler = (filter: FilterValueType) => (event: MouseEvent) => {
        props.changeFilter(filter)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}
                       placeholder="enter your task"/>
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {props.tasks.map((t) => {
                        const onClickHandler = () => {
                            props.removeTask(t.id)
                        }
                        return (
                            <li key={t.id}>
                                <input type="checkbox" checked={t.isDone}/>
                                <span>{t.title}</span>
                                <button onClick={onClickHandler}>✖️
                                </button>
                            </li>
                        )
                    }
                )}
            </ul>
            <div>
                <button onClick={onClickButtonHandler('all')}>All</button>
                <button onClick={onClickButtonHandler('active')}>Active</button>
                <button onClick={onClickButtonHandler('completed')}>Completed
                </button>
            </div>

        </div>
    );
}