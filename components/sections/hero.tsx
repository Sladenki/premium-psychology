"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { hero } from "@/lib/content";
import { EXPO } from "@/lib/easing";
import { RevealLines } from "@/components/ui/reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";

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
      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1120px] flex-col justify-center px-5 pt-28 pb-14 sm:px-8 sm:pt-32 sm:pb-16 lg:pt-28 lg:pb-20">
        <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-gold-400">
          {hero.kicker}
        </p>
        <h1 className="mt-6">
          <RevealLines
            as="span"
            play="load"
            delay={0.46}
            lines={[hero.aside]}
            className="font-sans text-[1.45rem] leading-[1.15] text-cream-100 italic sm:text-[1.85rem] lg:text-[2.15rem]"
          />
          <RevealLines
            as="span"
            play="load"
            delay={0.58}
            lines={[hero.title[0]]}
            className="mt-3 font-serif text-[2.35rem] leading-[1.02] font-medium tracking-[-0.035em] text-cream-50 sm:text-[3.4rem] lg:text-[4.25rem] xl:text-[4.75rem]"
          />
          <RevealLines
            as="span"
            play="load"
            delay={0.7}
            lines={[hero.title[1]]}
            className="font-sans text-[2.15rem] leading-[1.08] text-cream-100 italic sm:text-[3.05rem] lg:text-[3.7rem] xl:text-[4.15rem]"
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
          <MagneticButton href="#contact" variant="gold" className="mt-8">
            {hero.screenCta}
          </MagneticButton>
        </motion.div>
      </div>
      <div className="absolute inset-x-0 bottom-0 z-10 h-px bg-gold-400/50" />
    </section>
  );
}
