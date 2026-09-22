"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { hero } from "@/lib/content";
import { EXPO } from "@/lib/easing";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { RevealLines } from "@/components/ui/reveal";

const blobA = [
  "M300 90C430 40 570 70 650 170C740 280 720 400 620 480C510 570 340 560 230 490C110 410 90 270 150 170C200 90 230 110 300 90Z",
  "M280 120C410 50 590 100 660 200C740 310 690 430 580 500C460 580 300 540 200 460C90 370 120 230 180 150C220 100 220 150 280 120Z",
  "M320 70C470 80 580 40 650 150C730 270 750 410 640 500C520 600 340 530 230 470C110 400 80 250 160 160C210 100 240 50 320 70Z",
  "M300 90C430 40 570 70 650 170C740 280 720 400 620 480C510 570 340 560 230 490C110 410 90 270 150 170C200 90 230 110 300 90Z",
];

const blobB = [
  "M340 140C450 90 560 120 620 210C690 310 660 400 570 450C470 510 350 500 270 440C180 370 190 270 240 190C280 130 290 160 340 140Z",
  "M320 160C440 100 580 140 640 230C710 330 650 430 560 480C450 540 320 510 250 450C160 370 170 250 230 180C270 140 270 180 320 160Z",
  "M360 120C480 110 570 80 630 190C700 300 710 420 590 470C470 530 340 490 260 440C170 380 160 260 230 180C280 120 300 100 360 120Z",
  "M340 140C450 90 560 120 620 210C690 310 660 400 570 450C470 510 350 500 270 440C180 370 190 270 240 190C280 130 290 160 340 140Z",
];

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

function HeroBlob() {
  const reduce = useReducedMotion();

  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 800 640"
      className="pointer-events-none absolute -right-[18%] top-[8%] z-0 w-[150%] max-w-none opacity-50 sm:w-[120%] lg:right-[-6%] lg:top-[4%] lg:w-[760px] lg:opacity-80"
      animate={reduce ? undefined : { rotate: [0, 4, -2, 0], y: [0, -16, 8, 0] }}
      transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
    >
      <motion.path
        fill="#6B1B2B"
        fillOpacity="0.55"
        d={blobA[0]}
        animate={reduce ? undefined : { d: blobA }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      />
      <motion.path
        fill="none"
        stroke="#C9A227"
        strokeOpacity="0.55"
        strokeWidth="1.25"
        d={blobB[0]}
        animate={reduce ? undefined : { d: blobB }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
      />
    </motion.svg>
  );
}

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden bg-wine-950 text-cream-50">
      <Curtain />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_78%_42%,rgba(107,27,43,0.62),transparent_58%)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-wine-950 from-35% via-wine-950/80 to-transparent" />
      <HeroBlob />
      <svg
        aria-hidden
        className="pointer-events-none absolute bottom-[12%] -left-10 z-0 h-64 w-64 text-gold-400/25 sm:h-80 sm:w-80"
        viewBox="0 0 200 200"
        fill="none"
      >
        <circle cx="78" cy="104" r="58" stroke="currentColor" strokeWidth="0.7" />
        <circle cx="122" cy="92" r="34" stroke="currentColor" strokeWidth="0.7" />
      </svg>
      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1120px] flex-col justify-center px-5 pt-32 pb-16 sm:px-8 lg:pt-28 lg:pb-20">
        <h1 className="max-w-[18ch] sm:max-w-none">
          <RevealLines
            as="span"
            play="load"
            delay={0.46}
            lines={hero.titleMobile}
              className="font-serif text-[2rem] leading-[1.05] font-medium tracking-[-0.03em] text-cream-50 sm:text-[2.45rem] lg:hidden"
          />
          <RevealLines
            as="span"
            play="load"
            delay={0.46}
            lines={hero.titleDesktop}
              className="hidden font-serif text-[2.85rem] leading-[1.02] font-medium tracking-[-0.035em] text-cream-50 lg:block xl:text-[3.45rem]"
          />
        </h1>
        <motion.div
          className="mt-8 max-w-xl sm:mt-10"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.05, ease: EXPO }}
        >
          <p className="font-sans text-[1.35rem] leading-snug text-cream-100 italic sm:text-[1.5rem]">
            {hero.subtitle}
          </p>
          <p className="mt-5 text-[1.0625rem] leading-[1.7] text-cream-50/72">{hero.lead}</p>
          <div className="mt-8">
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
