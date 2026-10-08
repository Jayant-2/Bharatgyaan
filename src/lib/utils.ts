import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type ClaimType = "historical" | "traditional" | "scholarly" | "scientific" | "mixed";

export interface ClaimBadgeConfig {
  label: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
  iconName: string;
  description: string;
}

export const CLAIM_BADGES: Record<ClaimType, ClaimBadgeConfig> = {
  historical: {
    label: "Historical Record",
    bgClass: "bg-amber-50 dark:bg-amber-950/40",
    textClass: "text-amber-800 dark:text-amber-300",
    borderClass: "border-amber-200 dark:border-amber-800",
    iconName: "ScrollText",
    description: "Supported by ancient inscriptions, manuscripts, and archaeological findings.",
  },
  traditional: {
    label: "Traditional Belief",
    bgClass: "bg-indigo-50 dark:bg-indigo-950/40",
    textClass: "text-indigo-800 dark:text-indigo-300",
    borderClass: "border-indigo-200 dark:border-indigo-800",
    iconName: "Flame",
    description: "Living lineage and traditional oral or cultural transmission.",
  },
  scholarly: {
    label: "Scholarly Interpretation",
    bgClass: "bg-blue-50 dark:bg-blue-950/40",
    textClass: "text-blue-800 dark:text-blue-300",
    borderClass: "border-blue-200 dark:border-blue-800",
    iconName: "GraduationCap",
    description: "Modern academic analysis and philological critique.",
  },
  scientific: {
    label: "Modern Scientific Evidence",
    bgClass: "bg-emerald-50 dark:bg-emerald-950/40",
    textClass: "text-emerald-800 dark:text-emerald-300",
    borderClass: "border-emerald-200 dark:border-emerald-800",
    iconName: "Atom",
    description: "Validated through empirical and laboratory studies.",
  },
  mixed: {
    label: "Multi-Perspective",
    bgClass: "bg-stone-50 dark:bg-stone-900",
    textClass: "text-stone-800 dark:text-stone-300",
    borderClass: "border-stone-200 dark:border-stone-700",
    iconName: "Layers",
    description: "Synthesizes traditional and scholarly viewpoints.",
  },
};
