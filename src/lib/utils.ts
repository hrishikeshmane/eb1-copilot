import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { visaPillars } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getLableForPillars(value: string) {
  const pillar = visaPillars.find((pillar) => pillar.value === value);
  if (pillar) return pillar.label;
}
