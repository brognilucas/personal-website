import { Pause, Play, RotateCcw } from "lucide-react";
import Head from "next/head";
import { useEffect, useState } from "react";
import Container from "../../components/container";
import Footer from "../../components/footer";
import BookCallout from "../../components/lab/book-callout";
import { Panel, Segmented, Slider, Stat, Toggle } from "../../components/lab/controls";
import FlowDiagram from "../../components/lab/flow-diagram";
import LabHeader from "../../components/lab/lab-header";
import Sparkline from "../../components/lab/sparkline";
import { defaultConfig, FlowConfig, FlowState, initialState, presets, step } from "../../lib/event-flow";
import { absoluteUrl } from "../../lib/site";

const title = "Event-flow failure simulator | Lucas Brogni";
const description =
  "Break an SQS to Lambda pipeline on purpose: poison messages, retries, dead-letter queues, partial batch failures and duplicate side effects, simulated live.";

const speeds = [
  { value: "1", label: "1×" },
  { value: "4", label: "4×" },
  { value: "10", label: "10×" },
];

export default function EventFlow() {
  const [config, setConfig] = useState<FlowConfig>(defaultConfig);
  const [sim, setSim] = useState<FlowState>(() => initialState());
  const [running, setRunning] = useState(true);
  const [speed, setSpeed] = useState("4");
  const [presetId, setPresetId] = useState(presets[0].id);

  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => setSim((s) => step(s, config)), 1000 / Number(speed));
    return () => clearInterval(timer);
  }, [running, speed, config]);

  const set = <K extends keyof FlowConfig>(key: K) => (value: FlowConfig[K]) => {
    setConfig((c) => ({ ...c, [key]: value }));
    setPresetId("");
  };

  const applyPreset = (id: string) => {
    const preset = presets.find((p) => p.id === id);
    if (!preset) return;
    setPresetId(id);
    setConfig(preset.config);
    setSim(initialState());
    setRunning(true);
  };

  const reset = () => setSim(initialState());

  const { totals } = sim;
  const latest = sim.history[sim.history.length - 1];
  const capacity = config.concurrency * config.batchSize;
  const wastedPct = totals.invocations ? Math.round((totals.failedAttempts / Math.max(1, totals.succeeded + totals.failedAttempts)) * 100) : 0;
  const activePreset = presets.find((p) => p.id === presetId);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={absoluteUrl("/lab/event-flow")} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={absoluteUrl("/lab/event-flow")} />
        <meta name="twitter:card" content="summary" />
      </Head>

      <LabHeader
        title="Event-flow failure simulator"
        intro="Most serverless incidents aren't outages. They're retries, poison messages and duplicate writes nobody noticed. Pick a scenario, then change one setting at a time and watch what happens."
      />

      <section className="pb-16">
        <Container wide>
          <div className="mb-6 flex flex-wrap gap-2">
            {presets.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => applyPreset(preset.id)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  preset.id === presetId
                    ? "border-neutral-100 bg-neutral-100 text-neutral-900"
                    : "border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-neutral-100"
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>

          <p className="mb-6 min-h-[3rem] max-w-3xl text-sm leading-relaxed text-neutral-400">
            {activePreset ? activePreset.lesson : "Custom scenario. Pick a preset above to reset to a known starting point."}
          </p>

          <div className="mb-6 rounded-xl border border-neutral-800 p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <p className="font-mono text-xs text-neutral-500">t = {sim.tick}s</p>
              <div className="flex items-center gap-3">
                <Segmented label="" value={speed} options={speeds} onChange={setSpeed} />
                <button
                  type="button"
                  onClick={() => setRunning((r) => !r)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-800 px-3 py-1.5 text-xs font-medium text-neutral-300 hover:border-neutral-600"
                >
                  {running ? <Pause size={14} /> : <Play size={14} />}
                  {running ? "Pause" : "Play"}
                </button>
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-800 px-3 py-1.5 text-xs font-medium text-neutral-300 hover:border-neutral-600"
                >
                  <RotateCcw size={14} />
                  Reset
                </button>
              </div>
            </div>
            <FlowDiagram sim={sim} config={config} />
          </div>

          <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            <Stat label="Queue depth" value={sim.queue.length} tone={sim.queue.length > capacity * 5 ? "warn" : "default"} />
            <Stat label="Oldest message" value={`${latest?.oldestAge ?? 0}s`} tone={(latest?.oldestAge ?? 0) > 30 ? "bad" : "default"} />
            <Stat label="In DLQ" value={totals.dlq} tone={totals.dlq > 0 ? "warn" : "default"} />
            <Stat
              label="Duplicate writes"
              value={totals.duplicateSideEffects}
              tone={totals.duplicateSideEffects > 0 ? "bad" : "good"}
            />
            <Stat label="Processed OK" value={totals.succeeded} tone="good" />
            <Stat label="Invocations" value={totals.invocations} />
            <Stat label="Redeliveries" value={totals.redeliveries} tone={totals.redeliveries > totals.succeeded * 0.1 ? "warn" : "default"} />
            <Stat label="Failed attempts" value={`${wastedPct}%`} tone={wastedPct > 10 ? "warn" : "default"} />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Panel title="Traffic & failures">
              <Slider label="Arrival rate" value={config.arrivalRate} min={1} max={50} display={`${config.arrivalRate} msg/s`} onChange={set("arrivalRate")} hint={`Drain capacity: ${capacity} msg/s (concurrency × batch size)`} />
              <Slider label="Poison messages" value={config.poisonPct} min={0} max={20} step={0.5} display={`${config.poisonPct}%`} hint="Malformed payloads that will never succeed, however often you retry." onChange={set("poisonPct")} />
              <Slider label="Transient failures" value={config.transientPct} min={0} max={30} display={`${config.transientPct}%`} hint="Timeouts and throttles: a retry usually fixes them." onChange={set("transientPct")} />
              <div>
                <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-neutral-500">Queue depth (last 2 min)</p>
                <Sparkline values={sim.history.map((h) => h.depth)} color="#0f766e" />
                <p className="mt-3 mb-2 text-[11px] font-medium uppercase tracking-wider text-neutral-500">Oldest message age</p>
                <Sparkline values={sim.history.map((h) => h.oldestAge)} color="#e11d48" />
              </div>
            </Panel>

            <Panel title="Consumer & queue settings">
              <Slider label="Batch size" value={config.batchSize} min={1} max={25} display={String(config.batchSize)} onChange={set("batchSize")} />
              <Slider label="Max concurrency" value={config.concurrency} min={1} max={10} display={String(config.concurrency)} hint="Reserved concurrency / maximum concurrency on the event source mapping." onChange={set("concurrency")} />
              <Slider label="maxReceiveCount" value={config.maxReceiveCount} min={1} max={10} display={String(config.maxReceiveCount)} hint="Attempts before a message moves to the DLQ." onChange={set("maxReceiveCount")} />
              <Slider label="Visibility timeout" value={config.visibilityTimeout} min={1} max={30} display={`${config.visibilityTimeout}s`} hint="How long a failed message hides before it's redelivered." onChange={set("visibilityTimeout")} />
              <Toggle label="Dead-letter queue" checked={config.dlqEnabled} onChange={set("dlqEnabled")} hint="Without one, poison messages loop until retention expires." />
              <Toggle label="ReportBatchItemFailures" checked={config.partialBatchResponse} onChange={set("partialBatchResponse")} hint="Return only failed records instead of failing the whole batch." />
              <Toggle label="Idempotent writes" checked={config.idempotentWrites} onChange={set("idempotentWrites")} hint="e.g. a conditional put keyed on message ID, so a redelivery is harmless." />
            </Panel>
          </div>

          <div className="mt-10">
            <BookCallout text="DLQs, partial batch responses and idempotency patterns for SQS-driven Lambdas are covered step by step in the book." />
          </div>
        </Container>
      </section>

      <Footer />
    </>
  );
}
