import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Согласие на обработку персональных данных",
  robots: { index: false, follow: false },
};

export default function ConsentPage() {
  return (
    <main className="mx-auto min-h-full w-full max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
      <Link
        href="/"
        className="text-[12px] font-medium uppercase tracking-[0.08em] text-wine-700 transition-colors hover:text-gold-400"
      >
        На главную
      </Link>
      <h1 className="mt-8 font-serif text-[2.2rem] leading-[1.1] tracking-[-0.03em] text-ink-900 sm:text-5xl">
        Согласие на обработку персональных данных
      </h1>
      <p className="mt-6 max-w-2xl text-[1.05rem] leading-[1.7] text-ink-500">
        Текст документа будет опубликован на этой странице после завершения юридической части.
      </p>
    </main>
  );
}
