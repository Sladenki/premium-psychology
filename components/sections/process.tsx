"use client";

import { process } from "@/lib/content";
import { Atmosphere } from "@/components/ui/atmosphere";
import { FadeIn } from "@/components/ui/reveal";

export function Process() {
  return (
    <section
      id="method"
      className="relative overflow-hidden bg-cream-100 pt-10 pb-12 sm:pt-12 sm:pb-14 lg:pt-14 lg:pb-16"
    >
      <Atmosphere variant="method" />
      <div className="relative z-10 mx-auto w-full max-w-[1120px] px-5 sm:px-8">
        <h2 className="max-w-[12ch] font-serif text-[2.75rem] leading-[1.02] tracking-[-0.03em] text-ink-900 sm:text-[3.5rem] lg:text-[3.75rem]">
          {process.title[0]}
        </h2>

        <ol className="mt-12 grid gap-x-14 gap-y-10 border-t border-wine-700/10 pt-10 sm:mt-16 sm:gap-y-14 sm:pt-14 lg:grid-cols-2 lg:gap-x-20">
          {process.steps.map((step, index) => (
            <FadeIn key={step.number} as="li" delay={index * 0.07} className="min-w-0">
              <div className="flex gap-5 sm:gap-7">
                <span
                  className="shrink-0 font-serif text-[2.35rem] leading-none tracking-[-0.03em] text-gold-400 lining-nums sm:text-[2.85rem]"
                  aria-hidden
                >
                  {step.number}
                </span>
                <div className="min-w-0 pt-1.5">
                  <h3 className="text-[1.2rem] leading-[1.25] font-medium tracking-[-0.02em] text-ink-900 sm:text-[1.4rem]">
                    <span className="sr-only">{step.number}. </span>
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-[32rem] text-[1.02rem] leading-[1.65] text-ink-500 sm:mt-3.5 sm:text-[1.05rem]">
                    {step.text}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </ol>
      </div>
    </section>
  );
}
