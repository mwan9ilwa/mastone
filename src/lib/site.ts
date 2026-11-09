export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Services", href: "#services" },
  { label: "Industries", href: "#industries" },
  { label: "Showcase", href: "#showcase" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

/**
 * Public origin of the site, used for canonical URLs, the sitemap, Open Graph tags and structured data.
 * Set NEXT_PUBLIC_SITE_URL to override the production domain. It is read at build time.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.mastoneinvestments.com"
).replace(/\/+$/, "");

/** Absolute URL for a site path or an already-absolute URL. */
export const absoluteUrl = (path: string) => new URL(path, `${siteUrl}/`).toString();

export const siteName = "Mastone Investments Ltd";
export const siteTitle = "Equipment Supplier in Zambia | Mastone Investments";
export const siteDescription =
  "Authorized SUNWARD, YTO and WEICHAI supplier serving Chibombo, Lusaka and Zambia. Excavators, tractors, generators, parts and after-sales support.";

export const siteKeywords = [
  "Mastone Investments",
  "construction equipment Zambia",
  "mining equipment Zambia",
  "SUNWARD excavators Zambia",
  "SUNWARD wheel loaders",
  "YTO tractors Zambia",
  "WEICHAI generators Zambia",
  "diesel generators Lusaka",
  "SINOTRUK HOWO trucks Zambia",
  "SHACMAN trucks",
  "heavy machinery Lusaka",
  "equipment dealer Chibombo",
  "spare parts and after-sales service Zambia",
];
