/**
 * Calculates the estimated reading time for a given text content.
 * @param content The text content (markdown, HTML, or plain text)
 * @param wordsPerMinute The average reading speed (default is 200)
 * @returns A string representing the reading time (e.g., "3 min read")
 */
export function getReadingTime(
	content: string,
	wordsPerMinute: number = 200,
): string {
	if (!content || typeof content !== "string") {
		return "1 min read";
	}

	// Remove code blocks
	let cleanContent = content.replace(/```[\s\S]*?```/g, "");

	// Remove HTML tags
	cleanContent = cleanContent.replace(/<\/?[^>]+(>|$)/g, "");

	// Remove markdown syntax like headers, lists, links, images, etc.
	cleanContent = cleanContent
		.replace(/[#*`~_-]/g, "") // Remove formatting characters
		.replace(/!\[.*?\]\(.*?\)/g, "") // Remove images
		.replace(/\[.*?\]\(.*?\)/g, ""); // Remove link syntax but keep text

	// Count words
	const words = cleanContent.trim().split(/\s+/).filter(Boolean);
	const wordCount = words.length;

	// Calculate minutes (minimum of 1 minute)
	const minutes = Math.ceil(wordCount / wordsPerMinute);

	return `${minutes} min read`;
}
