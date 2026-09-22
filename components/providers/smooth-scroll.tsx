"use client";

import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        lerp: 0.075,
        smoothWheel: true,
        anchors: { offset: -88 },
      }}
    >
      {children}
    </ReactLenis>
  );
}
