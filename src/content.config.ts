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
		draft: z.boolean().default(true),
	}),
});

const toolsCollection = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/tools" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		category: z.string(),
		githubUrl: z.string().url(),
		liveUrl: z.string().url().optional(),
		image: z.string().optional(),
		imageAlt: z.string().optional(),
		stack: z.array(z.string()).default([]),
		note: z.string().optional(),
		order: z.number().default(0),
	}),
});

export const collections = {
	notes: notesCollection,
	tools: toolsCollection,
};
