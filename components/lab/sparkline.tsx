import { HISTORY_LENGTH } from "../../lib/event-flow";

const WIDTH = 300;
const HEIGHT = 48;

export default function Sparkline({ values, color }: { values: number[]; color: string }) {
  const max = Math.max(1, ...values);
  const x = (i: number) => (i / (HISTORY_LENGTH - 1)) * WIDTH;
  const y = (v: number) => HEIGHT - 2 - (v / max) * (HEIGHT - 4);
  const line = values.map((v, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  const area = values.length > 1 ? `${line} L${x(values.length - 1).toFixed(1)},${HEIGHT} L0,${HEIGHT} Z` : "";

  return (
    <div className="flex items-end gap-3">
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} preserveAspectRatio="none" className="h-12 w-full" aria-hidden>
        <line x1={0} x2={WIDTH} y1={HEIGHT - 1} y2={HEIGHT - 1} stroke="#262626" />
        {area && <path d={area} fill={color} fillOpacity={0.08} />}
        {values.length > 1 && <path d={line} fill="none" stroke={color} strokeWidth={1.5} vectorEffect="non-scaling-stroke" />}
      </svg>
      <span className="w-10 shrink-0 text-right font-mono text-[10px] text-neutral-500">max {max}</span>
    </div>
  );
}
