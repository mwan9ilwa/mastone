import { Award, Building, Images, LayoutGrid, Package, Users, Wrench, type LucideIcon } from "lucide-react";
import type { ContentKey } from "@/lib/content/schema";

export type AdminSection = { slug: string; key: ContentKey; title: string; description: string; icon: LucideIcon };

export const adminSections: AdminSection[] = [
  { slug: "company", key: "company", title: "Company details", description: "Phone, WhatsApp, email, address and social links", icon: Building },
  { slug: "hero", key: "heroSlides", title: "Hero slides", description: "The rotating banner at the top of the home page", icon: Images },
  { slug: "products", key: "productCategories", title: "Products", description: "Product categories and the machines in each", icon: Package },
  { slug: "brands", key: "brands", title: "Brands", description: "Partner logos in the scrolling brand strip", icon: Award },
  { slug: "about", key: "about", title: "About", description: "Company profile text, highlights and stats", icon: Users },
  { slug: "services", key: "services", title: "Services", description: "The “What we do” cards", icon: Wrench },
  { slug: "industries", key: "industries", title: "Industries", description: "Sectors in the horizontal scrolling showcase", icon: LayoutGrid },
];
