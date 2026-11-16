import { path } from "@/lib/content";

export function Path() {
  return (
    <section aria-label="Что происходит с задачей" className="bg-cream-50">
      <div className="mx-auto w-full max-w-[1120px] px-5 py-8 sm:px-8 sm:py-10 lg:py-16">
        <ol className="lg:grid lg:grid-cols-3 lg:gap-8">
          {path.steps.map((step, index) => (
            <li
              key={step.number}
              className="grid grid-cols-[2.4rem_minmax(0,1fr)] items-start gap-x-3 py-4 first:pt-0 last:pb-0 max-lg:[&:not(:first-child)]:border-t max-lg:[&:not(:first-child)]:border-wine-700/10 lg:block lg:py-0"
            >
              <div className="flex items-center lg:gap-3">
                <span className="pt-0.5 font-serif text-[1.05rem] leading-none text-gold-400 lining-nums lg:pt-0 lg:text-[1.15rem]">
                  {step.number}
                </span>
                {index < path.steps.length - 1 ? (
                  <span aria-hidden className="hidden h-px flex-1 bg-gold-400/45 lg:block" />
                ) : null}
              </div>
              <div className="min-w-0 lg:mt-3">
                <h2 className="text-[1.02rem] leading-snug font-medium text-ink-900 sm:text-[1.08rem] lg:max-w-[20ch] lg:text-[1.15rem]">
                  {step.title}
                </h2>
                <p className="mt-1.5 text-[0.95rem] leading-snug text-ink-500 sm:text-[1rem] lg:max-w-[34ch]">
                  {step.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
