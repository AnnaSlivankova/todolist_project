import React, {memo, MouseEvent, useCallback} from 'react';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "./Task";
import {FilterValueType} from "./state/todolists-reducer";
import {Completed, TaskType} from "./api/todolist-api";


type ToDoListType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValueType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, completed: Completed, todolistId: string) => void
    filter: FilterValueType
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    changeTodolistTitle: (newTitle: string, todolistId: string) => void
}

export const TodoList = memo((props: ToDoListType) => {
    console.log('TodoList')
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])

    const onClickButtonHandler = useCallback((filter: FilterValueType, todolistId: string) => (event: MouseEvent) => {
        props.changeFilter(filter, todolistId)
    }, [props.changeFilter])

    const removeTodolist = useCallback(() => {
        props.removeTodolist(props.id)
    }, [props.removeTodolist, props.id])

    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(newTitle, props.id)
    }, [props.changeTodolistTitle, props.id])

    let tasks = props.tasks
    if (props.filter === 'active') {
        tasks = props.tasks.filter(t => t.completed === Completed.notDone)
    }
    if (props.filter === 'completed') {
        tasks = props.tasks.filter(t => t.completed === Completed.done)
    }


    const removeTask = useCallback((taskId: string) => props.removeTask(taskId, props.id), [props.removeTask, props.id])
    const changeTaskStatus = useCallback((taskId: string, completed: Completed) => {
        props.changeTaskStatus(taskId, completed, props.id)
    }, [props.changeTaskStatus, props.id])
    const changeTaskTitle = useCallback((taskId: string, newTitle: string) => {
        props.changeTaskTitle(taskId, newTitle, props.id)
    }, [props.changeTaskTitle, props.id])


    return (
        <div>
            <h3><EditableSpan value={props.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist}><Delete/></IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {tasks.map((t) => {

                        return (
                            <Task
                                key={t.id}
                                todolistId={props.id}
                                task={t}
                                removeTask={removeTask}
                                changeTaskStatus={changeTaskStatus}
                                changeTaskTitle={changeTaskTitle}
                            />
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
})