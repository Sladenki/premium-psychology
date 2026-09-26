import { process } from "@/lib/content";
import { Atmosphere } from "@/components/ui/atmosphere";
import { FadeIn, RevealLines } from "@/components/ui/reveal";

export function Process() {
  return (
    <section id="method" className="relative overflow-hidden bg-cream-100 py-16 sm:py-28 lg:py-40">
      <Atmosphere variant="method" />
      <div className="relative z-10 mx-auto w-full max-w-[1120px] px-5 sm:px-8">
        <RevealLines
          lines={process.title}
          className="font-serif text-[2.15rem] leading-[1.05] tracking-[-0.02em] text-ink-900 sm:text-6xl"
        />

        <ol className="mt-14 grid items-stretch gap-5 sm:mt-16 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-6">
          {process.steps.map((step, index) => (
            <FadeIn
              key={step.number}
              as="li"
              delay={index * 0.06}
              className="flex h-full flex-col rounded-[1.35rem] border border-wine-700/15 bg-cream-50 px-5 pt-6 pb-7 shadow-[0_28px_50px_-36px_rgba(42,10,18,0.55)] sm:rounded-[1.6rem] sm:px-7 sm:pt-8 sm:pb-9"
            >
              <span className="font-serif text-[2.6rem] leading-none lining-nums text-gold-400">
                {step.number}
              </span>
              <h3 className="mt-6 font-serif text-[1.4rem] leading-[1.25] tracking-[-0.02em] text-ink-900 lg:min-h-[7.4rem] lg:text-[1.35rem] xl:min-h-[8rem] xl:text-[1.45rem]">
                {step.title}
              </h3>
              <span className="mt-6 block h-px w-10 bg-gold-400" aria-hidden />
              <p className="mt-5 text-[1.05rem] leading-[1.75] text-ink-900">{step.text}</p>
            </FadeIn>
          ))}
        </ol>
      </div>
    </section>
  );
}
