import type { ReactNode } from "react";
import type { FlowConfig, FlowState } from "../../lib/event-flow";

const MAX_DOTS = 120;

function Node({ title, subtitle, children, tone = "default" }: { title: string; subtitle: ReactNode; children?: ReactNode; tone?: "default" | "warn" }) {
  return (
    <div
      className={`flex min-h-[7.5rem] flex-col rounded-lg border p-3 ${
        tone === "warn" ? "border-amber-500/50 bg-amber-500/10" : "border-neutral-800 bg-neutral-900/60"
      }`}
    >
      <p className="text-xs font-semibold text-neutral-100">{title}</p>
      <p className="mb-2 font-mono text-[11px] text-neutral-500">{subtitle}</p>
      <div className="flex-1">{children}</div>
    </div>
  );
}

function Arrow() {
  return (
    <div className="flex items-center justify-center text-neutral-600 md:px-1" aria-hidden>
      <span className="hidden md:inline">→</span>
      <span className="md:hidden">↓</span>
    </div>
  );
}

export default function FlowDiagram({ sim, config }: { sim: FlowState; config: FlowConfig }) {
  const shown = sim.queue.slice(0, MAX_DOTS);
  const hidden = sim.queue.length - shown.length;
  const retrying = sim.queue.filter((m) => m.receives > 0).length;

  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-[1fr_auto_2fr_auto_1.2fr_auto_1fr]">
      <Node title="Producer" subtitle={`${config.arrivalRate} msg/s`}>
        <div className="flex h-full items-center">
          <span className="h-2 w-2 animate-ping rounded-full bg-emerald-400" aria-hidden />
        </div>
      </Node>

      <Arrow />

      <div className="space-y-2">
        <Node
          title="SQS queue"
          subtitle={`${sim.queue.length} waiting · ${retrying} retrying`}
          tone={sim.queue.length > config.concurrency * config.batchSize * 5 ? "warn" : "default"}
        >
          <div className="flex flex-wrap gap-1" aria-label={`${sim.queue.length} messages in queue`}>
            {shown.map((message) => {
              const invisible = message.visibleAt > sim.tick;
              const color =
                message.poison && message.receives > 0
                  ? "bg-rose-500"
                  : message.receives > 0
                    ? "bg-amber-400"
                    : "bg-emerald-500";
              return (
                <span
                  key={message.id}
                  className={`h-2 w-2 rounded-full ${color} ${invisible ? "opacity-30" : ""}`}
                  title={`msg #${message.id} · received ${message.receives}×`}
                />
              );
            })}
            {hidden > 0 && <span className="font-mono text-[10px] text-neutral-500">+{hidden}</span>}
          </div>
        </Node>
        <div
          className={`flex items-center justify-between rounded-lg border px-3 py-2 text-xs ${
            config.dlqEnabled ? "border-neutral-800" : "border-dashed border-neutral-700 text-neutral-500"
          }`}
        >
          <span className="font-semibold">{config.dlqEnabled ? "Dead-letter queue" : "No DLQ configured"}</span>
          {config.dlqEnabled && <span className="font-mono text-amber-300">{sim.totals.dlq}</span>}
        </div>
      </div>

      <Arrow />

      <Node title="Lambda consumers" subtitle={`${sim.lastTick.invocations}/${config.concurrency} busy`}>
        <div className="flex flex-wrap gap-1.5">
          {Array.from({ length: config.concurrency }, (_, i) => {
            const busy = i < sim.lastTick.invocations;
            return (
              <span
                key={i}
                className={`flex h-6 w-6 items-center justify-center rounded font-mono text-[10px] transition-colors ${
                  busy
                    ? sim.lastTick.failedAttempts > 0
                      ? "bg-rose-500/20 text-rose-300"
                      : "bg-emerald-500/20 text-emerald-300"
                    : "bg-neutral-800 text-neutral-600"
                }`}
              >
                λ
              </span>
            );
          })}
        </div>
      </Node>

      <Arrow />

      <Node
        title="DynamoDB"
        subtitle={`${sim.written.size} records`}
        tone={sim.totals.duplicateSideEffects > 0 ? "warn" : "default"}
      >
        {sim.totals.duplicateSideEffects > 0 && (
          <p className="text-[11px] leading-snug text-rose-400">{sim.totals.duplicateSideEffects} duplicate writes</p>
        )}
      </Node>

      <div className="flex flex-wrap gap-4 pt-2 text-[10px] text-neutral-500 md:col-span-7">
        <Legend className="bg-emerald-500" label="new" />
        <Legend className="bg-amber-400" label="retrying" />
        <Legend className="bg-rose-500" label="poison (failed before)" />
        <Legend className="bg-neutral-500 opacity-30" label="hidden by visibility timeout" />
      </div>
    </div>
  );
}

function Legend({ className, label }: { className: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`h-2 w-2 rounded-full ${className}`} aria-hidden />
      {label}
    </span>
  );
}
