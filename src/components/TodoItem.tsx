"use client"

import { useState } from "react"

type TodoItemProps = {
    id: string
    title: string
    complete: boolean
    toggleTodo: (id: string, title: string, complete: boolean) => void
}

export function TodoItem({ id, title, complete, toggleTodo }: TodoItemProps)  {
    const [isEditing, setIsEditing] = useState(false)
    const [editedTitle, setEditedTitle] = useState(title)

    const onItemTitleChange = (id: string, title: string, complete: boolean) => {
        setIsEditing(false)
        toggleTodo(id, title, complete)
        setEditedTitle(title)
    }

    return (
        <li className="flex gap-2 items-center">
            <input 
                id={id} 
                type="checkbox" 
                className="cursor-pointer peer"
                defaultChecked={complete} 
                onChange={e => toggleTodo(id, title, e.target.checked)}
            />
            {isEditing ? (
                <>
                    <input
                        id={id} 
                        type="text"
                        className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100" 
                        defaultValue={title}
                        onBlur={e => onItemTitleChange(id, e.target.value, complete)}
                    />
                    <button
                        type="button"
                        className="border border-slate-300 text-slate-300 px-2 py-1 rounded horver:bg-slate-700 focus-within:bg-slate-700 outline-none"
                        onClick={() => setIsEditing(false)}
                    >
                        Cancel
                    </button>
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