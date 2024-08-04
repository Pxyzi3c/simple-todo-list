import Link from "next/link";
import { prisma } from "../db";
import { redirect } from "next/navigation";
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

async function createTodo(data: FormData) {
    "use server"

    const title = data.get("title")?.valueOf()
    if (typeof title !== "string" || title.length === 0) {
        throw new Error("Invalid Title")
    }
    
    await prisma.todo.create({ data: {
        title,
        complete: false  
    }})

    redirect("/")
}

export default function Page() {
    return (
        <>
            <header className="flex justify-between items-center mb-4">
                <h1 className="text-2xl">New</h1>
            </header>
            <form action={createTodo} className="flex gap-2 flex-col">
                <InputText 
                    name="title"
                    placeholder="'take out the trash'"
                />
                <div className="flex gap-1 justify-end">
                    <Link href="..">
                        <Button 
                            label="Cancel"
                            icon="pi pi-times"
                            outlined
                            severity="danger"
                        />
                    </Link>
                    <Button 
                        type="submit"
                        label="Create" 
                        icon="pi pi-check"
                    />
                </div>
            </form>
        </>
    )
}