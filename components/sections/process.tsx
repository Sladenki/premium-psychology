"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";
import { process } from "@/lib/content";
import { Atmosphere } from "@/components/ui/atmosphere";
import { RevealLines } from "@/components/ui/reveal";

function StepMarker({
  progress,
  index,
  total,
  number,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
  number: string;
}) {
  const at = index / (total - 1);
  const from = index === 0 ? 0 : at - 0.08;
  const to = index === 0 ? 0.08 : at;
  const opacity = useTransform(progress, [from, to], [0.3, 1]);
  const scale = useTransform(progress, [from, to], [0.86, 1]);

  return (
    <motion.div
      style={{ opacity, scale }}
      className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-gold-400/80 bg-cream-100 font-serif text-[1.15rem] leading-none lining-nums text-gold-400 sm:h-16 sm:w-16 sm:text-[1.35rem]"
    >
      {number}
    </motion.div>
  );
}

function TimelineLine({
  progress,
  orientation,
}: {
  progress: MotionValue<number>;
  orientation: "vertical" | "horizontal";
}) {
  const vertical = orientation === "vertical";

  return (
    <div
      aria-hidden
      className={
        vertical
          ? "pointer-events-none absolute top-7 bottom-10 left-7 w-px -translate-x-1/2 sm:top-8 sm:left-8"
          : "pointer-events-none absolute top-8 right-[10%] left-[10%] h-px -translate-y-1/2"
      }
    >
      <svg
        className={vertical ? "h-full w-px overflow-visible" : "h-px w-full overflow-visible"}
        viewBox={vertical ? "0 0 1 100" : "0 0 100 1"}
        preserveAspectRatio="none"
      >
        <motion.path
          d={vertical ? "M0.5 0 V100" : "M0 0.5 H100"}
          fill="none"
          stroke="#C9A227"
          strokeWidth="1"
          style={{ pathLength: progress }}
        />
      </svg>
    </div>
  );
}

export function Process() {
  const scope = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: scope,
    offset: ["start 78%", "start 42%"],
  });
  const full = useTransform(scrollYProgress, () => 1);
  const progress = reduce ? full : scrollYProgress;
  const steps = process.steps;

  return (
    <section id="method" className="relative overflow-hidden bg-cream-100 py-24 sm:py-32 lg:py-40">
      <Atmosphere variant="method" />
      <div className="relative z-10 mx-auto w-full max-w-[1120px] px-5 sm:px-8">
        <RevealLines
          lines={process.title}
          className="font-serif text-[2.5rem] leading-[1.05] tracking-[-0.02em] text-ink-900 sm:text-6xl"
        />

        <div ref={scope} className="relative mt-16 lg:mt-24">
          <div className="lg:hidden">
            <TimelineLine progress={progress} orientation="vertical" />
            <ol>
              {steps.map((step, index) => (
                <li
                  key={step.number}
                  className="grid grid-cols-[56px_minmax(0,1fr)] items-center gap-4 pb-10 last:pb-0 sm:grid-cols-[64px_minmax(0,1fr)] sm:gap-8 sm:pb-12"
                >
                  <StepMarker
                    progress={progress}
                    index={index}
                    total={steps.length}
                    number={step.number}
                  />
                  <h3 className="min-w-0 font-sans text-[1.35rem] leading-snug font-medium text-ink-900 sm:text-[1.55rem]">
                    {step.title}
                  </h3>
                </li>
              ))}
            </ol>
          </div>

          <div className="relative hidden lg:block">
            <TimelineLine progress={progress} orientation="horizontal" />
            <ol className="grid grid-cols-5 gap-6">
              {steps.map((step, index) => (
                <li key={step.number} className="flex min-w-0 flex-col items-center text-center">
                  <StepMarker
                    progress={progress}
                    index={index}
                    total={steps.length}
                    number={step.number}
                  />
                  <h3 className="mt-7 max-w-[11rem] font-sans text-[1.05rem] leading-snug font-medium text-ink-900">
                    {step.title}
                  </h3>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
