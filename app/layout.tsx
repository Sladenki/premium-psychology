import type { Metadata, Viewport } from "next";
import { display, geist } from "./fonts";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { CustomCursor } from "@/components/providers/custom-cursor";
import "./globals.css";

const title = "Полина Олитто | Консалтинг и внедрение изменений";
const description =
  "Диагностика бизнес-ситуаций, планирование и сопровождение изменений в процессах, проектах, IT, организации и работе команд.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    locale: "ru_RU",
    type: "website",
    siteName: "Олитто и партнёры",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#FAF6F0",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${display.variable} ${geist.variable} min-h-full antialiased`}
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
