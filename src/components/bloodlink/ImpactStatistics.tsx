import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { STATS } from "@/data/bloodlink";
import { DemoBadge, Serif } from "./shared";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, value, { duration: 2, ease: [0.2, 0.8, 0.2, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, value]);
  return (
    <span ref={ref} className="tabular-nums">
      {n.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

export function ImpactStatistics() {
  return (
    <section id="impact" className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-ink px-6 py-14 sm:px-12">
          <div className="pointer-events-none absolute -left-20 -top-20 size-80 rounded-full bg-primary/30 blur-[100px]" aria-hidden="true" />
          <div className="relative flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="eyebrow text-primary-glow">Impact</p>
              <h2 className="mt-3 max-w-lg text-3xl font-extrabold leading-tight text-ink-foreground sm:text-4xl">
                What a connected community <Serif>could</Serif> look like
              </h2>
            </div>
            <DemoBadge tone="dark">Illustrative demo statistics — not actual platform achievements</DemoBadge>
          </div>
          <dl className="relative mt-12 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="rounded-3xl border border-ink-foreground/10 bg-ink-foreground/[0.04] p-6 backdrop-blur sm:p-8">
                <dt className="text-sm text-ink-foreground/60">{s.label}</dt>
                <dd className="mt-2 text-3xl font-extrabold text-ink-foreground sm:text-5xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
