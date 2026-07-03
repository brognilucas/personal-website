import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Container from "../components/container";
import Footer from "../components/footer";
import ProjectCard from "../components/project-card";
import { pageDescription, pageTitle, projects, social } from "../lib/content";
import { absoluteUrl } from "../lib/site";

function Home() {
  const canonicalUrl = absoluteUrl("/");

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Lucas Brogni",
    jobTitle: "Software Engineer",
    url: canonicalUrl,
    sameAs: [
      social.github,
      social.linkedin,
      "https://lambdainproduction.com",
      social.blog,
    ],
    knowsAbout: [
      "Software engineering",
      "AWS Lambda",
      "Serverless computing",
      "Amazon Web Services",
      "TypeScript",
      "Backend architecture",
      "Technical writing",
    ],
    description: pageDescription,
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Lucas Brogni",
    url: canonicalUrl,
    description: pageDescription,
    author: {
      "@type": "Person",
      name: "Lucas Brogni",
      url: canonicalUrl,
    },
  };

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="author" content="Lucas Brogni" />
        <meta
          name="keywords"
          content="Lucas Brogni, software engineer, AWS Lambda, serverless blog, practical serverless, backend engineer, TypeScript, AWS, technical blog, engineering blog"
        />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Lucas Brogni" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([personJsonLd, websiteJsonLd]),
          }}
        />
      </Head>

      <section className="pt-28 pb-16 md:pt-36 md:pb-20">
        <Container wide>
          <div className="grid items-start gap-10 md:grid-cols-2 md:gap-12">
            <div>
              <h1 className="mb-8 text-3xl font-bold leading-tight tracking-tight text-neutral-900 md:text-4xl">
                Hi! I&apos;m Lucas.
              </h1>
              <p className="mb-6 text-base leading-relaxed text-neutral-600 md:text-lg">
                Software engineer with 10+ years building scalable backend systems. I write about AWS Lambda and
                serverless in production on{" "}
                <a
                  href={social.blog}
                  className="font-medium text-teal-700 underline decoration-teal-200 underline-offset-4 hover:text-teal-800"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Practical Serverless
                </a>{" "}
                and published{" "}
                <a
                  href="https://lambdainproduction.com"
                  className="font-medium text-teal-700 underline decoration-teal-200 underline-offset-4 hover:text-teal-800"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  From Zero to Production with AWS Lambda
                </a>
                .
              </p>
              <Link
                href="/about"
                className="text-sm font-medium text-teal-700 transition-colors hover:text-teal-800"
              >
                More about me →
              </Link>
            </div>

            <div className="flex justify-center md:justify-end">
              <div className="relative aspect-[3/4] w-56 overflow-hidden rounded-lg md:w-64">
                <Image
                  src="/images/portrait.jpg"
                  alt="Portrait of Lucas Brogni"
                  fill
                  sizes="(max-width: 768px) 224px, 256px"
                  className="object-cover object-[72%_78%]"
                  priority
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Container wide>
        <hr className="divider-dashed" />
      </Container>

      <section className="py-16 md:py-20">
        <Container wide>
          <p className="mb-8 text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-400">
            Some things I&apos;ve written, said, or made
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.href} {...project} />
            ))}
          </div>
        </Container>
      </section>

      <Footer />
    </>
  );
}

Home.displayName = "Home";

export default Home;
