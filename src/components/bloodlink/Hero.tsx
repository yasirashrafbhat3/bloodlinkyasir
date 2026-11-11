import { motion } from "framer-motion";
import { ArrowRight, HeartHandshake, MapPin, Search, ShieldCheck } from "lucide-react";
import heroDrop from "@/assets/hero-drop.jpg";
import { Button } from "@/components/ui/button";
import { Serif } from "./shared";

const floatCards = [
  { group: "O-", label: "Universal donor", className: "left-0 top-[14%] sm:-left-4", delay: 0.5 },
  { group: "AB+", label: "Universal recipient", className: "right-0 top-[8%] sm:-right-2", delay: 0.7 },
  { group: "B+", label: "3 nearby · sample", className: "right-2 bottom-[22%] sm:-right-6", delay: 0.9 },
];

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-28 pb-20 sm:pt-32 lg:pt-36 lg:pb-28">
      <div className="pointer-events-none absolute inset-0 bg-rose-glow" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-grid" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-card px-3 py-1.5 text-xs font-semibold text-accent-foreground shadow-soft"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full rounded-full bg-primary animate-pulse-ring" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            Voluntary blood donation, made discoverable
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
            className="mt-6 text-[2.75rem] font-extrabold leading-[1.02] text-foreground sm:text-6xl lg:text-[4.5rem]"
          >
            Every Drop <br className="hidden sm:block" />
            <Serif>
              <span className="text-gradient-crimson pr-2">Connects</span>
            </Serif>
            a Life.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            Connecting blood donors, hospitals, and communities to make finding blood donation support simpler, faster,
            and more accessible.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Button variant="hero" size="xl" asChild>
              <a href="#find-donors">
                <Search /> Find Blood Donors
              </a>
            </Button>
            <Button variant="surface" size="xl" asChild>
              <a href="#become-donor">
                Become a Donor <ArrowRight />
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-10 flex items-center gap-4"
          >
            <div className="flex -space-x-2.5" aria-hidden="true">
              {["ZK", "AM", "PS", "RI"].map((i, idx) => (
                <span
                  key={i}
                  className={
                    "grid size-9 place-items-center rounded-full border-2 border-background text-[0.65rem] font-bold " +
                    (idx % 2 ? "bg-accent text-accent-foreground" : "bg-ink text-ink-foreground")
                  }
                >
                  {i}
                </span>
              ))}
            </div>
            <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <HeartHandshake className="size-4 text-primary" />
              Connecting communities through voluntary blood donation.
            </p>
          </motion.div>
        </div>

        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative mx-auto w-full max-w-[520px]"
        >
          <div className="relative aspect-[8/9] overflow-hidden rounded-[2.5rem] border border-border bg-card shadow-card">
            <img
              src={heroDrop}
              alt="Stylised crimson blood drop with a heartbeat line and floating care symbols"
              width={1024}
              height={1152}
              className="size-full object-cover"
            />
            <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-border/80 bg-card/90 p-4 shadow-soft backdrop-blur-md">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-xl bg-success-soft text-success">
                    <ShieldCheck className="size-5" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-foreground">Donor profile found</p>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="size-3" /> Saket, Delhi · 2.4 km
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-muted px-2 py-0.5 text-[0.65rem] font-semibold text-muted-foreground">Sample</span>
              </div>
              <svg viewBox="0 0 300 36" className="mt-3 h-7 w-full" aria-hidden="true">
                <path
                  d="M0 18 H110 L122 6 L134 30 L146 2 L158 26 L170 18 H300"
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="420"
                  strokeDashoffset="420"
                  style={{ animation: "ecg 2.4s ease-out 0.8s forwards" }}
                />
              </svg>
            </div>
          </div>

          {floatCards.map((c) => (
            <motion.div
              key={c.group}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: c.delay }}
              className={"absolute " + c.className}
            >
              <div className="animate-float-slow flex items-center gap-3 rounded-2xl border border-border bg-card/95 py-2.5 pr-4 pl-2.5 shadow-card backdrop-blur" style={{ animationDelay: `${c.delay}s` }}>
                <span className="grid size-10 place-items-center rounded-xl bg-gradient-crimson text-sm font-extrabold text-primary-foreground">
                  {c.group}
                </span>
                <span className="text-xs font-semibold text-foreground">{c.label}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
