import Head from "next/head";
import Container from "../../components/container";
import Footer from "../../components/footer";
import LabCard from "../../components/lab/lab-card";
import { labTools } from "../../lib/content";
import { absoluteUrl } from "../../lib/site";

const title = "Lab | Lucas Brogni";
const description =
  "Interactive tools about serverless in production: a Lambda event payload builder and an SQS → Lambda failure simulator.";

export default function Lab() {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={absoluteUrl("/lab")} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={absoluteUrl("/lab")} />
        <meta name="twitter:card" content="summary" />
      </Head>

      <section className="pt-28 pb-16 md:pt-36 md:pb-20">
        <Container wide>
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-neutral-100 md:text-4xl">Lab</h1>
          <p className="mb-10 max-w-2xl text-base leading-relaxed text-neutral-400">
            Small, interactive tools that show the trade-offs I deal with when running serverless systems in production.
            Play with them, break things, share a link.
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {labTools.map((tool) => (
              <LabCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </Container>
      </section>

      <Footer />
    </>
  );
}
