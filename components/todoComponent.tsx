import { Todo } from "@prisma/client";
import { BsTrash } from "react-icons/bs";
import { deleteTodo } from "@/lib/todos/fetch";
import { useQueryClient, useMutation } from "react-query";
import Date from "./date";

export default function TodoMasterComponent({ todo }: { todo: Todo }) {
	const queryClient = useQueryClient();
	const mutation = useMutation(deleteTodo, {
		onSuccess: () => {
			queryClient.invalidateQueries("todos");
		},
	});
	function handleDelete() {
		mutation.mutate(todo.id);
	}

	return (
		<div className="flex justify-between">
			<div className="min-h-[5rem]">
				<h2 className="text-gray-800 text-xl">{todo.title}</h2>
				<Date dateParam={todo.createdAt} />
				<div className="text-gray-600">{todo.notes}</div>
			</div>
			<button className="btn-color-red" onClick={handleDelete}>
				<BsTrash />
			</button>
		</div>
	);
}
