import fs from "node:fs";

import htmlMinifierTerser from "html-minifier-terser";
import { transform } from "lightningcss";
import { loadDefaultJapaneseParser } from "budoux";
import { createHighlighter } from "shiki";

const markdownItBudouxParagraphPlugin = (md) => {
	const budoux = loadDefaultJapaneseParser();
	const proxy = (tokens, idx, options, env, self) =>
		self.renderToken(tokens, idx, options);
	const paragraphStack = [];

	const defaultParagraphOpenRenderer =
		md.renderer.rules.paragraph_open || proxy;
	md.renderer.rules.paragraph_open = (tokens, idx, options, env, self) => {
		paragraphStack.push(true);
		return `${defaultParagraphOpenRenderer(tokens, idx, options, env, self)}`;
	};

	const defaultParagraphCloseRenderer =
		md.renderer.rules.paragraph_close || proxy;
	md.renderer.rules.paragraph_close = (tokens, idx, options, env, self) => {
		paragraphStack.pop();
		return `${defaultParagraphCloseRenderer(tokens, idx, options, env, self)}`;
	};

	const defaultTextRenderer = md.renderer.rules.text || proxy;
	md.renderer.rules.text = (tokens, idx, options, env, self) => {
		if (paragraphStack.length > 0) {
			return budoux.translateHTMLString(tokens[idx].content);
		}

		return defaultTextRenderer(tokens, idx, options, env, self);
	};
};

export default async function (eleventyConfig) {
	// TODO: refactor
	eleventyConfig.addWatchTarget("src/styles/");
	eleventyConfig.on("eleventy.before", () => {
		const { code } = transform({
			code: fs.readFileSync("src/styles/index.css"),
			minify: true,
			sourceMap: true,
		});
		fs.writeFileSync("out/css/index.css", code);
	});

	eleventyConfig.addFilter("dateFilter", (value) => {
		const dateObj = new Date(value);
		const year = dateObj.getFullYear();
		const month = String(dateObj.getMonth() + 1).padStart(2, "0");
		const day = String(dateObj.getDate()).padStart(2, "0");
		return `${year}-${month}-${day}`;
	});

	eleventyConfig.addCollection("article", (collectionApi) => {
		return collectionApi
			.getAll()
			.filter((item) => item.data.category === "article")
			.sort((a, b) => b.data.date - a.data.date);
	});

	eleventyConfig.addTransform("htmlPostProcess", function (content) {
		if ((this.page.outputPath || "").endsWith(".html")) {
			return htmlMinifierTerser.minify(content, {
				useShortDoctype: true,
				removeComments: true,
				collapseWhitespace: true,
			});
		}
		return content;
	});

	// ref: https://www.hoeser.dev/blog/2023-02-07-eleventy-shiki-simple/
	eleventyConfig.amendLibrary("md", () => {});
	eleventyConfig.on("eleventy.before", async () => {
		// TODO: cache
		const highlighter = await createHighlighter({
			themes: ["one-dark-pro"],
			langs: ["js", "ts"],
		});
		eleventyConfig.amendLibrary("md", (mdLib) => {
			mdLib.set({
				highlight: (code, lang) =>
					highlighter.codeToHtml(code, {
						themes: {
							light: "one-dark-pro",
							dark: "one-dark-pro",
						},
						lang,
					}),
			});
			mdLib.use(markdownItBudouxParagraphPlugin);
		});
	});

	return {
		templateFormats: ["md", "njk", "css"],
		htmlTemplateEngine: "njk",
		dir: {
			input: "./src/pages/",
			output: "./out",
			includes: "../components",
			layouts: "../layouts",
		},
	};
}
