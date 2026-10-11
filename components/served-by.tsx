import { useEffect, useState } from "react";
import type { ServedBy as ServedByPayload } from "../pages/api/served-by";

type Status = { kind: "loading" } | { kind: "error" } | { kind: "ok"; data: ServedByPayload; latencyMs: number };

export default function ServedBy() {
  const [status, setStatus] = useState<Status>({ kind: "loading" });

  useEffect(() => {
    const started = performance.now();
    fetch("/api/served-by", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data: ServedByPayload) =>
        setStatus({ kind: "ok", data, latencyMs: Math.round(performance.now() - started) }),
      )
      .catch(() => setStatus({ kind: "error" }));
  }, []);

  if (status.kind === "error") return null;

  return (
    <p className="inline-flex items-center gap-2 font-mono text-[11px] text-neutral-500" aria-live="polite">
      <span
        className={`h-1.5 w-1.5 rounded-full ${status.kind === "ok" ? "bg-emerald-500" : "animate-pulse bg-neutral-600"}`}
        aria-hidden
      />
      {status.kind === "loading" ? (
        "pinging a serverless function…"
      ) : (
        <span>
          served by a function in <span className="text-neutral-300">{status.data.region}</span> ·{" "}
          <span className={status.data.coldStart ? "text-amber-400" : "text-neutral-300"}>
            {status.data.coldStart ? "cold start" : `warm (${status.data.instanceAgeSeconds}s old)`}
          </span>{" "}
          · {status.latencyMs} ms round trip
        </span>
      )}
    </p>
  );
}
