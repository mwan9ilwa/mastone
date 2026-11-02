"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const words = ["Must", "be", "one.", "Must", "to", "be", "number", "one."];

export function ParallaxBanner() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-25%", "25%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.25, 1.1, 1.25]);
  const xLeft = useTransform(scrollYProgress, [0, 1], ["10%", "-30%"]);

  return (
    <section ref={ref} className="relative flex min-h-[85vh] items-center overflow-hidden bg-navy-900 py-32 text-white">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Image src="/images/hero-loader.png" alt="" fill sizes="100vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-navy-900/75" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-transparent to-navy-900" />

      <motion.div
        style={{ x: xLeft }}
        className="text-outline pointer-events-none absolute top-8 left-0 font-heading text-[16vw] leading-none font-extrabold whitespace-nowrap uppercase select-none"
      >
        Mastone Investments
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-heading text-5xl leading-[0.95] font-bold tracking-tight uppercase sm:text-7xl lg:text-8xl">
          {words.map((w, i) => (
            <span key={i} className="inline-block overflow-hidden pr-[0.25em] align-bottom">
              <motion.span
                className={`inline-block ${i >= 4 ? "text-brand" : ""}`}
                initial={{ y: "110%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.8, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                {w}
              </motion.span>
            </span>
          ))}
        </h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mx-auto mt-8 max-w-2xl text-lg text-white/70 sm:text-xl"
        >
          Our commitment is simple: be the most reliable equipment and power partner in Zambia — on every site, every season.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.75, duration: 0.8 }}
          className="mt-10"
        >
          <Button asChild size="lg" className="group h-13 rounded-full px-8 text-base font-semibold">
            <a href="#contact">
              Talk to our team <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
