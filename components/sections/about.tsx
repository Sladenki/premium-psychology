"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import portraitSeated from "../../photos/ph1.jpg";
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
  priority = false,
  sizes,
  objectPosition,
  className,
  frameClassName,
}: {
  src: StaticImageData;
  priority?: boolean;
  sizes: string;
  objectPosition: string;
  className?: string;
  frameClassName?: string;
}) {
  return (
    <figure className={cn("relative", className)}>
      <span aria-hidden className="absolute top-0 left-0 z-10 h-8 w-8 border-t-2 border-l-2 border-gold-400" />
      <span aria-hidden className="absolute right-0 bottom-0 z-10 h-8 w-8 border-r-2 border-b-2 border-gold-400" />
      <div className={cn("relative h-full bg-wine-950", frameClassName)}>
        <div className="absolute inset-2.5 overflow-hidden sm:inset-3">
          <Image
            src={src}
            alt="Полина Олитто"
            fill
            priority={priority}
            sizes={sizes}
            className="object-cover"
            style={{ objectPosition }}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(250,246,240,0.28)]"
          />
        </div>
      </div>
    </figure>
  );
}

function LogoMarquee() {
  const sequence = Array.from({ length: 4 }, () => about.logos).flat();

  return (
    <div
      className="marquee relative z-10 mt-16 w-full overflow-hidden border-y border-wine-700/15 py-7 sm:mt-20 sm:py-8"
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
    <section id="practice" className="relative overflow-hidden bg-cream-50 py-24 sm:py-32 lg:py-40">
      <Atmosphere variant="practice" />
      <div className="relative z-10 mx-auto w-full max-w-[1120px] px-5 sm:px-8">
        <div className="grid items-stretch gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-wine-700">
              {about.label}
            </p>
            <span className="mt-5 block h-px w-10 bg-gold-400" />
            <RevealLines
              lines={about.title}
              className="mt-6 font-serif text-[2.5rem] leading-[1.05] tracking-[-0.02em] text-ink-900 sm:text-6xl lg:text-7xl"
            />
            <FadeIn className="mt-8 max-w-xl" delay={0.1}>
              <p className="font-serif text-[1.75rem] leading-[1.3] text-wine-800 italic sm:text-[2rem]">
                {about.lede}
              </p>
            </FadeIn>
            <FadeIn className="mt-10" delay={0.05}>
              <ul className="max-w-xl space-y-3 border-l border-gold-400/70 pl-6">
                {about.quotes.map((quote) => (
                  <li key={quote} className="font-serif text-[1.65rem] leading-snug text-ink-900 italic sm:text-[1.85rem]">
                    «{quote}»
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
          <Portrait
            src={portraitSeated}
            priority
            sizes="(min-width: 1024px) 420px, 100vw"
            objectPosition="center 22%"
            className="h-full min-h-[28rem]"
            frameClassName="min-h-[28rem]"
          />
        </div>

        <div className="mt-16 rounded-[1.75rem] bg-cream-100 px-6 py-8 sm:mt-20 sm:px-10 sm:py-10">
          <div className="grid gap-8 lg:grid-cols-[14rem_1fr] lg:gap-12">
            <h3 className="font-serif text-[2rem] leading-tight text-ink-900">{about.behindLabel}</h3>
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

        <div className="mt-16 grid items-center gap-10 sm:mt-20 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
          <div>
            <p
              className="font-serif text-[clamp(5.5rem,12vw,8rem)] leading-[0.82] text-gold-400"
              aria-label={`${about.years}+ ${about.yearsLabel}`}
            >
              <YearCounter />
              <span aria-hidden>+</span>
            </p>
            <p className="mt-6 max-w-md font-serif text-[1.75rem] leading-snug text-ink-900 sm:text-[2rem]">
              {about.yearsLabel}
            </p>
          </div>
          <Portrait
            src={portraitQuiet}
            sizes="(min-width: 1024px) 380px, 80vw"
            objectPosition="center 18%"
            className="mx-auto w-full max-w-sm lg:mx-0 lg:max-w-none lg:justify-self-end"
            frameClassName="aspect-[4/5]"
          />
        </div>
      </div>

      <LogoMarquee />

      <div className="relative z-10 mt-16 border-y border-wine-700/10 bg-cream-100/80 py-14 sm:mt-20 sm:py-16">
        <FadeIn className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <p className="font-serif text-[1.85rem] leading-snug text-ink-900 italic sm:text-[2.35rem]">
            {about.partnersLead}
          </p>
          <ul className="mt-8 flex flex-wrap items-center justify-center">
            {about.partnersRoles.map((role, index) => (
              <li key={role} className="flex items-center font-serif text-[1.15rem] text-wine-800 sm:text-[1.3rem]">
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
