import { Todo } from "@prisma/client";
import prisma from "../prisma";

export async function getTodos(): Promise<Array<Todo>> {
	const todos = await prisma.todo.findMany({ orderBy: { createdAt: "asc" } });
	return todos;
}
