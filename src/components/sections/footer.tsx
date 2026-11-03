import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { CurrentYear } from "@/components/current-year";
import { FacebookIcon, WhatsAppIcon } from "@/components/icons";
import { telHref } from "@/lib/content/format";
import type { Brand, Company, ProductCategory } from "@/lib/content/schema";
import { navLinks } from "@/lib/site";

const socials = (company: Company) => [
  { label: `Call ${company.phone}`, href: telHref(company.phone), icon: Phone },
  { label: "Chat on WhatsApp", href: `https://wa.me/${company.whatsapp}`, icon: WhatsAppIcon },
  { label: `Email ${company.email}`, href: `mailto:${company.email}`, icon: Mail },
  { label: `Facebook: ${company.facebook}`, href: company.facebookUrl, icon: FacebookIcon },
  { label: "Find us on Google Maps", href: company.mapUrl, icon: MapPin },
];

export function Footer({
  company,
  brands,
  productCategories,
}: {
  company: Company;
  brands: Brand[];
  productCategories: ProductCategory[];
}) {
  return (
    <footer className="relative overflow-hidden bg-navy-900 text-white">
      <div className="h-1 bg-gradient-to-r from-brand via-brand-deep to-brand" />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Image src="/images/logo-white.png" alt="Mastone Investments Limited" width={354} height={101} className="h-10 w-auto" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
            Integrated equipment and power solutions provider in Zambia — machinery, vehicles, generators, parts and after-sales support.
          </p>
          <ul className="mt-6 flex flex-wrap gap-3">
            {socials(company).map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener"
                  aria-label={s.label}
                  title={s.label}
                  className="grid size-11 place-items-center rounded-full bg-white/10 text-white transition-all hover:-translate-y-0.5 hover:bg-brand hover:text-navy-900"
                >
                  <s.icon className="size-[1.1rem]" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <FooterList title="Company" items={navLinks.map((l) => ({ label: l.label, href: l.href }))} />
        <FooterList title="Products" items={productCategories.map((c) => ({ label: c.label, href: "#products" }))} />

        <div>
          <h4 className="font-heading text-lg font-bold tracking-widest text-brand uppercase">Get in touch</h4>
          <ul className="mt-5 space-y-4 text-sm text-white/70">
            <li className="flex gap-3">
              <Phone className="size-4 shrink-0 text-brand" />
              <span className="grid gap-1">
                {[company.phone, company.secondaryPhone].filter(Boolean).map((phone) => (
                  <a key={phone} href={telHref(phone!)} className="hover:text-white">
                    {phone}
                  </a>
                ))}
              </span>
            </li>
            <li className="flex gap-3">
              <Mail className="size-4 shrink-0 text-brand" />
              <a href={`mailto:${company.email}`} className="break-all hover:text-white">{company.email}</a>
            </li>
            <li className="flex gap-3">
              <MapPin className="size-4 shrink-0 text-brand" />
              <a href={company.mapUrl} target="_blank" rel="noopener" className="hover:text-white">
                {company.address.join(", ")}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-xs text-white/50 sm:flex-row sm:px-6 lg:px-8">
          <p>© <CurrentYear /> {company.name}. All rights reserved.</p>
          <p className="tracking-wide">Authorised supplier · {brands.map((b) => b.name).join(" · ")}</p>
        </div>
      </div>

      <div aria-hidden className="pointer-events-none -mb-[3vw] text-center font-heading text-[18vw] leading-none font-extrabold tracking-tighter text-white/[0.03] uppercase select-none">
        Mastone
      </div>
    </footer>
  );
}

function FooterList({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="font-heading text-lg font-bold tracking-widest text-brand uppercase">{title}</h4>
      <ul className="mt-5 space-y-3 text-sm text-white/70">
        {items.map((item) => (
          <li key={item.label}>
            <a href={item.href} className="transition-colors hover:text-white">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
