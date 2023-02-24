import React, {useState} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task} from "../Task";

export default {
    title: 'Todolist/Task',
    component: Task,
    args: {
        removeTask: action('Task was removed'),
        changeTaskStatus: action('Task status was changed'),
        changeTaskTitle: action('Task title was changed'),
        todolistId: 'todolistId',
        task: {id: 'task id', title: 'task title', isDone: false}
    }
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsNotDoneExample = Template.bind({});

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
    task: {id: 'task id', title: 'task is done', isDone: true}
};


const Template1: ComponentStory<typeof Task> = (args) => {

    const [task, setTask] = useState({id: 'task id', title: 'task title', isDone: false})

    const changeTaskStatus =(id: string, isDone: boolean, todolistId: string) => {
        setTask({id: 'task id', title: 'task title', isDone: !task.isDone})
    }

    return <Task task={task}
                 changeTaskStatus={changeTaskStatus}
                 changeTaskTitle={args.changeTaskTitle}
                 removeTask={args.removeTask}
                 todolistId={args.todolistId}/>
};

export const TaskEditableExample = Template1.bind({});
TaskEditableExample.args = {

};