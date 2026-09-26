"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { HOVER } from "@/lib/easing";
import { cn } from "@/lib/cn";
import { useFinePointer } from "@/lib/use-fine-pointer";

type Variant = "gold" | "line" | "solid";

const variants: Record<
  Variant,
  { button: string; fill: string; hoverText: string }
> = {
  gold: {
    button: "border border-gold-400 text-gold-400",
    fill: "#C9A227",
    hoverText: "#2A0A12",
  },
  line: {
    button: "border border-wine-700/40 text-wine-800",
    fill: "#4A0E1E",
    hoverText: "#FAF6F0",
  },
  solid: {
    button: "border border-wine-800 bg-wine-800 text-cream-50",
    fill: "#C9A227",
    hoverText: "#2A0A12",
  },
};

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export function MagneticButton({
  href,
  children,
  variant = "line",
  className,
  compact = false,
  wide = false,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  compact?: boolean;
  wide?: boolean;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.4 });
  const [hovered, setHovered] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const styles = variants[variant];

  useEffect(() => {
    if (!fine || reduce) return;

    const onMove = (event: PointerEvent) => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      const reachX = rect.width / 2 + 52;
      const reachY = rect.height / 2 + 52;

      if (Math.abs(dx) < reachX && Math.abs(dy) < reachY) {
        x.set(clamp(dx * 0.22, -16, 16));
        y.set(clamp(dy * 0.22, -12, 12));
      } else {
        x.set(0);
        y.set(0);
      }
    };

    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [fine, reduce, x, y]);

  const clip = hovered
    ? `circle(150% at ${origin.x}% ${origin.y}%)`
    : `circle(0% at ${origin.x}% ${origin.y}%)`;

  return (
    <div ref={wrapRef} className={cn(wide ? "flex w-full" : "inline-flex", className)}>
      <motion.a
        ref={buttonRef}
        href={href}
        data-cursor="expand"
        style={fine && !reduce ? { x: springX, y: springY } : undefined}
        onPointerEnter={(event) => {
          const rect = buttonRef.current?.getBoundingClientRect();
          if (!rect) return;
          setOrigin({
            x: ((event.clientX - rect.left) / rect.width) * 100,
            y: ((event.clientY - rect.top) / rect.height) * 100,
          });
          setHovered(true);
        }}
        onPointerLeave={() => {
          setHovered(false);
          x.set(0);
          y.set(0);
        }}
        className={cn(
          "relative inline-flex items-center justify-center overflow-hidden rounded-full font-medium uppercase",
          compact
            ? "px-4 py-2.5 text-[11px] tracking-[0.06em]"
            : "px-8 py-3.5 text-[13px] tracking-[0.08em]",
          wide && "w-full",
          styles.button,
        )}
      >
        <span className="relative z-0">{children}</span>
        <motion.span
          aria-hidden
          className="absolute inset-0 z-10 flex items-center justify-center rounded-full"
          initial={false}
          animate={{ clipPath: reduce ? "circle(0% at 50% 50%)" : clip }}
          transition={{ duration: 0.55, ease: HOVER }}
          style={{ backgroundColor: styles.fill, color: styles.hoverText }}
        >
          {children}
        </motion.span>
      </motion.a>
    </div>
  );
}
