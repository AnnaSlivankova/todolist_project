import React, {useState, ChangeEvent, KeyboardEvent} from 'react';
import {IconButton, TextField} from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';

export type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
    const [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)
    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title)
            setTitle("")
        } else {
            setError("Title is required")
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
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
}