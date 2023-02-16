import React, {ChangeEvent, memo} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TasksType} from "./ToDoList";

type TaskPropsType = {
    todolistId: string
    task: TasksType
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const Task = memo((props: TaskPropsType) => {

    const onClickHandler = () => props.removeTask(props.task.id, props.todolistId)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newIsDoneValue = e.currentTarget.checked
        props.changeTaskStatus(props.task.id, newIsDoneValue, props.todolistId)
    }
    const onTitleChangeHandler = (newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId)
    }

    return (
        <div className={props.task.isDone ? "is-done" : ""}>
            <Checkbox color='primary' checked={props.task.isDone} onChange={onChangeHandler}/>
            <EditableSpan value={props.task.title} onChange={onTitleChangeHandler}/>
            <IconButton onClick={onClickHandler}><Delete/></IconButton>
        </div>
    )
});