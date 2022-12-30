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
    changeTaskStatus: (id: string, isDone: boolean) => void
    filter: FilterValueType
}

export function TodoList(props: ToDoListType) {
    const [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(title)
            setTitle("")
        } else {
            setError("Title is required")
        }
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
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
                       placeholder="enter your task here"
                       className={error ? "error" : ""}/>
                <button onClick={addTask}>+</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {props.tasks.map((t) => {
                        const onClickHandler = () => props.removeTask(t.id)
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newIsDoneValue = e.currentTarget.checked
                            props.changeTaskStatus(t.id, newIsDoneValue)
                        }
                        return (
                            <li key={t.id} className={t.isDone ? "is-done" : ""}>
                                <input type="checkbox" checked={t.isDone} onChange={onChangeHandler}/>
                                <span>{t.title}</span>
                                <button onClick={onClickHandler}>✖️
                                </button>
                            </li>
                        )
                    }
                )}
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""} onClick={onClickButtonHandler('all')}>All</button>
                <button className={props.filter === "active" ? "active-filter" : ""} onClick={onClickButtonHandler('active')}>Active</button>
                <button className={props.filter === "completed" ? "active-filter" : ""} onClick={onClickButtonHandler('completed')}>Completed
                </button>
            </div>

        </div>
    );
}