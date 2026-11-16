"use client";

import { useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { contact, nav } from "@/lib/content";
import { cn } from "@/lib/cn";
import { LogoMark } from "@/components/ui/logo-mark";

function TelegramLink() {
  return (
    <a
      href={contact.telegram}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Написать в Telegram"
      data-cursor="expand"
      className="inline-flex h-11 w-11 items-center justify-center text-gold-400 transition-opacity duration-300 hover:opacity-70"
    >
      <svg viewBox="0 0 24 24" className="h-[1.15rem] w-[1.15rem]" aria-hidden>
        <path
          fill="currentColor"
          d="M21.07 3.37 2.9 10.4c-1.24.48-1.23 1.16-.21 1.46l4.66 1.45 1.78 5.55c.22.68.11.95.75.95.4 0 .58-.18.8-.4l2.27-2.2 4.72 3.48c.87.48 1.5.23 1.71-.8l3.12-14.7c.28-1.3-.5-1.9-1.43-1.42ZM8.3 13.9l9.37-5.9c.47-.28.9-.13.55.18l-7.9 7.13-.3 3.2-1.72-4.61Z"
        />
      </svg>
    </a>
  );
}

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
    if (!open) return;

    const scrollY = window.scrollY;
    const body = document.body;
    const previous = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
    };

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";

    return () => {
      body.style.position = previous.position;
      body.style.top = previous.top;
      body.style.left = previous.left;
      body.style.right = previous.right;
      body.style.width = previous.width;
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

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
        <a
          href="#top"
          className="flex min-w-0 items-center leading-none"
          data-cursor="expand"
          onClick={() => setOpen(false)}
          aria-label="Олитто и партнёры"
        >
          <LogoMark inverted={light} className="h-11 w-[4.1rem] sm:h-12 sm:w-[4.5rem]" />
        </a>
        <div className="flex shrink-0 items-center gap-1 sm:gap-3 lg:gap-8">
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
          <TelegramLink />
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
      </div>
    </header>
  );
}
