import { social } from "../lib/content";
import ServedBy from "./served-by";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 font-mono">
      <div className="mx-auto flex max-w-4xl flex-col gap-4 px-4 py-8 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <a href={`mailto:${social.email}`} className="transition-colors hover:text-neutral-200">
            {social.email}
          </a>
          <a href={social.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-neutral-200">
            github
          </a>
          <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-neutral-200">
            linkedin
          </a>
        </div>
        <ServedBy />
      </div>
    </footer>
  );
}
