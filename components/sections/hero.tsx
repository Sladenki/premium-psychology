"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import heroPortrait from "../../photos/ph2.jpg";
import { hero } from "@/lib/content";
import { EXPO } from "@/lib/easing";
import { RevealLines } from "@/components/ui/reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";

function Curtain() {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduce) setDone(true);
  }, [reduce]);

  if (done) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] bg-wine-950"
      initial={{ y: "0%" }}
      animate={{ y: "-100%" }}
      transition={{ duration: 0.75, ease: EXPO, delay: 0.12 }}
      onAnimationComplete={() => setDone(true)}
    />
  );
}

function HeroField() {
  const reduce = useReducedMotion();

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-24 left-[-10%] h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle,rgba(139,46,61,0.55),transparent_68%)]" />
      <div className="absolute right-[-18%] bottom-[-20%] h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(74,14,30,0.9),transparent_70%)]" />
      <motion.svg
        viewBox="0 0 640 640"
        className="absolute top-[-8%] right-[-12%] h-[140%] w-[70%] max-w-none text-gold-400/35"
        animate={reduce ? undefined : { rotate: [0, 6, 0] }}
        transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="360" cy="300" r="210" fill="none" stroke="currentColor" strokeWidth="0.6" />
        <circle cx="430" cy="250" r="120" fill="none" stroke="currentColor" strokeWidth="0.6" />
      </motion.svg>
    </div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-x-clip bg-wine-950 px-5 pt-20 pb-10 text-cream-50 sm:px-8 lg:pt-24">
      <Curtain />
      <HeroField />
      <div className="relative z-10 mx-auto grid w-full max-w-[1120px] items-center gap-5 lg:grid-cols-[minmax(0,1fr)_18.75rem] lg:gap-16">
        <div className="order-2 min-w-0 lg:order-1">
        <h1>
          <RevealLines
            as="span"
            play="load"
            delay={0.46}
            lines={[hero.aside]}
            className="-translate-y-2 font-sans text-[1.35rem] leading-[1.15] text-cream-50 italic sm:-translate-y-3 sm:text-[1.85rem] lg:text-[2rem]"
          />
          <RevealLines
            as="span"
            play="load"
            delay={0.58}
            lines={[hero.title[0]]}
            className="mt-3 font-serif text-[2.05rem] leading-[1.02] font-medium tracking-[-0.035em] text-cream-50 sm:text-[3.15rem] lg:text-[3.55rem] xl:text-[3.9rem]"
          />
          <RevealLines
            as="span"
            play="load"
            delay={0.7}
            lines={[hero.title[1]]}
            className="font-sans text-[1.9rem] leading-[1.08] text-cream-100 italic sm:text-[2.75rem] lg:text-[3.15rem] xl:text-[3.45rem]"
          />
        </h1>
        <motion.div
          className="mt-8 max-w-xl border-l border-gold-400/70 pl-5 sm:mt-10 sm:pl-6"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.05, ease: EXPO }}
        >
          <p className="max-w-lg text-[1.02rem] leading-[1.7] text-cream-50/80 sm:text-[1.12rem]">
            {hero.lead}
          </p>
          <div className="mt-8 max-w-full">
            <MagneticButton href="#contact" variant="gold" magnetic={false} className="max-w-full">
              {hero.screenCta}
            </MagneticButton>
            <p className="mt-3 text-[12px] leading-snug tracking-[0.02em] text-cream-50/55 sm:text-[13px]">
              {hero.ctaNote}
            </p>
          </div>
        </motion.div>
        </div>
        <figure className="relative order-1 aspect-square w-[8.5rem] justify-self-end overflow-hidden rounded-full sm:w-40 lg:order-2 lg:w-[18.75rem]">
          <Image
            src={heroPortrait}
            alt="Полина Олитто"
            fill
            priority
            quality={90}
            sizes="(min-width: 1024px) 300px, 160px"
            className="object-cover"
            style={{ objectPosition: "center 12%" }}
          />
        </figure>
      </div>
      <div className="absolute inset-x-0 bottom-0 z-10 h-px bg-gold-400/50" />
    </section>
  );
}
