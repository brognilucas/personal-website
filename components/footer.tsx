import { Github, Linkedin } from "lucide-react";
import Container from "./container";
import { social, siteName, siteTitle } from "../lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 py-10 md:py-12">
      <Container wide>
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-center md:text-left">
            <p className="text-sm font-semibold text-neutral-900">{siteName}</p>
            <p className="text-sm text-neutral-500">{siteTitle}</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-neutral-500 md:justify-end">
            <a
              href={`mailto:${social.email}`}
              className="transition-colors hover:text-teal-700"
            >
              {social.email}
            </a>
            <span className="hidden text-neutral-300 sm:inline" aria-hidden>
              ·
            </span>
            <a
              href={social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 transition-colors hover:text-teal-700"
              title="GitHub"
            >
              <Github size={16} strokeWidth={1.75} />
              GitHub
            </a>
            <a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 transition-colors hover:text-teal-700"
              title="LinkedIn"
            >
              <Linkedin size={16} strokeWidth={1.75} />
              LinkedIn
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
