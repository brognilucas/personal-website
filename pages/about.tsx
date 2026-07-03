import { FileText } from "lucide-react";
import Head from "next/head";
import Link from "next/link";
import Container from "../components/container";
import Footer from "../components/footer";
import { aboutBio, abilities, social, values } from "../lib/content";
import { absoluteUrl } from "../lib/site";

const aboutTitle = "About | Lucas Brogni";
const aboutDescription =
  "About Lucas Brogni — software engineer focused on AWS Lambda, serverless architecture, and backend systems.";

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

      <section className="pt-28 pb-12 md:pt-36 md:pb-16">
        <Container narrow>
          <h1 className="mb-6 text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">About</h1>
          <p className="mb-8 text-base leading-relaxed text-neutral-600 md:text-lg">{aboutBio}</p>
          <a
            href={social.cv}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 px-4 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-300 hover:text-teal-700"
          >
            <FileText size={16} strokeWidth={1.75} />
            Download CV
          </a>
        </Container>
      </section>

      <section className="border-t border-neutral-200 py-16 md:py-20">
        <Container wide>
          <h2 className="mb-10 text-2xl font-bold tracking-tight text-neutral-900">Values</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
            {values.map((value) => (
              <div key={value.title} className="rounded-lg border border-neutral-200 p-6">
                <h3 className="mb-2 text-lg font-semibold text-neutral-900">{value.title}</h3>
                <p className="text-sm leading-relaxed text-neutral-600">{value.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-neutral-200 py-16 md:py-20">
        <Container wide>
          <h2 className="mb-10 text-2xl font-bold tracking-tight text-neutral-900">Core abilities</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
            {abilities.map((ability) => (
              <div key={ability.title} className="rounded-lg border border-neutral-200 p-6">
                <h3 className="mb-2 text-lg font-semibold text-neutral-900">{ability.title}</h3>
                <p className="mb-4 text-sm leading-relaxed text-neutral-600">{ability.description}</p>
                <div className="flex flex-wrap gap-2">
                  {ability.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-0.5 text-xs font-medium text-neutral-600"
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

      <Container wide>
        <p className="pb-8 text-center text-sm text-neutral-500">
          <Link href="/" className="font-medium text-teal-700 hover:text-teal-800">
            ← Back home
          </Link>
        </p>
      </Container>

      <Footer />
    </>
  );
}

About.displayName = "About";

export default About;
