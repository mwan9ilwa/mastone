import type { Metadata } from "next";
import { siteName } from "@/lib/site";

/**
 * Metadata for an inner page. Child `openGraph`/`twitter` objects replace the root layout's rather than merging,
 * so the shared fields are repeated here. The share image comes from app/opengraph-image.tsx.
 */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", locale: "en_ZM", siteName, url: path, title, description },
    twitter: { card: "summary_large_image", title, description },
  };
}
