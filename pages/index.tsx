import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, BookOpen, FileText, Github, Linkedin, Rss, Trophy } from "lucide-react";
import Container from "../components/container";

const values = [
  {
    title: "Continuous Learning",
    description:
      "I grow by stepping outside my comfort zone — whether it's a new tech stack, a different domain, or a fresh cultural context. Every challenge is a chance to evolve.",
  },
  {
    title: "Technical Excellence",
    description:
      "Clean code, thoughtful architecture, and rigorous testing aren't optional — they're the foundation of software that lasts.",
  },
  {
    title: "Collaborative Leadership",
    description:
      "I believe the best engineering happens when people feel heard, supported, and challenged. I lead by growing others.",
  },
  {
    title: "Impact Over Output",
    description:
      "Lines of code don't matter. What matters is solving real problems, shipping reliable systems, and making users' lives better.",
  },
];

const abilities = [
  {
    title: "Backend & Cloud Architecture",
    description:
      "Designing and building scalable microservices, serverless functions, and event-driven systems on AWS.",
    tags: ["TypeScript", "Node.js", "AWS", "Kafka", "DynamoDB"],
  },
  {
    title: "Technical Leadership",
    description:
      "Leading engineering teams through complex migrations, system redesigns, and scaling challenges.",
    tags: ["Team Building", "Mentoring", "Architecture Reviews"],
  },
  {
    title: "DevOps & Automation",
    description:
      "Building robust CI/CD pipelines, infrastructure as code, monitoring, and automated testing strategies.",
    tags: ["Terraform", "CI/CD", "Docker", "Observability"],
  },
  {
    title: "Software Craftsmanship",
    description:
      "Championing clean code, TDD, code reviews, and engineering best practices across teams.",
    tags: ["Jest", "Cypress", "Clean Code", "Agile"],
  },
];

function ProjectCard({
  title,
  href,
  description,
  cta,
  icon: Icon,
}: {
  title: string;
  href: string;
  description: string;
  cta: string;
  icon: LucideIcon;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block overflow-hidden rounded-2xl border border-stone-200/80 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-teal-200/80 hover:shadow-soft-lg"
    >
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-gradient-to-br from-teal-100/80 to-transparent opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden
      />
      <div className="relative flex items-start justify-between gap-4 mb-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-teal-50 text-teal-800 ring-1 ring-teal-100/80 transition-all duration-300 group-hover:bg-teal-100/90 group-hover:ring-teal-200/80">
          <Icon size={22} strokeWidth={1.75} aria-hidden />
        </span>
        <ArrowUpRight
          size={18}
          className="mt-1 shrink-0 text-stone-300 transition-colors group-hover:text-teal-600"
          aria-hidden
        />
      </div>
      <h3 className="font-display relative text-xl font-semibold leading-snug text-stone-900 transition-colors group-hover:text-teal-800 mb-2">
        {title}
      </h3>
      <p className="relative text-sm text-stone-600 leading-relaxed mb-5">{description}</p>
      <span className="relative inline-flex items-center gap-1 text-sm font-semibold text-teal-700 transition-colors group-hover:text-teal-800">
        {cta}
      </span>
    </a>
  );
}

