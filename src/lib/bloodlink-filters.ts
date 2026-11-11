import type { BloodBank, BloodGroup, Donor } from "@/data/bloodlink";

export type GroupFilter = BloodGroup | "all";

const norm = (v: string) => v.trim().toLowerCase();

/** Exact blood-group match plus case-insensitive partial match on city or area. */
export function filterDonors(donors: Donor[], group: GroupFilter, location: string): Donor[] {
  const loc = norm(location);
  return donors.filter(
    (d) =>
      (group === "all" || d.bloodGroup === group) &&
      (!loc || norm(d.city).includes(loc) || norm(d.area).includes(loc)),
  );
}

/** Text query matches name, city or address; group keeps banks listing that group. */
export function filterBanks(banks: BloodBank[], query: string, group: GroupFilter): BloodBank[] {
  const q = norm(query);
  return banks.filter(
    (b) =>
      (group === "all" || b.available.includes(group)) &&
      (!q || [b.name, b.city, b.address].some((f) => norm(f).includes(q))),
  );
}
