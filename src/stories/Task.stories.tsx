import React, {useState} from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task} from "../Task";
import {Completed} from "../api/todolist-api";

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
            completed: Completed.notDone,
            todoListId: '',
            status: 0,
            priority: 0,
            startDate: '',
            order: 0,
            deadline: '',
            addedDate: '',
            description: ''
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
        completed: Completed.done,
        todoListId: '',
        status: 0,
        priority: 0,
        startDate: '',
        order: 0,
        deadline: '',
        addedDate: '',
        description: ''
    }
};

const Template1: ComponentStory<typeof Task> = (args) => {
    const [task, setTask] = useState({id: 'task id',
        title: 'task title',
        completed: Completed.notDone,
        todoListId: '',
        status: 0,
        priority: 0,
        startDate: '',
        order: 0,
        deadline: '',
        addedDate: '',
        description: ''
    })

    const changeTaskStatus = (id: string, completed: Completed, todolistId: string) => {
        setTask({id: 'task id',
            title: 'task title',
            completed: task.completed ? Completed.done : Completed.notDone,
            todoListId: '',
            status: 0,
            priority: 0,
            startDate: '',
            order: 0,
            deadline: '',
            addedDate: '',
            description: ''
        })
    }

    return <Task task={task}
                 changeTaskStatus={changeTaskStatus}
                 changeTaskTitle={args.changeTaskTitle}
                 removeTask={args.removeTask}
                 todolistId={args.todolistId}/>
};

export const TaskEditableExample = Template1.bind({});
TaskEditableExample.args = {};