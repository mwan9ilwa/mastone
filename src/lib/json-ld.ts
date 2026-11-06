import type { CatalogCategory, CatalogProduct } from "@/lib/catalog";
import { buildCatalog } from "@/lib/catalog";
import type { SiteContent } from "@/lib/content/schema";
import { absoluteUrl, siteDescription, siteUrl } from "@/lib/site";

const orgId = `${siteUrl}/#organization`;

/** Phone number in international form for schema.org, e.g. "+260979106666". */
const intlPhone = (phone: string) => phone.replace(/[^\d+]/g, "");

/**
 * schema.org graph for the home page: the business (with its address, contacts and product catalogue) and the website.
 * Helps Google show a knowledge panel / local result and lets search engines and AI assistants understand what is sold.
 */
export function homeJsonLd(content: SiteContent) {
  const { company, brands } = content;
  const productCategories = buildCatalog(content.productCategories);
  const [street, ...locality] = company.address;
  // The default Facebook link is a search page, not the real profile, so it's no use as an identity link.
  const sameAs = company.facebookUrl.includes("/search") ? [] : [company.facebookUrl];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "LocalBusiness"],
        "@id": orgId,
        name: company.name,
        alternateName: "Mastone Investments",
        slogan: company.tagline,
        description: siteDescription,
        url: siteUrl,
        logo: { "@type": "ImageObject", url: absoluteUrl("/images/logo-color.png"), width: 354, height: 101 },
        image: absoluteUrl("/opengraph-image"),
        email: company.email,
        telephone: intlPhone(company.phone),
        address: {
          "@type": "PostalAddress",
          streetAddress: street,
          ...(locality.length && { addressLocality: locality.join(", ") }),
          addressCountry: "ZM",
        },
        hasMap: company.mapUrl,
        areaServed: { "@type": "Country", name: "Zambia" },
        contactPoint: [company.phone, company.secondaryPhone].filter(Boolean).map((phone) => ({
          "@type": "ContactPoint",
          telephone: intlPhone(phone!),
          contactType: "sales",
          areaServed: "ZM",
          availableLanguage: ["English"],
        })),
        brand: brands.map((b) => ({ "@type": "Brand", name: b.name })),
        ...(sameAs.length && { sameAs }),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Equipment and power solutions",
          itemListElement: productCategories.map((category) => ({
            "@type": "OfferCatalog",
            name: category.label,
            description: category.blurb,
            url: absoluteUrl(category.href),
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: company.name,
        description: siteDescription,
        inLanguage: "en",
        publisher: { "@id": orgId },
      },
    ],
  };
}

type Crumb = { name: string; path: string };

const breadcrumbList = (crumbs: Crumb[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: absoluteUrl(c.path) })),
});

/** Lists the pages in the catalogue: the /products index and each category page. */
export function collectionJsonLd({
  crumbs,
  name,
  description,
  items,
}: {
  crumbs: Crumb[];
  name: string;
  description: string;
  items: { name: string; href: string; image?: string }[];
}) {
  const url = absoluteUrl(crumbs[crumbs.length - 1].path);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#page`,
        url,
        name,
        description,
        inLanguage: "en",
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": orgId },
        breadcrumb: breadcrumbList(crumbs),
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: items.length,
          itemListElement: items.map((item, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: item.name,
            url: absoluteUrl(item.href),
            ...(item.image && { image: absoluteUrl(item.image) }),
          })),
        },
      },
    ],
  };
}

export function productJsonLd(product: CatalogProduct, category: CatalogCategory, description: string) {
  const url = absoluteUrl(product.href);
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#page`,
    url,
    name: product.fullName,
    description,
    inLanguage: "en",
    isPartOf: { "@id": `${siteUrl}/#website` },
    breadcrumb: breadcrumbList([
      { name: "Home", path: "/" },
      { name: "Products", path: "/products" },
      { name: category.label, path: category.href },
      { name: product.fullName, path: product.href },
    ]),
  };
}

/** Serialises JSON-LD for a <script> tag, escaping "<" so stored content can't break out of it. */
export const serializeJsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");
