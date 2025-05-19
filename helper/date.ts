import { format, isValid, parseISO } from "date-fns";

export function formatDateToText(date: Date): string {
	const options: Intl.DateTimeFormatOptions = {
		day: "numeric",
		month: "long",
		year: "numeric",
	};
	return date.toLocaleDateString("id-ID", options);
}

export function formatDateFromString(date: string): string {
	return formatDateToText(new Date(date));
}

export function formatDateToMySQLDateTime(dateInput: string | Date): string {
	let date: Date;

	if (typeof dateInput === "string") {
		date = parseISO(dateInput);
	} else {
		date = dateInput;
	}

	if (!isValid(date)) {
		throw new Error("Invalid date input");
	}

	return format(date, "yyyy-MM-dd HH:mm:ss");
}
