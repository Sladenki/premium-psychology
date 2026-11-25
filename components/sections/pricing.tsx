"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { pricing, type Plan } from "@/lib/content";
import { EXPO } from "@/lib/easing";
import { cn } from "@/lib/cn";
import { Atmosphere } from "@/components/ui/atmosphere";
import { RevealLines } from "@/components/ui/reveal";

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
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
    <motion.article
      variants={cardVariants(Boolean(plan.recommended))}
      className={cn(
        "relative grid min-w-0 grid-rows-[auto_auto_auto_1fr] gap-y-3 rounded-[1.25rem] p-4 sm:rounded-[1.5rem] sm:p-5 lg:grid-rows-subgrid lg:row-span-4",
        plan.recommended
          ? "bg-wine-800 text-cream-50 ring-2 ring-gold-400"
          : "border border-wine-700/12 bg-cream-50",
      )}
    >
      {plan.badge ? (
        <p className="absolute top-4 right-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-gold-400">
          {plan.badge}
        </p>
      ) : null}
      <h3
        className={cn(
          "min-w-0 font-sans text-[1.2rem] leading-snug font-medium break-words sm:text-[1.4rem]",
          plan.badge && "pr-16",
          plan.recommended ? "text-cream-50" : "text-ink-900",
        )}
      >
        {plan.name}
      </h3>
      <p className="font-serif text-[1.2rem] leading-[1.2] break-words text-gold-400 sm:text-[1.4rem]">
        {plan.lead}
      </p>
      <p
        className={cn(
          "font-sans text-[0.95rem] leading-snug italic sm:text-[1rem]",
          plan.recommended ? "text-cream-100" : "text-wine-800",
        )}
      >
        {plan.summary}
      </p>
      <ul
        className={cn(
          "space-y-2 border-t pt-3",
          plan.recommended ? "border-cream-50/15" : "border-wine-700/10",
        )}
      >
        {plan.features.map((feature) => (
          <li
            key={feature}
            className={cn(
              "flex gap-2.5 text-[14px] leading-snug",
              plan.recommended ? "text-cream-50" : "text-ink-900",
            )}
          >
            <Check />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </motion.article>
  );
}

export function Pricing() {
  const gridRef = useRef<HTMLDivElement>(null);
  const inView = useInView(gridRef, { once: true, margin: "0px 0px -12% 0px" });

  return (
    <section id="formats" className="relative scroll-mt-24 overflow-hidden bg-cream-50 pt-6 pb-8 sm:pt-8 sm:pb-10 lg:pt-10 lg:pb-12">
      <Atmosphere variant="formats" />
      <div className="relative z-10 mx-auto w-full max-w-[1120px] px-5 sm:px-8">
        <RevealLines
          lines={pricing.title}
          className="font-serif text-[2.15rem] leading-[1.05] tracking-[-0.02em] text-ink-900 sm:text-6xl"
        />

        <motion.div
          ref={gridRef}
          variants={gridVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="mt-6 grid gap-4 lg:mt-8 lg:grid-cols-3 lg:grid-rows-[auto_auto_auto_auto]"
        >
          {pricing.plans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </motion.div>
        <div className="mt-8 flex justify-center sm:mt-10">
          <a
            href="#contact"
            data-cursor="expand"
            className="inline-flex w-full max-w-[40rem] items-center justify-center rounded-full bg-wine-800 px-7 py-3.5 text-center text-[13px] font-semibold uppercase tracking-[0.06em] text-cream-50 transition-colors duration-300 hover:bg-gold-400 hover:text-wine-950 sm:max-w-[44rem] sm:text-[14px]"
          >
            {pricing.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
