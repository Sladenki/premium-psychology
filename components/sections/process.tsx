"use client";

import { process } from "@/lib/content";
import { Atmosphere } from "@/components/ui/atmosphere";
import { FadeIn } from "@/components/ui/reveal";

export function Process() {
  return (
    <section
      id="method"
      className="relative overflow-hidden bg-cream-100 py-8 sm:py-10 lg:py-12"
    >
      <Atmosphere variant="method" />
      <div className="relative z-10 mx-auto w-full max-w-[1120px] px-5 sm:px-8">
        <h2 className="max-w-[12ch] font-serif text-[2.4rem] leading-[1.02] tracking-[-0.03em] text-ink-900 sm:text-[3rem] lg:text-[3.25rem]">
          {process.title[0]}
        </h2>

        <ol className="mt-6 grid list-none gap-x-12 gap-y-6 border-t border-wine-700/10 pt-6 sm:mt-8 sm:gap-y-8 sm:pt-8 lg:grid-cols-2 lg:gap-x-16">
          {process.steps.map((step, index) => (
            <FadeIn key={step.number} as="li" delay={index * 0.07} className="min-w-0">
              <div className="flex gap-4 sm:gap-5">
                <span
                  className="shrink-0 font-serif text-[1.85rem] leading-none tracking-[-0.03em] text-gold-400 lining-nums sm:text-[2.15rem]"
                  aria-hidden
                >
                  {step.number}
                </span>
                <div className="min-w-0 pt-0.5">
                  <h3 className="text-[1.15rem] leading-[1.25] font-medium tracking-[-0.02em] text-ink-900 sm:text-[1.28rem]">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-[36rem] text-[0.98rem] leading-[1.5] text-ink-500 sm:text-[1.02rem]">
                    {step.text}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </ol>

        <p className="mt-6 max-w-3xl text-[0.95rem] leading-[1.55] text-ink-500 sm:mt-8">
          {process.note}
        </p>
      </div>
    </section>
  );
}
