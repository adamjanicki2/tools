import * as prettier from "prettier";
import * as js from "prettier/plugins/babel";
import * as estree from "prettier/plugins/estree";
import * as html from "prettier/plugins/html";
import * as markdown from "prettier/plugins/markdown";
import * as css from "prettier/plugins/postcss";
import * as ts from "prettier/plugins/typescript";

export type Lang = keyof typeof lintOptions;

const plugins: Record<Lang, any[]> = {
  svg: [html],
  html: [html],
  js: [js, estree],
  ts: [ts, estree],
  css: [css],
  markdown: [markdown],
};

export const lintOptions = {
  svg: "SVG",
  html: "HTML",
  js: "JavaScript",
  ts: "TypeScript",
  css: "CSS",
  markdown: "Markdown",
} as const;

const mapToOther: Record<string, string> = {
  svg: "html",
  js: "babel",
  ts: "typescript",
};

export default async function lint(code: string, lang: Lang) {
  try {
    const formattedCode = await prettier.format(code, {
      parser: mapToOther[lang] || lang,
      plugins: plugins[lang],
    });

    return { code: formattedCode };
  } catch (e: any) {
    return { error: e.message };
  }
}
