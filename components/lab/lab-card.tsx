import { ArrowRight, Braces, Workflow } from "lucide-react";
import Link from "next/link";
import type { LabTool } from "../../lib/content";

const icons: Record<string, typeof Braces> = {
  "event-payloads": Braces,
  "event-flow": Workflow,
};

export default function LabCard({ tool }: { tool: LabTool }) {
  const Icon = icons[tool.slug] ?? Braces;
  const body = (
    <>
      <div className="mb-4 flex items-center justify-between">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
          <Icon size={18} strokeWidth={1.75} aria-hidden />
        </span>
        {tool.status === "soon" ? (
          <span className="text-[10px] font-semibold tracking-wider text-neutral-500">COMING SOON</span>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-wider text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
            INTERACTIVE
          </span>
        )}
      </div>
      <h3 className="mb-2 text-base font-semibold text-neutral-100 group-hover:text-emerald-300">{tool.title}</h3>
      <p className="mb-4 text-sm leading-relaxed text-neutral-500">{tool.description}</p>
      {tool.status === "live" && (
        <span className="inline-flex items-center gap-1 text-sm font-medium text-emerald-400">
          Try it <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" aria-hidden />
        </span>
      )}
    </>
  );

  const className = "group block rounded-xl border border-neutral-800 bg-[#0f1216] p-5 transition-colors";

  return tool.status === "live" ? (
    <Link href={`/lab/${tool.slug}`} className={`${className} hover:border-emerald-500/60`}>
      {body}
    </Link>
  ) : (
    <div className={`${className} opacity-70`}>{body}</div>
  );
}
