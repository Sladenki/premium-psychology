"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { contactForm } from "@/lib/content";
import { cn } from "@/lib/cn";
import { EXPO } from "@/lib/easing";
import { Atmosphere } from "@/components/ui/atmosphere";
import { RevealLines } from "@/components/ui/reveal";

const fieldClass =
  "w-full rounded-2xl border border-wine-700/15 bg-cream-50 px-5 py-3.5 text-[1.0625rem] text-ink-900 outline-none transition-colors duration-300 placeholder:text-ink-500/60 focus:border-gold-400";

function RequestTypeField() {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;

    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("pointerdown", onPointer);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={cn("relative", open && "z-30")}>
      <input
        name="requestType"
        required
        value={value}
        onChange={() => undefined}
        tabIndex={-1}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-14 opacity-0"
      />
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        data-cursor="expand"
        onClick={() => setOpen((current) => !current)}
        className={cn(fieldClass, "flex items-center pr-12 text-left", !value && "text-ink-500/70")}
      >
        {value || contactForm.requestPlaceholder}
      </button>
      <span aria-hidden className="pointer-events-none absolute top-1/2 right-5 -translate-y-1/2">
        <motion.span
          animate={{ rotate: open ? 225 : 45 }}
          transition={{ duration: reduce ? 0 : 0.35, ease: EXPO }}
          className="block h-2 w-2 border-r border-b border-wine-700"
        />
      </span>
      <AnimatePresence>
        {open ? (
          <motion.ul
            role="listbox"
            aria-label={contactForm.requestLabel}
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: reduce ? 0 : 0.32, ease: EXPO }}
            className="absolute top-[calc(100%+0.5rem)] right-0 left-0 overflow-hidden rounded-2xl border border-wine-700/15 bg-cream-50 py-2 shadow-[0_22px_50px_-28px_rgba(42,10,18,0.55)]"
          >
            {contactForm.requestTypes.map((type) => {
              const selected = value === type;
              return (
                <li key={type}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={selected}
                    data-cursor="expand"
                    onClick={() => {
                      setValue(type);
                      setOpen(false);
                    }}
                    className={cn(
                      "flex w-full items-center gap-3 px-5 py-3.5 text-left text-[1.0625rem] transition-colors duration-300 ease-[cubic-bezier(0.65,0,0.35,1)]",
                      selected ? "bg-cream-100 text-wine-800" : "text-ink-900 hover:bg-cream-100",
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn("h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400", !selected && "opacity-0")}
                    />
                    {type}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setSent(true);
  }

  return (
    <section id="contact" className="relative bg-cream-100 py-24 sm:py-32 lg:py-40">
      <Atmosphere variant="formats" />
      <div className="relative z-10 mx-auto w-full max-w-[760px] px-5 sm:px-8">
        <RevealLines
          lines={contactForm.title}
          className="font-serif text-[2.5rem] leading-[1.05] tracking-[-0.02em] text-ink-900 sm:text-6xl"
        />

        {sent ? (
          <p className="mt-12 max-w-xl font-sans text-[1.55rem] leading-snug text-ink-900 italic sm:text-[1.75rem]">
            {contactForm.thanks}
          </p>
        ) : (
          <form onSubmit={onSubmit} className="mt-12 grid gap-5 sm:mt-16 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-6">
            <div className="lg:col-span-2">
              <p className="mb-2 text-[12px] font-medium uppercase tracking-[0.08em] text-wine-700">
                {contactForm.requestLabel}
              </p>
              <RequestTypeField />
            </div>

            <label className="block">
              <span className="mb-2 block text-[12px] font-medium uppercase tracking-[0.08em] text-wine-700">
                {contactForm.nameLabel}
              </span>
              <input name="name" type="text" required autoComplete="name" className={fieldClass} />
            </label>

            <label className="block">
              <span className="mb-2 block text-[12px] font-medium uppercase tracking-[0.08em] text-wine-700">
                {contactForm.emailLabel}
              </span>
              <input name="email" type="email" required autoComplete="email" className={fieldClass} />
            </label>

            <label className="block lg:col-span-2">
              <span className="mb-2 block text-[12px] font-medium uppercase tracking-[0.08em] text-wine-700">
                {contactForm.telegramLabel}
              </span>
              <input
                name="telegram"
                type="text"
                required
                autoComplete="off"
                placeholder="@username"
                className={fieldClass}
              />
            </label>

            <label className="block lg:col-span-2">
              <span className="mb-2 block text-[12px] font-medium uppercase tracking-[0.08em] text-wine-700">
                {contactForm.situationLabel}
              </span>
              <textarea name="situation" required rows={5} className={`${fieldClass} resize-y`} />
            </label>

            <label className="flex items-start gap-3 lg:col-span-2">
              <input
                name="consent"
                type="checkbox"
                required
                className="mt-1 h-4 w-4 shrink-0 accent-wine-800"
              />
              <span className="text-[0.95rem] leading-relaxed text-ink-900">{contactForm.consent}</span>
            </label>

            <div className="lg:col-span-2">
              <button
                type="submit"
                data-cursor="expand"
                className="inline-flex items-center justify-center rounded-full border border-wine-800 bg-wine-800 px-8 py-3.5 text-[13px] font-medium uppercase tracking-[0.08em] text-cream-50 transition-colors duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] hover:border-gold-400 hover:bg-gold-400 hover:text-wine-950"
              >
                {contactForm.submit}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
