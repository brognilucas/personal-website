import type { ReactNode } from "react";

type SliderProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  display: string;
  hint?: ReactNode;
  onChange: (value: number) => void;
};

export function Slider({ label, value, min, max, step = 1, display, hint, onChange }: SliderProps) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-baseline justify-between gap-4 text-sm">
        <span className="font-medium text-neutral-300">{label}</span>
        <span className="font-mono text-xs text-neutral-100">{display}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-emerald-500"
      />
      {hint && <span className="mt-1 block text-xs text-neutral-500">{hint}</span>}
    </label>
  );
}

type ToggleProps = {
  label: string;
  checked: boolean;
  hint?: ReactNode;
  onChange: (checked: boolean) => void;
};

export function Toggle({ label, checked, hint, onChange }: ToggleProps) {
  return (
    <label className="flex cursor-pointer items-start gap-3">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative mt-0.5 h-5 w-9 shrink-0 rounded-full transition-colors ${
          checked ? "bg-emerald-500" : "bg-neutral-700"
        }`}
      >
        <span
          className={`absolute left-0 top-0.5 h-4 w-4 rounded-full bg-neutral-100 shadow transition-transform ${
            checked ? "translate-x-4" : "translate-x-0.5"
          }`}
        />
      </button>
      <span className="text-sm">
        <span className="block font-medium text-neutral-300">{label}</span>
        {hint && <span className="block text-xs text-neutral-500">{hint}</span>}
      </span>
    </label>
  );
}

type SegmentedProps<T extends string> = {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
};

export function Segmented<T extends string>({ label, value, options, onChange }: SegmentedProps<T>) {
  return (
    <div>
      {label && <span className="mb-1.5 block text-sm font-medium text-neutral-300">{label}</span>}
      <div className="inline-flex rounded-lg border border-neutral-800 p-0.5">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
              option.value === value ? "bg-neutral-100 text-neutral-900" : "text-neutral-500 hover:text-neutral-100"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function Stat({ label, value, tone = "default" }: { label: string; value: ReactNode; tone?: "default" | "good" | "warn" | "bad" }) {
  const toneClass = {
    default: "text-neutral-100",
    good: "text-emerald-400",
    warn: "text-amber-400",
    bad: "text-rose-400",
  }[tone];
  return (
    <div className="rounded-lg border border-neutral-800 p-3">
      <p className="text-[11px] font-medium uppercase tracking-wider text-neutral-500">{label}</p>
      <p className={`mt-1 font-mono text-lg font-semibold tabular-nums ${toneClass}`}>{value}</p>
    </div>
  );
}

export function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-xl border border-neutral-800 p-5">
      <h2 className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-500">{title}</h2>
      <div className="space-y-5">{children}</div>
    </section>
  );
}
