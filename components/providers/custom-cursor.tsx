"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useFinePointer } from "@/lib/use-fine-pointer";

const SIZE = 34;

export function CustomCursor() {
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const x = useMotionValue(-80);
  const y = useMotionValue(-80);
  const frameX = useSpring(x, { stiffness: 640, damping: 42, mass: 0.28 });
  const frameY = useSpring(y, { stiffness: 640, damping: 42, mass: 0.28 });
  const [active, setActive] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!fine || reduce) return;

    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);

      const target = event.target;
      if (!(target instanceof Element)) {
        setActive(false);
        setVisible(true);
        return;
      }

      if (target.closest("input, textarea, select, [contenteditable='true']")) {
        setVisible(false);
        setActive(false);
        return;
      }

      setVisible(true);
      setActive(Boolean(target.closest("a, button, [data-cursor='expand']")));
    };

    const onLeave = () => setVisible(false);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [fine, reduce, x, y]);

  if (!fine || reduce) return null;

  const scale = pressed ? 0.62 : active ? 0.72 : 1;

  return (
    <>
      <motion.span
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[81] size-1 rounded-full bg-cream-50 mix-blend-difference"
        style={{ x, y, marginLeft: -2, marginTop: -2, opacity: visible ? 1 : 0 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[80] text-cream-50 mix-blend-difference"
        style={{
          x: frameX,
          y: frameY,
          width: SIZE,
          height: SIZE,
          marginLeft: -SIZE / 2,
          marginTop: -SIZE / 2,
          opacity: visible ? 1 : 0,
        }}
        animate={{ scale, rotate: active ? 45 : 0 }}
        transition={{ type: "spring", stiffness: 480, damping: 28 }}
      >
        <svg viewBox="0 0 34 34" className="h-full w-full" fill="none">
          <path d="M1.25 10.5V1.25H10.5" stroke="currentColor" strokeWidth="1.25" />
          <path d="M23.5 1.25H32.75V10.5" stroke="currentColor" strokeWidth="1.25" />
          <path d="M32.75 23.5V32.75H23.5" stroke="currentColor" strokeWidth="1.25" />
          <path d="M10.5 32.75H1.25V23.5" stroke="currentColor" strokeWidth="1.25" />
        </svg>
      </motion.div>
    </>
  );
}
