import { getCollection } from "astro:content";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ site }) => {
	const baseUrl = site
		? site.toString().replace(/\/$/, "")
		: "https://ohwire.xyz";

	const allNotes = await getCollection(
		"notes",
		({ data }) => import.meta.env.DEV || !data.draft,
	);

	const sortedNotes = allNotes.sort(
		(a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf(),
	);

	const allSkills = await getCollection("skills");

	const sections: string[] = [
		"# ohwire - Full Content Archive",
		"",
		"> Notes from a self-taught developer documenting software architecture, build tools, AI workflows, and development setups.",
		"",
	];

	for (const note of sortedNotes) {
		const noteUrl = `${baseUrl}/notes/${note.id}`;
		const dateStr = note.data.publishDate.toISOString().split("T")[0];
		sections.push("---");
		sections.push("");
		sections.push(`## ${note.data.title}`);
		sections.push("");
		sections.push(`- **URL**: ${noteUrl}`);
		sections.push(`- **Published**: ${dateStr}`);
		sections.push(`- **Category**: ${note.data.category}`);
		sections.push(`- **Author**: ${note.data.author}`);
		sections.push(`- **Description**: ${note.data.description}`);
		sections.push("");
		if (note.body) {
			sections.push(note.body.trim());
		}
		sections.push("");
	}

	if (allSkills.length > 0) {
		sections.push("---");
		sections.push("");
		sections.push("## Agentic Skills");
		sections.push("");
		for (const skill of allSkills) {
			sections.push(`### ${skill.data.title}`);
			sections.push(`- **Role**: ${skill.data.role}`);
			sections.push(`- **Description**: ${skill.data.description}`);
			sections.push(`- **Repository**: ${skill.data.githubUrl}`);
			if (skill.body) {
				sections.push("");
				sections.push(skill.body.trim());
			}
			sections.push("");
		}
	}

	return new Response(sections.join("\n"), {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
		},
	});
};
