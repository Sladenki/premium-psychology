"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { cases, type CaseStudy } from "@/lib/content";
import { EXPO } from "@/lib/easing";
import { cn } from "@/lib/cn";
import { Atmosphere } from "@/components/ui/atmosphere";
import { RevealLines } from "@/components/ui/reveal";

function CaseDetail({ item }: { item: CaseStudy }) {
  return (
    <article className="rounded-[1.75rem] border border-wine-700/10 bg-cream-50 px-5 py-7 sm:px-8 sm:py-9">
      <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-wine-700">{item.name}</p>
      <h3 className="mt-5 font-sans text-[1.45rem] leading-snug font-medium text-ink-900 sm:text-[1.75rem]">
        {item.title}
      </h3>
      <ol className="mt-8">
        {item.points.map((point, index) => (
          <li
            key={point.label}
            className="grid gap-2 border-t border-wine-700/10 py-5 sm:grid-cols-[11.5rem_minmax(0,1fr)] sm:items-start sm:gap-6 sm:py-6"
          >
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-[1.15rem] leading-none text-gold-400 lining-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-[12px] font-medium uppercase tracking-[0.08em] text-wine-700">
                {point.label}
              </span>
            </div>
            <p className="min-w-0 text-[1.02rem] leading-[1.65] text-ink-900">{point.text}</p>
          </li>
        ))}
      </ol>
      {item.quote ? (
        <figure className="mt-2 border-t border-gold-400/60 pt-6">
          <blockquote className="font-sans text-[1.2rem] leading-snug text-ink-900 italic sm:text-[1.35rem]">
            «{item.quote}»
          </blockquote>
          {item.quoteBy ? (
            <figcaption className="mt-3 text-[12px] font-medium uppercase tracking-[0.08em] text-ink-500">
              {item.quoteBy}
            </figcaption>
          ) : null}
        </figure>
      ) : null}
    </article>
  );
}

export function Cases() {
  const [activeId, setActiveId] = useState(cases.items[0].id);
  const reduce = useReducedMotion();
  const active = cases.items.find((item) => item.id === activeId) ?? cases.items[0];

  return (
    <section id="cases" className="relative overflow-hidden bg-cream-100 py-24 sm:py-32 lg:py-40">
      <Atmosphere variant="method" />
      <div className="relative z-10 mx-auto w-full max-w-[1120px] px-5 sm:px-8">
        <RevealLines
          lines={cases.title}
          className="font-serif text-[2.5rem] leading-[1.05] tracking-[-0.02em] text-ink-900 sm:text-6xl"
        />

        <div className="mt-12 grid items-start gap-8 lg:mt-16 lg:grid-cols-[minmax(16rem,22rem)_minmax(0,1fr)] lg:gap-12">
          <div
            role="tablist"
            aria-label="Кейсы"
            className="flex gap-3 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0"
          >
            {cases.items.map((item) => {
              const selected = item.id === active.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  id={`case-tab-${item.id}`}
                  aria-selected={selected}
                  aria-controls="case-panel"
                  data-cursor="expand"
                  onClick={() => setActiveId(item.id)}
                  className={cn(
                    "shrink-0 rounded-2xl px-4 py-3 text-left transition-colors duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] lg:w-full lg:px-5 lg:py-4",
                    selected ? "bg-wine-800 text-cream-50" : "bg-cream-50 text-ink-900 hover:bg-cream-50/80",
                  )}
                >
                  <span className="font-serif text-[1.05rem] leading-none text-gold-400 lining-nums">
                    {item.index}
                  </span>
                  <span className="mt-2 block max-w-[16rem] text-[0.95rem] leading-snug font-medium lg:max-w-none">
                    {item.name}
                  </span>
                  <span
                    className={cn(
                      "mt-1 hidden text-[0.9rem] leading-snug lg:line-clamp-2 lg:block",
                      selected ? "text-cream-100/75" : "text-ink-500",
                    )}
                  >
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>

          <div
            role="tabpanel"
            id="case-panel"
            aria-labelledby={`case-tab-${active.id}`}
            className="min-w-0"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.id}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: reduce ? 0 : 0.35, ease: EXPO }}
              >
                <CaseDetail item={active} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
