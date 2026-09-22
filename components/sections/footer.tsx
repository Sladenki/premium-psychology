import { contact, footer } from "@/lib/content";

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path
        fill="currentColor"
        d="M20.7 4.3 2.9 11.2c-1.2.5-1.2 1.2-.2 1.5l4.6 1.4 1.8 5.4c.2.6.1.9.7.9.4 0 .6-.2.8-.4l2.6-2.5 4.6 3.4c.8.5 1.5.2 1.7-.8l3.1-14.6c.3-1.2-.4-1.7-1.9-1.2ZM8.2 13.7l9.4-5.9c.4-.3.8-.1.5.2l-8 7.2-.3 3.3-1.6-4.8Z"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        d="M3.5 6.5h17v11h-17z"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        d="m4 7 8 6 8-6"
      />
    </svg>
  );
}

const socialClass =
  "inline-flex h-11 w-11 items-center justify-center border border-gold-400/80 text-gold-400 transition-colors duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] hover:bg-gold-400 hover:text-wine-950";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-wine-800 text-cream-50">
      <div className="mx-auto grid w-full max-w-[1120px] gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[1.4fr_1fr] lg:py-24">
        <div>
          <p className="font-serif text-[2.75rem] leading-none tracking-[-0.02em] sm:text-6xl">
            Олитто
          </p>
          <p className="mt-3 text-[13px] font-medium uppercase tracking-[0.14em] text-cream-100/80">
            и партнёры
          </p>
          <p className="mt-8 max-w-md text-[1.0625rem] leading-[1.7] text-cream-100/80">
            {footer.lede}
          </p>
        </div>
        <div className="lg:justify-self-end">
          <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-gold-400">
            Контакты
          </p>
          <ul className="mt-6 space-y-4 text-[1.0625rem]">
            <li>
              <a className="transition-colors duration-300 hover:text-gold-400" href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
            </li>
            <li>
              <a className="transition-colors duration-300 hover:text-gold-400" href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}>
                {contact.phone}
              </a>
            </li>
          </ul>
          <div className="mt-8 flex gap-3">
            <a href={contact.telegram} className={socialClass} aria-label="Telegram">
              <TelegramIcon />
            </a>
            <a href={`mailto:${contact.email}`} className={socialClass} aria-label="Написать на почту">
              <MailIcon />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-cream-50/10">
        <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-3 px-5 py-6 text-[13px] leading-relaxed text-cream-100/60 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            © {year} Олитто и партнёры
          </p>
          <p>{footer.legal}</p>
        </div>
      </div>
    </footer>
  );
}
