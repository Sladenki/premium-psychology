import { contact, footer } from "@/lib/content";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-wine-800 text-cream-50">
      <div className="mx-auto grid w-full max-w-[1120px] gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.3fr_0.8fr_1.1fr_0.9fr] lg:gap-10 lg:py-24">
        <div>
          <p className="font-serif text-[2rem] leading-tight tracking-[-0.02em] sm:text-[2.35rem]">
            Олитто и партнёры
          </p>
          <p className="mt-4 max-w-[16rem] text-[1.05rem] leading-snug text-cream-100/80">
            {footer.tagline}
          </p>
        </div>

        <div>
          <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-gold-400">
            {footer.contactsLabel}
          </p>
          <ul className="mt-5 space-y-3 text-[1.05rem]">
            <li>
              <a className="transition-colors duration-300 hover:text-gold-400" href={contact.telegram}>
                Telegram
              </a>
            </li>
            <li>
              <a className="transition-colors duration-300 hover:text-gold-400" href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-gold-400">
            {footer.documentsLabel}
          </p>
          <ul className="mt-5 space-y-3 text-[1.05rem] leading-snug">
            {footer.documents.map((item) => (
              <li key={item.href}>
                <a className="transition-colors duration-300 hover:text-gold-400" href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-gold-400">
            {footer.detailsLabel}
          </p>
          <ul className="mt-5 space-y-3 text-[1.05rem] leading-snug text-cream-100/80">
            {footer.details.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-cream-50/10">
        <div className="mx-auto w-full max-w-[1120px] px-5 py-6 text-[13px] text-cream-100/60 sm:px-8">
          <p>© {year} Олитто и партнёры</p>
        </div>
      </div>
    </footer>
  );
}
