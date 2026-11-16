import { contact, footer } from "@/lib/content";

const channels = [
  { label: "Telegram", href: contact.telegram, external: true },
  { label: "MAX", href: contact.max, external: true },
  { label: "LinkedIn", href: contact.linkedin, external: true },
  { label: "Email", href: `mailto:${contact.email}`, external: false },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contacts" className="scroll-mt-24 bg-wine-800 text-cream-50">
      <div className="mx-auto w-full max-w-[1120px] px-5 py-14 sm:px-8 sm:py-16">
        <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-gold-400">
          {footer.contactsLabel}
        </p>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {channels.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                {...(item.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="font-serif text-[2rem] leading-none text-gold-400 transition-colors duration-300 hover:text-cream-50 sm:text-[2.35rem]"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-cream-50/15">
        <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-3 px-5 py-5 text-[13px] leading-snug text-cream-100/75 sm:px-8 lg:flex-row lg:flex-wrap lg:items-center lg:gap-x-3 lg:gap-y-2">
          {footer.documents.map((item, index) => (
            <span key={item.href} className="contents">
              {index > 0 ? (
                <span aria-hidden className="hidden text-gold-400 lg:inline">
                  ·
                </span>
              ) : null}
              <a className="transition-colors duration-300 hover:text-gold-400" href={item.href}>
                {item.label}
              </a>
            </span>
          ))}
          <span aria-hidden className="hidden text-gold-400 lg:inline">
            ·
          </span>
          <p>© {year} Олитто и партнёры</p>
        </div>
      </div>
    </footer>
  );
}
