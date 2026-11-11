import { Clock, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BLOOD_GROUPS, type BloodBank } from "@/data/bloodlink";
import type { GroupFilter } from "@/lib/bloodlink-filters";
import { cn } from "@/lib/utils";
import { DemoBadge } from "./shared";

function GroupGrid({ available, highlight }: { available: BloodBank["available"]; highlight?: GroupFilter }) {
  return (
    <div className="grid grid-cols-4 gap-1.5">
      {BLOOD_GROUPS.map((g) => {
        const has = available.includes(g);
        return (
          <span
            key={g}
            className={cn(
              "rounded-lg py-1.5 text-center text-xs font-bold transition-colors",
              has ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground/50 line-through",
              has && highlight === g && "bg-primary text-primary-foreground",
            )}
            aria-label={`${g} ${has ? "listed" : "not listed"}`}
          >
            {g}
          </span>
        );
      })}
    </div>
  );
}

export function BloodBankCard({ bank, highlight }: { bank: BloodBank; highlight?: GroupFilter }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <article className="card-lift flex h-full flex-col rounded-3xl border border-border bg-card p-6 shadow-soft">
        <div className="flex items-center justify-between gap-2">
          <DemoBadge>Demo listing · not verified</DemoBadge>
          <span className="text-xs font-medium text-muted-foreground">{bank.hours}</span>
        </div>
        <h3 className="mt-5 text-lg font-bold leading-snug text-foreground">{bank.name}</h3>
        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="size-3.5" /> {bank.address}, {bank.city}
        </p>
        <p className="mt-5 mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Sample availability
        </p>
        <GroupGrid available={bank.available} highlight={highlight} />
        <Button variant="surface" className="mt-6 w-full" onClick={() => setOpen(true)}>
          View Details
        </Button>
      </article>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DemoBadge className="w-fit">Fictional blood bank</DemoBadge>
            <DialogTitle className="pt-2 text-xl font-extrabold">{bank.name}</DialogTitle>
            <DialogDescription>
              This listing is for demonstration only and is not a verified real-world provider.
            </DialogDescription>
          </DialogHeader>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3 rounded-2xl bg-muted p-3">
              <MapPin className="size-4 text-primary" /> {bank.address}, {bank.city}
            </li>
            <li className="flex items-center gap-3 rounded-2xl bg-muted p-3">
              <Clock className="size-4 text-primary" /> {bank.hours}
            </li>
            <li className="flex items-center gap-3 rounded-2xl bg-muted p-3">
              <Phone className="size-4 text-primary" /> {bank.phone} <span className="text-xs text-muted-foreground">(placeholder)</span>
            </li>
          </ul>
          <GroupGrid available={bank.available} />
          <p className="text-xs leading-relaxed text-muted-foreground">
            For real requirements, contact a government-authorised blood bank or your treating hospital.
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
}
