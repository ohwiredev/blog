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

	const lines: string[] = [
		"# ohwire",
		"",
		"> Notes from a self-taught developer documenting software architecture, build tools, AI workflows, and development setups.",
		"",
		"Personal technical blog and notes by ohwire. Topics include modern web development with Astro, TypeScript, and Tailwind CSS, developer tooling (Biome, Zed, PowerShell), SaaS architecture, and Answer Engine Optimization (AEO).",
		"",
		"## Notes",
		"",
	];

	for (const note of sortedNotes) {
		const noteUrl = `${baseUrl}/notes/${note.id}`;
		const description = note.data.description.replace(/\n+/g, " ").trim();
		lines.push(`- [${note.data.title}](${noteUrl}): ${description}`);
	}

	if (allTools.length > 0) {
		lines.push("");
		lines.push("## Tools");
		lines.push("");
		for (const tool of allTools) {
			const toolUrl = tool.data.liveUrl ?? tool.data.githubUrl;
			lines.push(
				`- [${tool.data.title}](${toolUrl}): ${tool.data.description} (Source: ${tool.data.githubUrl})`,
			);
		}
	}

	lines.push("");
	lines.push("## Optional");
	lines.push("");
	lines.push(
		`- [Full Content Archive](${baseUrl}/llms-full.txt): Complete markdown text of all published notes for LLM ingestion.`,
	);
	lines.push("");

	return new Response(lines.join("\n"), {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
		},
	});
};
