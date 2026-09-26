import { footer } from "@/lib/content";
import { MagneticButton } from "@/components/ui/magnetic-button";

export function Discuss() {
  return (
    <section className="bg-wine-950 text-cream-50">
      <div className="mx-auto flex min-h-[52svh] w-full max-w-[1120px] flex-col justify-center px-5 py-16 sm:min-h-[70svh] sm:px-8 sm:py-32">
        <h2 className="max-w-3xl font-serif text-[2.35rem] leading-[1.08] tracking-[-0.03em] sm:text-6xl lg:text-7xl">
          {footer.ctaTitle}
        </h2>
        <p className="mt-6 max-w-md text-[1.08rem] leading-[1.7] text-cream-100/75">{footer.ctaLede}</p>
        <MagneticButton href="#contact" variant="gold" className="mt-10">
          {footer.ctaTitle}
        </MagneticButton>
      </div>
    </section>
  );
}
