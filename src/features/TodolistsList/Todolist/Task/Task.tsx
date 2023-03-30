import React, {ChangeEvent, memo} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskStatuses, TaskType} from "../../../../api/todolist-api";
import {RequestStatusType} from "../../../../app/app-reducer";

type TaskPropsType = {
    todolistId: string
    task: TaskType
    entityStatus: RequestStatusType
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const Task = memo((props: TaskPropsType) => {

    const onClickHandler = () => props.removeTask(props.task.id, props.todolistId)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newIsDoneValue = e.currentTarget.checked
        props.changeTaskStatus(props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.todolistId)
    }
    const onTitleChangeHandler = (newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId)
    }

    return (
        <div className={props.task.status === TaskStatuses.Completed ? "is-done" : ""}>
            <Checkbox disabled={props.entityStatus === 'loading'} color='primary' checked={props.task.status === TaskStatuses.Completed} onChange={onChangeHandler}/>
            <EditableSpan disabled={props.entityStatus === 'loading'} value={props.task.title} onChange={onTitleChangeHandler}/>
            <IconButton disabled={props.entityStatus === 'loading'} onClick={onClickHandler}><Delete/></IconButton>
        </div>
    )
});