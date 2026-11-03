import Link from "next/link";
import { ChevronRight, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons";
import { ContentIcon } from "@/components/content-icons";
import { Button } from "@/components/ui/button";
import { telHref, whatsappHref } from "@/lib/content/format";
import type { Service } from "@/lib/content/schema";
import { cn } from "@/lib/utils";

export type Crumb = { name: string; path: string };

/** Dark band at the top of inner pages: sits under the fixed, transparent navbar. */
export function PageHeader({
  crumbs,
  eyebrow,
  title,
  children,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <header className="relative overflow-hidden bg-navy-900 pt-32 pb-16 text-white sm:pt-36 sm:pb-20">
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_right,black,transparent_75%)]" />
      <div className="pointer-events-none absolute -top-40 -right-40 size-[36rem] rounded-full bg-brand/15 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs crumbs={crumbs} />
        {eyebrow && (
          <p className="mt-8 inline-flex items-center gap-3 text-sm font-semibold tracking-[0.25em] text-brand uppercase">
            <span className="h-px w-10 bg-current" />
            {eyebrow}
          </p>
        )}
        <h1 className="mt-4 max-w-4xl font-heading text-4xl leading-[0.95] font-bold tracking-tight uppercase sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        {children && <div className="mt-6 max-w-3xl text-lg leading-relaxed text-white/70">{children}</div>}
      </div>
    </header>
  );
}

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/55">
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={c.path} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className="text-white/90">
                  {c.name}
                </span>
              ) : (
                <>
                  <Link href={c.path} className="transition-colors hover:text-brand">
                    {c.name}
                  </Link>
                  <ChevronRight className="size-3.5" aria-hidden />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** WhatsApp quote + call buttons. `phone` is a display number such as "+260 979 106 666". */
export function EnquiryButtons({ phone, message, dark = false }: { phone: string; message: string; dark?: boolean }) {
  return (
    <div className="flex flex-wrap gap-3">
      <Button asChild size="lg" className="h-12 rounded-full px-6 font-semibold">
        <a href={whatsappHref(phone, message)} target="_blank" rel="noopener">
          <WhatsAppIcon className="size-5" />
          Get a quote on WhatsApp
        </a>
      </Button>
      <Button
        asChild
        size="lg"
        variant="outline"
        className={cn(
          "h-12 rounded-full px-6 font-semibold",
          dark && "border-white/30 bg-white/5 text-white hover:bg-white hover:text-navy-900"
        )}
      >
        <a href={telHref(phone)}>
          <Phone className="size-4" />
          Call {phone}
        </a>
      </Button>
    </div>
  );
}

/** "Why buy from us" strip built from the dashboard's services. */
export function ServiceHighlights({ services }: { services: Service[] }) {
  if (!services.length) return null;
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-navy uppercase sm:text-4xl">
          Why buy from <span className="text-brand-deep">Mastone</span>
        </h2>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((s) => (
            <li key={s.title} className="flex gap-4 rounded-2xl bg-secondary/60 p-6 ring-1 ring-border">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-navy-900 text-brand">
                <ContentIcon name={s.icon} className="size-5" />
              </span>
              <div>
                <h3 className="font-heading text-xl font-bold tracking-wide text-navy uppercase">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Closing call to action. */
export function CtaBand({ title, phone, message }: { title: string; phone: string; message: string }) {
  return (
    <section className="relative overflow-hidden bg-navy-900 py-16 text-white">
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <h2 className="font-heading text-3xl font-bold tracking-tight uppercase sm:text-4xl">{title}</h2>
          <p className="mt-2 text-white/65">Prices, availability, delivery and financing: ask our team and we&apos;ll reply fast.</p>
        </div>
        <EnquiryButtons phone={phone} message={message} dark />
      </div>
    </section>
  );
}
