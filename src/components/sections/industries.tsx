"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { Building2, Pickaxe, Sprout, Truck, Zap, Factory } from "lucide-react";
import { SectionLabel } from "@/components/reveal";

const industries = [
  { icon: Building2, title: "Construction", text: "Loaders, excavators and mini loaders for roads, buildings and infrastructure.", image: "/images/products/excavator.png" },
  { icon: Pickaxe, title: "Mining", text: "Heavy excavators and rock drill rigs for surface mining and quarrying.", image: "/images/products/rock-drill.png" },
  { icon: Sprout, title: "Agriculture", text: "YTO tractors from 60 to 300 hp for smallholder and commercial farms.", image: "/images/products/tractor-ex1054.png" },
  { icon: Truck, title: "Logistics", text: "Light, refrigerated, containerised and HOWO heavy trucks for every load.", image: "/images/products/howo-truck.png" },
  { icon: Zap, title: "Power & Energy", text: "Diesel generator sets from 41 kVA to 1,250 kVA for prime and standby power.", image: "/images/products/genset-weichai.png" },
  { icon: Factory, title: "Industry", text: "Equipment, lubricants and after-sales support for plants and workshops.", image: "/images/products/loader-sl52w.png" },
];

/** Vertical scroll drives a pinned horizontal track. */
export function Industries() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => setDistance(Math.max(0, track.scrollWidth - window.innerWidth + 32));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="industries" ref={ref} className="relative h-[300vh] bg-background">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <div className="mx-auto mb-10 flex w-full max-w-7xl items-end justify-between gap-6 px-4 sm:px-6 lg:px-8">
          <div>
            <SectionLabel>Industries We Serve</SectionLabel>
            <h2 className="mt-5 font-heading text-4xl leading-[0.95] font-bold tracking-tight text-navy uppercase sm:text-6xl">
              Powering Zambia&apos;s <span className="text-brand-deep">key sectors</span>
            </h2>
          </div>
          <div className="hidden w-48 sm:block">
            <div className="h-1 overflow-hidden rounded-full bg-border">
              <motion.div style={{ scaleX: bar }} className="h-full origin-left bg-brand" />
            </div>
            <p className="mt-2 text-right text-xs tracking-widest text-muted-foreground uppercase">Keep scrolling</p>
          </div>
        </div>

        <motion.div ref={trackRef} style={{ x }} className="flex w-max gap-6 pl-4 sm:pl-6 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]">
          {industries.map((ind, i) => (
            <article
              key={ind.title}
              className="group relative flex h-[58vh] max-h-[520px] min-h-[380px] w-[80vw] shrink-0 flex-col justify-between overflow-hidden rounded-[2rem] bg-navy-900 p-8 text-white sm:w-[440px]"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgb(19_202_236/0.25),transparent_60%)]" />
              <div className="relative flex items-start justify-between">
                <div className="grid size-14 place-items-center rounded-2xl bg-brand text-navy-900">
                  <ind.icon className="size-7" />
                </div>
                <span className="font-heading text-7xl leading-none font-bold text-white/10">0{i + 1}</span>
              </div>
              <div className="relative mx-auto h-[42%] w-[80%]">
                <Image
                  src={ind.image}
                  alt=""
                  fill
                  sizes="360px"
                  className="object-contain drop-shadow-[0_25px_25px_rgba(0,0,0,0.5)] transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="relative">
                <h3 className="font-heading text-3xl font-bold tracking-wide uppercase">{ind.title}</h3>
                <p className="mt-2 text-white/65">{ind.text}</p>
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
