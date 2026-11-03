import type { MetadataRoute } from "next";
import { buildCatalog } from "@/lib/catalog";
import { getContent } from "@/lib/content/store";
import { absoluteUrl, siteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await getContent();
  const catalog = buildCatalog(content.productCategories);
  // Image entries help product photos show up in Google Images.
  const images = (list: string[]) => [...new Set(list)].map(absoluteUrl);

  return [
    {
      url: siteUrl,
      changeFrequency: "weekly",
      priority: 1,
      images: images([...content.heroSlides.map((s) => s.image), ...content.industries.map((i) => i.image)]),
    },
    {
      url: absoluteUrl("/products"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...catalog.flatMap((category) => [
      {
        url: absoluteUrl(category.href),
        changeFrequency: "weekly" as const,
        priority: 0.8,
        images: images(category.products.map((p) => p.image)),
      },
      ...category.products.map((product) => ({
        url: absoluteUrl(product.href),
        changeFrequency: "monthly" as const,
        priority: 0.7,
        images: images([product.image]),
      })),
    ]),
  ];
}
