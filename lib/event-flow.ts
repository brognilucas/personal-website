// A deliberately small model of an SQS → Lambda → DynamoDB pipeline.
// One tick is one simulated second. Every consumer pulls one batch per tick.

export type FlowConfig = {
  arrivalRate: number; // messages per tick
  poisonPct: number; // % of messages that can never succeed
  transientPct: number; // % chance any single attempt fails and would succeed on retry
  batchSize: number;
  concurrency: number; // max concurrent Lambda consumers
  maxReceiveCount: number;
  visibilityTimeout: number; // ticks a failed message stays hidden before redelivery
  dlqEnabled: boolean;
  partialBatchResponse: boolean;
  idempotentWrites: boolean;
};

export type QueuedMessage = {
  id: number;
  poison: boolean;
  receives: number;
  enqueuedAt: number;
  visibleAt: number;
};

export type TickStats = {
  invocations: number;
  failedAttempts: number;
};

export type FlowState = {
  tick: number;
  seed: number;
  nextId: number;
  arrivalCarry: number;
  queue: QueuedMessage[];
  written: Set<number>;
  totals: {
    produced: number;
    succeeded: number;
    dlq: number;
    invocations: number;
    failedAttempts: number;
    redeliveries: number;
    duplicateSideEffects: number;
  };
  lastTick: TickStats;
  history: { depth: number; dlq: number; oldestAge: number }[];
};

export const HISTORY_LENGTH = 120;

export const defaultConfig: FlowConfig = {
  arrivalRate: 8,
  poisonPct: 0,
  transientPct: 2,
  batchSize: 10,
  concurrency: 2,
  maxReceiveCount: 3,
  visibilityTimeout: 5,
  dlqEnabled: true,
  partialBatchResponse: true,
  idempotentWrites: true,
};

export type Preset = { id: string; label: string; lesson: string; config: FlowConfig };

export const presets: Preset[] = [
  {
    id: "healthy",
    label: "Healthy pipeline",
    lesson: "Low transient failures, DLQ on, partial batch responses on. Retries absorb the noise and the queue stays flat.",
    config: defaultConfig,
  },
  {
    id: "poison-no-dlq",
    label: "Poison pill, no DLQ",
    lesson:
      "Without a DLQ, messages that can never succeed are redelivered forever. They burn invocations and their age climbs until retention silently deletes them.",
    config: { ...defaultConfig, poisonPct: 3, dlqEnabled: false },
  },
  {
    id: "batch-amplification",
    label: "One bad record fails the batch",
    lesson:
      "Without ReportBatchItemFailures, one failure returns the whole batch. Healthy records get reprocessed, written twice without idempotency, and can even end up in the DLQ.",
    config: { ...defaultConfig, poisonPct: 2, partialBatchResponse: false, idempotentWrites: false },
  },
  {
    id: "under-provisioned",
    label: "Traffic spike, capped concurrency",
    lesson:
      "Arrivals outpace what reserved concurrency can drain. The queue absorbs the spike, but message age (your real latency) keeps growing.",
    config: { ...defaultConfig, arrivalRate: 35, concurrency: 2, batchSize: 10 },
  },
];

// mulberry32: small, fast, deterministic.
function nextRandom(seed: number): [number, number] {
  let t = (seed + 0x6d2b79f5) | 0;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return [((t ^ (t >>> 14)) >>> 0) / 4294967296, (seed + 0x6d2b79f5) | 0];
}

export function initialState(seed = 42): FlowState {
  return {
    tick: 0,
    seed,
    nextId: 0,
    arrivalCarry: 0,
    queue: [],
    written: new Set(),
    totals: {
      produced: 0,
      succeeded: 0,
      dlq: 0,
      invocations: 0,
      failedAttempts: 0,
      redeliveries: 0,
      duplicateSideEffects: 0,
    },
    lastTick: { invocations: 0, failedAttempts: 0 },
    history: [],
  };
}

export function step(state: FlowState, config: FlowConfig): FlowState {
  let seed = state.seed;
  const random = () => {
    const [value, nextSeed] = nextRandom(seed);
    seed = nextSeed;
    return value;
  };

  const tick = state.tick + 1;
  const totals = { ...state.totals };
  const written = new Set(state.written);
  let nextId = state.nextId;

  const arrivalsExact = state.arrivalCarry + config.arrivalRate;
  const arrivals = Math.floor(arrivalsExact);
  const queue: QueuedMessage[] = state.queue.map((m) => ({ ...m }));
  for (let i = 0; i < arrivals; i++) {
    queue.push({
      id: nextId++,
      poison: random() * 100 < config.poisonPct,
      receives: 0,
      enqueuedAt: tick,
      visibleAt: tick,
    });
  }
  totals.produced += arrivals;

  const visible = queue.filter((m) => m.visibleAt <= tick);
  const batches: QueuedMessage[][] = [];
  for (let c = 0; c < config.concurrency && visible.length > 0; c++) {
    batches.push(visible.splice(0, config.batchSize));
  }

  const removed = new Set<number>();
  let failedThisTick = 0;

  const recordWrite = (message: QueuedMessage) => {
    if (written.has(message.id)) {
      if (!config.idempotentWrites) totals.duplicateSideEffects++;
    } else {
      written.add(message.id);
    }
  };

  const retryOrDeadLetter = (message: QueuedMessage) => {
    if (config.dlqEnabled && message.receives >= config.maxReceiveCount) {
      totals.dlq++;
      removed.add(message.id);
    } else {
      message.visibleAt = tick + config.visibilityTimeout;
      totals.redeliveries++;
    }
  };

  for (const batch of batches) {
    totals.invocations++;
    const outcomes = batch.map((message) => {
      message.receives++;
      const failed = message.poison || random() * 100 < config.transientPct;
      if (failed) failedThisTick++;
      return { message, failed };
    });
    const batchFailed = outcomes.some((o) => o.failed);

    for (const { message, failed } of outcomes) {
      if (!failed) recordWrite(message);

      if (config.partialBatchResponse || !batchFailed) {
        if (failed) {
          retryOrDeadLetter(message);
        } else {
          totals.succeeded++;
          removed.add(message.id);
        }
      } else {
        // Whole batch is returned to the queue, including records that already had their side effect.
        retryOrDeadLetter(message);
      }
    }
  }

  totals.failedAttempts += failedThisTick;
  const remaining = queue.filter((m) => !removed.has(m.id));
  const oldest = remaining.reduce((min, m) => Math.min(min, m.enqueuedAt), tick);

  const history = [...state.history, { depth: remaining.length, dlq: totals.dlq, oldestAge: tick - oldest }].slice(
    -HISTORY_LENGTH,
  );

  return {
    tick,
    seed,
    nextId,
    arrivalCarry: arrivalsExact - arrivals,
    queue: remaining,
    written,
    totals,
    lastTick: { invocations: batches.length, failedAttempts: failedThisTick },
    history,
  };
}
