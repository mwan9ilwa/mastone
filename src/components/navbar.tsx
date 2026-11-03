"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, Phone } from "lucide-react";
import { useLenis } from "lenis/react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { telHref } from "@/lib/content/format";
import { navLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar({ phone }: { phone: string }) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lenis = useLenis();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > prev && y > 600);
  });

  const go = (href: string) => {
    setOpen(false);
    lenis?.scrollTo(href, { offset: -72 });
  };

  return (
    <motion.header
      animate={{ y: hidden ? "-110%" : "0%" }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500",
        scrolled ? "bg-navy-900/85 shadow-lg shadow-black/10 backdrop-blur-xl" : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#home" aria-label="Mastone Investments home" className="shrink-0">
          <Image src="/images/logo-white.png" alt="Mastone Investments Limited" width={354} height={101} className="h-9 w-auto sm:h-10" preload />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative px-4 py-2 text-[0.95rem] font-medium text-white/80 transition-colors hover:text-white"
              >
                {link.label}
                <span className="absolute inset-x-4 -bottom-0.5 h-0.5 origin-left scale-x-0 bg-brand transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={telHref(phone)}
            className="hidden items-center gap-2 text-sm font-medium text-white/80 hover:text-white xl:flex"
          >
            <Phone className="size-4 text-brand" />
            {phone}
          </a>
          <Button asChild className="ml-3 hidden h-10 rounded-full px-5 font-semibold sm:inline-flex">
            <a href="#contact">Get a Quote</a>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button size="icon-lg" variant="ghost" className="text-white hover:bg-white/10 hover:text-white lg:hidden" aria-label="Open menu">
                <Menu className="size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent className="border-l-white/10 bg-navy-900 text-white">
              <SheetHeader>
                <SheetTitle className="text-white">
                  <Image src="/images/logo-white.png" alt="Mastone" width={354} height={101} className="h-8 w-auto" />
                </SheetTitle>
              </SheetHeader>
              <ul className="flex flex-col gap-1 px-4">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i + 0.1 }}
                  >
                    <button
                      onClick={() => go(link.href)}
                      className="w-full rounded-lg px-3 py-3 text-left font-heading text-2xl font-semibold tracking-wide uppercase hover:bg-white/5 hover:text-brand"
                    >
                      {link.label}
                    </button>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-auto space-y-3 p-4">
                <Button onClick={() => go("#contact")} className="h-11 w-full rounded-full font-semibold">
                  Get a Quote
                </Button>
                <a href={telHref(phone)} className="flex items-center justify-center gap-2 text-sm text-white/70">
                  <Phone className="size-4 text-brand" /> {phone}
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </motion.header>
  );
}
