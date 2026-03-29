import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-stone-200/70 bg-stone-50/75 backdrop-blur-lg supports-[backdrop-filter]:bg-stone-50/60">
      <div className="container max-w-6xl m-auto px-6 sm:px-8">
        <nav className="flex items-center justify-between h-[4.25rem]">
          <Link
            href="/"
            className="font-display text-xl font-semibold tracking-tight text-stone-900 transition-colors hover:text-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 rounded-sm"
          >
            LB
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <Link
              href="/#values"
              className="rounded-lg px-3 py-2 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-200/60 hover:text-stone-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
            >
              Values
            </Link>
            <Link
              href="/#abilities"
              className="rounded-lg px-3 py-2 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-200/60 hover:text-stone-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
            >
              Abilities
            </Link>
            <Link
              href="/#writing"
              className="rounded-lg px-3 py-2 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-200/60 hover:text-stone-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
            >
              Projects
            </Link>
          </div>

          <button
            className="md:hidden rounded-lg p-2 text-stone-600 transition-colors hover:bg-stone-200/60 hover:text-stone-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
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
          <div className="md:hidden space-y-1 border-t border-stone-200/70 pb-5 pt-4">
            <Link
              href="/#values"
              className="block rounded-lg px-2 py-2 text-sm font-medium text-stone-600 hover:bg-stone-200/50 hover:text-stone-900"
              onClick={() => setMenuOpen(false)}
            >
              Values
            </Link>
            <Link
              href="/#abilities"
              className="block rounded-lg px-2 py-2 text-sm font-medium text-stone-600 hover:bg-stone-200/50 hover:text-stone-900"
              onClick={() => setMenuOpen(false)}
            >
              Abilities
            </Link>
            <Link
              href="/#writing"
              className="block rounded-lg px-2 py-2 text-sm font-medium text-stone-600 hover:bg-stone-200/50 hover:text-stone-900"
              onClick={() => setMenuOpen(false)}
            >
              Projects
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
