import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@mui/material';
import {AddBox} from '@mui/icons-material';

type AddItemFormPropsType = {
    addItem: (title: string) => void,
}

export function AddItemForm(props: AddItemFormPropsType) {
    const [title, setTitle] = useState('')
    const [error, setError] = useState('')
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError('')
        if (e.key === 'Enter') {
            addTask()
        }
    }
    const addTask = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim())
            setTitle('')
        } else {
            setError('Title is required')

        }
    }

    return <div>
        <TextField variant="outlined"
                   value={title}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyPressHandler}
                   error={!!error}
                   label="Title"
                   helperText={error}
        />
        <IconButton color="primary"
                    onClick={addTask}>
            <AddBox/>
        </IconButton>

    </div>
}