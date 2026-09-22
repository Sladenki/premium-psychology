export function Atmosphere({ variant = "practice" }: { variant?: "practice" | "method" | "formats" }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {variant === "practice" ? (
        <>
          <div className="absolute -top-40 right-[-10%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(107,27,43,0.08),transparent_68%)]" />
          <svg
            className="absolute bottom-16 -left-16 h-80 w-80 text-gold-400/35"
            viewBox="0 0 200 200"
            fill="none"
          >
            <circle cx="74" cy="98" r="52" stroke="currentColor" strokeWidth="0.7" />
            <circle cx="118" cy="118" r="36" stroke="currentColor" strokeWidth="0.7" />
          </svg>
        </>
      ) : null}
      {variant === "method" ? (
        <>
          <div className="absolute top-24 -right-24 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(74,14,30,0.06),transparent_70%)]" />
          <svg
            className="absolute top-1/3 -left-8 h-[28rem] w-40 text-gold-400/40"
            viewBox="0 0 80 320"
            fill="none"
          >
            <path
              d="M70 10C20 70 18 140 48 190C78 240 24 280 16 310"
              stroke="currentColor"
              strokeWidth="0.8"
            />
          </svg>
        </>
      ) : null}
      {variant === "formats" ? (
        <>
          <div className="absolute -bottom-32 left-1/3 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(201,162,39,0.09),transparent_68%)]" />
          <svg
            className="absolute top-16 right-[6%] h-56 w-56 text-wine-700/20"
            viewBox="0 0 160 160"
            fill="none"
          >
            <circle cx="70" cy="78" r="46" stroke="currentColor" strokeWidth="0.8" />
            <circle cx="98" cy="96" r="28" stroke="currentColor" strokeWidth="0.8" />
          </svg>
        </>
      ) : null}
    </div>
  );
}
