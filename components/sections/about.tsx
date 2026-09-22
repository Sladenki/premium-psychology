"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { about } from "@/lib/content";
import { EXPO } from "@/lib/easing";
import { FadeIn, RevealLines } from "@/components/ui/reveal";

function YearCounter() {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, about.years, {
      duration: 1.35,
      ease: EXPO,
      onUpdate: (latest) => setValue(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, reduce]);

  const shown = reduce ? about.years : value;

  return (
    <span ref={ref} className="font-serif leading-none text-gold-400">
      {shown}
    </span>
  );
}

function LogoMarquee() {
  const sequence = Array.from({ length: 4 }, () => about.logos).flat();

  return (
    <div
      className="marquee mt-16 w-full overflow-hidden border-y border-wine-700/15 py-7 sm:mt-20 sm:py-8"
      aria-label="Организации, в которых сложился опыт"
    >
      <div className="marquee-track flex w-max">
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1} className="flex items-center">
            {sequence.map((name, index) => (
              <li key={`${copy}-${name}-${index}`} className="flex items-center">
                <span className="px-8 text-[13px] font-medium uppercase tracking-[0.16em] text-ink-500 sm:px-12 sm:text-sm sm:tracking-[0.18em]">
                  {name}
                </span>
                <span className="h-1 w-1 shrink-0 rounded-full bg-gold-400" aria-hidden />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export function About() {
  return (
    <section id="practice" className="bg-cream-50 py-24 sm:py-32 lg:py-40">
      <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-8">
        <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-wine-700">
          {about.label}
        </p>
        <span className="mt-5 block h-px w-10 bg-gold-400" />
        <RevealLines
          lines={about.title}
          className="mt-6 font-serif text-[2.5rem] leading-[1.05] tracking-[-0.02em] text-ink-900 sm:text-6xl lg:text-7xl"
        />
        <FadeIn className="mt-8 max-w-2xl" delay={0.1}>
          <p className="font-serif text-[2rem] leading-[1.25] text-wine-800 italic">
            {about.lede}
          </p>
        </FadeIn>

        <FadeIn className="mt-14 sm:mt-16" delay={0.05}>
          <ul className="max-w-3xl space-y-4 border-l border-gold-400/70 pl-6 sm:pl-8">
            {about.quotes.map((quote) => (
              <li
                key={quote}
                className="font-serif text-[2rem] leading-snug text-ink-900 italic sm:text-[2.25rem]"
              >
                «{quote}»
              </li>
            ))}
          </ul>
        </FadeIn>

        <div className="mt-20 sm:mt-24">
          <FadeIn>
            <h3 className="font-serif text-[2rem] leading-tight text-ink-900">
              {about.behindLabel}
            </h3>
          </FadeIn>
          <ul className="mt-8 grid gap-x-12 sm:grid-cols-2">
            {about.behind.map((item, index) => (
              <FadeIn
                as="li"
                key={item}
                delay={index * 0.04}
                className="flex gap-4 border-t border-wine-700/15 py-4 text-[1.0625rem] leading-relaxed text-ink-900"
              >
                <span className="mt-[0.7em] h-px w-4 shrink-0 bg-gold-400" />
                <span>{item}</span>
              </FadeIn>
            ))}
          </ul>
        </div>

        <div className="mt-20 flex flex-col gap-6 border-t border-wine-700/15 pt-12 sm:mt-24 md:flex-row md:items-end md:justify-between">
          <p
            className="font-serif text-[clamp(5rem,14vw,9rem)] leading-none text-gold-400"
            aria-label={`${about.years}+ ${about.yearsLabel}`}
          >
            <YearCounter />
            <span aria-hidden>+</span>
          </p>
          <p className="max-w-sm text-lg leading-relaxed text-ink-500 md:pb-4">
            {about.yearsLabel}
          </p>
        </div>
      </div>

      <LogoMarquee />

      <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-8">
        <FadeIn className="mt-16 max-w-3xl sm:mt-20">
          <p className="text-[1.0625rem] leading-[1.75] text-ink-900">{about.partners}</p>
        </FadeIn>
        <ul className="mt-8 flex flex-wrap gap-2">
          {about.tags.map((tag) => (
            <li
              key={tag}
              className="border border-wine-700/40 px-3.5 py-2 text-[12px] font-medium uppercase tracking-[0.08em] text-wine-800"
            >
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:mt-20">
          {about.certificates.map((item, index) => (
            <FadeIn key={item.index} delay={index * 0.08} className="h-full">
              <article className="flex h-full flex-col border border-wine-700/25 bg-cream-100 p-8 sm:p-10">
                <div className="flex items-baseline justify-between gap-4">
                  <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-wine-700">
                    Сертификат
                  </p>
                  <p className="font-serif text-[2rem] leading-none text-gold-400">{item.index}</p>
                </div>
                <div className="mt-8 border border-gold-400/50 px-6 py-10">
                  <h3 className="font-serif text-[2rem] leading-tight text-ink-900">{item.title}</h3>
                  <p className="mt-4 text-ink-500">{item.issuer}</p>
                </div>
                <p className="mt-6 text-sm leading-relaxed text-ink-500">{item.note}</p>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
