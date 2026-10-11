import type { GetStaticProps } from "next";
import Head from "next/head";
import Footer from "../components/footer";
import { Command, Cursor, ExtLink, IntLink, shortHash, Window } from "../components/terminal/ui";
import { career, location, openToWork, openToWorkLabel, pageDescription, pageTitle, projects, social } from "../lib/content";
import { FeedPost, getLatestPosts } from "../lib/feed";
import { absoluteUrl } from "../lib/site";

type HomeProps = { posts: FeedPost[] };

function Home({ posts }: HomeProps) {
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
      social.book,
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

      <div className="px-4 pb-16 pt-24 sm:px-6 md:pt-28">
        <Window title="lucas@brogni.dev — zsh">
          <Command cmd="whoami" animate>
            <h1 className="text-2xl font-bold text-neutral-50 sm:text-3xl">Lucas Brogni</h1>
            <p className="text-neutral-400">Software engineer · 10+ years · {location}</p>
            {openToWork && (
              <p className="mt-2 text-emerald-400">
                <span aria-hidden>● </span>
                {openToWorkLabel}
              </p>
            )}
            <p className="mt-3 max-w-2xl">
              I build backends that hold up in production: TypeScript, AWS Lambda, event-driven systems, and the testing
              that keeps them honest. I write about it on <ExtLink href={social.blog}>Practical Serverless</ExtLink> and
              published <ExtLink href={social.book}>From Zero to Production with AWS Lambda</ExtLink>.
            </p>
          </Command>

          <Command cmd="cat ./contact">
            <p><span className="whitespace-pre text-neutral-500">email    </span><a href={`mailto:${social.email}`} className="text-amber-300 hover:underline">{social.email}</a></p>
            <p><span className="whitespace-pre text-neutral-500">cv       </span><ExtLink href={social.cv}>download.pdf</ExtLink></p>
            <p><span className="whitespace-pre text-neutral-500">github   </span><ExtLink href={social.github}>brognilucas</ExtLink></p>
            <p><span className="whitespace-pre text-neutral-500">linkedin </span><ExtLink href={social.linkedin}>lucas-brogni</ExtLink></p>
          </Command>

          <Command cmd="git log --oneline ./career">
            <ul className="space-y-3">
              {career.map((job, i) => (
                <li key={job.company}>
                  <span className="text-amber-400">{shortHash(job.company)}</span>{" "}
                  {i === 0 && <span className="text-sky-400">(HEAD → main) </span>}
                  <span className="text-neutral-100">{job.role} @ {job.company}</span>{" "}
                  <span className="text-neutral-500">[{job.period}]</span>
                  <p className="pl-[8ch] text-neutral-400">{job.highlights[0]}</p>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-neutral-500">
              # full history: <IntLink href="/about">cat ./about</IntLink> or <ExtLink href={social.cv}>the CV</ExtLink>
            </p>
          </Command>

          <Command cmd="ls -l ./published">
            <ul className="space-y-1">
              {projects.map((project) => (
                <li key={project.href} className="grid grid-cols-[auto_1fr] gap-x-3 sm:grid-cols-[7rem_auto_1fr]">
                  <span className="hidden text-neutral-600 sm:inline">drwxr-xr-x</span>
                  <ExtLink href={project.href}>{project.title.toLowerCase().replace(/\s+/g, "-")}/</ExtLink>
                  <span className="text-neutral-500"># {project.type.toLowerCase()}</span>
                </li>
              ))}
            </ul>
          </Command>

          {posts.length > 0 && (
            <Command cmd={`tail -n ${posts.length} ./writing.log`}>
              <ul className="space-y-1">
                {posts.map((post) => (
                  <li key={post.url}>
                    <span className="text-neutral-500">{post.publishedAt ? post.publishedAt.slice(0, 10) : "----------"} </span>
                    <ExtLink href={post.url}>{post.title}</ExtLink>
                  </li>
                ))}
              </ul>
            </Command>
          )}

          <Command cmd="./lab --help">
            <p>Want to try some of what I&apos;ve built?</p>
            <p>
              Run <IntLink href="/lab">./lab</IntLink>{" "}
              <span className="text-neutral-500"># event payload builder, queue failure simulator</span>
            </p>
          </Command>

          <Cursor />
        </Window>
      </div>

      <Footer />
    </>
  );
}

Home.displayName = "Home";

export const getStaticProps: GetStaticProps<HomeProps> = async () => ({
  props: { posts: await getLatestPosts(3) },
  // Re-fetch the blog feed at most once an hour so new posts show up without a redeploy.
  revalidate: 3600,
});

export default Home;
