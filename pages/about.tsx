import Head from "next/head";
import Footer from "../components/footer";
import { Command, Cursor, ExtLink, shortHash, Window } from "../components/terminal/ui";
import { aboutBio, abilities, career, social, values } from "../lib/content";
import { absoluteUrl } from "../lib/site";

const aboutTitle = "About | Lucas Brogni";
const aboutDescription =
  "About Lucas Brogni — software engineer focused on AWS Lambda, serverless architecture, and backend systems.";

function slug(text: string) {
  return text.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function About() {
  const canonicalUrl = absoluteUrl("/about");

  return (
    <>
      <Head>
        <title>{aboutTitle}</title>
        <meta name="description" content={aboutDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={aboutTitle} />
        <meta property="og:description" content={aboutDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={aboutTitle} />
        <meta name="twitter:description" content={aboutDescription} />
      </Head>

      <div className="px-4 pb-16 pt-24 sm:px-6 md:pt-28">
        <Window title="lucas@brogni.dev — ~/about">
          <Command cmd="cat README.md" path="~/about" animate>
            <h1 className="mb-2 text-2xl font-bold text-neutral-50">About</h1>
            <p className="max-w-2xl">{aboutBio}</p>
            <p className="mt-3">
              <span className="text-neutral-500"># the long version → </span>
              <ExtLink href={social.cv}>download CV (pdf)</ExtLink>
            </p>
          </Command>

          <Command cmd="git log ./career" path="~/about">
            <ul className="space-y-6">
              {career.map((job, i) => (
                <li key={job.company}>
                  <p>
                    <span className="text-amber-400">commit {shortHash(job.company)}</span>
                    {i === 0 && <span className="text-sky-400"> (HEAD → main)</span>}
                  </p>
                  <p className="whitespace-pre-wrap text-neutral-500">Date:   {job.period} · {job.place}</p>
                  <p className="mt-2 pl-[4ch] text-neutral-100">{job.role} @ {job.company}</p>
                  <ul className="mt-1 space-y-1 pl-[4ch]">
                    {job.highlights.map((h) => (
                      <li key={h} className="text-neutral-400">
                        <span className="text-neutral-600">- </span>
                        {h}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-1 pl-[4ch] text-neutral-500">stack: {job.stack.join(", ")}</p>
                </li>
              ))}
            </ul>
          </Command>

          <Command cmd="cat values.md" path="~/about">
            <ul className="space-y-4">
              {values.map((value) => (
                <li key={value.title}>
                  <p className="text-emerald-400">## {value.title}</p>
                  <p className="max-w-2xl text-neutral-400">{value.description}</p>
                </li>
              ))}
            </ul>
          </Command>

          <Command cmd="ls ./skills" path="~/about">
            <ul className="space-y-4">
              {abilities.map((ability) => (
                <li key={ability.title}>
                  <p className="text-sky-400">{slug(ability.title)}/</p>
                  <p className="max-w-2xl text-neutral-400">{ability.description}</p>
                  <p className="text-neutral-500">{ability.tags.map((t) => `#${slug(t)}`).join("  ")}</p>
                </li>
              ))}
            </ul>
          </Command>

          <Cursor path="~/about" />
        </Window>
      </div>

      <Footer />
    </>
  );
}

About.displayName = "About";

export default About;
