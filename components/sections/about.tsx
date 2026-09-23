"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import portraitQuiet from "../../photos/ph2.jpg";
import { about } from "@/lib/content";
import { cn } from "@/lib/cn";
import { EXPO } from "@/lib/easing";
import { Atmosphere } from "@/components/ui/atmosphere";
import { FadeIn, RevealLines } from "@/components/ui/reveal";
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
    <span ref={ref} className="font-serif leading-none text-gold-400">
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
      className="marquee relative z-10 mt-16 w-full overflow-hidden border-y border-wine-700/15 py-7 sm:mt-20 sm:py-8"
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

export function About() {
  return (
    <section id="practice" className="relative overflow-hidden bg-cream-50 py-24 sm:py-32 lg:py-40">
      <Atmosphere variant="practice" />
      <div className="relative z-10 mx-auto w-full max-w-[1120px] px-5 sm:px-8">
        <div>
          <RevealLines
            lines={about.title}
            className="font-serif text-[2.5rem] leading-[1.05] tracking-[-0.02em] text-ink-900 sm:text-6xl lg:text-7xl"
          />
          <FadeIn className="mt-8 max-w-3xl" delay={0.1}>
            <p className="font-sans text-[1.45rem] leading-[1.35] text-wine-800 italic sm:text-[1.7rem]">
              {about.lede}
            </p>
            <p className="mt-4 max-w-2xl font-sans text-[1.15rem] leading-snug text-wine-800/80 italic sm:text-[1.3rem]">
              {about.ledeMore}
            </p>
          </FadeIn>
          <FadeIn className="mt-10" delay={0.05}>
            <ul className="grid max-w-4xl gap-x-12 gap-y-3 border-l border-gold-400/70 pl-6 sm:grid-cols-2">
              {about.quotes.map((quote) => (
                <li key={quote} className="font-sans text-[1.25rem] leading-snug text-ink-900 italic sm:text-[1.4rem]">
                  «{quote}»
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>

        <div className="mt-16 rounded-[1.75rem] bg-cream-100 px-6 py-8 sm:mt-20 sm:px-10 sm:py-10">
          <div className="grid gap-8 lg:grid-cols-[18rem_1fr] lg:gap-12">
            <h3 className="font-serif text-[2rem] leading-tight text-ink-900 sm:text-[2.25rem]">
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

        <div className="mt-16 grid items-start gap-12 sm:mt-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <p
              className="font-serif text-[clamp(4.75rem,10vw,7.25rem)] leading-[0.82] text-gold-400"
              aria-label={`${about.years}+ ${about.yearsLabel}`}
            >
              <YearCounter />
              <span aria-hidden>+</span>
            </p>
            <p className="mt-5 max-w-sm font-serif text-[1.75rem] leading-snug text-ink-900 sm:text-[2rem]">
              {about.yearsLabel}
            </p>
            <div className="mt-10 border-t border-gold-400/60 pt-8">
              <p className="font-serif text-[2rem] leading-tight tracking-[-0.02em] text-ink-900 sm:text-[2.4rem]">
                {about.founder.name}
              </p>
              <p className="mt-3 text-[12px] font-medium uppercase tracking-[0.14em] text-wine-700">
                {about.founder.role}
              </p>
              <div className="mt-6 max-w-xl space-y-4 text-[1.02rem] leading-[1.75] text-ink-900 sm:text-[1.0625rem]">
                {about.founder.bio.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
          <Portrait
            src={portraitQuiet}
            sizes="(min-width: 1024px) 440px, 80vw"
            objectPosition="center 22%"
            className="mx-auto w-full max-w-sm lg:mx-0 lg:max-w-[28rem] lg:justify-self-end"
          />
        </div>
      </div>

      <LogoMarquee />

      <div className="relative z-10 mt-16 border-y border-wine-700/10 bg-cream-100/80 py-14 sm:mt-20 sm:py-16">
        <FadeIn className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <p className="font-sans text-[1.55rem] leading-snug text-ink-900 italic sm:text-[1.85rem]">
            {about.partnersLead}
          </p>
          <ul className="mt-8 flex flex-wrap items-center justify-center">
            {about.partnersRoles.map((role, index) => (
              <li key={role} className="flex items-center font-sans text-[1.05rem] text-wine-800 sm:text-[1.15rem]">
                {index > 0 ? (
                  <span className="px-2.5 text-gold-400" aria-hidden>
                    ·
                  </span>
                ) : null}
                {role}
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </section>
  );
}
