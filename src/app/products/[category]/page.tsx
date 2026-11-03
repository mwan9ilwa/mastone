import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand, PageHeader, ServiceHighlights } from "@/components/catalog/page-parts";
import { ProductGrid } from "@/components/sections/products";
import { buildCatalog, categoryCopy, findCategory } from "@/lib/catalog";
import { getContent } from "@/lib/content/store";
import { collectionJsonLd, serializeJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";

async function load(slug: string) {
  const content = await getContent();
  const catalog = buildCatalog(content.productCategories);
  const category = findCategory(catalog, slug);
  return { content, catalog, category };
}

/**
 * Opts out of the dev-time "instant navigation" check, which wants `params` read inside <Suspense>. Doing that makes
 * the prerendered HTML show a loading skeleton with the real content hidden until a script swaps it in, which is bad
 * for crawlers and link previews that don't run JavaScript. These pages are static and prefetched, so navigation
 * stays fast anyway.
 */
export const instant = false;

// Categories added later in the dashboard are rendered on first visit, then cached.
export async function generateStaticParams() {
  const catalog = buildCatalog((await getContent()).productCategories);
  return catalog.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[category]">): Promise<Metadata> {
  const { category } = await load((await params).category);
  if (!category) return {};
  const copy = categoryCopy(category);
  return pageMetadata({ title: copy.title, description: copy.description, path: category.href });
}

export default async function CategoryPage({ params }: PageProps<"/products/[category]">) {
  const { content, catalog, category } = await load((await params).category);
  if (!category) notFound();

  const copy = categoryCopy(category);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: category.label, path: category.href },
  ];
  const others = catalog.filter((c) => c.slug !== category.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            collectionJsonLd({
              crumbs,
              name: copy.title,
              description: copy.description,
              items: category.products.map((p) => ({ name: p.fullName, href: p.href, image: p.image })),
            })
          ),
        }}
      />
      <PageHeader crumbs={crumbs} eyebrow={`${category.products.length} models available`} title={copy.heading}>
        {copy.intro}
      </PageHeader>

      <section className="bg-secondary/60 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {category.products.length ? (
            <ProductGrid category={category} />
          ) : (
            <p className="text-muted-foreground">New models are on the way. Contact us for current availability.</p>
          )}
        </div>
      </section>

      <ServiceHighlights services={content.services} />

      {others.length > 0 && (
        <nav aria-label="Other categories" className="border-t bg-background py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl font-bold tracking-wide text-navy uppercase">More equipment</h2>
            <ul className="mt-6 flex flex-wrap gap-3">
              {others.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={c.href}
                    className="inline-flex rounded-full bg-secondary px-5 py-2.5 text-sm font-semibold text-navy ring-1 ring-border transition-colors hover:bg-brand hover:text-navy-900"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      )}

      <CtaBand
        title={`Get a quote for ${category.label.toLowerCase()}`}
        phone={category.enquiryPhone ?? content.company.phone}
        message={`Hello Mastone, I'd like a quote for ${category.label.toLowerCase()}.`}
      />
    </>
  );
}
