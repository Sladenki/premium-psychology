import { cn } from "@/lib/cn";

type LogoMarkProps = {
  className?: string;
  /** Cream mark for dark header; brand colors for light header. */
  inverted?: boolean;
};

/** Official logo mark — O with П and gold orbital ring. */
export function LogoMark({ className, inverted = false }: LogoMarkProps) {
  const ink = inverted ? "#faf6f0" : "#741D2D";
  const gold = "#C89B67";
  const cut = inverted ? "#2a0a12" : "#faf6f0";
  const uid = inverted ? "inv" : "brand";

  return (
    <svg
      viewBox="40 55 320 190"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      aria-hidden
    >
      <defs>
        {/* Hide back orbit inside the O hole */}
        <mask id={`logo-back-mask-${uid}`}>
          <rect x="0" y="0" width="400" height="300" fill="white" />
          <ellipse cx="200" cy="150" rx="66" ry="81" fill="black" />
        </mask>
        {/* Show front orbit only on the right, outside the O hole */}
        <mask id={`logo-front-mask-${uid}`}>
          <rect x="0" y="0" width="400" height="300" fill="black" />
          <rect x="200" y="0" width="200" height="300" fill="white" />
          <ellipse cx="200" cy="150" rx="66" ry="81" fill="black" />
        </mask>
      </defs>

      {/* Orbit behind */}
      <g transform="rotate(-22 200 150)" mask={`url(#logo-back-mask-${uid})`}>
        <ellipse cx="200" cy="150" rx="160" ry="58" stroke={gold} strokeWidth="2.5" fill="none" />
      </g>

      {/* Letter O ring */}
      <path
        fillRule="evenodd"
        d="M 200 65 A 80 85 0 1 1 199.9 65 Z M 200 69 A 66 81 0 1 0 200.1 69 Z"
        fill={ink}
      />

      {/* Orbit in front of O (right side) with cut through the ring */}
      <g transform="rotate(-22 200 150)" mask={`url(#logo-front-mask-${uid})`}>
        <ellipse cx="200" cy="150" rx="160" ry="58" stroke={cut} strokeWidth="6" fill="none" />
        <ellipse cx="200" cy="150" rx="160" ry="58" stroke={gold} strokeWidth="2.5" fill="none" />
      </g>

      {/* Orbit nodes */}
      <g transform="rotate(-22 200 150)">
        <circle cx="40" cy="150" r="12" fill={ink} />
        <circle cx="360" cy="150" r="10" fill={gold} />
      </g>

      {/* Letter П */}
      <path
        d="M 164 112 L 236 112 L 236 124 L 234 124
           Q 234 116 228 116 L 228 178
           Q 228 184 236 184 L 236 186 L 208 186 L 208 184
           Q 216 184 216 178 L 216 116 L 184 116 L 184 178
           Q 184 184 192 184 L 192 186 L 164 186 L 164 184
           Q 172 184 172 178 L 172 116
           Q 166 116 166 124 L 164 124 Z"
        fill={ink}
      />
    </svg>
  );
}
