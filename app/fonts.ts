import localFont from "next/font/local";
import { Bodoni_Moda, Cormorant, Onest } from "next/font/google";

/**
 * Bodoni Moda and Switzer do not include Cyrillic.
 * Cormorant (high-contrast serif, italic) and Onest (neutral grotesque)
 * sit next in the stack, so Russian text keeps the same two roles.
 */
export const bodoni = Bodoni_Moda({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
  variable: "--font-bodoni",
  adjustFontFallback: false,
});

export const cormorant = Cormorant({
  subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-cormorant",
  adjustFontFallback: false,
});

export const switzer = localFont({
  src: [
    {
      path: "./fonts/Switzer-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Switzer-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-switzer",
  adjustFontFallback: false,
});

export const onest = Onest({
  subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
  display: "swap",
  variable: "--font-onest",
  adjustFontFallback: false,
});
