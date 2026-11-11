import { describe, expect, it } from "vitest";
import { BLOOD_BANKS, DONORS } from "@/data/bloodlink";
import { filterBanks, filterDonors } from "@/lib/bloodlink-filters";

describe("donor search", () => {
  it("returns only donors with the selected blood group", () => {
    const res = filterDonors(DONORS, "O-", "");
    expect(res.map((d) => d.name).sort()).toEqual(["Priya Sharma", "Rahul Verma"]);
  });

  it("matches location case-insensitively on city or area", () => {
    expect(filterDonors(DONORS, "all", "  srinagar ").map((d) => d.id)).toEqual(["d2", "d5"]);
    expect(filterDonors(DONORS, "all", "bandra").map((d) => d.id)).toEqual(["d14"]);
  });

  it("combines blood group and location", () => {
    expect(filterDonors(DONORS, "O+", "delhi").map((d) => d.id)).toEqual(["d1"]);
    expect(filterDonors(DONORS, "AB-", "delhi")).toEqual([]);
  });
});

describe("blood bank search", () => {
  it("keeps only banks listing the chosen group", () => {
    expect(filterBanks(BLOOD_BANKS, "", "AB-").map((b) => b.id)).toEqual(["b3", "b5"]);
  });

  it("searches by city", () => {
    expect(filterBanks(BLOOD_BANKS, "kolkata", "all").map((b) => b.id)).toEqual(["b4"]);
  });
});
