import { getTodos } from "@lib/todos/select";
import { addTodo } from "@lib/todos/mutation";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, resp: NextApiResponse) {
	if (req.method === "GET") {
		const todos = await getTodos();
		resp.status(200).json(todos);
	}
	if (req.method === "POST") {
		let result = await addTodo(req);
		if (result.status === "ok") {
			resp.status(201).json(result);
		}
	}
}
