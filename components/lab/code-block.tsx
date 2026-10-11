import type { ReactNode } from "react";

// A deliberately tiny highlighter: enough colour to scan JSON and short TS snippets,
// without shipping a syntax-highlighting library.
const TOKEN =
  /(\/\/[^\n]*)|("(?:\\.|[^"\\])*"(?=\s*:))|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(\b-?\d+(?:\.\d+)?\b)|(\b(?:true|false|null|import|from|const|await|async|it|expect)\b)/g;

function highlight(code: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;
  for (const match of Array.from(code.matchAll(TOKEN))) {
    const index = match.index ?? 0;
    if (index > last) nodes.push(code.slice(last, index));
    const [text, comment, key, string, number] = match;
    const className = comment
      ? "text-neutral-400 italic"
      : key
        ? "text-teal-300"
        : string
          ? "text-amber-200"
          : number
            ? "text-sky-300"
            : "text-fuchsia-300";
    nodes.push(
      <span key={index} className={className}>
        {text}
      </span>,
    );
    last = index + text.length;
  }
  if (last < code.length) nodes.push(code.slice(last));
  return nodes;
}

export default function CodeBlock({ code, language }: { code: string; language: "json" | "ts" }) {
  return (
    <pre
      className="max-h-[36rem] overflow-auto rounded-b-xl bg-neutral-950 p-5 font-mono text-xs leading-relaxed text-neutral-200"
      aria-label={language === "json" ? "Generated event JSON" : "Generated Jest test"}
    >
      <code>{highlight(code)}</code>
    </pre>
  );
}
