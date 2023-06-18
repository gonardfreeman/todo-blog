import { Todo } from "@prisma/client";
import type { TodoPayload } from "@/types/todo";

export async function loadTodos(): Promise<Array<Todo>> {
	const resp = await fetch("/api/todo");
	const todos = (await resp.json()) as Array<Todo>;
	return todos;
}

export async function createTodo(payload: TodoPayload): Promise<{ status: string; todo: Todo }> {
	const resp = await fetch("/api/todo", {
		method: "POST",
		body: JSON.stringify(payload),
	});
	return await resp.json();
}

export async function deleteTodo(id: number) {
	await fetch(`/api/todo/${id}`, {
		method: "DELETE",
	});
}
