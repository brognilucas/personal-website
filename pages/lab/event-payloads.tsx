import { Check, Copy, Download, Github, RefreshCw } from "lucide-react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import Container from "../../components/container";
import Footer from "../../components/footer";
import CodeBlock from "../../components/lab/code-block";
import LabHeader from "../../components/lab/lab-header";
import { Segmented } from "../../components/lab/controls";
import { slsTestingRepo } from "../../lib/content";
import {
  buildSnippet,
  eventSources,
  FieldValues,
  parseJson,
} from "../../lib/event-payloads";
import { absoluteUrl } from "../../lib/site";

const title = "Lambda event payload builder | Lucas Brogni";
const description =
  "Generate realistic AWS Lambda test events for API Gateway, SQS, SNS, S3, EventBridge and DynamoDB Streams, plus a ready-to-paste Jest test using @sls-testing.";

type OutputTab = "json" | "test";

const initialValues = () => Object.fromEntries(eventSources.map((s) => [s.id, { ...s.defaults }])) as Record<string, FieldValues>;

export default function EventPayloads() {
  const router = useRouter();
  const [sourceId, setSourceId] = useState(eventSources[0].id);
  const [values, setValues] = useState<Record<string, FieldValues>>(initialValues);
  // Bumped to rebuild the event with fresh IDs; 0 means "not mounted yet".
  const [generation, setGeneration] = useState(0);
  const [tab, setTab] = useState<OutputTab>("json");
  const [copied, setCopied] = useState(false);

  // The library generates random IDs and timestamps, so build only in the browser
  // to keep the server render and the first client render identical.
  useEffect(() => setGeneration(1), []);

  useEffect(() => {
    if (!router.isReady) return;
    const fromQuery = eventSources.find((s) => s.id === router.query.source);
    if (fromQuery) setSourceId(fromQuery.id);
  }, [router.isReady, router.query.source]);

  const selectSource = (id: string) => {
    setSourceId(id);
    router.replace({ pathname: router.pathname, query: { source: id } }, undefined, { shallow: true, scroll: false });
  };

  const source = eventSources.find((s) => s.id === sourceId) ?? eventSources[0];
  const current = values[source.id];

  const setField = (key: string, value: string) =>
    setValues((all) => ({ ...all, [source.id]: { ...all[source.id], [key]: value } }));

  const output = useMemo(() => {
    if (tab === "test") return buildSnippet(source, current);
    if (generation === 0) return "";
    return JSON.stringify(source.build(source.overrides(current)), null, 2);
  }, [source, current, generation, tab]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard can be blocked; the text is still selectable.
    }
  };

  const download = () => {
    const blob = new Blob([output], { type: tab === "json" ? "application/json" : "text/typescript" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = tab === "json" ? `${source.id}-event.json` : `${source.id}.test.ts`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={absoluteUrl("/lab/event-payloads")} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={absoluteUrl("/lab/event-payloads")} />
        <meta name="twitter:card" content="summary" />
      </Head>

      <LabHeader
        title="Lambda event payload builder"
        intro="Stop copying events out of CloudWatch logs. Pick a source, fill in the parts that matter to your handler and take the payload, or a ready-to-paste Jest test, with you."
      />

      <section className="pb-16">
        <Container wide>
          <div className="mb-6 flex flex-wrap gap-2" role="tablist" aria-label="Event source">
            {eventSources.map((s) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={s.id === source.id}
                onClick={() => selectSource(s.id)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  s.id === source.id
                    ? "border-neutral-100 bg-neutral-100 text-neutral-900"
                    : "border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-neutral-100"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
            <section className="space-y-5 rounded-xl border border-neutral-800 p-5">
              <h2 className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-500">{source.label}</h2>
              {source.fields.map((field) => (
                <label key={`${source.id}-${field.key}`} className="block">
                  <span className="mb-1.5 block text-sm font-medium text-neutral-300">{field.label}</span>
                  {field.kind === "select" && (
                    <select
                      value={current[field.key]}
                      onChange={(e) => setField(field.key, e.target.value)}
                      className="w-full rounded-lg border border-neutral-800 bg-[#0f1216] px-3 py-2 text-sm text-neutral-100 focus:border-emerald-500 focus:outline-none"
                    >
                      {field.options.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  )}
                  {field.kind === "text" && (
                    <input
                      type="text"
                      value={current[field.key]}
                      placeholder={field.placeholder}
                      onChange={(e) => setField(field.key, e.target.value)}
                      className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 font-mono text-sm text-neutral-100 focus:border-emerald-500 focus:outline-none"
                    />
                  )}
                  {field.kind === "json" && (
                    <JsonInput
                      value={current[field.key]}
                      rows={field.rows}
                      onChange={(value) => setField(field.key, value)}
                    />
                  )}
                  {field.hint && <span className="mt-1 block text-xs text-neutral-500">{field.hint}</span>}
                </label>
              ))}
              <button
                type="button"
                onClick={() => setValues((all) => ({ ...all, [source.id]: { ...source.defaults } }))}
                className="text-xs font-medium text-neutral-500 hover:text-neutral-100"
              >
                Reset to example
              </button>
            </section>

            <section className="min-w-0 rounded-xl border border-neutral-800">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800 px-5 py-3">
                <Segmented<OutputTab>
                  label=""
                  value={tab}
                  options={[
                    { value: "json", label: "Event JSON" },
                    { value: "test", label: "Jest test" },
                  ]}
                  onChange={setTab}
                />
                <div className="flex items-center gap-3">
                  {tab === "json" && (
                    <button
                      type="button"
                      onClick={() => setGeneration((g) => g + 1)}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 hover:text-neutral-100"
                      title="New request IDs, message IDs and timestamps"
                    >
                      <RefreshCw size={14} aria-hidden />
                      Regenerate IDs
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={download}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 hover:text-neutral-100"
                  >
                    <Download size={14} aria-hidden />
                    Download
                  </button>
                  <button
                    type="button"
                    onClick={copy}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-neutral-100 px-3 py-1.5 text-xs font-medium text-neutral-900 hover:bg-emerald-400"
                  >
                    {copied ? <Check size={14} aria-hidden /> : <Copy size={14} aria-hidden />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>
              <CodeBlock code={output} language={tab === "json" ? "json" : "ts"} />
            </section>
          </div>

          <a
            href={slsTestingRepo}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-10 flex items-start gap-4 rounded-xl border border-neutral-800 p-5 transition-colors hover:border-neutral-600"
          >
            <Github size={20} strokeWidth={1.75} className="mt-0.5 shrink-0 text-neutral-300" aria-hidden />
            <span className="text-sm leading-relaxed text-neutral-400">
              Every payload on this page is generated by <code className="font-mono text-neutral-100">@sls-testing/core</code>,
              an open-source library I wrote for typed Lambda event builders and Jest matchers.{" "}
              <span className="font-medium text-emerald-400 group-hover:underline">
                npm install @sls-testing/core @sls-testing/jest
              </span>
            </span>
          </a>
        </Container>
      </section>

      <Footer />
    </>
  );
}

function JsonInput({ value, rows = 5, onChange }: { value: string; rows?: number; onChange: (value: string) => void }) {
  const parsed = parseJson(value);
  return (
    <>
      <textarea
        value={value}
        rows={rows}
        spellCheck={false}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-lg border bg-neutral-950 px-3 py-2 font-mono text-xs leading-relaxed text-neutral-100 focus:outline-none ${
          parsed.ok ? "border-neutral-800 focus:border-emerald-500" : "border-amber-500/50 focus:border-amber-500"
        }`}
      />
      {!parsed.ok && (
        <span className="mt-1 block text-xs text-amber-300">Not valid JSON. It will be sent as a raw string.</span>
      )}
    </>
  );
}
