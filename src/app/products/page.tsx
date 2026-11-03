import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CtaBand, PageHeader, ServiceHighlights } from "@/components/catalog/page-parts";
import { buildCatalog, categoryBrands, clip } from "@/lib/catalog";
import { isUploaded } from "@/lib/content/format";
import { getContent } from "@/lib/content/store";
import { collectionJsonLd, serializeJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";

const title = "Construction, Mining & Agricultural Equipment for Sale in Zambia";

export async function generateMetadata(): Promise<Metadata> {
  const catalog = buildCatalog((await getContent()).productCategories);
  return pageMetadata({
    title,
    description: clip(
      `${catalog.map((c) => c.label).join(", ")} from ${[...new Set(catalog.flatMap(categoryBrands))].join(", ")}, supplied across Zambia by Mastone Investments with parts and after-sales support.`
    ),
    path: "/products",
  });
}

export default async function ProductsPage() {
  const content = await getContent();
  const catalog = buildCatalog(content.productCategories);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            collectionJsonLd({
              crumbs,
              name: title,
              description: "Mastone Investments product catalogue.",
              items: catalog.map((c) => ({ name: c.label, href: c.href, image: c.products[0]?.image })),
            })
          ),
        }}
      />
      <PageHeader crumbs={crumbs} eyebrow="Our Products" title={<>Equipment &amp; power <span className="text-brand">for every job site</span></>}>
        Construction and mining machinery, farm tractors, commercial trucks and diesel generators from world-class manufacturers,
        supplied and supported across Zambia.
      </PageHeader>

      <section className="bg-secondary/60 py-20">
        <ul className="mx-auto grid max-w-7xl gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
          {catalog.map((c) => {
            const cover = c.products[0];
            return (
              <li key={c.slug}>
                <Link
                  href={c.href}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-border transition-shadow duration-500 hover:shadow-2xl hover:shadow-navy/15"
                >
                  <div className="relative aspect-[16/10] bg-gradient-to-b from-secondary to-white">
                    {cover && (
                      <Image
                        src={cover.image}
                        alt={`${c.label}: ${cover.fullName}`}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        unoptimized={isUploaded(cover.image)}
                        className="object-contain p-8 transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-xs font-semibold tracking-[0.2em] text-brand-deep uppercase">{categoryBrands(c).join(" · ")}</p>
                    <h2 className="mt-2 font-heading text-3xl font-bold tracking-wide text-navy uppercase">{c.label}</h2>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{c.blurb}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-deep group-hover:text-navy">
                      {c.products.length} {c.products.length === 1 ? "model" : "models"}
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <ServiceHighlights services={content.services} />
      <CtaBand
        title="Not sure which machine you need?"
        phone={content.company.phone}
        message="Hello Mastone, I'd like advice on choosing equipment."
      />
    </>
  );
}
