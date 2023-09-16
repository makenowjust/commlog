import MarkdownIt from 'markdown-it';
import footnote from "markdown-it-footnote";

// @ts-expect-error
import highlight from "markdown-it-highlightjs/core";

export const renderMarkdown = (markdown: string, hash: string): string => {
  const md = new MarkdownIt({ breaks: true, html: false })
    .use(highlight, { hljs })
    .use(footnote, {});
  return md.render(markdown, {docId: hash});
};