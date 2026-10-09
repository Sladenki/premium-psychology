"use client";

import { useReducedMotion } from "framer-motion";
import { useState } from "react";
import { cases, type CaseStudy } from "@/lib/content";
import { cn } from "@/lib/cn";
import { RevealLines } from "@/components/ui/reveal";

function CaseDetail({ item }: { item: CaseStudy }) {
  return (
    <article className="rounded-[1.75rem] border border-wine-700/10 bg-cream-50 px-5 py-7 sm:px-8 sm:py-9">
      <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-wine-700">{item.name}</p>
      <h3 className="mt-5 font-sans text-[1.28rem] leading-snug font-medium text-ink-900 sm:text-[1.75rem]">
        {item.title}
      </h3>
      <ol className="mt-8">
        {item.points.map((point, index) => {
          const paragraphs = Array.isArray(point.text) ? point.text : [point.text];
          return (
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
              <div className="min-w-0 space-y-3 text-[1.02rem] leading-[1.65] text-ink-900">
                {paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </li>
          );
        })}
      </ol>
      {item.project ? (
        <p className="mt-2 border-t border-gold-400/60 pt-6 text-[1.02rem] leading-[1.65] text-ink-900">
          Один из проектов:{" "}
          <a
            href={item.project.href}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-wine-800 underline decoration-gold-400/70 underline-offset-4 transition-colors hover:text-gold-400"
          >
            {item.project.label}
          </a>
        </p>
      ) : null}
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
    <section id="cases" className="relative overflow-x-clip bg-cream-50 pt-2 pb-6 sm:pt-4 sm:pb-10 lg:pb-12">
      <div className="relative z-10 mx-auto w-full max-w-[1120px] px-5 sm:px-8">
        <RevealLines
          lines={cases.title}
          className="font-serif text-[2.15rem] leading-[1.05] tracking-[-0.02em] text-ink-900 sm:text-6xl"
        />

        <div className="mt-10 grid items-start gap-8 lg:mt-12 lg:grid-cols-[minmax(16rem,22rem)_minmax(0,1fr)] lg:gap-12">
          <div
            role="tablist"
            aria-label="Кейсы"
            className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1 sm:mx-0 sm:px-0 lg:sticky lg:top-28 lg:flex-col lg:overflow-visible lg:pb-0"
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
                    "shrink-0 snap-start rounded-2xl px-4 py-3 text-left transition-colors duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] lg:w-full lg:px-5 lg:py-4",
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
            className="relative min-w-0 [overflow-anchor:none]"
          >
            {cases.items.map((item) => {
              const selected = item.id === active.id;
              return (
                <div
                  key={item.id}
                  className={cn(
                    reduce ? "" : "transition-opacity duration-300 ease-[cubic-bezier(0.65,0,0.35,1)]",
                    selected
                      ? "relative z-10 opacity-100"
                      : "pointer-events-none absolute inset-x-0 top-0 z-0 opacity-0",
                  )}
                  aria-hidden={selected ? undefined : true}
                  inert={selected ? undefined : true}
                >
                  <CaseDetail item={item} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
