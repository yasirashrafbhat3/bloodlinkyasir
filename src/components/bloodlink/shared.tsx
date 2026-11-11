import { motion, type HTMLMotionProps } from "framer-motion";
import { FlaskConical } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function DropIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 2.5c-.3 0-.6.15-.8.4C9.4 5.2 5 10.9 5 14.6 5 18.7 8.1 21.5 12 21.5s7-2.8 7-6.9c0-3.7-4.4-9.4-6.2-11.7a1 1 0 0 0-.8-.4Z"
        fill="currentColor"
      />
      <path d="M8.6 14.8c.2 1.6 1.4 2.9 3 3.2" stroke="var(--primary-foreground)" strokeOpacity=".7" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <a href="#home" className="group flex items-center gap-2.5" aria-label="BloodLink home">
      <span className="relative grid size-9 place-items-center rounded-xl bg-gradient-crimson shadow-crimson transition-transform duration-300 group-hover:rotate-[-8deg]">
        <DropIcon className="size-5 text-primary-foreground" />
      </span>
      <span className={cn("text-lg font-extrabold tracking-tight", inverted ? "text-ink-foreground" : "text-foreground")}>
        Blood<span className="text-primary">Link</span>
      </span>
    </a>
  );
}

export function DemoBadge({ children = "Demo data", className, tone = "light" }: { children?: ReactNode; className?: string; tone?: "light" | "dark" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.7rem] font-semibold tracking-wide",
        tone === "light" ? "border-warning/30 bg-warning-soft text-foreground" : "border-ink-foreground/20 bg-ink-foreground/10 text-ink-foreground",
        className,
      )}
    >
      <FlaskConical className="size-3" aria-hidden="true" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light",
  badge,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  tone?: "light" | "dark";
  badge?: ReactNode;
}) {
  return (
    <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <p className={cn("eyebrow", tone === "dark" && "text-primary-glow")}>{eyebrow}</p>
      <h2 className={cn("mt-3 text-3xl font-extrabold leading-[1.1] sm:text-4xl lg:text-[2.75rem]", tone === "dark" ? "text-ink-foreground" : "text-foreground")}>
        {title}
      </h2>
      {description && (
        <p className={cn("mt-4 text-base leading-relaxed sm:text-lg", tone === "dark" ? "text-ink-foreground/70" : "text-muted-foreground")}>
          {description}
        </p>
      )}
      {badge && <div className={cn("mt-5 flex", align === "center" && "justify-center")}>{badge}</div>}
    </Reveal>
  );
}

export function Reveal({ children, className, delay = 0, ...rest }: HTMLMotionProps<"div"> & { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.2, 0.8, 0.2, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function Serif({ children }: { children: ReactNode }) {
  return <span className="font-serif font-normal italic tracking-normal">{children}</span>;
}

export function initials(name: string) {
  return name
    .replace(/^Dr\.\s*/, "")
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
}
