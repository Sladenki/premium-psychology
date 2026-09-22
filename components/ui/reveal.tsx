"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EXPO } from "@/lib/easing";
import { cn } from "@/lib/cn";

type RevealLinesProps = {
  lines: string[];
  className?: string;
  as?: "h1" | "h2" | "h3" | "span";
  play?: "view" | "load";
  delay?: number;
};

export function RevealLines({
  lines,
  className,
  as: Tag = "h2",
  play = "view",
  delay = 0,
}: RevealLinesProps) {
  const reduce = useReducedMotion();

  return (
    <Tag className={cn("block", className)}>
      {lines.map((line, index) => (
        <span key={`${line}-${index}`} className="block overflow-hidden py-[0.06em]">
          <motion.span
            className="block"
            initial={reduce ? false : { y: 20, opacity: 0 }}
            {...(play === "load"
              ? { animate: { y: 0, opacity: 1 } }
              : {
                  whileInView: { y: 0, opacity: 1 },
                  viewport: { once: true, margin: "-10% 0px" },
                })}
            transition={{
              duration: 0.9,
              delay: delay + index * 0.07,
              ease: EXPO,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

export function FadeIn({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li";
}) {
  const reduce = useReducedMotion();
  const Tag = as === "li" ? motion.li : motion.div;

  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.85, delay, ease: EXPO }}
    >
      {children}
    </Tag>
  );
}
