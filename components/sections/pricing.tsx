"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { pricing, type Plan, type PricingMode } from "@/lib/content";
import { EXPO } from "@/lib/easing";
import { cn } from "@/lib/cn";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { FadeIn, RevealLines } from "@/components/ui/reveal";

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
    <motion.div variants={cardVariants(Boolean(plan.recommended))} className="h-full">
      <article
        className={cn(
          "relative flex h-full flex-col bg-cream-100 p-8 sm:p-10",
          plan.recommended
            ? "border border-wine-700 lg:-translate-y-4"
            : "border border-ink-900/10",
        )}
      >
        {plan.recommended ? (
          <span className="absolute inset-x-8 top-0 h-px bg-gold-400" aria-hidden />
        ) : null}
        <div className="mb-6 h-4">
          {plan.recommended ? (
            <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-gold-400">
              Рекомендуем
            </p>
          ) : null}
        </div>
        <h3 className="font-serif text-[2rem] leading-tight text-ink-900 lg:min-h-[5rem]">{plan.name}</h3>
        <p className="mt-6 font-serif text-[2.75rem] leading-none text-gold-400 sm:text-5xl">
          {plan.price}
        </p>
        <p className="mt-6 text-[1.0625rem] leading-[1.7] text-ink-500">{plan.description}</p>
        <ul className="mt-8 space-y-3">
          {plan.features.map((feature) => (
            <li key={feature} className="flex gap-3 text-[15px] leading-relaxed text-ink-900">
              <Check />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-10">
          <MagneticButton href="#contact" variant={plan.recommended ? "solid" : "line"}>
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
  const [mode, setMode] = useState<PricingMode>("business");
  const plans = pricing.plans[mode];

  return (
    <section id="formats" className="bg-cream-50 py-24 sm:py-32 lg:py-40">
      <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-8">
        <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-wine-700">
          {pricing.label}
        </p>
        <span className="mt-5 block h-px w-10 bg-gold-400" />
        <RevealLines
          lines={pricing.title}
          className="mt-6 font-serif text-[2.5rem] leading-[1.05] tracking-[-0.02em] text-ink-900 sm:text-6xl"
        />
        <FadeIn className="mt-6 max-w-xl">
          <p className="text-[1.0625rem] leading-[1.7] text-ink-500">{pricing.lede}</p>
        </FadeIn>

        <div ref={gridRef}>
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

        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            id={`panel-${mode}`}
            role="tabpanel"
            aria-labelledby={`tab-${mode}`}
            variants={gridVariants}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            exit="exit"
            className="mt-10 grid gap-6 lg:mt-14 lg:grid-cols-3 lg:pt-6"
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
