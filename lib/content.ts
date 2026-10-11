export const siteName = "Lucas Brogni";
export const siteTitle = "Software Engineer";

export const social = {
  github: "https://github.com/brognilucas",
  linkedin: "https://linkedin.com/in/lucas-brogni",
  email: "lucasbrogni16@gmail.com",
  cv: "https://vykwqnnvfkuxybai.public.blob.vercel-storage.com/Lucas%20Brogni%20-%20Software%20Engineer.pdf",
  blog: "https://practicalserverless.blog",
  book: "https://lambdainproduction.com",
};

// Shows an "open to new roles" badge in the hero. Flip to true when you want it public.
export const openToWork = false;
export const openToWorkLabel = "Open to senior / staff backend roles";

// Feed URLs tried in order when pulling the latest posts from the blog.
export const blogFeedUrls = [
  `${social.blog}/rss.xml`,
  `${social.blog}/feed`,
  `${social.blog}/rss`,
  `${social.blog}/feed.xml`,
  `${social.blog}/atom.xml`,
];

export type LabTool = {
  slug: string;
  title: string;
  description: string;
  status: "live" | "soon";
};

export const slsTestingRepo = "https://github.com/brognilucas/sls-testing";

export const labTools: LabTool[] = [
  {
    slug: "event-payloads",
    title: "Lambda event payload builder",
    description:
      "Pick an event source (API Gateway, SQS, SNS, S3, EventBridge, DynamoDB Streams), fill in what matters and copy a realistic payload or a ready-to-paste test.",
    status: "live",
  },
  {
    slug: "event-flow",
    title: "Event-flow failure simulator",
    description:
      "Break an SQS → Lambda pipeline on purpose. Poison pills, retries, DLQs, partial batch failures and duplicate side effects, live.",
    status: "live",
  },
];

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
    type: "OPEN SOURCE",
    typeColor: "bg-sky-100 text-sky-800",
    title: "sls-testing",
    href: "https://github.com/brognilucas/sls-testing",
    description:
      "Typed event builders, a Lambda context mock and Jest matchers for testing AWS Lambda handlers. On npm as @sls-testing/core.",
  },
];

export const pageDescription =
  "Lucas Brogni is a software engineer and technical writer. AWS Lambda and serverless in production, backend architecture, and the Practical Serverless blog plus the From Zero to Production with AWS Lambda ebook.";

export const pageTitle =
  "Lucas Brogni | Software Engineer — AWS Lambda, Serverless & Engineering Blog";

export const location = "Toronto, ON";

export type CareerEntry = {
  period: string;
  role: string;
  company: string;
  place: string;
  highlights: string[];
  stack: string[];
};

// Mirrors the CV. Update both together.
export const career: CareerEntry[] = [
  {
    period: "2025 – now",
    role: "Software Engineer",
    company: "Rebrandly",
    place: "Toronto (remote)",
    highlights: [
      "Own subscription management end to end: Stripe integration, entitlements and lifecycle flows.",
      "Designed and shipped a serverless MCP server on AWS Lambda + API Gateway.",
      "Led company-wide adoption of feature flags with LaunchDarkly, from governance to rollout.",
    ],
    stack: ["TypeScript", "Node.js", "Python", "AWS Lambda", "Stripe"],
  },
  {
    period: "2023 – 2025",
    role: "Software Engineer",
    company: "Taxdoo",
    place: "Hamburg (remote)",
    highlights: [
      "Acting Engineering Manager for a 6-person team for 10 months during a leadership transition.",
      "Led the migration of authentication infrastructure to AWS Cognito.",
      "Rolled out CI/CD pipelines and testing standards adopted across the department.",
    ],
    stack: ["Java", "Node.js", "TypeScript", "AWS Cognito", "CI/CD"],
  },
  {
    period: "2022 – 2023",
    role: "Software Engineer",
    company: "Pleo",
    place: "Copenhagen (remote)",
    highlights: [
      "Re-architected a card tracking integration on serverless patterns in a high-throughput financial pipeline.",
      "Managed AWS infrastructure with Terraform and tuned PostgreSQL for real-time financial workloads.",
    ],
    stack: ["Node.js", "Kotlin", "AWS", "Terraform", "PostgreSQL"],
  },
  {
    period: "2021 – 2022",
    role: "Software Developer",
    company: "Multivision",
    place: "Lisbon (remote)",
    highlights: [
      "Designed and built a high-volume benchmarking platform for major hotel chains, from data model to API.",
    ],
    stack: ["TypeScript", "Node.js", "Angular", "MongoDB", "Cassandra"],
  },
  {
    period: "2014 – 2021",
    role: "Developer → Software Developer",
    company: "Lyncas, Qualix, Systextil, Elian",
    place: "Brazil",
    highlights: [
      "Seven years across ERP, mobile and cloud-native microservices, where my focus on testing and backend quality started.",
    ],
    stack: ["Node.js", "React Native", "Java", "SQL"],
  },
];
