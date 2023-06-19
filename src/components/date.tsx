import { parseISO, format } from "date-fns";

export default function Date({ dateParam }: { dateParam: Date | string }) {
	if (typeof dateParam === "string") {
		dateParam = parseISO(dateParam);
	}
	return <time dateTime={dateParam.toISOString()}>{format(dateParam, "LLLL d, yyyy")}</time>;
}
