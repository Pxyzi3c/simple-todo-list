import { TodoItem } from "@/src/components/TodoItem";
import { CreateTodo } from "@/src/components/CreateTodo";
import { prisma } from "./db";
import { redirect } from "next/navigation";
        
function getTodos() {
    return prisma.todo.findMany()
}

async function toggleTodo(id: string, title: string, complete: boolean) {
    "use server"

    await prisma.todo.update({ 
        where: {id}, 
        data: { title, complete }
    })
}

async function createNewTodo(data: FormData) {
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

export default async function Home() {
    const todos = await getTodos()

    return (
        <>
            <header className="flex justify-between items-center mb-4">
                <h1 className="text-3xl">Todos</h1>
                <CreateTodo createNewTodo={createNewTodo}/>
            </header>
            <ul className="pl-4 flex flex-col gap-4">
                {todos.map(todo => (
                    <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} />
                ))}
            </ul>
        </>
    )
}