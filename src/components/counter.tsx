"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

/** Counts up from zero the first time it scrolls into view. */
export function Counter({ to, suffix = "", format = true }: { to: number; suffix?: string; format?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduceMotion = useReducedMotion();
  const from = to > 1000 && !format ? to - 60 : 0;

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;
    const render = (v: number) => {
      const n = Math.round(v);
      el.textContent = (format ? n.toLocaleString("en-US") : String(n)) + suffix;
    };
    if (reduceMotion) return render(to);
    const controls = animate(from, to, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: render,
    });
    return () => controls.stop();
  }, [inView, from, to, suffix, format, reduceMotion]);

  return (
    <span ref={ref}>
      {from}
      {suffix}
    </span>
  );
}
