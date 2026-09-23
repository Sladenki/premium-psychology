"use client";

import { useState, type FormEvent } from "react";
import { contactForm } from "@/lib/content";
import { Atmosphere } from "@/components/ui/atmosphere";
import { RevealLines } from "@/components/ui/reveal";

const fieldClass =
  "w-full rounded-2xl border border-wine-700/15 bg-cream-100 px-4 py-3.5 text-[1.0625rem] text-ink-900 outline-none transition-colors duration-300 placeholder:text-ink-500/60 focus:border-gold-400";

const labelClass = "mb-2 block text-[12px] font-medium uppercase tracking-[0.08em] text-wine-700";

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
    <section id="contact" className="relative overflow-hidden bg-cream-100 py-24 sm:py-32 lg:py-40">
      <Atmosphere variant="contact" />
      <div className="relative z-10 mx-auto grid w-full max-w-[1120px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:gap-16 xl:grid-cols-[minmax(0,1fr)_32rem]">
        <div>
          <h2>
            <RevealLines
              as="span"
              lines={[contactForm.title[0]]}
              className="font-serif text-[2.5rem] leading-[1.05] tracking-[-0.03em] text-ink-900 sm:text-6xl"
            />
            <RevealLines
              as="span"
              lines={[contactForm.title[1]]}
              className="mt-1 font-sans text-[2.15rem] leading-[1.08] text-wine-800 italic sm:text-[2.75rem]"
            />
            <RevealLines
              as="span"
              lines={[contactForm.title[2]]}
              className="font-serif text-[2.5rem] leading-[1.05] tracking-[-0.03em] text-ink-900 sm:text-6xl"
            />
          </h2>
          <p className="mt-8 max-w-md text-[1.05rem] leading-[1.7] text-ink-500">{contactForm.lede}</p>
        </div>

        {sent ? (
          <p className="max-w-xl font-sans text-[1.55rem] leading-snug text-ink-900 italic sm:text-[1.75rem]">
            {contactForm.thanks}
          </p>
        ) : (
          <form
            onSubmit={onSubmit}
            className="rounded-[1.75rem] border border-wine-700/12 bg-cream-50 p-6 shadow-[0_28px_60px_-36px_rgba(42,10,18,0.45)] sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className={labelClass}>{contactForm.nameLabel}</span>
                <input
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder={contactForm.namePlaceholder}
                  className={fieldClass}
                />
              </label>
              <label className="block">
                <span className={labelClass}>{contactForm.companyLabel}</span>
                <input
                  name="company"
                  type="text"
                  autoComplete="organization"
                  placeholder={contactForm.companyPlaceholder}
                  className={fieldClass}
                />
              </label>
            </div>

            <label className="mt-5 block">
              <span className={labelClass}>{contactForm.phoneLabel}</span>
              <input
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                placeholder={contactForm.phonePlaceholder}
                className={fieldClass}
              />
            </label>

            <label className="mt-5 block">
              <span className={labelClass}>{contactForm.telegramLabel}</span>
              <input
                name="telegram"
                type="text"
                autoComplete="off"
                placeholder={contactForm.telegramPlaceholder}
                className={fieldClass}
              />
            </label>

            <label className="mt-5 block">
              <span className={labelClass}>{contactForm.detailsLabel}</span>
              <textarea
                name="details"
                required
                rows={4}
                placeholder={contactForm.detailsPlaceholder}
                className={`${fieldClass} resize-y`}
              />
            </label>

            <button
              type="submit"
              data-cursor="expand"
              className="mt-6 inline-flex items-center gap-3 rounded-full bg-wine-800 px-7 py-3.5 text-[13px] font-medium uppercase tracking-[0.08em] text-cream-50 transition-colors duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] hover:bg-gold-400 hover:text-wine-950"
            >
              {contactForm.submit}
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden>
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
