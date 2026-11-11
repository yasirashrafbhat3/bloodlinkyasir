import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BLOOD_BANKS, BLOOD_GROUPS } from "@/data/bloodlink";
import { filterBanks, type GroupFilter } from "@/lib/bloodlink-filters";
import { cn } from "@/lib/utils";
import { BloodBankCard } from "./BloodBankCard";
import { Reveal, SectionHeading, Serif } from "./shared";

export function BloodBanks() {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState<GroupFilter>("all");
  const results = useMemo(() => filterBanks(BLOOD_BANKS, query, group), [query, group]);

  return (
    <section id="blood-banks" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            align="left"
            eyebrow="Blood bank network"
            title={
              <>
                Trusted Blood Bank <Serif>Network</Serif>
              </>
            }
            description="Browse a sample network of blood banks. Every listing below is fictional and clearly marked as unverified."
          />
          <Reveal delay={0.1} className="w-full lg:max-w-sm">
            <label htmlFor="bank-search" className="sr-only">
              Search blood banks
            </label>
            <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 shadow-soft focus-within:border-primary/50">
              <Search className="size-4 text-muted-foreground" />
              <Input
                id="bank-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name or city"
                className="h-12 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
              />
            </div>
          </Reveal>
        </div>

        <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter by blood group">
          {(["all", ...BLOOD_GROUPS] as GroupFilter[]).map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setGroup(g)}
              aria-pressed={group === g}
              className={cn(
                "h-9 rounded-full border px-4 text-sm font-semibold transition-all",
                group === g
                  ? "border-ink bg-ink text-ink-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-foreground/30 hover:text-foreground",
              )}
            >
              {g === "all" ? "All groups" : g}
            </button>
          ))}
        </div>

        {results.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-dashed border-border bg-card p-12 text-center">
            <p className="text-lg font-bold text-foreground">No sample blood banks found</p>
            <p className="mt-2 text-sm text-muted-foreground">Try Delhi, Mumbai, Srinagar, Kolkata, Bengaluru or Hyderabad.</p>
            <Button
              variant="soft"
              className="mt-5"
              onClick={() => {
                setQuery("");
                setGroup("all");
              }}
            >
              Reset search
            </Button>
          </div>
        ) : (
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {results.map((b, i) => (
              <Reveal key={b.id} delay={(i % 3) * 0.06}>
                <BloodBankCard bank={b} highlight={group} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
