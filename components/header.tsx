import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container max-w-5xl m-auto px-6">
        <nav className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-gray-900 tracking-tight hover:text-blue-600 transition-colors">
            LB
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/#values" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Values
            </Link>
            <Link href="/#abilities" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Abilities
            </Link>
            <Link href="/#writing" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Writing
            </Link>
            <a
              href="https://linkedin.com/in/lucas-brogni"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-white bg-gray-900 px-4 py-2 rounded-full hover:bg-blue-600 transition-colors"
            >
              Contact
            </a>
          </div>

          <button
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
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
          <div className="md:hidden pb-4 border-t border-gray-100 pt-4 space-y-3">
            <Link href="/#values" className="block text-sm font-medium text-gray-600 hover:text-gray-900" onClick={() => setMenuOpen(false)}>
              Values
            </Link>
            <Link href="/#abilities" className="block text-sm font-medium text-gray-600 hover:text-gray-900" onClick={() => setMenuOpen(false)}>
              Abilities
            </Link>
            <Link href="/#writing" className="block text-sm font-medium text-gray-600 hover:text-gray-900" onClick={() => setMenuOpen(false)}>
              Writing
            </Link>
            <a
              href="https://linkedin.com/in/lucas-brogni"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm font-medium text-white bg-gray-900 px-4 py-2 rounded-full hover:bg-blue-600 transition-colors"
            >
              Contact
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
