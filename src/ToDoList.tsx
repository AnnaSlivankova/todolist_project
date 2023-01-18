import React, {ChangeEvent, MouseEvent} from 'react';
import {FilterValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type ToDoListType = {
    id: string
    title: string
    tasks: Array<TasksType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValueType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterValueType
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    changeTodolistTitle: (newTitle: string, todolistId: string) => void
}

export function TodoList(props: ToDoListType) {
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const onClickButtonHandler = (filter: FilterValueType, todolistId: string) => (event: MouseEvent) => {
        props.changeFilter(filter, todolistId)
    }

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(newTitle, props.id)
    }

    return (
        <div>
            <h3><EditableSpan value={props.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist}><Delete/></IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {props.tasks.map((t) => {
                        const onClickHandler = () => props.removeTask(t.id, props.id)
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newIsDoneValue = e.currentTarget.checked
                            props.changeTaskStatus(t.id, newIsDoneValue, props.id)
                        }
                        const onTitleChangeHandler = (newValue: string) => {
                            props.changeTaskTitle(t.id, newValue, props.id)
                        }

                        return (
                            <div key={t.id} className={t.isDone ? "is-done" : ""}>
                                <Checkbox color='primary' checked={t.isDone} onChange={onChangeHandler}/>
                                <EditableSpan value={t.title} onChange={onTitleChangeHandler}/>
                                <IconButton onClick={onClickHandler}><Delete/></IconButton>
                            </div>
                        )
                    }
                )}
            </div>
            <div>
                <Button variant={props.filter === "all" ? "outlined" : "text"}
                        onClick={onClickButtonHandler('all', props.id)}
                        color='inherit'>All
                </Button>
                <Button variant={props.filter === "active" ? "outlined" : "text"}
                        onClick={onClickButtonHandler('active', props.id)}
                        color='primary'>Active
                </Button>
                <Button variant={props.filter === "completed" ? "outlined" : "text"}
                        onClick={onClickButtonHandler('completed', props.id)}
                        color='secondary'>Completed
                </Button>
            </div>

        </div>
    );
}