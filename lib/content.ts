export const siteName = "Lucas Brogni";
export const siteTitle = "Software Engineer";

export const social = {
  github: "https://github.com/brognilucas",
  linkedin: "https://linkedin.com/in/lucas-brogni",
  email: "lucasbrogni16@gmail.com",
  cv: "https://vykwqnnvfkuxybai.public.blob.vercel-storage.com/Lucas%20Brogni%20-%20Software%20Engineer.pdf",
  blog: "https://practicalserverless.blog",
};

export const heroBio =
  "Software engineer with 10+ years building scalable backend systems. I write about AWS Lambda and serverless in production on Practical Serverless and published From Zero to Production with AWS Lambda.";

export const aboutBio =
  "I'm a software engineer with over a decade of experience designing and building scalable systems across products, domains, and geographies. My focus is backend architecture, AWS Lambda, and serverless patterns that hold up in production—not just in demos.";

export const values = [
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

export const abilities = [
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

export type Project = {
  type: string;
  typeColor: string;
  title: string;
  href: string;
  description: string;
};

export const projects: Project[] = [
  {
    type: "EBOOK",
    typeColor: "bg-emerald-100 text-emerald-800",
    title: "From Zero to Production with AWS Lambda",
    href: "https://lambdainproduction.com",
    description:
      "A practical serverless ebook covering Lambda, API Gateway, DynamoDB, observability, and production patterns.",
  },
  {
    type: "BLOG",
    typeColor: "bg-pink-100 text-pink-800",
    title: "Practical Serverless",
    href: "https://practicalserverless.blog",
    description:
      "Articles on real-world serverless: event-driven design, failure handling, and lessons from production.",
  },
  {
    type: "PROJECT",
    typeColor: "bg-blue-100 text-blue-800",
    title: "DraftPulse",
    href: "https://draftpulse.co",
    description:
      "A free community NFL Draft board to rank prospects and share analysis.",
  },
];

export const pageDescription =
  "Lucas Brogni is a software engineer and technical writer. AWS Lambda and serverless in production, backend architecture, and the Practical Serverless blog plus the From Zero to Production with AWS Lambda ebook.";

export const pageTitle =
  "Lucas Brogni | Software Engineer — AWS Lambda, Serverless & Engineering Blog";
