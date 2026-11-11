import { CalendarDays, Droplet, Languages, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { Availability, Donor } from "@/data/bloodlink";
import { cn } from "@/lib/utils";
import { DemoBadge, initials } from "./shared";

const availabilityStyle: Record<Availability, string> = {
  Available: "bg-success-soft text-success",
  "On request": "bg-warning-soft text-foreground",
  "Recently donated": "bg-muted text-muted-foreground",
};

function AvailabilityPill({ value }: { value: Availability }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.7rem] font-semibold", availabilityStyle[value])}>
      <span className="size-1.5 rounded-full bg-current" />
      {value} · sample
    </span>
  );
}

export function DonorCard({ donor }: { donor: Donor }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <article className="card-lift group flex flex-col rounded-3xl border border-border bg-card p-5 shadow-soft">
        <div className="flex items-start justify-between">
          <span className="grid size-12 place-items-center rounded-2xl bg-accent text-sm font-extrabold text-accent-foreground transition-colors group-hover:bg-ink group-hover:text-ink-foreground">
            {initials(donor.name)}
          </span>
          <span className="grid h-12 min-w-12 place-items-center rounded-2xl bg-gradient-crimson px-2 text-base font-extrabold text-primary-foreground shadow-crimson">
            {donor.bloodGroup}
          </span>
        </div>
        <h3 className="mt-4 text-lg font-bold text-foreground">{donor.name}</h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="size-3.5" /> {donor.area}, {donor.city}
        </p>
        <div className="mt-4">
          <AvailabilityPill value={donor.availability} />
        </div>
        <Button variant="soft" className="mt-5 w-full" onClick={() => setOpen(true)}>
          View Profile
        </Button>
      </article>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DemoBadge className="w-fit">Fictional donor profile</DemoBadge>
            <div className="flex items-center gap-4 pt-3">
              <span className="grid size-14 place-items-center rounded-2xl bg-gradient-crimson text-lg font-extrabold text-primary-foreground">
                {donor.bloodGroup}
              </span>
              <div className="text-left">
                <DialogTitle className="text-xl font-extrabold">{donor.name}</DialogTitle>
                <DialogDescription className="flex items-center gap-1.5">
                  <MapPin className="size-3.5" /> {donor.area}, {donor.city}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <dl className="grid grid-cols-2 gap-3">
            {[
              { icon: Droplet, k: "Donations", v: `${donor.donations} (sample)` },
              { icon: CalendarDays, k: "Last donation", v: donor.lastDonation },
              { icon: Languages, k: "Languages", v: donor.languages.join(", ") },
            ].map(({ icon: Icon, k, v }) => (
              <div key={k} className="rounded-2xl bg-muted p-3 last:col-span-2">
                <dt className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Icon className="size-3.5" /> {k}
                </dt>
                <dd className="mt-1 text-sm font-semibold text-foreground">{v}</dd>
              </div>
            ))}
          </dl>
          <AvailabilityPill value={donor.availability} />
          <p className="text-xs leading-relaxed text-muted-foreground">
            This person is fictional. In a real service, contact would happen only through an authorised blood bank
            after medical screening.
          </p>
          <Button
            variant="hero"
            size="lg"
            onClick={() => {
              setOpen(false);
              toast.success("Demo request sent", { description: `No real message was sent to ${donor.name}.` });
            }}
          >
            Request Contact (demo)
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
