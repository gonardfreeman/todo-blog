import { Todo } from "@prisma/client";
import Date from "./date";
import { useState } from "react";

export default function TodoMasterComponent({ todo }: { todo: Todo }) {
	const [isEdit, setIsEdit] = useState(false);

	function handleClick() {
		setIsEdit(!isEdit);
	}

	return (
		<div className="flex justify-between">
			<div className="min-h-[5rem]">
				{!isEdit && (
					<>
						<h2 className="text-gray-800 text-xl">{todo.title}</h2>
						<Date dateParam={todo.createdAt} />
						<div className="text-gray-600">{todo.notes}</div>
					</>
				)}
				{isEdit && (
					<>
						<div>Is Edit</div>
					</>
				)}
			</div>
			<button className="btn btn-blue" onClick={handleClick}>
				Test
			</button>
		</div>
	);
}
