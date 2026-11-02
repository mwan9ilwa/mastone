"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { Check, Quote } from "lucide-react";
import { Reveal, SectionLabel } from "@/components/reveal";
import { Counter } from "@/components/counter";
import { company } from "@/lib/site";

const points = [
  "Construction, mining & farming equipment",
  "Generators & premium engine oils",
  "Genuine spare parts supply",
  "Maintenance & technical support",
];

const stats = [
  { value: 2025, label: "Established in Zambia", format: false },
  { value: 6, suffix: "+", label: "Global partner brands" },
  { value: 25, suffix: "+", label: "Years of SUNWARD engineering" },
  { value: 1250, suffix: " kVA", label: "Max generator capacity" },
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yBig = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const ySmall = useTransform(scrollYProgress, [0, 1], ["40%", "-40%"]);
  const yBadge = useTransform(scrollYProgress, [0, 1], ["-30%", "60%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);

  return (
    <section id="about" className="relative overflow-hidden bg-background py-24 sm:py-32">
      <div className="pointer-events-none absolute -top-40 -left-40 size-[36rem] rounded-full bg-brand/10 blur-3xl" />

      <div ref={ref} className="relative mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        {/* Layered parallax images */}
        <div className="relative mx-auto aspect-[4/5] w-full max-w-lg lg:mx-0">
          <motion.div style={{ y: yBig }} className="absolute inset-0 right-[12%] bottom-[12%] overflow-hidden rounded-3xl shadow-2xl shadow-navy/20">
            <motion.div style={{ scale: imgScale }} className="absolute inset-0">
              <Image src="/images/sunward-facility.png" alt="SUNWARD facility" fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent" />
          </motion.div>

          <motion.div
            style={{ y: ySmall }}
            className="absolute right-0 bottom-0 w-[58%] overflow-hidden rounded-2xl border-8 border-background shadow-2xl shadow-navy/30"
          >
            <div className="relative aspect-[4/3]">
              <Image src="/images/hero-loader.png" alt="SUNWARD wheel loader" fill sizes="30vw" className="object-cover" />
            </div>
          </motion.div>

          <motion.div
            style={{ y: yBadge }}
            className="absolute top-[8%] -left-2 rounded-2xl bg-navy-900 p-5 text-white shadow-xl sm:-left-8"
          >
            <div className="font-heading text-5xl leading-none font-bold text-brand">
              <Counter to={1999} format={false} />
            </div>
            <div className="mt-1 max-w-28 text-xs leading-snug text-white/70">SUNWARD serving heavy industry since</div>
          </motion.div>
        </div>

        {/* Copy */}
        <div>
          <Reveal>
            <SectionLabel>Company Profile</SectionLabel>
            <h2 className="mt-5 font-heading text-4xl leading-[0.95] font-bold tracking-tight text-navy uppercase sm:text-6xl">
              Integrated equipment &amp; <span className="text-brand-deep">power solutions</span> for Africa
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Established in 2025, <strong className="text-foreground">Mastone Investments Ltd.</strong> is a leading integrated equipment
              and power solutions provider based in Zambia, delivering high-quality machinery, power systems, commercial vehicles and
              after-sales support to customers across multiple industries.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              We proudly supply SUNWARD machinery — a globally recognised brand serving the heavy-duty equipment industry since 1999.
              Through strong partnerships and professional technical support, we provide reliable, efficient and innovative solutions
              tailored to the demands of the African market.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-[0.95rem] font-medium text-foreground">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand text-navy-900">
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.3}>
            <figure className="mt-10 flex gap-4 border-l-4 border-brand pl-5">
              <Quote className="size-8 shrink-0 text-brand" />
              <blockquote className="font-heading text-2xl font-semibold tracking-wide text-navy uppercase">{company.tagline}</blockquote>
            </figure>
          </Reveal>
        </div>
      </div>

      {/* Stats */}
      <div className="relative mx-auto mt-24 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-white/10 text-white shadow-2xl shadow-navy/20 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.1}
              className="bg-navy-900 p-6 sm:p-10"
            >
              <div className="font-heading text-4xl font-bold text-brand sm:text-6xl">
                <Counter to={s.value} suffix={s.suffix} format={s.format} />
              </div>
              <div className="mt-2 text-sm text-white/60">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
