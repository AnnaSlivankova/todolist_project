import React, {useState} from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task} from "../features/TodolistsList/Todolist/Task/Task";
import {TaskStatuses} from "../api/todolist-api";
import {RequestStatusType} from "../app/app-reducer";

export default {
    title: 'Todolist/Task',
    component: Task,
    args: {
        removeTask: action('Task was removed'),
        changeTaskStatus: action('Task status was changed'),
        changeTaskTitle: action('Task title was changed'),
        todolistId: 'todolistId',
        task: {
            id: 'task id',
            title: 'task title',
            todoListId: '',
            status: TaskStatuses.New,
            priority: 0,
            startDate: '',
            order: 0,
            deadline: '',
            addedDate: '',
            description: '',
            entityStatus: 'idle' as RequestStatusType
        }
    }
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsNotDoneExample = Template.bind({});

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
    task: {
        id: 'task id',
        title: 'task is done',
        todoListId: '',
        status: TaskStatuses.Completed,
        priority: 0,
        startDate: '',
        order: 0,
        deadline: '',
        addedDate: '',
        description: '',
        // entityStatus: 'idle'
    }
};

const Template1: ComponentStory<typeof Task> = (args) => {
    const [task, setTask] = useState({id: 'task id',
        title: 'task title',
        todoListId: '',
        status: TaskStatuses.New,
        priority: 0,
        startDate: '',
        order: 0,
        deadline: '',
        addedDate: '',
        description: '',
        entityStatus: 'idle' as RequestStatusType
    })

    const changeTaskStatus = (id: string, status: TaskStatuses, todolistId: string) => {
        setTask({id: 'task id',
            title: 'task title',
            todoListId: '',
            status: task.status ? TaskStatuses.Completed : TaskStatuses.New,
            priority: 0,
            startDate: '',
            order: 0,
            deadline: '',
            addedDate: '',
            description: '',
            entityStatus: 'idle'
        })
    }

    return <Task task={task}
                 entityStatus={task.entityStatus}
                 changeTaskStatus={changeTaskStatus}
                 changeTaskTitle={args.changeTaskTitle}
                 removeTask={args.removeTask}
                 todolistId={args.todolistId}/>
};

export const TaskEditableExample = Template1.bind({});
TaskEditableExample.args = {};