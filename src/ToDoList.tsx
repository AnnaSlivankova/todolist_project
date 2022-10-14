import React from 'react';

type TasksType = {
    id: number
    title: string
    isDone: boolean
}

type ToDoListType = {
    title: string
    tasks: Array<TasksType>
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
                                <button onClick={()=>{alert(t.id)}}>✖️</button>
                            </li>
                        )
                    }
                )}
            </ul>


            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>

        </div>
    );
}