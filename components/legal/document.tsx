import Link from "next/link";
import type { LegalBlock } from "@/lib/legal-documents";

export function LegalDocument({ title, blocks }: { title: string; blocks: LegalBlock[] }) {
  return (
    <main className="bg-cream-50 text-ink-900">
      <article className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
        <Link
          href="/"
          className="text-[12px] font-medium uppercase tracking-[0.08em] text-wine-700 transition-colors hover:text-gold-400"
        >
          На главную
        </Link>
        <h1 className="mt-8 font-serif text-[2.2rem] leading-[1.1] tracking-[-0.03em] text-ink-900 sm:text-5xl">
          {title}
        </h1>
        <div className="mt-8 space-y-4 text-[1.02rem] leading-[1.7]">
          {blocks.map((block, index) => {
            if (block.kind === "h2") {
              return (
                <h2
                  key={index}
                  className="pt-5 font-serif text-[1.45rem] leading-snug tracking-[-0.02em] text-ink-900 sm:text-[1.65rem]"
                >
                  {block.text}
                </h2>
              );
            }
            if (block.kind === "list") {
              return (
                <ul key={index} className="list-disc space-y-1 pl-5 text-ink-900">
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={index} className={block.kind === "note" ? "text-ink-500" : "text-ink-900"}>
                {block.text}
              </p>
            );
          })}
        </div>
      </article>
    </main>
  );
}
