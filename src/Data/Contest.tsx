import type { RangeOption } from "../Types";

export const EntryData: RangeOption[] = [
  { label: "₹0 to ₹10", min: 0, max: 10 },
  { label: "₹10 to ₹30", min: 10, max: 30 },
  { label: "₹30 to ₹50", min: 30, max: 50 },
  { label: "₹50 to ₹100", min: 50, max: 100 },
  { label: "₹100 & Above", min: 100, max: null },
];

export const SpotsData: RangeOption[] = [
  { label: "0 to 2", min: 0, max: 2 },
  { label: "0 to 5", min: 0, max: 5 },
  { label: "0 to 10", min: 0, max: 10 },
  { label: "0 to 50", min: 0, max: 50 },
  { label: "0 to 100", min: 0, max: 100 },
  { label: "100 & Above", min: 100, max: null },
];

export const PrizePoolData: RangeOption[] = [
  { label: "₹0 to ₹100", min: 0, max: 100 },
  { label: "₹10,000 to ₹50,000", min: 10000, max: 50000 },
  { label: "₹50,000 to ₹1 Lakh", min: 50000, max: 100000 },
  { label: "₹1 Lakh & Above", min: 100000, max: null },
];

export const ContestTypeData: string[] = ["Abcd", "Abcd1", "Abcd2", "Abcd3"];
