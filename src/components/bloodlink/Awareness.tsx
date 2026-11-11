import { CalendarClock, ClipboardCheck, HelpCircle, Stethoscope, UserCheck, Info } from "lucide-react";
import { Reveal, SectionHeading, Serif } from "./shared";

const topics = [
  {
    icon: UserCheck,
    title: "Who can donate blood?",
    points: ["Generally healthy adults aged 18–65", "Body weight of about 45–50 kg or more", "Adequate haemoglobin on the day of donation"],
  },
  {
    icon: Stethoscope,
    title: "How does blood donation work?",
    points: ["Short registration and health questionnaire", "A sterile, single-use needle collects ~350–450 ml", "The draw itself takes only 8–10 minutes"],
  },
  {
    icon: CalendarClock,
    title: "How often can someone donate?",
    points: ["Whole blood: typically every 3 months for men", "Typically every 4 months for women", "Platelet donation intervals are shorter — ask your blood bank"],
  },
  {
    icon: HelpCircle,
    title: "Common blood donation myths",
    points: ["“It makes you weak” — the body replaces volume within a day", "“It hurts a lot” — most feel only a brief pinch", "“You can catch infections” — equipment is sterile and single-use"],
  },
  {
    icon: ClipboardCheck,
    title: "Before and after donation",
    points: ["Before: sleep well, eat a light meal, drink water", "After: rest 10–15 minutes and have a snack", "Avoid heavy exercise for the rest of the day"],
  },
];

export function Awareness() {
  return (
    <section id="awareness" className="bg-card py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Donation awareness"
          title={
            <>
              Know before you <Serif>give</Serif>
            </>
          }
          description="Simple, responsible answers to the questions first-time donors ask most."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {topics.map((t, i) => (
            <Reveal key={t.title} delay={(i % 3) * 0.08} className={i === 0 ? "lg:row-span-1" : undefined}>
              <article className="card-lift h-full rounded-3xl border border-border bg-background p-7">
                <span className="grid size-12 place-items-center rounded-2xl bg-accent text-primary">
                  <t.icon className="size-5" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-foreground">{t.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {t.points.map((p) => (
                    <li key={p} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
          <Reveal delay={0.16}>
            <aside className="flex h-full flex-col justify-between rounded-3xl bg-ink p-7 text-ink-foreground">
              <Info className="size-6 text-primary-glow" />
              <div className="mt-8">
                <p className="text-lg font-bold">Eligibility is a medical decision.</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-foreground/70">
                  This information is general and educational. Donor eligibility must always be confirmed by qualified
                  medical professionals and authorised blood banks.
                </p>
              </div>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
