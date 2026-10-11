import Link from "next/link";
import { useRouter } from "next/router";
import { social } from "../lib/content";

const navItems = [
  { label: "~/home", href: "/" },
  { label: "~/about", href: "/about" },
  { label: "~/lab", href: "/lab" },
] as const;

export default function Header() {
  const { pathname } = useRouter();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`));

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-neutral-800 bg-[#0b0d10]/90 font-mono backdrop-blur">
      <nav className="mx-auto flex h-14 max-w-4xl items-center justify-between gap-4 px-4 text-xs sm:px-6">
        <Link href="/" className="shrink-0 font-semibold text-neutral-100 hover:text-emerald-400">
          <span className="text-emerald-400">λ</span> brogni.dev
        </Link>
        <div className="flex items-center gap-4 overflow-x-auto sm:gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`whitespace-nowrap transition-colors ${isActive(item.href) ? "text-emerald-400" : "text-neutral-500 hover:text-neutral-200"}`}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={social.blog}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden whitespace-nowrap text-neutral-500 transition-colors hover:text-neutral-200 sm:inline"
          >
            ~/blog ↗
          </a>
          <a
            href={social.cv}
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap rounded border border-neutral-700 px-2 py-1 text-neutral-300 transition-colors hover:border-emerald-500 hover:text-emerald-400"
          >
            cv.pdf
          </a>
        </div>
      </nav>
    </header>
  );
}
