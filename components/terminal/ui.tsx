import Link from "next/link";
import type { ReactNode } from "react";

export function Prompt({ path = "~" }: { path?: string }) {
  return (
    <>
      <span className="text-emerald-400">lucas@brogni.dev</span>
      <span className="text-neutral-500">:</span>
      <span className="text-sky-400">{path}</span>
      <span className="text-neutral-500">$ </span>
    </>
  );
}

export function Window({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mx-auto max-w-4xl overflow-hidden rounded-xl border border-neutral-800 bg-[#0f1216] font-mono text-[13px] leading-relaxed text-neutral-300 shadow-2xl sm:text-sm">
      <div className="flex items-center gap-2 border-b border-neutral-800 px-4 py-3" aria-hidden>
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-xs text-neutral-500">{title}</span>
      </div>
      <div className="p-5 sm:p-8">{children}</div>
    </div>
  );
}

export function Command({ cmd, path, children, animate = false }: { cmd: string; path?: string; children: ReactNode; animate?: boolean }) {
  return (
    <section className="mb-10">
      <p className="mb-3">
        <Prompt path={path} />
        <span className={`text-neutral-100 ${animate ? "type-in" : ""}`}>{cmd}</span>
      </p>
      <div className="text-neutral-300 sm:pl-4">{children}</div>
    </section>
  );
}

export function Cursor({ path }: { path?: string }) {
  return (
    <p>
      <Prompt path={path} />
      <span className="cursor-blink inline-block h-4 w-2 translate-y-0.5 bg-neutral-300" aria-hidden />
    </p>
  );
}

const linkClass = "text-amber-300 underline decoration-amber-300/30 underline-offset-4 hover:decoration-amber-300";

export function ExtLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
      {children}
    </a>
  );
}

export function IntLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className={linkClass}>
      {children}
    </Link>
  );
}

// Stable fake commit hash per entry, so the "git log" looks real without changing between renders.
export function shortHash(text: string): string {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
  return (h >>> 0).toString(16).padStart(8, "0").slice(0, 7);
}
