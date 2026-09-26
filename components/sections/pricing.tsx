"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useRef } from "react";
import { pricing, type Plan } from "@/lib/content";
import { EXPO } from "@/lib/easing";
import { cn } from "@/lib/cn";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Atmosphere } from "@/components/ui/atmosphere";
import { RevealLines } from "@/components/ui/reveal";

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.35, ease: EXPO } },
};

function cardVariants(recommended: boolean) {
  return {
    hidden: { opacity: 0, y: 24, scale: recommended ? 0.96 : 1 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: EXPO },
    },
  };
}

function Check() {
  return (
    <svg viewBox="0 0 16 16" className="mt-1 h-3.5 w-3.5 shrink-0 text-gold-400" aria-hidden>
      <path
        d="M2.5 8.2 6.1 12 13.5 3.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <motion.div variants={cardVariants(Boolean(plan.recommended))} className="h-full min-w-0">
      <article
        className={cn(
          "relative flex h-full min-w-0 flex-col rounded-[1.35rem] p-5 sm:rounded-[1.75rem] sm:p-9",
          plan.recommended
            ? "bg-wine-800 text-cream-50 shadow-[0_24px_50px_-28px_rgba(42,10,18,0.65)] lg:-translate-y-3"
            : "border border-wine-700/12 bg-cream-50",
        )}
      >
        <h3
          className={cn(
            "min-w-0 font-sans text-[1.45rem] leading-snug font-medium break-words sm:min-h-[4.4rem] sm:text-[1.85rem]",
            plan.recommended ? "text-cream-50" : "text-ink-900",
          )}
        >
          {plan.name}
        </h3>
        <p className="mt-4 font-serif text-[1.45rem] leading-[1.2] break-words text-gold-400 sm:mt-5 sm:min-h-[4.4rem] sm:text-[1.95rem]">
          {plan.lead}
        </p>
        <p
          className={cn(
            "mt-5 font-sans text-[1.08rem] leading-snug italic",
            plan.recommended ? "text-cream-100" : "text-wine-800",
          )}
        >
          {plan.summary}
        </p>
        <p
          className={cn(
            "mt-4 text-[1.02rem] leading-[1.65]",
            plan.recommended ? "text-cream-100/80" : "text-ink-900",
          )}
        >
          {plan.description}
        </p>
        <ul className={cn("mt-8 space-y-3 border-t pt-6", plan.recommended ? "border-cream-50/15" : "border-wine-700/10")}>
          {plan.features.map((feature) => (
            <li
              key={feature}
              className={cn(
                "flex gap-3 text-[15px] leading-relaxed",
                plan.recommended ? "text-cream-50" : "text-ink-900",
              )}
            >
              <Check />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-10">
          <MagneticButton href="#contact" variant="gold" wide>
            {pricing.cta}
          </MagneticButton>
        </div>
      </article>
    </motion.div>
  );
}

export function Pricing() {
  const gridRef = useRef<HTMLDivElement>(null);
  const inView = useInView(gridRef, { once: true, margin: "0px 0px -12% 0px" });
  const mode = "business" as const;
  const plans = pricing.plans[mode];

  return (
    <section id="formats" className="relative overflow-hidden bg-cream-50 py-16 sm:py-28 lg:py-40">
      <Atmosphere variant="formats" />
      <div className="relative z-10 mx-auto w-full max-w-[1120px] px-5 sm:px-8">
        <RevealLines
          lines={pricing.title}
          className="font-serif text-[2.15rem] leading-[1.05] tracking-[-0.02em] text-ink-900 sm:text-6xl"
        />
        <p className="mt-5 max-w-xl font-sans text-[1.15rem] leading-snug text-wine-800 italic sm:mt-6 sm:text-[1.6rem]">
          {pricing.lede}
        </p>

        <div ref={gridRef}>
        {/*
        <div
          role="tablist"
          aria-label="Контур работы"
          className="mt-12 inline-grid grid-cols-2 rounded-full border border-wine-700/30 p-1"
        >
          {pricing.modes.map((item) => {
            const selected = mode === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`tab-${item.id}`}
                aria-selected={selected}
                aria-controls={`panel-${item.id}`}
                onClick={() => setMode(item.id)}
                className="relative rounded-full px-5 py-3 text-[12px] font-medium uppercase tracking-[0.08em] sm:px-8 sm:text-[13px]"
              >
                {selected ? (
                  <motion.span
                    layoutId="pricing-indicator"
                    className="absolute inset-0 rounded-full bg-wine-800"
                    transition={{ duration: 0.45, ease: EXPO }}
                  />
                ) : null}
                <span className={cn("relative z-10", selected ? "text-cream-50" : "text-ink-500")}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
        */}

        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            variants={gridVariants}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            exit="exit"
            className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-3 lg:pt-6"
          >
            {plans.map((plan) => (
              <PlanCard key={plan.name} plan={plan} />
            ))}
          </motion.div>
        </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
