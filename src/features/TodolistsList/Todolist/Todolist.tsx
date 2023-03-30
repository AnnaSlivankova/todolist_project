import React, {memo, MouseEvent, useCallback, useEffect} from 'react';
import {TaskStatuses, TaskType} from "../../../api/todolist-api";
import {FilterValueType, TodolistDomainType} from "../todolists-reducer";
import {useAppDispatch} from "../../../app/store";
import {getTasksTC, TaskDomainType} from "../tasks-reducer";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {Task} from "./Task/Task";
import {RequestStatusType} from "../../../app/app-reducer";

type PropsType = {
    todolist: TodolistDomainType
    entityStatus: RequestStatusType
    tasks: Array<TaskDomainType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValueType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    changeTodolistTitle: (newTitle: string, todolistId: string) => void
}

export const Todolist = memo(({...props}: PropsType) => {
    console.log('TodolistsList')

    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getTasksTC(props.todolist.id))
    }, [])

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todolist.id)
    }, [props.addTask, props.todolist.id])

    const onClickButtonHandler = useCallback((filter: FilterValueType, todolistId: string) => (event: MouseEvent) => {
        props.changeFilter(filter, todolistId)
    }, [props.changeFilter])

    const removeTodolist = useCallback(() => {
        props.removeTodolist(props.todolist.id)
    }, [props.removeTodolist, props.todolist.id])

    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(newTitle, props.todolist.id)
    }, [props.changeTodolistTitle, props.todolist.id])

    let tasks = props.tasks
    if (props.todolist.filter === 'active') {
        tasks = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.todolist.filter === 'completed') {
        tasks = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }


    const removeTask = useCallback((taskId: string) => props.removeTask(taskId, props.todolist.id), [props.removeTask, props.todolist.id])
    const changeTaskStatus = useCallback((taskId: string, status: TaskStatuses) => {
        props.changeTaskStatus(taskId, status, props.todolist.id)
    }, [props.changeTaskStatus, props.todolist.id])
    const changeTaskTitle = useCallback((taskId: string, newTitle: string) => {
        props.changeTaskTitle(taskId, newTitle, props.todolist.id)
    }, [props.changeTaskTitle, props.todolist.id])

    return (
        <div>
            <h3><EditableSpan value={props.todolist.title} onChange={changeTodolistTitle} disabled={props.entityStatus === 'loading'}/>
                <IconButton onClick={removeTodolist} disabled={props.entityStatus === 'loading'}><Delete/></IconButton>
            </h3>
            <AddItemForm addItem={addTask} disabled={props.entityStatus === 'loading'}/>
            <div>
                {tasks.map((t) => {

                        return (
                            <Task
                                key={t.id}
                                todolistId={props.todolist.id}
                                task={t}
                                entityStatus={t.entityStatus}
                                removeTask={removeTask}
                                changeTaskStatus={changeTaskStatus}
                                changeTaskTitle={changeTaskTitle}
                            />
                        )
                    }
                )}
            </div>
            <div>
                <Button variant={props.todolist.filter === "all" ? "outlined" : "text"}
                        onClick={onClickButtonHandler('all', props.todolist.id)}
                        color='inherit'>All
                </Button>
                <Button variant={props.todolist.filter === "active" ? "outlined" : "text"}
                        onClick={onClickButtonHandler('active', props.todolist.id)}
                        color='primary'>Active
                </Button>
                <Button variant={props.todolist.filter === "completed" ? "outlined" : "text"}
                        onClick={onClickButtonHandler('completed', props.todolist.id)}
                        color='secondary'>Completed
                </Button>
            </div>
        </div>
    );
});
