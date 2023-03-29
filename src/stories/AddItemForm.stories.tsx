import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {action} from "@storybook/addon-actions";
import {IconButton, TextField} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";

export default {
  title: 'Todolist/AddItemForm',
  component: AddItemForm,
  argTypes: {
    addItem: { description: 'Button inside form was clicked' },
  },
} as ComponentMeta<typeof AddItemForm>;

const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const AddItemFormExample = Template.bind({});
AddItemFormExample.args = {
  addItem: action('Button inside form was clicked')
};


const Template1: ComponentStory<typeof AddItemForm> = (args) => {
  console.log('AddItemForm')
  const [title, setTitle] = useState("")
  const [error, setError] = useState<string | null>("Title is required")
  const addItem = () => {
    if (title.trim() !== "") {
      args.addItem(title)
      setTitle("")
    } else {
      setError("Title is required")
    }
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null)
    }

    if (e.key === 'Enter') {
      addItem()
    }
  }

  return (
      <div>
        <TextField variant='outlined'
                   size='small'
                   value={title}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyDownHandler}
                   placeholder="enter your title here"
                   error={!!error}
                   label='Title'
                   helperText={error}
        />
        <IconButton color='primary' onClick={addItem}><AddBoxIcon/></IconButton>
      </div>
  );
};

export const AddItemFormErrorExample = Template1.bind({});
AddItemFormErrorExample.args = {
  addItem: action('Button inside form was clicked')
};
