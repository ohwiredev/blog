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

	const allTools = (await getCollection("tools")).sort(
		(a, b) => a.data.order - b.data.order,
	);

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

	if (allTools.length > 0) {
		sections.push("---");
		sections.push("");
		sections.push("## Tools");
		sections.push("");
		for (const tool of allTools) {
			sections.push(`### ${tool.data.title}`);
			sections.push(`- **Description**: ${tool.data.description}`);
			if (tool.data.liveUrl) {
				sections.push(`- **Live**: ${tool.data.liveUrl}`);
			}
			sections.push(`- **Repository**: ${tool.data.githubUrl}`);
			if (tool.data.stack.length > 0) {
				sections.push(`- **Stack**: ${tool.data.stack.join(", ")}`);
			}
			if (tool.body) {
				sections.push("");
				sections.push(tool.body.trim());
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
