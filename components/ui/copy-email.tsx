"use client";

import { useState } from "react";
import { contact } from "@/lib/content";

function Envelope() {
  return (
    <svg viewBox="0 0 24 24" className="h-[1.25rem] w-[1.25rem]" aria-hidden>
      <path fill="none" stroke="currentColor" strokeWidth="1.6" d="M4 7.5h16v10H4z" />
      <path fill="none" stroke="currentColor" strokeWidth="1.6" d="m4.5 8 7.5 6 7.5-6" />
    </svg>
  );
}

export function CopyEmail() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    const email = contact.email;
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const field = document.createElement("textarea");
      field.value = email;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.left = "-9999px";
      document.body.append(field);
      field.select();
      document.execCommand("copy");
      field.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2400);
  }

  return (
    <div className="relative flex flex-col items-center">
      <button
        type="button"
        onClick={copy}
        className="flex flex-col items-center gap-2 text-gold-400 transition-colors duration-300 hover:text-cream-50"
        aria-label={`Скопировать почту ${contact.email}`}
      >
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold-400">
          <Envelope />
        </span>
        <span className="max-w-[11rem] text-center text-[12px] leading-snug tracking-normal normal-case">
          {contact.email}
        </span>
      </button>
      <p
        role="status"
        aria-live="polite"
        className={
          copied
            ? "absolute top-full z-10 mt-2 w-max rounded-full bg-cream-50 px-3 py-1.5 text-[12px] font-medium tracking-normal text-wine-800 normal-case"
            : "sr-only"
        }
      >
        {copied ? "Почта скопирована" : ""}
      </p>
    </div>
  );
}
