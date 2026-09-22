import { Manrope, Source_Serif_4 } from "next/font/google";

export const sourceSerif = Source_Serif_4({
  subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
  style: ["normal", "italic"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-source-serif",
});

export const manrope = Manrope({
  subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
  display: "swap",
  variable: "--font-manrope",
});
