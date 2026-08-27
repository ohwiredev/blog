// @ts-check

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

import expressiveCode from "astro-expressive-code";

// https://astro.build/config
export default defineConfig({
	site: "https://ohwire.xyz",
	vite: {
		plugins: [tailwindcss()],
	},

	integrations: [
		expressiveCode({
			styleOverrides: {
				codeFontFamily:
					"'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
				uiFontFamily: "'Instrument Sans', sans-serif",
			},
		}),
		mdx(),
		sitemap(),
	],
});
