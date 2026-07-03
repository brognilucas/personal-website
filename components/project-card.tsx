import { ArrowUpRight } from "lucide-react";
import type { Project } from "../lib/content";

export default function ProjectCard({ type, typeColor, title, href, description }: Project) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-lg border border-neutral-200 bg-white p-5 transition-colors hover:border-neutral-300"
    >
      <span className={`mb-3 inline-block rounded px-2 py-0.5 text-[10px] font-semibold tracking-wider ${typeColor}`}>
        {type}
      </span>
      <div className="mb-2 flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold leading-snug text-neutral-900 group-hover:text-teal-800">
          {title}
        </h3>
        <ArrowUpRight
          size={16}
          className="mt-0.5 shrink-0 text-neutral-300 transition-colors group-hover:text-teal-600"
          aria-hidden
        />
      </div>
      <p className="text-sm leading-relaxed text-neutral-500">{description}</p>
    </a>
  );
}
