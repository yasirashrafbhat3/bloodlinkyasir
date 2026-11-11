import { AnimatePresence, motion } from "framer-motion";
import { Building2, ChevronDown, Clock, Droplets, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { REQUESTS, type BloodRequest, type Urgency } from "@/data/bloodlink";
import { cn } from "@/lib/utils";
import { DemoBadge, SectionHeading, Serif } from "./shared";

const urgencyStyle: Record<Urgency, { dot: string; text: string; pulse: boolean }> = {
  Critical: { dot: "bg-primary-glow", text: "text-primary-glow", pulse: true },
  High: { dot: "bg-warning", text: "text-warning", pulse: false },
  Moderate: { dot: "bg-success", text: "text-success", pulse: false },
};

function RequestCard({ r }: { r: BloodRequest }) {
  const u = urgencyStyle[r.urgency];
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-ink-foreground/10 bg-ink-foreground/[0.04] p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-ink-foreground/[0.07]">
      <div className="flex items-start justify-between gap-4">
        <span className="grid size-16 place-items-center rounded-2xl bg-gradient-crimson text-2xl font-extrabold text-primary-foreground shadow-crimson">
          {r.bloodGroup}
        </span>
        <span className={cn("flex items-center gap-2 rounded-full bg-ink-foreground/10 px-3 py-1 text-xs font-bold", u.text)}>
          <span className="relative flex size-2">
            {u.pulse && <span className={cn("absolute inline-flex size-full rounded-full animate-pulse-ring", u.dot)} />}
            <span className={cn("relative inline-flex size-2 rounded-full", u.dot)} />
          </span>
          {r.urgency}
        </span>
      </div>
      <h3 className="mt-5 flex items-start gap-2 text-lg font-bold leading-snug text-ink-foreground">
        <Building2 className="mt-1 size-4 shrink-0 text-ink-foreground/50" /> {r.hospital}
      </h3>
      <p className="mt-1.5 flex items-center gap-2 text-sm text-ink-foreground/60">
        <MapPin className="size-4" /> {r.city} · {r.purpose}
      </p>
      <div className="mt-6 grid grid-cols-2 gap-3 border-t border-ink-foreground/10 pt-5">
        <div>
          <p className="text-xs text-ink-foreground/50">Units required</p>
          <p className="mt-0.5 flex items-center gap-1.5 text-lg font-bold text-ink-foreground">
            <Droplets className="size-4 text-primary-glow" /> {r.units}
          </p>
        </div>
        <div>
          <p className="text-xs text-ink-foreground/50">Posted</p>
          <p className="mt-0.5 flex items-center gap-1.5 text-sm font-semibold text-ink-foreground">
            <Clock className="size-4 text-ink-foreground/50" /> {r.posted}
          </p>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between gap-3">
        <DemoBadge tone="dark">Demo request</DemoBadge>
        <Button
          size="sm"
          variant="hero"
          onClick={() =>
            toast("This is a demonstration request", {
              description: `${r.hospital} is fictional. For real needs, contact your nearest authorised blood bank.`,
            })
          }
        >
          I can help
        </Button>
      </div>
    </article>
  );
}

export function EmergencyRequests() {
  const [showAll, setShowAll] = useState(false);
  const list = showAll ? REQUESTS : REQUESTS.slice(0, 3);
  return (
    <section id="urgent-requests" className="relative overflow-hidden bg-gradient-ink py-20 sm:py-28">
      <div className="pointer-events-none absolute -top-40 left-1/2 size-[600px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          tone="dark"
          eyebrow="Requirements board"
          title={
            <>
              Urgent Blood <Serif>Requirements</Serif>
            </>
          }
          description="A preview of how hospitals could share blood needs with their community."
          badge={<DemoBadge tone="dark">Fictional requests for demonstration only. Not real medical emergencies.</DemoBadge>}
        />
        <motion.div layout className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence initial={false}>
            {list.map((r, i) => (
              <motion.div
                key={r.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              >
                <RequestCard r={r} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        <div className="mt-12 flex justify-center">
          <Button
            variant="outline"
            size="lg"
            className="border-ink-foreground/20 bg-transparent text-ink-foreground hover:bg-ink-foreground hover:text-ink"
            onClick={() => setShowAll((s) => !s)}
            aria-expanded={showAll}
          >
            {showAll ? "Show Fewer Requests" : "View All Requests"}
            <ChevronDown className={cn("transition-transform", showAll && "rotate-180")} />
          </Button>
        </div>
      </div>
    </section>
  );
}
