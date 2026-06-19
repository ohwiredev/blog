export const CATEGORIES = ["Setup", "Notes", "Tools", "SaaS"] as const;
export type Category = (typeof CATEGORIES)[number];

/**
 * Checks if a category is valid
 */
export function isValidCategory(category: string): category is Category {
	return CATEGORIES.includes(category as Category);
}
