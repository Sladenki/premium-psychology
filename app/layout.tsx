import type { Metadata, Viewport } from "next";
import { bodoni, cormorant, onest, switzer } from "./fonts";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { CustomCursor } from "@/components/providers/custom-cursor";
import "./globals.css";

export const metadata: Metadata = {
  title: "Олитто и партнёры — психология, бизнес и человеческий фактор",
  description:
    "Авторская практика Полины Олитто. Для людей, руководителей и организаций, которым важно принимать решения без потери себя, масштаба и вкуса к жизни.",
};

export const viewport: Viewport = {
  themeColor: "#FAF6F0",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${bodoni.variable} ${cormorant.variable} ${switzer.variable} ${onest.variable} min-h-full antialiased`}
    >
      <body className="min-h-full bg-cream-50 font-sans text-ink-900">
        <SmoothScroll>
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
