import React from 'react';
import {FilterValueType} from "./App";

type TasksType = {
    id: number
    title: string
    isDone: boolean
}

type ToDoListType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (taskId: number) => void
    changeFilter: (value: FilterValueType) => void
}


export function TodoList(props: ToDoListType) {
    return (
        <div>
            <h3>{props.title}</h3>

            <div>
                <input placeholder="enter your task"/>
                <button>+</button>
            </div>

            <ul>
                {props.tasks.map((t) => {
                        return (
                            <li key={t.id}>
                                <input type="checkbox" checked={t.isDone}/>
                                <span>{t.title}</span>
                                <button onClick={() => {
                                    props.removeTask(t.id)
                                }}>✖️
                                </button>
                            </li>
                        )
                    }
                )}
            </ul>


            <div>
                <button onClick={() => {
                    props.changeFilter('all')
                }}>All
                </button>
                <button onClick={() => {
                    props.changeFilter('active')
                }}>Active
                </button>
                <button onClick={() => {
                    props.changeFilter('completed')
                }}>Completed
                </button>
            </div>

        </div>
    );
}