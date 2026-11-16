"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import portraitQuiet from "../../photos/ph3.jpg";
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
  const [value, setValue] = useState(about.years);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, about.years, {
      duration: 1.35,
      ease: EXPO,
      onUpdate: (latest) => setValue(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, reduce]);

  return (
    <span ref={ref} className="font-serif leading-none text-gold-400" aria-hidden>
      {value}
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
    <figure
      className={cn(
        "overflow-hidden rounded-[1.75rem] border border-wine-700/10",
        className,
      )}
    >
      <div className="relative aspect-[4/5]">
        <Image
          src={src}
          alt="Олитто Полина"
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
  return (
    <div className="relative z-10 mt-8 sm:mt-10">
      <ul className="sr-only">
        {about.logos.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
      <div className="marquee w-full overflow-hidden border-y border-wine-700/15 py-6 sm:py-7" aria-hidden>
        <div className="marquee-track flex w-max">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex items-center">
              {about.logos.map((name) => (
                <li key={`${copy}-${name}`} className="flex items-center">
                  <span className="px-8 text-[13px] font-medium uppercase tracking-[0.16em] text-ink-500 sm:px-12 sm:text-sm sm:tracking-[0.18em]">
                    {name}
                  </span>
                  <span className="h-1 w-1 shrink-0 rounded-full bg-gold-400" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AboutSituations() {
  return (
    <section id="practice" className="relative overflow-hidden bg-cream-50 pt-8 pb-6 sm:pt-12 sm:pb-8 lg:pt-14">
      <Atmosphere variant="practice" />
      <div className="relative z-10 mx-auto w-full max-w-[1120px] px-5 sm:px-8">
        <div>
          <h2 className="max-w-[22ch] font-serif text-[1.7rem] leading-[1.08] tracking-[-0.02em] text-ink-900 sm:text-[2.85rem] lg:text-[3.35rem]">
            {about.lede}
          </h2>
          <FadeIn className="mt-8 max-w-3xl" delay={0.1}>
            <p className="max-w-2xl font-sans text-[1.15rem] leading-snug text-wine-800/80 italic sm:text-[1.3rem]">
              {about.ledeMore}
            </p>
          </FadeIn>
          <FadeIn className="mt-8 sm:mt-10" delay={0.05}>
            <ul className="max-w-3xl space-y-3 border-l border-gold-400/70 pl-6 sm:space-y-4">
              {about.quotes.map((quote) => (
                <li key={quote} className="font-sans text-[1.08rem] leading-snug text-ink-900 italic sm:text-[1.28rem]">
                  {quote}
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
    <section className="relative overflow-hidden bg-cream-50 pt-12 pb-16 sm:pt-16 sm:pb-24 lg:pb-28">
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
    <section id="about" className="relative scroll-mt-24 overflow-hidden bg-cream-50 pt-10 pb-12 sm:pt-14 sm:pb-16">
      <Atmosphere variant="founder" />
      <div className="relative z-10 mx-auto w-full max-w-[1120px] px-5 sm:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:gap-14 xl:gap-20">
          <FadeIn className="order-2 mx-auto w-full max-w-[22rem] sm:max-w-[26rem] lg:order-1 lg:mx-0 lg:max-w-none" delay={0.08}>
            <Portrait
              src={portraitQuiet}
              sizes="(min-width: 1024px) 480px, (min-width: 640px) 420px, 90vw"
              objectPosition="center 22%"
            />
          </FadeIn>

          <div className="order-1 min-w-0 lg:order-2">
            <div>
              <p className="font-serif text-[clamp(4.25rem,9vw,6.25rem)] leading-[0.85] text-gold-400">
                <span className="sr-only">{about.years}+</span>
                <YearCounter />
                <span aria-hidden>+</span>
              </p>
              <p className="mt-4 max-w-[12ch] font-serif text-[1.45rem] leading-[1.15] text-ink-900 sm:text-[1.65rem]">
                {about.yearsLabel}
              </p>
            </div>

            <div className="mt-7 h-px max-w-[8rem] bg-gold-400 sm:mt-9" aria-hidden />

            <h3 className="mt-7 font-serif text-[2rem] leading-[1.05] tracking-[-0.02em] text-ink-900 sm:mt-9 sm:text-[2.55rem]">
              {about.founder.name}
            </h3>
            <p className="mt-3 max-w-[34rem] text-[0.98rem] leading-snug text-wine-700 sm:text-[1.05rem]">
              {about.founder.role}
            </p>

            <div className="mt-6 max-w-[34rem] space-y-4 text-[1rem] leading-[1.7] text-ink-500 sm:mt-7 sm:text-[1.05rem]">
              {about.founder.bio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <p className="mt-7 max-w-[34rem] border-t border-wine-700/10 pt-5 text-[0.8125rem] font-semibold leading-snug text-ink-500 sm:mt-8 sm:text-[0.875rem]">
              <span className="text-ink-900">{about.founder.experienceLabel}:</span>{" "}
              {about.founder.companies.join(" · ")}
            </p>
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

      <div className="relative z-10 mx-auto mt-8 mb-4 w-full max-w-[1120px] px-5 sm:mt-10 sm:mb-6 sm:px-8">
        <FadeIn className="rounded-[1.75rem] bg-cream-100 px-6 py-9 text-center sm:px-10 sm:py-11 lg:px-14 lg:py-12">
          <h2 className="mx-auto max-w-[18ch] font-serif text-[1.7rem] leading-[1.15] tracking-[-0.02em] text-ink-900 sm:text-[2.2rem]">
            {about.partnersLead}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[1.05rem] leading-[1.75] text-ink-500 sm:text-[1.08rem]">
            {about.partnersBody}
          </p>
          <p className="mx-auto mt-5 max-w-xl font-sans text-[1.15rem] leading-snug text-wine-800 italic sm:text-[1.25rem]">
            {about.partnersClose}
          </p>
          <ul className="mx-auto mt-7 flex max-w-2xl flex-wrap justify-center gap-2">
            {about.expertise.map((item) => (
              <li
                key={item}
                className="rounded-full border border-wine-700/15 bg-cream-50 px-3.5 py-1.5 text-[12.5px] leading-snug text-ink-900 sm:text-[13px]"
              >
                {item}
              </li>
            ))}
          </ul>
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
      <AboutFounder />
      <AboutSystem />
      <AboutPartners />
    </>
  );
}
