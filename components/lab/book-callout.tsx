import { ArrowUpRight, BookOpen } from "lucide-react";
import { social } from "../../lib/content";

export default function BookCallout({ text }: { text: string }) {
  return (
    <a
      href={social.book}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start gap-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-5 transition-colors hover:border-emerald-500/60"
    >
      <BookOpen size={20} strokeWidth={1.75} className="mt-0.5 shrink-0 text-emerald-400" aria-hidden />
      <span className="text-sm leading-relaxed text-neutral-300">
        {text}{" "}
        <span className="inline-flex items-center gap-0.5 font-medium text-emerald-300 group-hover:underline">
          From Zero to Production with AWS Lambda
          <ArrowUpRight size={14} aria-hidden />
        </span>
      </span>
    </a>
  );
}
