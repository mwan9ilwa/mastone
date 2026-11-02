"use client";

import { motion, type HTMLMotionProps } from "motion/react";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
  x?: number;
};

/** Fades and slides its children in the first time they scroll into view. */
export function Reveal({ delay = 0, y = 40, x = 0, children, ...props }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-3 text-sm font-semibold tracking-[0.25em] uppercase ${
        light ? "text-brand" : "text-brand-deep"
      }`}
    >
      <span className="h-px w-10 bg-current" />
      {children}
    </span>
  );
}
