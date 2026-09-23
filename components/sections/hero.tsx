"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { hero } from "@/lib/content";
import { EXPO } from "@/lib/easing";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { RevealLines } from "@/components/ui/reveal";

function Curtain() {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);

  if (reduce || done) return null;

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
    <section id="top" className="relative min-h-[100svh] overflow-hidden bg-wine-950 text-cream-50">
      <Curtain />
      <HeroField />
      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1120px] flex-col justify-center px-5 pt-32 pb-16 sm:px-8 lg:pt-28 lg:pb-20">
        <h1>
          <RevealLines
            as="span"
            play="load"
            delay={0.46}
            lines={hero.titleMobile.slice(0, 2)}
            className="font-serif text-[2rem] leading-[1.05] font-medium tracking-[-0.03em] text-cream-50 sm:text-[2.4rem] lg:hidden"
          />
          <RevealLines
            as="span"
            play="load"
            delay={0.58}
            lines={hero.titleMobile.slice(2, 4)}
            className="font-sans text-[2.15rem] leading-[1.08] text-cream-100 italic sm:text-[2.65rem] lg:hidden"
          />
          <RevealLines
            as="span"
            play="load"
            delay={0.72}
            lines={hero.titleMobile.slice(4)}
            className="font-serif text-[2rem] leading-[1.05] font-medium tracking-[-0.03em] text-cream-50 sm:text-[2.4rem] lg:hidden"
          />
          <RevealLines
            as="span"
            play="load"
            delay={0.46}
            lines={[hero.titleDesktop[0]]}
            className="hidden font-serif text-[2.7rem] leading-[1.02] font-medium tracking-[-0.035em] text-cream-50 lg:block xl:text-[3.35rem]"
          />
          <RevealLines
            as="span"
            play="load"
            delay={0.56}
            lines={[hero.titleDesktop[1]]}
            className="mt-1 hidden font-sans text-[2.5rem] leading-[1.08] text-cream-100 italic lg:block xl:text-[3.15rem]"
          />
          <RevealLines
            as="span"
            play="load"
            delay={0.66}
            lines={[hero.titleDesktop[2]]}
            className="hidden font-serif text-[2.7rem] leading-[1.02] font-medium tracking-[-0.035em] text-cream-50 lg:block xl:text-[3.35rem]"
          />
        </h1>
        <motion.div
          className="mt-10 max-w-3xl border-l border-gold-400/70 pl-5 sm:mt-12 sm:pl-6"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.05, ease: EXPO }}
        >
          <p className="font-sans text-[1.25rem] leading-snug text-cream-50 italic sm:text-[1.45rem]">
            {hero.subtitle}
          </p>
          <div className="mt-6 flex flex-col gap-6 sm:mt-7 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
            <p className="max-w-md text-[1.02rem] leading-[1.7] text-cream-50/70">{hero.lead}</p>
            <MagneticButton href="#contact" variant="gold">
              {hero.cta}
            </MagneticButton>
          </div>
        </motion.div>
      </div>
      <div className="absolute inset-x-0 bottom-0 z-10 h-px bg-gold-400/50" />
    </section>
  );
}
