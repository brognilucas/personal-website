import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { social } from "../lib/content";

const navItems = [
  { label: "HOME", href: "/", external: false },
  { label: "BLOG", href: social.blog, external: true },
  { label: "ABOUT", href: "/about", external: false },
] as const;

function navLinkClass(isActive: boolean) {
  return `text-xs font-medium tracking-widest transition-colors ${
    isActive ? "text-teal-700" : "text-neutral-500 hover:text-neutral-900"
  }`;
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const isActive = (href: string) => {
    if (href === "/") return router.pathname === "/";
    return router.pathname === href;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-neutral-200 bg-white">
      <div className="container relative m-auto max-w-4xl px-6 sm:px-8">
        <nav className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight text-neutral-900 transition-colors hover:text-teal-700"
          >
            <span className="flex flex-col leading-none">
              <span>L</span>
              <span>B</span>
            </span>
          </Link>

          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
            {navItems.map((item) =>
              item.external ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={navLinkClass(false)}
                >
                  {item.label}
                </a>
              ) : (
                <Link key={item.label} href={item.href} className={navLinkClass(isActive(item.href))}>
                  {item.label}
                </Link>
              ),
            )}
          </div>

          <button
            className="rounded-lg p-2 text-neutral-600 transition-colors hover:text-neutral-900 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>

        {menuOpen && (
          <div className="space-y-1 border-t border-neutral-200 pb-5 pt-4 md:hidden">
            {navItems.map((item) =>
              item.external ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block py-2 text-xs font-medium tracking-widest text-neutral-500"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`block py-2 text-xs font-medium tracking-widest ${
                    isActive(item.href) ? "text-teal-700" : "text-neutral-500"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ),
            )}
          </div>
        )}
      </div>
    </header>
  );
}
