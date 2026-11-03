import type { Company } from "./schema";

/** Google's keyless embed: accepts a place name, an address or "lat, lng". */
export const mapEmbedUrl = (company: Company) =>
  `https://maps.google.com/maps?q=${encodeURIComponent(company.mapLocation ?? company.address.join(", "))}&z=14&output=embed`;

export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

/**
 * Images uploaded from the dashboard are served by a route, not as static files. Cloudflare's image optimizer
 * only reads static assets, so these are rendered `unoptimized` on every host to behave the same everywhere.
 */
export const isUploaded = (src?: string) => !!src?.startsWith("/media/");
