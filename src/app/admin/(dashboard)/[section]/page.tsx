import type { ComponentType } from "react";
import { notFound } from "next/navigation";
import {
  AboutEditor,
  BrandsEditor,
  CompanyEditor,
  HeroEditor,
  IndustriesEditor,
  ProductsEditor,
  ServicesEditor,
  ShowcaseEditor,
  TestimonialsEditor,
} from "@/components/admin/editors";
import { adminSections } from "@/components/admin/sections";
import { requireAdmin } from "@/lib/auth";
import { readContent } from "@/lib/content/store";
import type { ContentKey, SiteContent } from "@/lib/content/schema";

const editors: { [K in ContentKey]: ComponentType<{ initial: SiteContent[K] }> } = {
  company: CompanyEditor,
  heroSlides: HeroEditor,
  productCategories: ProductsEditor,
  brands: BrandsEditor,
  about: AboutEditor,
  services: ServicesEditor,
  industries: IndustriesEditor,
  showcase: ShowcaseEditor,
  testimonials: TestimonialsEditor,
};

export function generateStaticParams() {
  return adminSections.map((s) => ({ section: s.slug }));
}

export default async function SectionPage({ params }: PageProps<"/admin/[section]">) {
  const { section } = await params;
  const meta = adminSections.find((s) => s.slug === section);
  if (!meta) notFound();
  await requireAdmin();

  // Read straight from the database (not the public cache) so the editor always starts from what's saved.
  const content = await readContent();
  const Editor = editors[meta.key] as ComponentType<{ initial: unknown }>;
  return <Editor initial={content[meta.key]} />;
}
