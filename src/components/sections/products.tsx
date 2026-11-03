"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import { ArrowUpRight, ChevronDown, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Reveal, SectionLabel } from "@/components/reveal";
import { isUploaded, telHref, whatsappHref } from "@/lib/content/format";
import type { Product, ProductCategory } from "@/lib/content/schema";
import { cn } from "@/lib/utils";

export function Products({ productCategories }: { productCategories: ProductCategory[] }) {
  const [active, setActive] = useState(productCategories[0].id);

  return (
    <section id="products" className="relative bg-secondary/60 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <Reveal>
            <SectionLabel>Our Products</SectionLabel>
            <h2 className="mt-5 max-w-2xl font-heading text-4xl leading-[0.95] font-bold tracking-tight text-navy uppercase sm:text-6xl">
              Machinery for every <span className="text-brand-deep">job site</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-md text-lg text-muted-foreground">
              From earth-moving giants to farm tractors, trucks and generators — sourced from world-class manufacturers.
            </p>
          </Reveal>
        </div>

        <Tabs value={active} onValueChange={setActive} className="mt-12">
          <Reveal delay={0.15}>
            <div className="-mx-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
              <TabsList className="h-auto! gap-1 rounded-full bg-white p-1.5 shadow-sm ring-1 ring-border">
                {productCategories.map((c) => (
                  <TabsTrigger
                    key={c.id}
                    value={c.id}
                    className="relative h-11 rounded-full px-5 text-[0.95rem] font-semibold data-active:bg-transparent! data-active:text-navy-900 data-active:shadow-none!"
                  >
                    {active === c.id && (
                      <motion.span
                        layoutId="product-tab"
                        className="absolute inset-0 rounded-full bg-brand"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{c.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
          </Reveal>

          {productCategories.map((c) => (
            <TabsContent key={c.id} value={c.id} className="mt-8">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-8 text-base text-muted-foreground"
              >
                {c.blurb}
              </motion.p>
              <motion.div
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.08 } } }}
              >
                {c.products.map((p) => (
                  <ProductCard key={p.name} product={p} enquiryPhone={p.enquiryPhone ?? c.enquiryPhone} />
                ))}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}

function ProductCard({ product, enquiryPhone }: { product: Product; enquiryPhone?: string }) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const rotateX = useSpring(rx, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(ry, { stiffness: 200, damping: 20 });
  const glow = useMotionTemplate`radial-gradient(280px circle at ${gx}% ${gy}%, rgb(19 202 236 / 0.22), transparent 70%)`;

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    rx.set((0.5 - py) * 10);
    ry.set((px - 0.5) * 12);
    gx.set(px * 100);
    gy.set(py * 100);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.article
      variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="group relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-border transition-shadow duration-500 hover:shadow-2xl hover:shadow-navy/15"
    >
      <motion.div style={{ background: glow }} className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative aspect-[4/3] bg-gradient-to-b from-secondary to-white">
        <Badge className="absolute top-4 left-4 z-10 rounded-full bg-navy-900 px-3 text-[0.65rem] tracking-[0.15em] text-white uppercase">
          {product.brand}
        </Badge>
        <div className="absolute inset-x-[12%] bottom-[10%] h-4 rounded-[100%] bg-navy/15 blur-md transition-transform duration-500 group-hover:scale-x-110" />
        <Image
          src={product.image}
          alt={`${product.brand} ${product.name}`}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          unoptimized={isUploaded(product.image)}
          className="object-contain p-8 transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-translate-y-1"
        />
      </div>
      <div className="relative flex flex-1 flex-col p-6">
        <h3 className="font-heading text-2xl font-bold tracking-wide text-navy uppercase">{product.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{product.models}</p>
        <div className="flex-1">{product.specs.length > 0 && <SpecList specs={product.specs} />}</div>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          {/* Products with their own enquiry line go straight to it; the rest use the quote form. */}
          <a
            href={enquiryPhone ? whatsappHref(enquiryPhone, `Hello Mastone, I'd like a quote for the ${product.brand} ${product.name}.`) : "#contact"}
            target={enquiryPhone ? "_blank" : undefined}
            rel="noopener"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-deep transition-colors hover:text-navy"
          >
            Enquire now
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          {enquiryPhone && (
            <a href={telHref(enquiryPhone)} className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-navy">
              <Phone className="size-3.5" />
              {enquiryPhone}
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

/** Longer spec lists collapse to the first few rows, keeping cards in a row a similar height. */
const VISIBLE_SPECS = 4;

function SpecList({ specs }: { specs: Product["specs"] }) {
  const [open, setOpen] = useState(false);
  // Hiding a single row isn't worth the extra click.
  const hidden = specs.length > VISIBLE_SPECS + 1 ? specs.length - VISIBLE_SPECS : 0;
  return (
    <div className="mt-4">
      <dl className="divide-y divide-border/70 text-[0.8rem]">
        {specs.map((spec, i) => (
          <div key={i} className={cn("flex justify-between gap-3 py-1.5", !open && hidden > 0 && i >= VISIBLE_SPECS && "hidden")}>
            <dt className="shrink-0 text-muted-foreground">{spec.label}</dt>
            <dd className="text-right font-medium text-foreground">{spec.value}</dd>
          </div>
        ))}
      </dl>
      {hidden > 0 && (
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground transition-colors hover:text-navy"
        >
          {open ? "Fewer specs" : `${hidden} more spec${hidden === 1 ? "" : "s"}`}
          <ChevronDown className={cn("size-3.5 transition-transform", open && "rotate-180")} />
        </button>
      )}
    </div>
  );
}
