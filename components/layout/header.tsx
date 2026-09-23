"use client";

import { useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { hero, nav } from "@/lib/content";
import { cn } from "@/lib/cn";
import { MagneticButton } from "@/components/ui/magnetic-button";

export function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (value) => {
    setScrolled(value > 24);
  });

  useEffect(() => {
    const sync = () => setScrolled(window.scrollY > 24);
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    return () => window.removeEventListener("scroll", sync);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        scrolled
          ? "border-b border-wine-700/10 bg-cream-50/92 text-ink-900 backdrop-blur-md"
          : "bg-transparent text-cream-50",
      )}
    >
      <div className="mx-auto flex w-full max-w-[1120px] items-center justify-between gap-6 px-5 py-4 sm:px-8">
        <a href="#top" className="group block leading-none" data-cursor="expand">
          <span className="block font-serif text-[2rem] tracking-[-0.02em]">Олитто</span>
          <span className="mt-1 block text-[11px] font-medium uppercase tracking-[0.14em] opacity-80">
            и партнёры
          </span>
        </a>
        <div className="flex shrink-0 items-center gap-4 lg:gap-8">
          <nav aria-label="Разделы" className="hidden items-center gap-4 md:flex lg:gap-6 xl:gap-8">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[12px] font-medium uppercase tracking-[0.08em] transition-colors duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] hover:text-gold-400 lg:text-[13px]"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <MagneticButton href="#contact" variant="gold" className="shrink-0">
            {hero.cta}
          </MagneticButton>
        </div>
      </div>
    </header>
  );
}
