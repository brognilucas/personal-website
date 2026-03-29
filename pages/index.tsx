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
      className="group block p-6 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-gray-700 group-hover:bg-gray-100 transition-colors">
          <Icon size={22} strokeWidth={1.75} aria-hidden />
        </span>
        <ArrowUpRight
          size={18}
          className="text-gray-300 group-hover:text-blue-600 transition-colors shrink-0 mt-1"
          aria-hidden
        />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors leading-snug">
        {title}
      </h3>
      <p className="text-sm text-gray-600 leading-relaxed mb-4">{description}</p>
      <span className="text-sm font-medium text-blue-600 group-hover:text-blue-800">{cta}</span>
    </a>
  );
}

function Home() {
  return (
    <>
      <section className="pt-32 pb-20 md:pt-40 md:pb-28">
        <Container wide>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight tracking-tight mb-6">
              Building systems from first principles.{" "}
              <span className="text-gray-400">Scalability. Simplicity. Long-term thinking.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8 max-w-2xl">
              Senior Software Engineer with 10+ years designing and building scalable systems across products, domains, and geographies.
            </p>
            <div className="flex items-center space-x-5">
              <a
                href="https://github.com/brognilucas"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-900 transition-colors"
                title="GitHub"
              >
                <Github size={22} />
              </a>
              <a
                href="https://linkedin.com/in/lucas-brogni"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-600 transition-colors"
                title="LinkedIn"
              >
                <Linkedin size={22} />
              </a>
              <a
                href="https://vykwqnnvfkuxybai.public.blob.vercel-storage.com/Lucas_Brogni_CV_Technical.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-900 transition-colors"
                title="Download CV"
              >
                <FileText size={22} />
              </a>
            </div>
          </div>
        </Container>
      </section>

      <section id="values" className="py-20 bg-gray-50">
        <Container wide>
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-3">What drives me</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value) => (
              <div key={value.title} className="group">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="abilities" className="py-20">
        <Container wide>
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-3">What I bring</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">Core Abilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {abilities.map((ability) => (
              <div
                key={ability.title}
                className="p-6 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{ability.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{ability.description}</p>
                <div className="flex flex-wrap gap-2">
                  {ability.tags.map((tag) => (
                    <span key={tag} className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="writing" className="py-20 bg-gray-50">
        <Container wide>
          <div className="mb-12">
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-3">Latest work</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Writing &amp; projects</h2>
            <p className="text-gray-600 leading-relaxed max-w-2xl">
              I write about production serverless on AWS and ship community projects—ebook, independent blog, and a free NFL Draft platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

      <footer className="py-16 border-t border-gray-100">
        <Container wide>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-lg font-bold text-gray-900 mb-1">Lucas Brogni</p>
              <p className="text-sm text-gray-500">Senior Software Engineer</p>
            </div>
            <div className="flex items-center space-x-5">
              <a
                href="https://github.com/brognilucas"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-900 transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com/in/lucas-brogni"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-600 transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:lucasbrogni16@gmail.com"
                className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
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
