"use client"

import { useState } from "react"
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
        
type TodoItemProps = {
    id: string
    title: string
    complete: boolean
    toggleTodo: (id: string, title: string, complete: boolean) => void
}

export function TodoItem({ id, title, complete, toggleTodo }: TodoItemProps)  {
    const [isEditing, setIsEditing] = useState(false)
    const [editedTitle, setEditedTitle] = useState(title)
    const [checked, setChecked] = useState(complete)

    const onItemTitleChange = (id: string, title: string, complete: boolean) => {
        setIsEditing(false)
        toggleTodo(id, title, complete)
        setEditedTitle(title)
    }

    const onCheckboxChange = (id: string, title: string, complete: any) => {
        toggleTodo(id, title, complete)
        setChecked(complete)
    }

    return (
        <li className="flex gap-2 items-center">
            <Checkbox 
                id={id}
                onChange={e => onCheckboxChange(id, title, e.checked)}
                checked={checked}
            ></Checkbox>
            {isEditing ? (
                <>
                    <InputText 
                        id={id}
                        value={editedTitle}
                        onChange={e => setEditedTitle(e.target.value)}
                        onBlur={e => onItemTitleChange(id, e.target.value, complete)}
                        placeholder="'take out the trash'"
                    />
                    <Button 
                        label="Cancel" 
                        icon="pi pi-times" 
                        severity="danger"
                        outlined
                        onClick={() => setIsEditing(false)}
                    />
                </>
            ) : (
                <label 
                    htmlFor={id} 
                    className="cursor-pointer peer-checked:line-through peer-checked:text-slate-500"
                    onClick={() => setIsEditing(true)}
                >
                    {editedTitle}
                </label>
            )}
        </li>
    )
}