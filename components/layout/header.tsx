"use client";

import { useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { hero, nav } from "@/lib/content";
import { cn } from "@/lib/cn";
import { MagneticButton } from "@/components/ui/magnetic-button";

export function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (value) => {
    setScrolled(value > 24);
  });

  useEffect(() => {
    const sync = () => setScrolled(window.scrollY > 24);
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    return () => window.removeEventListener("scroll", sync);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const light = open || !scrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        light
          ? "bg-transparent text-cream-50"
          : "border-b border-wine-700/10 bg-cream-50/92 text-ink-900 backdrop-blur-md",
      )}
    >
      <div className="relative z-50 mx-auto flex w-full max-w-[1120px] items-center justify-between gap-3 px-5 py-3 sm:gap-6 sm:px-8 sm:py-4">
        <a href="#top" className="min-w-0 leading-none" data-cursor="expand" onClick={() => setOpen(false)}>
          <span className="block font-serif text-[1.65rem] tracking-[-0.02em] sm:text-[2rem]">Олитто</span>
          <span className="mt-0.5 block text-[10px] font-medium uppercase tracking-[0.14em] opacity-80 sm:mt-1 sm:text-[11px]">
            и партнёры
          </span>
        </a>
        <div className="flex shrink-0 items-center gap-2 sm:gap-4 lg:gap-8">
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
          <div className="hidden sm:block">
            <MagneticButton href="#contact" variant="gold" compact>
              {hero.cta}
            </MagneticButton>
          </div>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center md:hidden"
          >
            <span className="sr-only">{open ? "Закрыть" : "Меню"}</span>
            <span className="relative block h-4 w-5" aria-hidden>
              <span
                className={cn(
                  "absolute left-0 h-px w-5 bg-current transition-transform duration-300",
                  open ? "top-[7px] rotate-45" : "top-0",
                )}
              />
              <span
                className={cn(
                  "absolute top-[7px] left-0 h-px w-5 bg-current transition-opacity duration-300",
                  open && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-px w-5 bg-current transition-transform duration-300",
                  open ? "top-[7px] -rotate-45" : "top-[14px]",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "fixed inset-0 z-40 flex flex-col bg-wine-950 px-6 pt-28 pb-10 text-cream-50 transition-opacity duration-300 md:hidden",
          open ? "visible opacity-100" : "invisible pointer-events-none opacity-0",
        )}
        inert={open ? undefined : true}
      >
        <nav aria-label="Разделы" className="flex flex-col gap-1">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-cream-50/10 py-4 font-serif text-[2rem] leading-none tracking-[-0.02em]"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <MagneticButton href="#contact" variant="gold" className="mt-8" wide>
          {hero.cta}
        </MagneticButton>
      </div>
    </header>
  );
}
