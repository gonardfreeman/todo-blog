import TodoMasterComponent from "@/components/todoComponent";
import { loadTodos } from "@lib/todos/fetch";
import { useQuery } from "react-query";
import CreateTodo from "./createTodo";

export default function TodoList() {
	const { isLoading, isError, data } = useQuery(["todos"], loadTodos);
	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (isError) {
		return <div>Error</div>;
	}
	return (
		<>
			<ul className="list-none">
				{data?.map((t) => (
					<li key={t.id}>
						<TodoMasterComponent todo={t} />
					</li>
				))}
			</ul>
			<CreateTodo />
		</>
	);
}
