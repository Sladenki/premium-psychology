type Variant = "practice" | "method" | "formats" | "cases" | "contact" | "faq";

export function Atmosphere({ variant = "practice" }: { variant?: Variant }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {variant === "practice" ? (
        <>
          <div className="absolute -top-56 -right-48 h-[56rem] w-[56rem] rounded-full bg-[radial-gradient(circle,rgba(107,27,43,0.11),transparent_66%)]" />
          <svg
            className="absolute -bottom-28 -left-36 h-[40rem] w-[40rem] text-wine-700/30"
            viewBox="0 0 200 200"
            fill="none"
          >
            <circle cx="78" cy="104" r="62" stroke="currentColor" strokeWidth="0.6" />
            <circle cx="124" cy="86" r="40" stroke="currentColor" strokeWidth="0.6" />
          </svg>
          <svg
            className="absolute top-[18%] right-[7%] h-80 w-80 text-gold-400/35"
            viewBox="0 0 160 160"
            fill="none"
          >
            <circle cx="80" cy="80" r="58" stroke="currentColor" strokeWidth="0.7" />
          </svg>
          <svg
            className="absolute top-[28%] -left-10 h-56 w-[34rem] text-wine-700/25"
            viewBox="0 0 340 140"
            fill="none"
          >
            <path d="M16 112C90 24 230 12 324 78" stroke="currentColor" strokeWidth="0.7" />
            <path d="M40 112C104 46 214 38 300 86" stroke="currentColor" strokeWidth="0.7" />
          </svg>
        </>
      ) : null}

      {variant === "method" ? (
        <>
          <div className="absolute -top-24 -right-40 h-[46rem] w-[46rem] rounded-full bg-[radial-gradient(circle,rgba(74,14,30,0.09),transparent_68%)]" />
          <svg
            className="absolute top-6 -left-20 h-[44rem] w-72 text-gold-400/45"
            viewBox="0 0 100 360"
            fill="none"
          >
            <path
              d="M86 8C18 70 14 150 52 210C90 270 22 310 12 352"
              stroke="currentColor"
              strokeWidth="0.8"
            />
            <circle cx="86" cy="16" r="4" stroke="currentColor" strokeWidth="0.8" />
            <circle cx="18" cy="344" r="4" stroke="currentColor" strokeWidth="0.8" />
          </svg>
        </>
      ) : null}

      {variant === "formats" ? (
        <>
          <div className="absolute -bottom-48 left-[18%] h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle,rgba(201,162,39,0.12),transparent_68%)]" />
          <svg
            className="absolute -top-16 -right-16 h-[34rem] w-[34rem] text-wine-700/25"
            viewBox="0 0 200 200"
            fill="none"
          >
            <circle cx="92" cy="108" r="70" stroke="currentColor" strokeWidth="0.55" />
            <circle cx="132" cy="78" r="36" stroke="currentColor" strokeWidth="0.55" />
          </svg>
          <svg
            className="absolute top-1/3 -left-24 h-96 w-96 text-gold-400/40"
            viewBox="0 0 200 200"
            fill="none"
          >
            <path
              d="M170 20C80 30 24 90 40 160"
              stroke="currentColor"
              strokeWidth="0.7"
            />
          </svg>
        </>
      ) : null}

      {variant === "cases" ? (
        <>
          <div className="absolute -bottom-40 -left-32 h-[48rem] w-[48rem] rounded-full bg-[radial-gradient(circle,rgba(107,27,43,0.1),transparent_67%)]" />
          <svg
            className="absolute -top-32 right-[-12%] h-[38rem] w-[38rem] text-wine-800/20"
            viewBox="0 0 200 200"
            fill="none"
          >
            <circle cx="100" cy="100" r="84" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="100" cy="100" r="58" stroke="currentColor" strokeWidth="0.5" />
          </svg>
          <svg
            className="absolute top-[42%] left-[6%] h-64 w-64 text-gold-400/40"
            viewBox="0 0 120 120"
            fill="none"
          >
            <path d="M16 96C28 40 78 18 104 28" stroke="currentColor" strokeWidth="0.9" />
            <circle cx="104" cy="28" r="3.5" stroke="currentColor" strokeWidth="0.8" />
          </svg>
        </>
      ) : null}

      {variant === "contact" ? (
        <>
          <div className="absolute -top-40 left-[-18%] h-[44rem] w-[44rem] rounded-full bg-[radial-gradient(circle,rgba(74,14,30,0.08),transparent_68%)]" />
          <svg
            className="absolute top-8 -right-36 h-[36rem] w-[36rem] text-wine-700/28"
            viewBox="0 0 220 220"
            fill="none"
          >
            <circle cx="96" cy="110" r="72" stroke="currentColor" strokeWidth="0.55" />
            <circle cx="142" cy="92" r="48" stroke="currentColor" strokeWidth="0.55" />
            <circle cx="118" cy="150" r="22" stroke="currentColor" strokeWidth="0.55" />
          </svg>
          <svg
            className="absolute bottom-10 left-[22%] h-72 w-[28rem] text-gold-400/35"
            viewBox="0 0 280 120"
            fill="none"
          >
            <path d="M8 96C70 20 180 16 272 78" stroke="currentColor" strokeWidth="0.8" />
          </svg>
        </>
      ) : null}

      {variant === "faq" ? (
        <>
          <div className="absolute -right-40 bottom-[-18%] h-[50rem] w-[50rem] rounded-full bg-[radial-gradient(circle,rgba(107,27,43,0.09),transparent_68%)]" />
          <svg
            className="absolute top-10 -left-28 h-[34rem] w-[34rem] text-wine-700/28"
            viewBox="0 0 200 200"
            fill="none"
          >
            <path d="M30 170C10 80 70 16 150 40" stroke="currentColor" strokeWidth="0.6" />
            <path d="M48 156C36 88 86 40 146 62" stroke="currentColor" strokeWidth="0.6" />
            <path d="M66 142C58 96 98 62 142 80" stroke="currentColor" strokeWidth="0.6" />
          </svg>
          <svg
            className="absolute top-[28%] right-[10%] h-80 w-80 text-gold-400/35"
            viewBox="0 0 160 160"
            fill="none"
          >
            <circle cx="80" cy="80" r="64" stroke="currentColor" strokeWidth="0.65" />
            <circle cx="108" cy="58" r="18" stroke="currentColor" strokeWidth="0.65" />
          </svg>
        </>
      ) : null}
    </div>
  );
}
