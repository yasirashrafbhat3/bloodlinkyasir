import { HeartPulse, Search, Waypoints } from "lucide-react";
import { motion } from "framer-motion";
import { Reveal, SectionHeading, Serif } from "./shared";

const steps = [
  { icon: Search, title: "Search", text: "Find relevant donor profiles using blood group and location." },
  { icon: Waypoints, title: "Connect", text: "Explore available contact and request options." },
  { icon: HeartPulse, title: "Make an Impact", text: "Encourage voluntary donation and community participation." },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative overflow-hidden bg-card py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="How BloodLink works"
          title={
            <>
              Three steps from <Serif>search</Serif> to impact
            </>
          }
        />
        <div className="relative mt-16 grid gap-6 md:grid-cols-3">
          <svg className="pointer-events-none absolute top-12 left-[16%] hidden h-4 w-[68%] md:block" viewBox="0 0 600 16" preserveAspectRatio="none" aria-hidden="true">
            <motion.path
              d="M0 8 H600"
              stroke="var(--primary)"
              strokeOpacity=".35"
              strokeWidth="2"
              strokeDasharray="6 8"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
            />
          </svg>
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.15} className="relative text-center">
              <div className="group mx-auto grid size-24 place-items-center rounded-[1.75rem] border border-border bg-background shadow-card transition-transform duration-500 hover:-translate-y-1 hover:rotate-3">
                <span className="grid size-14 place-items-center rounded-2xl bg-gradient-crimson text-primary-foreground shadow-crimson">
                  <s.icon className="size-6" />
                </span>
              </div>
              <p className="mt-6 font-serif text-2xl italic text-primary">0{i + 1}</p>
              <h3 className="mt-1 text-xl font-bold text-foreground">{s.title}</h3>
              <p className="mx-auto mt-2 max-w-xs text-muted-foreground">{s.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
