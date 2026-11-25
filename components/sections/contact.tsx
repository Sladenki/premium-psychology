"use client";

import { useRef, useState, type FormEvent } from "react";
import { contactForm, legal } from "@/lib/content";
import { Atmosphere } from "@/components/ui/atmosphere";
import { RevealLines } from "@/components/ui/reveal";

const fieldClass =
  "w-full rounded-xl border border-wine-700/15 bg-cream-50 px-3.5 py-2.5 text-[1rem] text-ink-900 outline-none transition-colors duration-300 placeholder:text-ink-500/60 focus:border-gold-400 disabled:opacity-60";

const labelClass = "mb-2 block text-[12px] font-medium uppercase tracking-[0.08em] text-wine-700";

type Status = "idle" | "submitting" | "success" | "error";

function keepName(value: string) {
  return value.replace(/[^\p{L}\s'’.-]/gu, "");
}

function keepPhone(value: string) {
  const cleaned = value.replace(/[^\d+()\-\s]/g, "");
  const plus = cleaned.startsWith("+") ? "+" : "";
  return plus + cleaned.replace(/\+/g, "");
}

function phoneDigits(value: string) {
  return value.replace(/\D/g, "");
}

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState(contactForm.error);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [details, setDetails] = useState("");
  const [consent, setConsent] = useState(false);
  const [nameHint, setNameHint] = useState("");
  const [phoneHint, setPhoneHint] = useState("");
  const [detailsHint, setDetailsHint] = useState("");
  const lastPayloadRef = useRef("");

  function onName(value: string) {
    const next = keepName(value);
    setName(next);
    setNameHint(next === value ? "" : "В имени только буквы, без цифр");
  }

  function onPhone(value: string) {
    const next = keepPhone(value);
    setPhone(next);
    setPhoneHint(next === value ? "" : "В телефоне только цифры");
  }

  function checkName() {
    const value = name.trim();
    if (!value) return "Напишите, как к вам обращаться";
    if (value.length < 2) return "Имя слишком короткое";
    return "";
  }

  function checkPhone() {
    const digits = phoneDigits(phone);
    if (!digits) return "Укажите телефон";
    if (digits.length < 10) return "Кажется, в номере не хватает цифр";
    if (digits.length > 15) return "В номере слишком много цифр";
    return "";
  }

  function checkDetails() {
    if (details.trim().length < 5) return "Напишите пару слов о ситуации";
    return "";
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting" || !consent) return;

    const form = event.currentTarget;
    const nextNameHint = checkName();
    const nextPhoneHint = checkPhone();
    const nextDetailsHint = checkDetails();
    setNameHint(nextNameHint);
    setPhoneHint(nextPhoneHint);
    setDetailsHint(nextDetailsHint);
    if (nextNameHint || nextPhoneHint || nextDetailsHint) return;

    const data = new FormData(form);
    const payload = {
      name: name.trim(),
      phone: phone.trim(),
      details: details.trim(),
      consent: true,
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
      setName("");
      setPhone("");
      setDetails("");
      setConsent(false);
      setNameHint("");
      setPhoneHint("");
      setDetailsHint("");
      setStatus("success");
    } catch {
      setError(contactForm.error);
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden bg-cream-50 pt-8 pb-8 sm:pt-12 sm:pb-10 lg:pt-14 lg:pb-12">
      <Atmosphere variant="contact" />
      <div className="relative z-10 mx-auto grid w-full max-w-[1120px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:gap-16 xl:grid-cols-[minmax(0,1fr)_32rem]">
        <div>
          <h2>
            <RevealLines
              as="span"
              lines={[contactForm.title[0]]}
              className="font-serif text-[2.05rem] leading-[1.08] tracking-[-0.03em] text-ink-900 sm:text-6xl"
            />
            {" "}
            <RevealLines
              as="span"
              lines={[contactForm.title[1]]}
              className="mt-1 font-sans text-[1.7rem] leading-[1.1] text-wine-800 italic sm:text-[2.75rem]"
            />
            {" "}
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
            noValidate
            onSubmit={onSubmit}
            className="relative rounded-[1.35rem] border border-wine-700/12 bg-cream-100 p-4 sm:p-5"
          >
            <label className="block">
              <span className={labelClass}>{contactForm.nameLabel}</span>
              <input
                name="name"
                type="text"
                value={name}
                maxLength={120}
                autoComplete="name"
                inputMode="text"
                aria-invalid={nameHint ? true : undefined}
                aria-describedby={nameHint ? "name-hint" : undefined}
                disabled={status === "submitting"}
                placeholder={contactForm.namePlaceholder}
                onChange={(event) => onName(event.target.value)}
                onBlur={() => {
                  if (name.trim()) setNameHint(checkName());
                }}
                className={`${fieldClass} ${nameHint ? "border-wine-700" : ""}`}
              />
              {nameHint ? (
                <p id="name-hint" className="mt-1.5 text-[0.88rem] leading-snug text-wine-500">
                  {nameHint}
                </p>
              ) : null}
            </label>

            <label className="mt-3 block">
              <span className={labelClass}>{contactForm.phoneLabel}</span>
              <input
                name="phone"
                type="tel"
                value={phone}
                maxLength={22}
                autoComplete="tel"
                inputMode="tel"
                aria-invalid={phoneHint ? true : undefined}
                aria-describedby={phoneHint ? "phone-hint" : undefined}
                disabled={status === "submitting"}
                placeholder={contactForm.phonePlaceholder}
                onChange={(event) => onPhone(event.target.value)}
                onBlur={() => {
                  if (phone.trim()) setPhoneHint(checkPhone());
                }}
                className={`${fieldClass} ${phoneHint ? "border-wine-700" : ""}`}
              />
              {phoneHint ? (
                <p id="phone-hint" className="mt-1.5 text-[0.88rem] leading-snug text-wine-500">
                  {phoneHint}
                </p>
              ) : null}
            </label>

            <label className="mt-3 block">
              <span className={labelClass}>{contactForm.detailsLabel}</span>
              <textarea
                name="details"
                value={details}
                maxLength={4000}
                rows={3}
                aria-invalid={detailsHint ? true : undefined}
                aria-describedby={detailsHint ? "details-hint" : undefined}
                disabled={status === "submitting"}
                placeholder={contactForm.detailsPlaceholder}
                onChange={(event) => {
                  setDetails(event.target.value);
                  if (detailsHint) setDetailsHint("");
                }}
                className={`${fieldClass} resize-y ${detailsHint ? "border-wine-700" : ""}`}
              />
              {detailsHint ? (
                <p id="details-hint" className="mt-1.5 text-[0.88rem] leading-snug text-wine-500">
                  {detailsHint}
                </p>
              ) : null}
            </label>

            <div className="pointer-events-none absolute top-0 -left-[9999px] h-0 w-0 overflow-hidden opacity-0" aria-hidden>
              <label>
                Website
                <input name="website" type="text" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <div className="mt-4 flex items-start gap-3">
              <label className="relative mt-0.5 h-6 w-6 shrink-0 cursor-pointer">
                <input
                  id="consent"
                  name="consent"
                  type="checkbox"
                  value="yes"
                  checked={consent}
                  disabled={status === "submitting"}
                  onChange={(event) => setConsent(event.target.checked)}
                  className="peer absolute inset-0 cursor-pointer appearance-none rounded-[7px] border border-wine-700/30 bg-cream-50 transition-colors duration-200 checked:border-wine-800 checked:bg-wine-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400 disabled:cursor-not-allowed"
                />
                <svg
                  viewBox="0 0 16 16"
                  className="pointer-events-none absolute inset-0 m-auto h-3.5 w-3.5 text-gold-400 opacity-0 transition-opacity duration-200 peer-checked:opacity-100"
                  aria-hidden
                >
                  <path
                    d="M3.2 8.2 6.4 11.4 12.8 4.6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </label>
              <span className="text-[0.92rem] leading-snug text-ink-900">
                <label htmlFor="consent" className="cursor-pointer">
                  {contactForm.consentLead}{" "}
                </label>
                <a
                  href={legal.consentHref}
                  className="underline decoration-gold-400/80 underline-offset-4 transition-colors hover:text-wine-800"
                >
                  {contactForm.consentLink}
                </a>
              </span>
            </div>
            <p className="mt-2 pl-9 text-[0.92rem] leading-snug">
              <a
                href={legal.privacyHref}
                className="text-wine-800 underline decoration-gold-400/80 underline-offset-4 transition-colors hover:text-gold-400"
              >
                {contactForm.privacyLabel}
              </a>
            </p>

            {status === "error" ? (
              <p className="mt-5 text-[0.95rem] leading-snug text-wine-500" role="alert">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              data-cursor="expand"
              disabled={!consent || status === "submitting"}
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
