"use client"

import { useState } from "react";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

type NewData = {
    createNewTodo: (data: FormData) => void
}

export function CreateTodo({ createNewTodo }: NewData) {
    const [visible, setVisible] = useState<boolean>(false)

    return (
        <>
            <Button label="Show" icon="pi pi-external-link" onClick={() => setVisible(true)} />
            <Dialog 
                header="New Todo" 
                visible={visible} 
                className="w-40"
                onHide={() => {if (!visible) return; setVisible(false); }}
                modal
            >
                <form action={createNewTodo} className="flex flex-col gap-4">
                    <div className="flex flex-column gap-2">
                        <label htmlFor="title">Title</label>
                        <InputText 
                            id="title" 
                            placeholder="'take out the trash'"
                        />
                    </div>
                    <div className="flex gap-2 justify-end">
                        <Button label="Cancel" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
                        <Button type ="submit" label="Create" icon="pi pi-check" autoFocus />
                    </div>
                </form>
            </Dialog>
        </>
    )
}