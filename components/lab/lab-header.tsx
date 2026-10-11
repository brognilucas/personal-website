import Link from "next/link";
import Container from "../container";

export default function LabHeader({ title, intro }: { title: string; intro: string }) {
  return (
    <section className="pt-28 pb-10 md:pt-36">
      <Container wide>
        <Link href="/lab" className="font-mono text-xs text-neutral-500 hover:text-emerald-400">
          ← cd ~/lab
        </Link>
        <h1 className="mt-3 mb-4 text-3xl font-bold tracking-tight text-neutral-100 md:text-4xl">{title}</h1>
        <p className="max-w-2xl text-base leading-relaxed text-neutral-400">{intro}</p>
      </Container>
    </section>
  );
}
