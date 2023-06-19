import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useQueryClient, useMutation } from "react-query";

import InputComponent from "./input";
import { createTodo } from "@lib/todos/fetch";
import { titleValidation, notesValidation, isDoneValidation } from "@lib/inputValidations";
import { TodoPayload } from "@lib/types/todo";

export default function CreateTodo() {
	const methods = useForm();
	const [success, setSuccess] = useState(false);
	const queryClient = useQueryClient();
	const mutation = useMutation(createTodo, {
		onSuccess: () => {
			queryClient.invalidateQueries("todos");
		},
		onError: (err) => {
			console.log(err);
		},
	});

	const onSubmit = methods.handleSubmit((data) => {
		mutation.mutate({ ...data, authorId: 1 } as TodoPayload);
		methods.reset();
		setSuccess(true);
	});

	useEffect(() => {
		if (success === false) {
			return;
		}
		console.log("triggered");
		const timeoutId = setTimeout(() => {
			setSuccess(false);
		}, 3000);

		return () => {
			clearTimeout(timeoutId);
		};
	}, [success]);

	return (
		<FormProvider {...methods}>
			<form onSubmit={(e) => e.preventDefault()} noValidate autoComplete="off" className="container">
				<div className="border-amber-800 rounded-md flex flex-col">
					<h3 className="text-gray-800 text-xl mt-1">New Todo:</h3>
					<InputComponent {...titleValidation} />
					<InputComponent {...notesValidation} />
					<InputComponent {...isDoneValidation} />
				</div>
				{success && <p className="font-semibold text-green-500 mb-5">Todo has been added</p>}
				<button onClick={onSubmit} className="btn btn-blue">
					Add Todo
				</button>
			</form>
		</FormProvider>
	);
}