function Home() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgb(204_251_241/0.45),transparent)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-32 top-24 h-72 w-72 rounded-full bg-teal-200/25 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-24 top-40 h-64 w-64 rounded-full bg-amber-100/40 blur-3xl"
          aria-hidden
        />
        <Container wide>
          <div className="relative max-w-3xl">
            <p className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-teal-800">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-500" aria-hidden />
              Software Engineer · 10+ years
            </p>
            <h1 className="font-display text-4xl md:text-[3.25rem] md:leading-[1.08] font-semibold tracking-tight text-stone-900 mb-6">
              Building systems from first principles.{" "}
              <span className="text-stone-500 font-medium italic">Scalability. Simplicity. Long-term thinking.</span>
            </h1>
            <p className="text-lg md:text-xl text-stone-600 leading-relaxed mb-10 max-w-2xl">
              Software Engineer with 10+ years designing and building scalable systems across products, domains, and geographies.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-1 rounded-full border border-stone-200/90 bg-white/80 px-2 py-2 shadow-sm backdrop-blur-sm">
                <a
                  href="https://github.com/brognilucas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full p-2.5 text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                  title="GitHub"
                >
                  <Github size={22} strokeWidth={1.75} />
                </a>
                <a
                  href="https://linkedin.com/in/lucas-brogni"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full p-2.5 text-stone-500 transition-colors hover:bg-stone-100 hover:text-[#0A66C2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                  title="LinkedIn"
                >
                  <Linkedin size={22} strokeWidth={1.75} />
                </a>
                <a
                  href="https://vykwqnnvfkuxybai.public.blob.vercel-storage.com/Lucas_Brogni_CV_Technical.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full p-2.5 text-stone-500 transition-colors hover:bg-stone-100 hover:text-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                  title="Download CV"
                >
                  <FileText size={22} strokeWidth={1.75} />
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section id="values" className="relative border-y border-stone-200/60 bg-gradient-to-b from-stone-100/40 to-stone-50 py-20 md:py-24">
        <Container wide>
          <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-teal-800">
            <span className="h-px w-8 bg-teal-400/80" aria-hidden />
            What drives me
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-stone-900 mb-12 md:mb-14">
            Values
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="group rounded-2xl border border-stone-200/70 bg-white/70 p-6 shadow-soft backdrop-blur-sm transition-all duration-300 hover:border-teal-200/60 hover:shadow-soft-lg md:p-8"
              >
                <h3 className="font-display text-xl font-semibold text-stone-900 mb-3 transition-colors group-hover:text-teal-800">
                  {value.title}
                </h3>
                <p className="text-stone-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="abilities" className="py-20 md:py-24">
        <Container wide>
          <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-teal-800">
            <span className="h-px w-8 bg-teal-400/80" aria-hidden />
            What I bring
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-stone-900 mb-12 md:mb-14">
            Core abilities
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {abilities.map((ability) => (
              <div
                key={ability.title}
                className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-stone-300/90 hover:shadow-soft-lg md:p-8"
              >
                <h3 className="font-display text-xl font-semibold text-stone-900 mb-3">{ability.title}</h3>
                <p className="text-stone-600 leading-relaxed mb-5">{ability.description}</p>
                <div className="flex flex-wrap gap-2">
                  {ability.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-stone-200/90 bg-stone-50 px-3 py-1 text-xs font-medium text-stone-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="writing" className="border-t border-stone-200/60 bg-gradient-to-b from-stone-100/35 to-stone-50 py-20 md:py-24">
        <Container wide>
          <div className="mb-12 md:mb-14">
            <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-teal-800">
              <span className="h-px w-8 bg-teal-400/80" aria-hidden />
              Latest work
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-stone-900 mb-4">
              Writing &amp; projects
            </h2>
            <p className="text-lg text-stone-600 leading-relaxed max-w-2xl">
              I write about production serverless on AWS and ship community projects—ebook, independent blog, and a free NFL Draft platform.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            <ProjectCard
              icon={BookOpen}
              href="https://lambdainproduction.com"
              title="From Zero to Production with AWS Lambda"
              description="Practical serverless ebook: Lambda execution model, API Gateway, SQS, EventBridge, DynamoDB, S3, observability, security, testing, CI/CD, and cost-aware performance."
              cta="lambdainproduction.com →"
            />
            <ProjectCard
              icon={Rss}
              href="https://practicalserverless.blog"
              title="Practical Serverless"
              description="Ongoing articles on real-world serverless: event-driven design, failure handling and DLQs, and lessons from production—not demos."
              cta="practicalserverless.blog →"
            />
            <ProjectCard
              icon={Trophy}
              href="https://draftpulse.co"
              title="DraftPulse"
              description="Free community NFL Draft board: rank prospects, share analysis, and learn from collective takes—not a single hot take machine."
              cta="draftpulse.co →"
            />
          </div>
        </Container>
      </section>

      <footer className="border-t border-stone-200/70 bg-white/60 py-14 backdrop-blur-sm md:py-16">
        <Container wide>
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="text-center md:text-left">
              <p className="font-display text-lg font-semibold text-stone-900 mb-1">Lucas Brogni</p>
              <p className="text-sm text-stone-500">Software Engineer</p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 md:justify-end">
              <a
                href="https://github.com/brognilucas"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full p-2 text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                title="GitHub"
              >
                <Github size={20} strokeWidth={1.75} />
              </a>
              <a
                href="https://linkedin.com/in/lucas-brogni"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full p-2 text-stone-400 transition-colors hover:bg-stone-100 hover:text-[#0A66C2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                title="LinkedIn"
              >
                <Linkedin size={20} strokeWidth={1.75} />
              </a>
              <span className="hidden h-4 w-px bg-stone-200 sm:block" aria-hidden />
              <a
                href="mailto:lucasbrogni16@gmail.com"
                className="text-sm font-medium text-stone-600 underline decoration-stone-300 underline-offset-4 transition-colors hover:text-teal-800 hover:decoration-teal-400/80"
              >
                lucasbrogni16@gmail.com
              </a>
            </div>
          </div>
        </Container>
      </footer>
    </>
  );
}

Home.displayName = "Home";

export default Home;
