import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { CATEGORIES, isValidCategory } from "./config/categories";

const notesCollection = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/notes" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		publishDate: z.coerce.date(),
		author: z.string(),
		authorImage: z.string().optional(),
		readTime: z.string().optional(),
		category: z.string().refine(isValidCategory, {
			message: `Invalid category. Must be one of: ${CATEGORIES.join(", ")}`,
		}),
		image: z.string().optional(),
		imageAlt: z.string().optional(),
		featured: z.boolean().default(false),
	}),
});

const skillsCollection = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/skills" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		role: z.string(),
		color: z.string(),
		githubUrl: z.string().url(),
		iconPath: z.string(),
	}),
});

export const collections = {
	notes: notesCollection,
	skills: skillsCollection,
};
