export type InputValidation = { validation: Record<string, Record<string, string | number | boolean | RegExp>> };

export interface Input {
	type: "checkbox" | "text";
	className?: string;
	name: string;
	id?: string;
	label?: string;
	placeholder?: string;
}

export type InputWithValidation = Input & InputValidation;
