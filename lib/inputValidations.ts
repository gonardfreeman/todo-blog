import { InputWithValidation } from "./types/input";
import { FieldErrors, FieldValues } from "react-hook-form";

export const isFormInvalid = (err: FieldErrors<FieldValues>) => Object.keys(err).length > 0;

export const titleValidation: InputWithValidation = {
	name: "title",
	label: "Title",
	id: "title",
	type: "text",
	placeholder: "title...",
	validation: {
		required: {
			value: true,
			message: "please enter title",
		},
		maxLength: {
			value: 30,
			message: "max length is 30 chars",
		},
	},
};

export const notesValidation: InputWithValidation = {
	name: "notes",
	label: "Notes",
	id: "notes",
	type: "text",
	placeholder: "notes...",
	validation: {
		maxLength: {
			value: 30,
			message: "max length is 30 chars",
		},
	},
};

export const isDoneValidation: InputWithValidation = {
	name: "isDone",
	label: "Is Done",
	id: "isDone",
	type: "checkbox",
	validation: {},
};
