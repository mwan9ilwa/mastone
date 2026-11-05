import { Navbar } from "@/components/navbar";
import { ScrollProgress } from "@/components/scroll-progress";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Footer } from "@/components/sections/footer";
import { buildCatalog } from "@/lib/catalog";
import { getContent } from "@/lib/content/store";

export default async function ProductsLayout({ children }: LayoutProps<"/products">) {
  const content = await getContent();

  return (
    <SmoothScroll>
      <ScrollProgress />
      <Navbar phone={content.company.phone} home={false} />
      <main>{children}</main>
      <Footer company={content.company} brands={content.brands} catalog={buildCatalog(content.productCategories)} home={false} />
      {/* <WhatsAppButton whatsapp={content.company.whatsapp} /> */}
    </SmoothScroll>
  );
}
