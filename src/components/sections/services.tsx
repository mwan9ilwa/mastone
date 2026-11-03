"use client";

import { motion } from "motion/react";
import { Reveal, SectionLabel } from "@/components/reveal";
import { ContentIcon } from "@/components/content-icons";
import type { Service } from "@/lib/content/schema";

export function Services({ services }: { services: Service[] }) {
  return (
    <section id="services" className="relative overflow-hidden bg-navy-900 py-24 text-white sm:py-32">
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="pointer-events-none absolute -right-40 -bottom-40 size-[40rem] rounded-full bg-brand/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <SectionLabel light>What We Do</SectionLabel>
          <h2 className="mt-5 font-heading text-4xl leading-[0.95] font-bold tracking-tight uppercase sm:text-6xl">
            Support that <span className="text-brand">keeps you moving</span>
          </h2>
          <p className="mt-6 text-lg text-white/65">
            Every machine we supply is backed by reliable technical support, maintenance, spare parts and professional after-sales service.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur transition-colors duration-500 hover:border-brand/50 hover:bg-white/[0.06]"
              >
                <span className="absolute top-6 right-7 font-heading text-6xl font-bold text-white/5 transition-colors duration-500 group-hover:text-brand/15">
                  0{i + 1}
                </span>
                <div className="grid size-14 place-items-center rounded-2xl bg-brand/15 text-brand transition-all duration-500 group-hover:rotate-6 group-hover:bg-brand group-hover:text-navy-900">
                  <ContentIcon name={s.icon} className="size-7" />
                </div>
                <h3 className="mt-6 font-heading text-2xl font-bold tracking-wide uppercase">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-white/60">{s.text}</p>
                <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100" />
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
