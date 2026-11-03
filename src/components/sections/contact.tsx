"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Reveal, SectionLabel } from "@/components/reveal";
import { FacebookIcon, WhatsAppIcon } from "@/components/icons";
import { telHref } from "@/lib/content/format";
import type { Company, ProductCategory } from "@/lib/content/schema";
import { cn } from "@/lib/utils";

const channels = (company: Company) => [
  { icon: Phone, label: "Call us", value: company.phone, href: telHref(company.phone) },
  { icon: WhatsAppIcon, label: "WhatsApp", value: company.phone, href: `https://wa.me/${company.whatsapp}` },
  { icon: Mail, label: "Email", value: company.email, href: `mailto:${company.email}` },
  { icon: FacebookIcon, label: "Facebook", value: company.facebook, href: company.facebookUrl },
];

export function Contact({ company, productCategories }: { company: Company; productCategories: ProductCategory[] }) {
  const [interest, setInterest] = useState(productCategories[0].label);

  // There is no backend yet, so enquiries are handed to WhatsApp with the form pre-filled.
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const text = [
      `Hello Mastone, I'd like a quote.`,
      `Name: ${data.get("name")}`,
      `Phone: ${data.get("phone")}`,
      data.get("company") ? `Company: ${data.get("company")}` : null,
      `Interested in: ${interest}`,
      `Message: ${data.get("message")}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    toast.success("Opening WhatsApp", { description: "Your enquiry is ready to send to our sales team." });
    e.currentTarget.reset();
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-secondary/60 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-5 lg:gap-16 lg:px-8">
        <div className="lg:col-span-2">
          <Reveal>
            <SectionLabel>Contact Us</SectionLabel>
            <h2 className="mt-5 font-heading text-4xl leading-[0.95] font-bold tracking-tight text-navy uppercase sm:text-6xl">
              Let&apos;s get your <span className="text-brand-deep">project moving</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Tell us what you need — machinery, trucks, generators, parts or service — and our team will respond with a tailored quote.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {channels(company).map((c, i) => {
              const Tag = c.href ? "a" : "div";
              return (
                <Reveal key={c.label} delay={i * 0.08} x={-30} y={0}>
                  <Tag
                    {...(c.href ? { href: c.href, target: c.href.startsWith("http") ? "_blank" : undefined, rel: "noopener" } : {})}
                    className={cn(
                      "group flex items-center gap-4 rounded-2xl bg-white p-4 ring-1 ring-border transition-all",
                      c.href && "hover:-translate-y-0.5 hover:shadow-lg hover:ring-brand/50"
                    )}
                  >
                    <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-navy-900 text-brand transition-colors group-hover:bg-brand group-hover:text-navy-900">
                      <c.icon className="size-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold tracking-widest text-muted-foreground uppercase">{c.label}</span>
                      <span className="block truncate font-semibold text-navy">{c.value}</span>
                    </span>
                  </Tag>
                </Reveal>
              );
            })}
            <Reveal delay={0.32} x={-30} y={0} className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-start gap-4 rounded-2xl bg-navy-900 p-4 text-white">
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand text-navy-900">
                  <MapPin className="size-5" />
                </span>
                <span>
                  <span className="block text-xs font-semibold tracking-widest text-white/50 uppercase">Visit us</span>
                  {company.address.map((line) => (
                    <span key={line} className="block font-semibold">
                      {line}
                    </span>
                  ))}
                </span>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.15} className="lg:col-span-3">
          <form onSubmit={onSubmit} className="relative rounded-[2rem] bg-white p-6 shadow-xl shadow-navy/5 ring-1 ring-border sm:p-10">
            <h3 className="font-heading text-3xl font-bold tracking-wide text-navy uppercase">Request a quote</h3>
            <p className="mt-1 text-sm text-muted-foreground">Fill in the details and send it straight to our sales team on WhatsApp.</p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <Field label="Full name" name="name" required placeholder="John Banda" />
              <Field label="Phone" name="phone" type="tel" required placeholder="+260 ..." />
              <Field label="Company (optional)" name="company" placeholder="Company name" className="sm:col-span-2" />
            </div>

            <fieldset className="mt-6">
              <legend className="mb-3 text-sm font-medium">I&apos;m interested in</legend>
              <div className="flex flex-wrap gap-2">
                {[...productCategories.map((c) => c.label), "Parts & Service"].map((label) => (
                  <button
                    type="button"
                    key={label}
                    onClick={() => setInterest(label)}
                    aria-pressed={interest === label}
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm font-medium transition-all",
                      interest === label
                        ? "border-brand bg-brand text-navy-900"
                        : "border-border bg-white text-muted-foreground hover:border-brand/50 hover:text-foreground"
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="mt-6 grid gap-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Tell us about the equipment, quantity and location..."
                className="min-h-32 rounded-xl px-4 py-3 text-base"
              />
            </div>

            <Button type="submit" size="lg" className="group mt-8 h-13 w-full rounded-full text-base font-semibold sm:w-auto sm:px-10">
              Send enquiry via WhatsApp
              <Send className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
            </Button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  className,
  ...props
}: { label: string; name: string; className?: string } & React.ComponentProps<"input">) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} className="h-12 rounded-xl px-4 text-base" {...props} />
    </div>
  );
}
