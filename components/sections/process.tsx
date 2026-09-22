import { process } from "@/lib/content";
import { cn } from "@/lib/cn";
import { Atmosphere } from "@/components/ui/atmosphere";
import { RevealLines } from "@/components/ui/reveal";

export function Process() {
  const steps = process.steps;

  return (
    <section id="method" className="relative overflow-hidden bg-cream-100 py-24 sm:py-32 lg:py-40">
      <Atmosphere variant="method" />
      <div className="relative z-10 mx-auto w-full max-w-[1120px] px-5 sm:px-8">
        <RevealLines
          lines={process.title}
          className="font-serif text-[2.5rem] leading-[1.05] tracking-[-0.02em] text-ink-900 sm:text-6xl"
        />

        <div className="relative mt-14 lg:mt-20">
          <div aria-hidden className="absolute top-0 right-0 left-0 hidden h-px bg-gold-400/55 lg:block" />
          <ol className="grid items-start gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-5 lg:gap-x-6 lg:pt-8">
            {steps.map((step, index) => (
              <li
                key={step.number}
                className={cn(
                  "max-w-[16rem]",
                  index % 2 === 1 && "ml-auto text-right sm:ml-0 sm:text-left",
                  index % 2 === 1 && "lg:mt-24",
                )}
              >
                <span className="font-serif text-[2.75rem] leading-none text-gold-400 lining-nums sm:text-[3.25rem]">
                  {step.number}
                </span>
                <h3 className="mt-4 font-serif text-[1.7rem] leading-[1.15] text-ink-900 sm:text-[1.85rem]">
                  {step.title}
                </h3>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
