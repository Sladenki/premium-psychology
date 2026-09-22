import { Geist, Unbounded } from "next/font/google";

export const display = Unbounded({
  subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-display",
});

export const geist = Geist({
  subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-geist",
});
