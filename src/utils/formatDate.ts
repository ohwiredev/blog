/**
 * Formats a Date object into a readable date string.
 * @param date Date instance or ISO string
 * @param options Intl.DateTimeFormatOptions (defaults to { month: "short", day: "numeric", year: "numeric" })
 * @returns Formatted date string
 */
export function formatDate(
	date: Date | string,
	options: Intl.DateTimeFormatOptions = {
		month: "short",
		day: "numeric",
		year: "numeric",
	},
): string {
	const d = typeof date === "string" ? new Date(date) : date;
	return d.toLocaleDateString("en-US", options);
}
