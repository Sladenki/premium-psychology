"use client";

import { useRef, useState, type FormEvent } from "react";
import { contactForm } from "@/lib/content";
import { Atmosphere } from "@/components/ui/atmosphere";
import { RevealLines } from "@/components/ui/reveal";

const fieldClass =
  "w-full rounded-2xl border border-wine-700/15 bg-cream-50 px-4 py-3.5 text-[1.0625rem] text-ink-900 outline-none transition-colors duration-300 placeholder:text-ink-500/60 focus:border-gold-400 disabled:opacity-60";

const labelClass = "mb-2 block text-[12px] font-medium uppercase tracking-[0.08em] text-wine-700";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState(contactForm.error);
  const lastPayloadRef = useRef("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? "").trim(),
      company: String(data.get("company") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      telegram: String(data.get("telegram") ?? "").trim(),
      details: String(data.get("details") ?? "").trim(),
      website: String(data.get("website") ?? "").trim(),
    };

    const fingerprint = JSON.stringify(payload);
    if (fingerprint === lastPayloadRef.current) {
      setError("Эта заявка уже отправлена.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setError(contactForm.error);

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;

      if (!response.ok || !result?.ok) {
        setError(result?.error || contactForm.error);
        setStatus("error");
        return;
      }

      lastPayloadRef.current = fingerprint;
      form.reset();
      setStatus("success");
    } catch {
      setError(contactForm.error);
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-cream-50 pt-10 pb-10 sm:pt-16 sm:pb-14 lg:pt-20 lg:pb-16">
      <Atmosphere variant="contact" />
      <div className="relative z-10 mx-auto grid w-full max-w-[1120px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:gap-16 xl:grid-cols-[minmax(0,1fr)_32rem]">
        <div>
          <h2>
            <RevealLines
              as="span"
              lines={[contactForm.title[0]]}
              className="font-serif text-[2.05rem] leading-[1.08] tracking-[-0.03em] text-ink-900 sm:text-6xl"
            />
            <RevealLines
              as="span"
              lines={[contactForm.title[1]]}
              className="mt-1 font-sans text-[1.7rem] leading-[1.1] text-wine-800 italic sm:text-[2.75rem]"
            />
            <RevealLines
              as="span"
              lines={[contactForm.title[2]]}
              className="font-serif text-[2.05rem] leading-[1.08] tracking-[-0.03em] text-ink-900 sm:text-6xl"
            />
          </h2>
          <p className="mt-8 max-w-md text-[1.05rem] leading-[1.7] text-ink-500">{contactForm.lede}</p>
        </div>

        {status === "success" ? (
          <p className="max-w-xl font-sans text-[1.55rem] leading-snug text-ink-900 italic sm:text-[1.75rem]">
            {contactForm.thanks}
          </p>
        ) : (
          <form
            ref={formRef}
            onSubmit={onSubmit}
            className="relative rounded-[1.35rem] border border-wine-700/12 bg-cream-100 p-4 shadow-[0_28px_60px_-36px_rgba(42,10,18,0.45)] sm:rounded-[1.75rem] sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className={labelClass}>{contactForm.nameLabel}</span>
                <input
                  name="name"
                  type="text"
                  required
                  minLength={2}
                  maxLength={120}
                  autoComplete="name"
                  disabled={status === "submitting"}
                  placeholder={contactForm.namePlaceholder}
                  className={fieldClass}
                />
              </label>
              <label className="block">
                <span className={labelClass}>{contactForm.companyLabel}</span>
                <input
                  name="company"
                  type="text"
                  maxLength={160}
                  autoComplete="organization"
                  disabled={status === "submitting"}
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
                minLength={5}
                maxLength={40}
                autoComplete="tel"
                disabled={status === "submitting"}
                placeholder={contactForm.phonePlaceholder}
                className={fieldClass}
              />
            </label>

            <label className="mt-5 block">
              <span className={labelClass}>{contactForm.telegramLabel}</span>
              <input
                name="telegram"
                type="text"
                maxLength={80}
                autoComplete="off"
                disabled={status === "submitting"}
                placeholder={contactForm.telegramPlaceholder}
                className={fieldClass}
              />
            </label>

            <label className="mt-5 block">
              <span className={labelClass}>{contactForm.detailsLabel}</span>
              <textarea
                name="details"
                required
                minLength={5}
                maxLength={4000}
                rows={4}
                disabled={status === "submitting"}
                placeholder={contactForm.detailsPlaceholder}
                className={`${fieldClass} resize-y`}
              />
            </label>

            {/* Honeypot — скрыто от людей, ловит ботов */}
            <div aria-hidden className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0">
              <label>
                Website
                <input name="website" type="text" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            {status === "error" ? (
              <p className="mt-5 text-[0.95rem] leading-snug text-wine-700" role="alert">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              data-cursor="expand"
              disabled={status === "submitting"}
              className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full bg-wine-800 px-7 py-3.5 text-[13px] font-medium uppercase tracking-[0.08em] text-cream-50 transition-colors duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] hover:bg-gold-400 hover:text-wine-950 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {status === "submitting" ? contactForm.submitting : contactForm.submit}
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
