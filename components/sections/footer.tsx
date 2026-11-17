import { contact, footer } from "@/lib/content";

function Icon({ name }: { name: "telegram" | "max" | "linkedin" | "email" }) {
  if (name === "telegram") {
    return (
      <svg viewBox="0 0 24 24" className="h-[1.35rem] w-[1.35rem]" aria-hidden>
        <path
          fill="currentColor"
          d="M21.6 4.2 18.4 19.4c-.2 1-.8 1.3-1.7.8l-4.6-3.4-2.2 2.1c-.2.3-.5.5-.9.5l.3-4.7 8.6-7.8c.4-.3-.1-.5-.6-.2L6.5 13.1 2 11.7c-1-.3-1-.9.2-1.4L20.2 3.2c.8-.3 1.6.2 1.4 1z"
        />
      </svg>
    );
  }
  if (name === "max") {
    return (
      <svg viewBox="0 0 24 24" className="h-[1.2rem] w-[1.2rem]" aria-hidden>
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
          strokeLinecap="round"
          d="M5 18V6l7 7 7-7v12"
        />
      </svg>
    );
  }
  if (name === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" className="h-[1.2rem] w-[1.2rem]" aria-hidden>
        <path
          fill="currentColor"
          d="M6.7 9.2H4.1V20h2.6V9.2zM5.4 4.1C4.5 4.1 3.8 4.8 3.8 5.7s.7 1.6 1.6 1.6 1.6-.7 1.6-1.6-.7-1.6-1.6-1.6zM20 20h-2.6v-5.8c0-1.6-.6-2.6-2-2.6-1 0-1.6.7-1.9 1.4-.1.2-.1.6-.1.9V20H10.8s.1-9.4 0-10.4h2.6v1.7c.4-.6 1.2-1.9 3.1-1.9 2.2 0 3.5 1.4 3.5 4.5V20z"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-[1.25rem] w-[1.25rem]" aria-hidden>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        d="M4 7.5h16v10H4z"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        d="m4.5 8 7.5 6 7.5-6"
      />
    </svg>
  );
}

const channels = [
  { label: "Telegram", href: contact.telegram, external: true, icon: "telegram" },
  { label: "MAX", href: contact.max, external: true, icon: "max" },
  { label: "LinkedIn", href: contact.linkedin, external: true, icon: "linkedin" },
  { label: "Email", href: `mailto:${contact.email}`, external: false, icon: "email" },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contacts" className="scroll-mt-24 bg-wine-800 text-cream-50">
      <div className="mx-auto grid w-full max-w-[1120px] items-center gap-8 px-5 py-10 sm:px-8 sm:py-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12">
        <div className="min-w-0">
          <p className="font-serif text-[1.85rem] leading-[1.05] tracking-[-0.02em] sm:text-[2.2rem]">
            {footer.brand}
          </p>
          <p className="mt-3 max-w-[28rem] text-[0.95rem] leading-snug text-cream-100/80">
            {footer.tagline}
          </p>
        </div>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4 sm:gap-x-7">
          {channels.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="flex flex-col items-center gap-2 text-gold-400 transition-colors duration-300 hover:text-cream-50"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold-400">
                  <Icon name={item.icon} />
                </span>
                <span className="text-[11px] font-medium uppercase tracking-[0.08em]">{item.label}</span>
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
