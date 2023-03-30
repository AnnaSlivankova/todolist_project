import React, {useState, ChangeEvent, KeyboardEvent, memo} from 'react';
import {IconButton, TextField} from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';

export type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?: boolean
}

export const AddItemForm = memo((props: AddItemFormPropsType) => {
    console.log('AddItemForm')
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
                       disabled={props.disabled}
            />
            <IconButton color='primary' onClick={addItem} disabled={props.disabled}><AddBoxIcon/></IconButton>
        </div>
    );
})