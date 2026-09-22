"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useFinePointer } from "@/lib/use-fine-pointer";

export function CustomCursor() {
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 350, damping: 28, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 350, damping: 28, mass: 0.4 });
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!fine || reduce) return;

    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX - 16);
      y.set(event.clientY - 16);
      setVisible(true);
      const target = event.target;
      if (!(target instanceof Element)) {
        setActive(false);
        return;
      }
      setActive(Boolean(target.closest("a, button, [data-cursor='expand']")));
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);
    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [fine, reduce, x, y]);

  if (!fine || reduce) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[80] h-8 w-8 rounded-full border border-gold-400"
      style={{ x: springX, y: springY, opacity: visible ? 1 : 0 }}
      animate={{ scale: active ? 1.7 : 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
    />
  );
}
