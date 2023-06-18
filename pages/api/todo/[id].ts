import { NextApiRequest, NextApiResponse } from "next";
import { deleteTodo } from "@/lib/todos/mutation";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { id: idParam } = req.query;
	const id = Number(idParam);
	if (req.method === "DELETE") {
		if (isNaN(id)) {
			return res.status(404).end(`wrong id parameter on delete: ${idParam}`);
		}
		let result = await deleteTodo(id);
		if (result.status === "ok") {
			return res.status(201).end();
		}
	}

	res.status(201).end(`post id: ${id}. Method: ${req.method}`);
}
