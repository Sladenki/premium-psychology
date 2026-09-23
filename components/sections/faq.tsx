"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { faq } from "@/lib/content";
import { EXPO } from "@/lib/easing";
import { cn } from "@/lib/cn";
import { Atmosphere } from "@/components/ui/atmosphere";
import { RevealLines } from "@/components/ui/reveal";

function FaqItem({ question, answer }: { question: string; answer: string[] }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    <div className="border-t border-wine-700/15 [overflow-anchor:none]">
      <button
        type="button"
        aria-expanded={open}
        data-cursor="expand"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-start justify-between gap-6 py-6 text-left font-serif text-[1.35rem] leading-snug text-ink-900 sm:py-7 sm:text-[1.65rem]"
      >
        <span>{question}</span>
        <motion.span
          aria-hidden
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: reduce ? 0 : 0.45, ease: EXPO }}
          className="mt-1 shrink-0 font-serif text-[1.75rem] leading-none text-gold-400"
        >
          +
        </motion.span>
      </button>
      <div
        className={cn(
          "grid [overflow-anchor:none]",
          reduce ? "" : "transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden" inert={open ? undefined : true}>
          <div className="max-w-3xl space-y-4 pb-7">
            {answer.map((paragraph) => (
              <p key={paragraph} className="text-[1.0625rem] leading-[1.7] text-ink-500">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Faq() {
  return (
    <section id="faq" className="relative overflow-hidden bg-cream-50 py-24 sm:py-32 lg:py-40">
      <Atmosphere variant="faq" />
      <div className="relative z-10 mx-auto w-full max-w-[1120px] px-5 sm:px-8">
        <RevealLines
          lines={faq.title}
          className="font-serif text-[2.5rem] leading-[1.05] tracking-[-0.02em] text-ink-900 sm:text-6xl"
        />

        <div className="mt-12 border-b border-wine-700/15 [overflow-anchor:none] sm:mt-16">
          {faq.items.map((item) => (
            <FaqItem key={item.question} question={item.question} answer={item.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}
