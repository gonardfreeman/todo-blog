import { Todo } from "@prisma/client";
import { NextApiRequest } from "next";
import prisma from "../prisma";
import type { TodoPayload } from "@/types/todo";

async function insertTodo(payload: TodoPayload): Promise<Todo> {
	const { authorId, ...todoPayload } = payload;
	const newTodo = await prisma.todo.create({
		data: {
			...todoPayload,
			author: {
				connect: {
					id: authorId,
				},
			},
		},
	});
	return newTodo;
}

export async function addTodo(req: NextApiRequest): Promise<{ status: string; todo: Todo }> {
	const todo = JSON.parse(req.body) as TodoPayload;
	const newTodo = await insertTodo(todo);
	return { status: "ok", todo: newTodo };
}

export async function deleteTodo(id: number): Promise<{ status: string }> {
	await prisma.todo.delete({ where: { id: id } });
	return { status: "ok" };
}
