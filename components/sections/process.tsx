import { process } from "@/lib/content";

export function Process() {
  return (
    <section id="method" className="bg-cream-100 py-16 sm:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-8">
        <h2 className="font-serif text-[2.5rem] leading-[1.05] tracking-[-0.03em] text-ink-900 sm:text-[3.25rem]">
          {process.title[0]}
        </h2>
        <ol className="mt-14 grid gap-x-16 gap-y-12 sm:mt-16 lg:grid-cols-2 lg:gap-y-16">
          {process.steps.map((step) => (
            <li key={step.number} className="max-w-[34rem]">
              <span className="font-serif text-[1.05rem] leading-none text-gold-400 lining-nums">
                {step.number}
              </span>
              <h3 className="mt-3 text-[1.35rem] leading-[1.2] font-semibold tracking-[-0.02em] text-ink-900 sm:text-[1.55rem]">
                {step.title}
              </h3>
              <p className="mt-4 text-[1.02rem] leading-[1.55] text-ink-500 sm:text-[1.0625rem]">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
