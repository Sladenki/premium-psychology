"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cases, type CaseStudy } from "@/lib/content";
import { cn } from "@/lib/cn";
import { Atmosphere } from "@/components/ui/atmosphere";
import { RevealLines } from "@/components/ui/reveal";

function CaseDetail({ item }: { item: CaseStudy }) {
  return (
    <article className="rounded-[1.25rem] border border-wine-700/10 bg-cream-50 px-4 py-2.5 sm:rounded-[1.35rem] sm:px-5 sm:py-3">
      <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-wine-700">{item.name}</p>
      <h3 className="mt-1.5 font-sans text-[1.16rem] leading-snug font-medium text-wine-800 sm:text-[1.28rem] lg:text-[1.38rem]">
        {item.title}
      </h3>
      <ol className="mt-2 list-none">
        {item.points.map((point, index) => {
          const paragraphs = Array.isArray(point.text) ? point.text : [point.text];
          return (
            <li
              key={point.label}
              className="grid gap-1 border-t border-wine-700/10 py-1.5 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:items-start sm:gap-4 sm:py-1.5"
            >
              <div className="flex items-baseline gap-3">
                <span aria-hidden className="font-serif text-[1.05rem] leading-none text-gold-400 lining-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-[12px] font-medium uppercase tracking-[0.08em] text-wine-700">
                  {point.label}
                </span>
              </div>
              <div className="min-w-0 space-y-2 text-[0.98rem] leading-[1.5] text-ink-900 lg:text-[1.02rem]">
                {paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </li>
          );
        })}
      </ol>
      {item.projects?.length ? (
        <p className="mt-1 border-t border-gold-400/60 pt-3 text-[0.98rem] leading-[1.5] text-ink-900">
          Один из проектов:{" "}
          {item.projects.map((project, index) => (
            <span key={project.href}>
              {index > 0 ? " · " : null}
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-wine-800 underline decoration-gold-400/70 underline-offset-4 transition-colors hover:text-gold-400"
              >
                {project.label}
              </a>
            </span>
          ))}
        </p>
      ) : null}
      {item.more ? (
        <p className="mt-1 border-t border-gold-400/60 pt-3 text-[0.98rem] leading-[1.5] text-ink-900">
          Подробнее:{" "}
          <a
            href={item.more.href}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-wine-800 underline decoration-gold-400/70 underline-offset-4 transition-colors hover:text-gold-400 break-all"
          >
            {item.more.label}
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
  const panelRef = useRef<HTMLDivElement>(null);
  const initialId = useRef(activeId);
  const active = cases.items.find((item) => item.id === activeId) ?? cases.items[0];

  useEffect(() => {
    if (activeId === initialId.current) return;
    if (window.matchMedia("(min-width: 1024px)").matches) return;

    panelRef.current?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });
  }, [activeId, reduce]);

  return (
    <section id="cases" className="relative scroll-mt-24 overflow-x-clip bg-cream-50 py-5 sm:py-6 lg:py-6">
      <Atmosphere variant="cases" />
      <div className="relative z-10 mx-auto w-full max-w-[1120px] px-5 sm:px-8">
        <RevealLines
          lines={cases.title}
          className="font-serif text-[2.15rem] leading-[1.05] tracking-[-0.02em] text-ink-900 sm:text-5xl"
        />
        <div className="mt-4 grid items-start gap-3 lg:mt-4 lg:grid-cols-[minmax(11rem,26%)_minmax(0,1fr)] lg:gap-5">
          <div className="lg:sticky lg:top-24">
            <div
              role="tablist"
              aria-label="Кейсы"
              className="grid grid-cols-2 gap-2 lg:grid-cols-1 lg:gap-2"
            >
              {cases.items.map((item, index) => {
                const selected = item.id === active.id;
                const last = index === cases.items.length - 1;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    id={`case-tab-${item.id}`}
                    aria-selected={selected}
                    aria-controls="case-panel"
                    data-cursor="expand"
                    onClick={() => {
                      if (item.id === activeId) return;
                      setActiveId(item.id);
                    }}
                    className={cn(
                      "flex h-full min-h-[4.85rem] flex-col justify-center rounded-2xl border px-3 py-2.5 text-left transition-colors duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] lg:px-3.5 lg:py-2",
                      last && "col-span-2 w-[calc(50%-0.25rem)] justify-self-center lg:col-span-1 lg:w-full",
                      selected
                        ? "border-wine-800 bg-wine-800 text-cream-50"
                        : "border-wine-700/12 bg-cream-50 text-ink-900 hover:bg-cream-100",
                    )}
                  >
                    <span className="font-serif text-[1rem] leading-none text-gold-400 lining-nums">
                      {item.index}
                    </span>
                    <span className="mt-1 block text-[0.9rem] leading-snug font-medium lg:text-[0.92rem]">
                      {item.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div
            ref={panelRef}
            role="tabpanel"
            id="case-panel"
            aria-labelledby={`case-tab-${active.id}`}
            className="relative min-w-0 scroll-mt-28 [overflow-anchor:none]"
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
