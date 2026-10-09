"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import portraitQuiet from "../../photos/ph2.jpg";
import { about } from "@/lib/content";
import { cn } from "@/lib/cn";
import { EXPO } from "@/lib/easing";
import { Atmosphere } from "@/components/ui/atmosphere";
import { FadeIn } from "@/components/ui/reveal";
import type { StaticImageData } from "next/image";

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
    <span ref={ref} className="tabular-nums">
      {shown}
    </span>
  );
}

function Portrait({
  src,
  sizes,
  objectPosition,
  className,
}: {
  src: StaticImageData;
  sizes: string;
  objectPosition: string;
  className?: string;
}) {
  return (
    <figure className={cn("overflow-hidden rounded-[1.75rem]", className)}>
      <div className="relative aspect-[4/5]">
        <Image
          src={src}
          alt="Полина Олитто"
          fill
          quality={90}
          sizes={sizes}
          className="object-cover"
          style={{ objectPosition }}
        />
      </div>
    </figure>
  );
}

function LogoMarquee() {
  const sequence = Array.from({ length: 2 }, () => about.logos).flat();

  return (
    <div
      className="marquee relative z-10 mt-6 w-full overflow-hidden border-y border-wine-700/15 py-4 sm:mt-8"
      aria-label="Направления работы"
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

export function AboutSituations() {
  return (
    <section id="practice" className="relative overflow-hidden bg-cream-50 pt-10 pb-0 sm:pt-16 lg:pt-20">
      <Atmosphere variant="practice" />
      <div className="relative z-10 mx-auto w-full max-w-[1120px] px-5 sm:px-8">
        <div>
          <h2 className="-translate-y-3 max-w-[22ch] font-serif text-[1.7rem] leading-[1.08] tracking-[-0.02em] text-ink-900 sm:-translate-y-4 sm:text-[2.85rem] lg:text-[3.35rem]">
            {about.lede}
          </h2>
          <FadeIn className="mt-8 max-w-3xl" delay={0.1}>
            <p className="max-w-2xl font-sans text-[1.15rem] leading-snug text-wine-800/80 italic sm:text-[1.3rem]">
              {about.ledeMore}
            </p>
          </FadeIn>
          <FadeIn className="mt-10" delay={0.05}>
            <ul className="grid max-w-4xl gap-x-12 gap-y-3 border-l border-gold-400/70 pl-6 sm:grid-cols-2">
              {about.quotes.map((quote) => (
                <li key={quote} className="font-sans text-[1.12rem] leading-snug text-ink-900 italic sm:text-[1.4rem]">
                  «{quote}»
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

export function AboutSystem() {
  return (
    <section className="relative overflow-hidden bg-cream-50 pt-12 pb-0 sm:pt-20">
      <div className="relative z-10 mx-auto w-full max-w-[1120px] px-5 sm:px-8">
        <div className="rounded-[1.35rem] bg-cream-100 px-5 py-7 sm:rounded-[1.75rem] sm:px-10 sm:py-10">
          <div className="grid gap-8 lg:grid-cols-[18rem_1fr] lg:gap-12">
            <h3 className="font-serif text-[1.75rem] leading-tight text-ink-900 sm:text-[2.25rem]">
              {about.behindLabel}
            </h3>
            <div>
              <p className="mb-8 max-w-xl font-sans text-[1.2rem] leading-snug text-wine-800 italic sm:text-[1.35rem]">
                {about.behindLede}
              </p>
              <ul className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
                {about.behind.map((item, index) => (
                  <li key={item} className="flex gap-4">
                    <span className="font-serif text-[1.35rem] leading-none text-gold-400 lining-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[1.05rem] leading-snug text-ink-900">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AboutFounder() {
  return (
    <section className="relative overflow-hidden bg-cream-50 pt-10 pb-12 sm:pt-14 sm:pb-16">
      <div className="relative z-10 mx-auto w-full max-w-[1120px] px-5 sm:px-8">
        <div className="grid items-start gap-8 sm:grid-cols-[15.5rem_minmax(0,1fr)] sm:gap-10 lg:gap-14">
          <Portrait
            src={portraitQuiet}
            sizes="(min-width: 640px) 248px, 216px"
            objectPosition="center 22%"
            className="mx-auto w-[13.5rem] sm:mx-0 sm:w-full"
          />

          <div className="min-w-0 max-w-[40rem]">
            <h3 className="font-serif text-[1.75rem] leading-none tracking-[-0.02em] text-ink-900 sm:text-[2rem]">
              {about.founder.name}
            </h3>
            <p
              className="mt-3 text-[1.02rem] leading-snug text-ink-500"
              aria-label={`${about.founder.role}. ${about.years}+ ${about.yearsLabel}`}
            >
              {about.founder.role}
              <span className="mx-2 text-gold-400" aria-hidden>
                ·
              </span>
              <YearCounter />+ {about.yearsLabel}
            </p>
            <div className="mt-5 space-y-3 text-[1.02rem] leading-[1.55] text-ink-900">
              {about.founder.bio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <p className="text-ink-500">
                {about.founder.experienceLabel}: {about.founder.companies.join(" · ")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AboutPartners() {
  return (
    <section className="relative overflow-hidden bg-cream-50 pb-0">
      <LogoMarquee />

      <div className="relative z-10 mx-auto mt-6 mb-4 w-full max-w-[1120px] px-5 sm:mt-8 sm:mb-6 sm:px-8">
        <FadeIn className="rounded-[1.35rem] bg-cream-100 px-5 py-7 text-center sm:rounded-[1.75rem] sm:px-10 sm:py-10">
          <p className="mx-auto max-w-3xl font-serif text-[1.45rem] leading-[1.25] tracking-[-0.02em] text-ink-900 sm:text-[2.35rem]">
            {about.partnersLead}
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-[1.05rem] leading-[1.75] text-ink-900 sm:text-[1.08rem]">
            {about.partnersBody}
          </p>
          <p className="mx-auto mt-5 max-w-xl font-sans text-[1.2rem] leading-snug text-wine-800 italic sm:text-[1.35rem]">
            {about.partnersClose}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/** @deprecated Prefer the split About* sections; kept for compatibility. */
export function About() {
  return (
    <>
      <AboutSituations />
      <AboutSystem />
      <AboutFounder />
      <AboutPartners />
    </>
  );
}
