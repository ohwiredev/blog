/**
 * Base URL for the application, normalized without trailing slash.
 */
export const baseUrl: string = import.meta.env.BASE_URL.replace(/\/$/, "");

/**
 * Returns the full path for an image, taking into account the base URL if needed.
 * @param path Relative image path starting with "/"
 * @returns Normalized image path with base URL
 */
export function getImagePath(path?: string): string {
	if (!path) return "";
	if (path.startsWith("/")) {
		return `${baseUrl}${path}`;
	}
	return path;
}
