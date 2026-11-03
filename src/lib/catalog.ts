import type { Product, ProductCategory } from "@/lib/content/schema";

/**
 * URLs for the product catalogue, derived from dashboard content:
 *   /products/<category label>/<brand + product name>, e.g. /products/excavators/sunward-swe210
 * Renaming a category or product in the dashboard changes its URL.
 */

export const slugify = (text: string) =>
  text
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "item";

export type CatalogProduct = Product & {
  slug: string;
  href: string;
  /** "SUNWARD SWE210"; skips the brand when the product name already starts with it. */
  fullName: string;
};
export type CatalogCategory = Omit<ProductCategory, "products"> & {
  slug: string;
  href: string;
  products: CatalogProduct[];
};

/** Gives a list of base slugs unique values by appending -2, -3… to repeats. */
function uniqueSlugs(bases: string[]) {
  const seen = new Map<string, number>();
  return bases.map((base) => {
    const n = (seen.get(base) ?? 0) + 1;
    seen.set(base, n);
    return n === 1 ? base : `${base}-${n}`;
  });
}

export const productFullName = (p: Pick<Product, "brand" | "name">) =>
  p.name.toLowerCase().startsWith(p.brand.toLowerCase()) ? p.name : `${p.brand} ${p.name}`;

export function buildCatalog(categories: ProductCategory[]): CatalogCategory[] {
  const categorySlugs = uniqueSlugs(categories.map((c) => slugify(c.label)));
  return categories.map((category, i) => {
    const href = `/products/${categorySlugs[i]}`;
    const productSlugs = uniqueSlugs(category.products.map((p) => slugify(productFullName(p))));
    return {
      ...category,
      slug: categorySlugs[i],
      href,
      products: category.products.map((p, j) => ({
        ...p,
        slug: productSlugs[j],
        href: `${href}/${productSlugs[j]}`,
        fullName: productFullName(p),
      })),
    };
  });
}

export function findCategory(catalog: CatalogCategory[], slug: string) {
  return catalog.find((c) => c.slug === slug);
}

/** Brands carried in a category, in order of first appearance. */
export const categoryBrands = (category: CatalogCategory) => [...new Set(category.products.map((p) => p.brand))];

/* ---------- Page copy: titles and descriptions built from product data ---------- */

const listJoin = (items: string[]) =>
  items.length <= 1 ? (items[0] ?? "") : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;

const titleCase = (text: string) => text.replace(/\b[a-z]/g, (c) => c.toUpperCase());

/** Trims to ~155 characters at a word boundary, for meta descriptions. */
export const clip = (text: string, max = 155) =>
  text.length <= max ? text : `${text.slice(0, text.lastIndexOf(" ", max - 1)).replace(/[,.;:\s]+$/, "")}…`;

export function categoryCopy(category: CatalogCategory) {
  const brands = categoryBrands(category);
  const brandPrefix = brands.length && brands.length <= 2 ? `${brands.join(" & ")} ` : "";
  return {
    title: `${brandPrefix}${category.label} for Sale in Zambia`,
    heading: `${category.label} in Zambia`,
    intro: `${category.blurb} Mastone Investments supplies ${listJoin(brands)} ${category.label.toLowerCase()} across Zambia, with delivery, genuine spare parts, maintenance and after-sales support.`,
    description: clip(
      `${category.label} for sale in Zambia: ${listJoin(category.products.slice(0, 4).map((p) => p.fullName))}${
        category.products.length > 4 ? " and more" : ""
      }. ${category.blurb}`
    ),
  };
}

export function productCopy(product: CatalogProduct, category: CatalogCategory) {
  // Product "models" doubles as a type, e.g. "Hydraulic excavator"; skip it in titles when it's a long phrase.
  // It can also be a model line such as "WEICHAI Landking"; that goes in brackets instead.
  const models = product.models.toLowerCase();
  const name = product.fullName.toLowerCase();
  const isType = product.models.length <= 32 && !/[·|]/.test(models) && !models.includes(product.brand.toLowerCase());
  const type = isType && !name.includes(models) ? product.models : "";
  const named = type ? `${product.fullName} ${titleCase(type)}` : product.fullName;
  // Skip the bracketed note when every word of it is already in the name ("SINOTRUK HOWO Tipper Truck").
  const note = !isType && !models.split(/\s+/).every((w) => name.includes(w)) ? ` (${product.models})` : "";
  const keySpecs = product.specs
    .slice(0, 3)
    .map((s) => `${s.label.toLowerCase()} ${s.value}`)
    .join(", ");
  const summary = `${named}${note} for sale in Zambia${keySpecs ? `: ${keySpecs}` : ""}.`;
  return {
    title: `${named} for Sale in Zambia`,
    heading: product.fullName,
    summary: `${summary} Supplied by Mastone Investments with delivery, genuine spare parts and after-sales support. ${category.blurb}`,
    description: clip(`${summary} Genuine parts, delivery and after-sales support from Mastone Investments.`),
  };
}
