import { createTodo } from "@/lib/todos/fetch";
import { useState } from "react";
import { useQueryClient, useMutation } from "react-query";

const initialTodo = Object.freeze({
	title: "",
	authorId: 1,
	notes: "",
	isDone: false,
});

// TODO: add forms https://react-hook-form.com/get-started#Quickstart
export default function CreateTodo() {
	const [todo, setTodo] = useState(initialTodo);
	const queryClient = useQueryClient();
	const mutation = useMutation(createTodo, {
		onSuccess: () => {
			queryClient.invalidateQueries("todos");
			setTodo(initialTodo);
		},
		onError: (err) => {
			console.log(err);
		},
	});
	function handleAddTodo() {
		if (todo.title.length < 1 || todo.notes.length < 1) {
			return;
		}
		mutation.mutate(todo);
	}

	function handleChangeTodo(e: React.ChangeEvent<HTMLInputElement>) {
		setTodo({
			...todo,
			[e.currentTarget.name]: e.currentTarget.name === "isDone" ? e.currentTarget.checked : e.currentTarget.value,
		});
	}

	return (
		<div className="border-amber-800 rounded-md flex flex-col">
			<h3 className="text-gray-800 text-xl mt-1">New Todo:</h3>
			<label className="block mb-2">
				<span className="todo-input__label">Title</span>
				<input className="todo-input" type="text" value={todo.title} name="title" onChange={handleChangeTodo} />
			</label>
			<label className="block mb-2">
				<span className="todo-input__label">Notes</span>
				<input className="todo-input" type="text" value={todo.notes} name="notes" onChange={handleChangeTodo} />
			</label>
			<label className="block mb-2">
				<span className="todo-input__label">Is Done</span>
				<input
					name="isDone"
					type="checkbox"
					checked={todo.isDone}
					onChange={handleChangeTodo}
					className="todo-input--checkbox"
				/>
			</label>
			<button className="btn btn-blue" onClick={handleAddTodo}>
				Add Todo
			</button>
		</div>
	);
}
