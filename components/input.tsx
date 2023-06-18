import cn from "classnames";
import { useFormContext } from "react-hook-form";
import { InputWithValidation } from "@/types/input";

export default function InputComponent({
	label,
	type,
	placeholder,
	name,
	id,
	className,
	validation,
}: InputWithValidation) {
	const {
		register,
		formState: { errors },
	} = useFormContext();
	const inputError = errors[name];
	const isInvalid = inputError !== undefined;
	return (
		<label className="block">
			<span className="todo-input__label">{label}</span>
			<input
				id={id}
				type={type}
				placeholder={placeholder}
				className={cn("todo-input", className)}
				{...register(name, validation)}
			/>
			{isInvalid && <p className="text-red-600 text-sm">{inputError?.message as string}</p>}
		</label>
	);
}
