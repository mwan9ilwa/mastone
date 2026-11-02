"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { heroSlides, type HeroSlide } from "@/lib/site";
import { cn } from "@/lib/utils";

const DURATION = 7000;
const ease = [0.22, 1, 0.36, 1] as const;

export function HeroSlider() {
  const sectionRef = useRef<HTMLElement>(null);
  const [[index, direction], setSlide] = useState<[number, number]>([0, 1]);
  const [paused, setPaused] = useState(false);
  const progress = useMotionValue(0);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const paginate = useCallback((dir: number) => {
    setSlide(([i]) => [(i + dir + heroSlides.length) % heroSlides.length, dir]);
  }, []);

  const goTo = (i: number) => setSlide(([cur]) => [i, i > cur ? 1 : -1]);

  // Autoplay driven by rAF so the progress bar and the pause button stay in sync.
  useEffect(() => {
    progress.set(0);
    if (paused) return;
    let raf = 0;
    let last = performance.now();
    let elapsed = 0;
    const tick = (now: number) => {
      elapsed += now - last;
      last = now;
      progress.set(Math.min(elapsed / DURATION, 1));
      if (elapsed >= DURATION) paginate(1);
      else raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [index, paused, paginate, progress]);

  const slide = heroSlides[index];

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative h-[100svh] min-h-[640px] overflow-hidden bg-navy-900 text-white"
      aria-roledescription="carousel"
      aria-label="Highlights"
    >
      {/* Background layer (parallax) */}
      <motion.div style={{ y: reduceMotion ? 0 : bgY }} className="absolute inset-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0, clipPath: direction > 0 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0 0%)" }}
            exit={{ opacity: 0.6 }}
            transition={{ duration: 1.1, ease }}
          >
            <SlideBackground slide={slide} first={index === 0} />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-navy-900/95 via-navy-900/60 to-navy-900/10" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-navy-900/40" />
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_right,black,transparent_70%)]" />

      {/* Content (moves faster than background for depth) */}
      <motion.div
        style={{ y: reduceMotion ? 0 : contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4 pt-16 sm:px-6 lg:px-8"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.12}
        onDragEnd={(_, info) => {
          if (info.offset.x < -80) paginate(1);
          else if (info.offset.x > 80) paginate(-1);
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="max-w-2xl"
            initial="hidden"
            animate="show"
            exit="exit"
            variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 0.35 } } }}
          >
            <motion.span
              variants={fadeUp}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] text-brand uppercase backdrop-blur"
            >
              <span className="size-1.5 animate-pulse rounded-full bg-brand" />
              {slide.eyebrow}
            </motion.span>

            <h1 className="font-heading text-5xl leading-[0.92] font-bold tracking-tight uppercase sm:text-7xl lg:text-8xl">
              {slide.title.map((line, i) => (
                <span key={line} className="block overflow-hidden pb-1">
                  <motion.span variants={maskUp} className={cn("block", i === 1 && "text-brand")}>
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p variants={fadeUp} className="mt-6 max-w-xl text-lg leading-relaxed text-white/75 sm:text-xl">
              {slide.text}
            </motion.p>

            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
              <Button asChild size="lg" className="group h-13 rounded-full px-7 text-base font-semibold">
                <a href="#products">
                  Explore Products
                  <ArrowRight className="transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-13 rounded-full border-white/30 bg-white/5 px-7 text-base font-semibold text-white backdrop-blur hover:bg-white hover:text-navy-900"
              >
                <a href="#contact">Request a Quote</a>
              </Button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Controls */}
      <div className="absolute inset-x-0 bottom-0 z-20">
        <div className="mx-auto flex max-w-7xl items-end justify-between gap-6 px-4 pr-22 pb-8 sm:px-6 sm:pr-22 lg:px-8 xl:pr-8">
          <div className="flex flex-1 gap-3 sm:gap-6">
            {heroSlides.map((s, i) => (
              <button
                key={s.eyebrow}
                onClick={() => goTo(i)}
                className="group flex-1 text-left sm:max-w-44"
                aria-label={`Go to slide ${i + 1}: ${s.title.join(" ")}`}
                aria-current={i === index}
              >
                <span className="mb-2 hidden items-baseline gap-2 font-heading text-sm font-semibold tracking-wider uppercase sm:flex">
                  <span className={cn("transition-colors", i === index ? "text-brand" : "text-white/40")}>0{i + 1}</span>
                  <span className={cn("truncate transition-colors", i === index ? "text-white" : "text-white/40 group-hover:text-white/70")}>
                    {s.title[1]}
                  </span>
                </span>
                <span className="block h-0.5 overflow-hidden rounded-full bg-white/20">
                  {i === index ? (
                    <ProgressFill progress={progress} />
                  ) : (
                    <span className={cn("block h-full bg-white/50", i < index ? "w-full" : "w-0")} />
                  )}
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ControlButton label={paused ? "Play slideshow" : "Pause slideshow"} onClick={() => setPaused((p) => !p)}>
              {paused ? <Play className="size-4" /> : <Pause className="size-4" />}
            </ControlButton>
            <ControlButton label="Previous slide" onClick={() => paginate(-1)}>
              <ChevronLeft className="size-5" />
            </ControlButton>
            <ControlButton label="Next slide" onClick={() => paginate(1)}>
              <ChevronRight className="size-5" />
            </ControlButton>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#about"
        className="absolute right-6 bottom-32 z-20 hidden flex-col items-center gap-3 text-[0.65rem] font-semibold tracking-[0.3em] text-white/50 uppercase [writing-mode:vertical-rl] hover:text-white lg:flex"
      >
        Scroll
        <span className="relative h-16 w-px overflow-hidden bg-white/20">
          <motion.span
            className="absolute inset-x-0 top-0 h-6 bg-brand"
            animate={{ y: ["-100%", "300%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </a>
    </section>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.35 } },
};

const maskUp = {
  hidden: { y: "105%" },
  show: { y: "0%", transition: { duration: 0.9, ease } },
  exit: { y: "-105%", transition: { duration: 0.4, ease } },
};

function SlideBackground({ slide, first }: { slide: HeroSlide; first: boolean }) {
  if (slide.kind === "photo") {
    return (
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.18 }}
        animate={{ scale: 1.02 }}
        transition={{ duration: DURATION / 1000 + 1.5, ease: "linear" }}
      >
        <Image src={slide.image} alt="" fill sizes="100vw" className="object-cover" loading={first ? "eager" : undefined} fetchPriority={first ? "high" : undefined} />
      </motion.div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden bg-[radial-gradient(ellipse_at_70%_50%,#1a4a7a_0%,#0a1a33_65%)]">
      <div className="absolute top-1/2 right-[-10%] size-[60vmax] -translate-y-1/2 rounded-full bg-brand/20 blur-[120px]" />
      <motion.span
        className="text-outline absolute top-1/2 right-[-2%] -translate-y-1/2 font-heading text-[22vw] leading-none font-extrabold tracking-tighter uppercase select-none"
        initial={{ x: "15%" }}
        animate={{ x: "-5%" }}
        transition={{ duration: DURATION / 1000 + 1.5, ease: "linear" }}
      >
        {slide.backdropWord}
      </motion.span>
      <div className="absolute inset-y-0 right-0 hidden w-[55%] items-center justify-center md:flex">
        <motion.div
          className="relative aspect-[4/3] w-[min(38vw,560px)]"
          initial={{ x: 120, opacity: 0, rotate: -3 }}
          animate={{ x: 0, opacity: 1, rotate: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease }}
        >
          <motion.div
            className="absolute inset-0"
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image src={slide.image} alt="" fill sizes="40vw" className="object-contain drop-shadow-[0_40px_40px_rgba(0,0,0,0.55)]" />
          </motion.div>
          <div className="absolute -bottom-6 left-1/2 h-8 w-3/4 -translate-x-1/2 rounded-[100%] bg-black/50 blur-xl" />
        </motion.div>
        {slide.secondaryImage && (
          <motion.div
            className="absolute bottom-[14%] left-[2%] aspect-[4/3] w-[min(16vw,240px)]"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.7, ease }}
          >
            <Image src={slide.secondaryImage} alt="" fill sizes="20vw" className="object-contain drop-shadow-[0_25px_25px_rgba(0,0,0,0.5)]" />
          </motion.div>
        )}
      </div>
    </div>
  );
}

function ProgressFill({ progress }: { progress: MotionValue<number> }) {
  return <motion.span style={{ scaleX: progress }} className="block h-full origin-left bg-brand" />;
}

function ControlButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="grid size-11 place-items-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur transition-colors hover:border-brand hover:bg-brand hover:text-navy-900"
    >
      {children}
    </button>
  );
}
