import { Quote } from "lucide-react";
import { TESTIMONIALS } from "@/data/bloodlink";
import { DemoBadge, Reveal, SectionHeading, Serif, initials } from "./shared";

export function Testimonials() {
  return (
    <section id="stories" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Community voices"
          title={
            <>
              Stories that <Serif>flow</Serif> forward
            </>
          }
          badge={<DemoBadge>Illustrative testimonials with fictional names</DemoBadge>}
        />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <figure className="card-lift relative flex h-full flex-col rounded-3xl border border-border bg-card p-7 shadow-soft">
                <Quote className="size-8 text-primary/25" aria-hidden="true" />
                <blockquote className="mt-4 flex-1 font-serif text-xl leading-snug text-foreground">“{t.quote}”</blockquote>
                <figcaption className="mt-7 flex items-center gap-3 border-t border-border pt-5">
                  <span className="grid size-11 place-items-center rounded-full bg-accent text-sm font-bold text-accent-foreground">
                    {initials(t.name)}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role} · illustrative</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
