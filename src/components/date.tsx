import { css } from "@styles/css";
import { parseISO, format } from "date-fns";

export default function Date({ dateParam }: { dateParam: Date | string }) {
	if (typeof dateParam === "string") {
		dateParam = parseISO(dateParam);
	}
	return (
		<time className={css({ fontSize: "sm", color: "gray.600" })} dateTime={dateParam.toISOString()}>
			{format(dateParam, "LLLL d, yyyy")}
		</time>
	);
}
