import { AnimatePresence, motion } from "framer-motion";
import { MapPin, RotateCcw, Search, Users } from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BLOOD_GROUPS, DONORS } from "@/data/bloodlink";
import { filterDonors, type GroupFilter } from "@/lib/bloodlink-filters";
import { cn } from "@/lib/utils";
import { DonorCard } from "./DonorCard";
import { DemoBadge, Reveal, SectionHeading, Serif } from "./shared";

const PAGE = 8;

export function DonorSearch() {
  const [group, setGroup] = useState<GroupFilter>("all");
  const [location, setLocation] = useState("");
  const [applied, setApplied] = useState<{ group: GroupFilter; location: string }>({ group: "all", location: "" });
  const [limit, setLimit] = useState(PAGE);

  const results = useMemo(() => filterDonors(DONORS, applied.group, applied.location), [applied]);
  const visible = results.slice(0, limit);

  const apply = (next: { group: GroupFilter; location: string }) => {
    setApplied(next);
    setLimit(PAGE);
  };
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    apply({ group, location });
  };
  const reset = () => {
    setGroup("all");
    setLocation("");
    apply({ group: "all", location: "" });
  };

  return (
    <section id="find-donors" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Donor discovery"
          title={
            <>
              Find the <Serif>Right</Serif> Blood Donor
            </>
          }
          description="Explore demonstration donor profiles based on blood group and location."
          badge={<DemoBadge>All donor profiles are fictional sample data</DemoBadge>}
        />

        <Reveal delay={0.1}>
          <form
            onSubmit={onSubmit}
            className="mx-auto mt-10 grid max-w-4xl gap-3 rounded-[1.75rem] border border-border bg-card p-3 shadow-card sm:grid-cols-[200px_1fr_auto]"
            role="search"
            aria-label="Search sample donors"
          >
            <div className="rounded-2xl bg-muted px-4 py-2">
              <Label htmlFor="donor-group" className="text-[0.7rem] font-semibold uppercase tracking-wider text-muted-foreground">
                Blood group
              </Label>
              <Select value={group} onValueChange={(v) => setGroup(v as GroupFilter)}>
                <SelectTrigger id="donor-group" className="h-8 border-0 px-0 text-base font-semibold shadow-none focus:ring-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All groups</SelectItem>
                  {BLOOD_GROUPS.map((g) => (
                    <SelectItem key={g} value={g}>
                      {g}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="rounded-2xl bg-muted px-4 py-2">
              <Label htmlFor="donor-location" className="text-[0.7rem] font-semibold uppercase tracking-wider text-muted-foreground">
                Location
              </Label>
              <div className="flex items-center gap-2">
                <MapPin className="size-4 shrink-0 text-primary" />
                <Input
                  id="donor-location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City or area, e.g. Srinagar"
                  className="h-8 border-0 bg-transparent px-0 text-base font-semibold shadow-none focus-visible:ring-0"
                />
              </div>
            </div>
            <Button type="submit" variant="hero" size="xl" className="h-auto min-h-14 rounded-2xl">
              <Search /> Search
            </Button>
          </form>

          <div className="mx-auto mt-5 flex max-w-4xl flex-wrap items-center justify-center gap-2">
            <span className="mr-1 text-xs font-medium text-muted-foreground">Quick filter:</span>
            {BLOOD_GROUPS.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => {
                  const next = applied.group === g ? "all" : g;
                  setGroup(next);
                  apply({ group: next, location });
                }}
                aria-pressed={applied.group === g}
                className={cn(
                  "h-8 min-w-11 rounded-full border px-3 text-xs font-bold transition-all",
                  applied.group === g
                    ? "border-primary bg-primary text-primary-foreground shadow-crimson"
                    : "border-border bg-card text-foreground hover:border-primary/40 hover:text-primary",
                )}
              >
                {g}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-3">
          <p className="flex items-center gap-2 text-sm text-muted-foreground" aria-live="polite">
            <Users className="size-4 text-primary" />
            <span>
              <strong className="text-foreground">{results.length}</strong> sample{" "}
              {results.length === 1 ? "profile" : "profiles"}
              {applied.group !== "all" && <> · {applied.group}</>}
              {applied.location.trim() && <> · “{applied.location.trim()}”</>}
            </span>
          </p>
          {(applied.group !== "all" || applied.location) && (
            <Button variant="ghost" size="sm" onClick={reset}>
              <RotateCcw /> Clear filters
            </Button>
          )}
        </div>

        {results.length === 0 ? (
          <div className="mt-6 rounded-3xl border border-dashed border-border bg-card p-12 text-center">
            <p className="text-lg font-bold text-foreground">No sample donors match this search</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Try a nearby city like Delhi, Mumbai, Srinagar or Kolkata, or choose another blood group.
            </p>
            <Button variant="soft" className="mt-5" onClick={reset}>
              Show all donors
            </Button>
          </div>
        ) : (
          <motion.div layout className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {visible.map((d) => (
                <motion.div
                  key={d.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                >
                  <DonorCard donor={d} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {results.length > limit && (
          <div className="mt-10 flex justify-center">
            <Button variant="surface" size="lg" onClick={() => setLimit((l) => l + PAGE)}>
              Show more donors
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
