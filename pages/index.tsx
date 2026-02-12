import type { InferGetStaticPropsType } from "next";
import Link from "next/link";
import useSWR from "swr";
import Container from "../components/container";
import { Github, Linkedin, FileText, ArrowRight, ArrowUpRight } from "lucide-react";
import distanceToNow from "../lib/dateRelative";
import { getAllPosts } from "../lib/getPost";

const fetcher = () => getAllPosts();
const REFRESH_TIME = 60000;

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

function Home({
  latestPosts: initialPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { data: allPosts = [] } = useSWR("posts", fetcher, {
    refreshInterval: REFRESH_TIME,
    fallbackData: [],
  });

  const posts = allPosts.length > 0 ? allPosts.slice(0, 4) : initialPosts;

  return (
    <>
      {/* Hero */}
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
                href="https://vykwqnnvfkuxybai.public.blob.vercel-storage.com/Lucas%20Brogni%20-%20Senior%20Software%20Engineer.pdf"
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

      {/* Values */}
      <section id="values" className="py-20 bg-gray-50">
        <Container wide>
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-3">
            What drives me
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
            Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value) => (
              <div key={value.title} className="group">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Core Abilities */}
      <section id="abilities" className="py-20">
        <Container wide>
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-3">
            What I bring
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
            Core Abilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {abilities.map((ability) => (
              <div
                key={ability.title}
                className="p-6 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {ability.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {ability.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {ability.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full"
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

      {/* Latest Writing */}
      <section id="writing" className="py-20 bg-gray-50">
        <Container wide>
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-3">
                Latest thoughts
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Writing
              </h2>
            </div>
            <Link
              href="/posts"
              className="hidden md:flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
            >
              View all posts
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/posts/${post.id}`}
                  className="group block p-6 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-3">
                    <time className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                      {distanceToNow(new Date(post.published_at))}
                    </time>
                    <ArrowUpRight
                      size={16}
                      className="text-gray-300 group-hover:text-blue-600 transition-colors"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                    {post.description}
                  </p>
                  {post.reading_time_minutes && (
                    <p className="text-xs text-gray-400 mt-3">
                      {post.reading_time_minutes} min read
                    </p>
                  )}
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No posts yet — check back soon.</p>
          )}

          <Link
            href="/posts"
            className="md:hidden flex items-center justify-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mt-8"
          >
            View all posts
            <ArrowRight size={16} className="ml-1" />
          </Link>
        </Container>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-gray-100">
        <Container wide>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-lg font-bold text-gray-900 mb-1">Lucas Brogni</p>
              <p className="text-sm text-gray-500">
                Senior Software Engineer
              </p>
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

export async function getStaticProps() {
  const allPosts = await getAllPosts();
  const latestPosts = allPosts.slice(0, 4);

  return {
    props: { latestPosts },
    revalidate: 60,
  };
}
