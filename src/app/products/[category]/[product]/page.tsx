import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Breadcrumbs, CtaBand, EnquiryButtons, ServiceHighlights } from "@/components/catalog/page-parts";
import { ProductGrid } from "@/components/sections/products";
import { Badge } from "@/components/ui/badge";
import { buildCatalog, findCategory, productCopy } from "@/lib/catalog";
import { isUploaded } from "@/lib/content/format";
import { getContent } from "@/lib/content/store";
import { productJsonLd, serializeJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";

async function load({ category: categorySlug, product: productSlug }: { category: string; product: string }) {
  const content = await getContent();
  const category = findCategory(buildCatalog(content.productCategories), categorySlug);
  const product = category?.products.find((p) => p.slug === productSlug);
  return { content, category, product };
}

/**
 * Opts out of the dev-time "instant navigation" check, which wants `params` read inside <Suspense>. Doing that makes
 * the prerendered HTML show a loading skeleton with the real content hidden until a script swaps it in, which is bad
 * for crawlers and link previews that don't run JavaScript. These pages are static and prefetched, so navigation
 * stays fast anyway.
 */
export const instant = false;

// Products added later in the dashboard are rendered on first visit, then cached.
export async function generateStaticParams() {
  const catalog = buildCatalog((await getContent()).productCategories);
  return catalog.flatMap((c) => c.products.map((p) => ({ category: c.slug, product: p.slug })));
}

export async function generateMetadata({ params }: PageProps<"/products/[category]/[product]">): Promise<Metadata> {
  const { category, product } = await load(await params);
  if (!category || !product) return {};
  const copy = productCopy(product, category);
  return pageMetadata({ title: copy.title, description: copy.description, path: product.href });
}

export default async function ProductPage({ params }: PageProps<"/products/[category]/[product]">) {
  const { content, category, product } = await load(await params);
  if (!category || !product) notFound();

  const copy = productCopy(product, category);
  const phone = product.enquiryPhone ?? category.enquiryPhone ?? content.company.phone;
  const message = `Hello Mastone, I'd like a quote for the ${product.fullName}.`;
  const related = category.products.filter((p) => p.slug !== product.slug).slice(0, 4);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(productJsonLd(product, category, copy.summary)) }}
      />

      <article>
        <div className="relative overflow-hidden bg-navy-900 pt-32 pb-16 text-white sm:pt-36">
          <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_right,black,transparent_75%)]" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Breadcrumbs
              crumbs={[
                { name: "Home", path: "/" },
                { name: "Products", path: "/products" },
                { name: category.label, path: category.href },
                { name: product.fullName, path: product.href },
              ]}
            />

            <div className="mt-10 grid items-center gap-10 lg:grid-cols-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-gradient-to-b from-white to-secondary">
                <Badge className="absolute top-5 left-5 z-10 rounded-full bg-navy-900 px-3 text-[0.7rem] tracking-[0.15em] text-white uppercase">
                  {product.brand}
                </Badge>
                <Image
                  src={product.image}
                  alt={`${product.fullName} ${product.models}`}
                  fill
                  preload
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  unoptimized={isUploaded(product.image)}
                  className="object-contain p-10"
                />
              </div>

              <div>
                <p className="inline-flex items-center gap-3 text-sm font-semibold tracking-[0.25em] text-brand uppercase">
                  <span className="h-px w-10 bg-current" />
                  {category.label}
                </p>
                <h1 className="mt-4 font-heading text-5xl leading-[0.95] font-bold tracking-tight uppercase sm:text-6xl">
                  {copy.heading}
                </h1>
                <p className="mt-3 text-xl text-white/80">{product.models}</p>
                <p className="mt-6 leading-relaxed text-white/65">{copy.summary}</p>
                <div className="mt-8">
                  <EnquiryButtons phone={phone} message={message} dark />
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="bg-background py-16">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[2fr_1fr] lg:px-8">
            <div>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-navy uppercase">
                {product.fullName} specifications
              </h2>
              {product.specs.length ? (
                <dl className="mt-6 divide-y divide-border rounded-2xl ring-1 ring-border">
                  {product.specs.map((s, i) => (
                    <div key={i} className="grid gap-1 px-5 py-3.5 sm:grid-cols-2 sm:gap-6">
                      <dt className="text-sm text-muted-foreground">{s.label}</dt>
                      <dd className="text-sm font-medium text-foreground">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="mt-6 text-muted-foreground">
                  Full specifications and configuration options are available on request. Message us for a detailed brochure.
                </p>
              )}
            </div>

            <aside className="h-fit rounded-3xl bg-secondary/60 p-7 ring-1 ring-border">
              <h2 className="font-heading text-2xl font-bold tracking-wide text-navy uppercase">Buying in Zambia</h2>
              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                {content.about.points.map((point) => (
                  <li key={point} className="flex gap-2.5">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand" />
                    {point}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-muted-foreground">
                Visit us at {content.company.address.join(", ")}.
              </p>
            </aside>
          </div>
        </section>
      </article>

      {related.length > 0 && (
        <section className="bg-secondary/60 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-heading text-3xl font-bold tracking-tight text-navy uppercase sm:text-4xl">
                More {category.label.toLowerCase()}
              </h2>
              <Link href={category.href} className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-deep hover:text-navy">
                <ArrowLeft className="size-4" />
                All {category.label.toLowerCase()}
              </Link>
            </div>
            <ProductGrid category={category} products={related} />
          </div>
        </section>
      )}

      <ServiceHighlights services={content.services} />
      <CtaBand title={`Ready to order the ${product.fullName}?`} phone={phone} message={message} />
    </>
  );
}
