import { Navbar } from "@/components/navbar";
import { ScrollProgress } from "@/components/scroll-progress";
import { SmoothScroll } from "@/components/smooth-scroll";
import { HeroSlider } from "@/components/sections/hero-slider";
import { BrandMarquee } from "@/components/sections/brand-marquee";
import { About } from "@/components/sections/about";
import { Products } from "@/components/sections/products";
import { ParallaxBanner } from "@/components/sections/parallax-banner";
import { Services } from "@/components/sections/services";
import { Industries } from "@/components/sections/industries";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import type { Metadata } from "next";
import { buildCatalog } from "@/lib/catalog";
import { getContent } from "@/lib/content/store";
import { homeJsonLd, serializeJsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function Home() {
  const content = await getContent();
  const catalog = buildCatalog(content.productCategories);

  return (
    <SmoothScroll>
      <ScrollProgress />
      <Navbar phone={content.company.phone} />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(homeJsonLd(content)) }} />
        {/* The hero headline rotates between slides, so the page's single, stable h1 lives here for search engines and screen readers. */}
        <h1 className="sr-only">
          {content.company.name}: construction, mining and agricultural equipment, generators and trucks in Zambia
        </h1>
        <HeroSlider slides={content.heroSlides} />
        <BrandMarquee brands={content.brands} />
        <About about={content.about} tagline={content.company.tagline} />
        <Products productCategories={catalog} />
        <ParallaxBanner />
        <Services services={content.services} />
        <Industries industries={content.industries} />
        <Contact company={content.company} productCategories={content.productCategories} />
      </main>
      <Footer company={content.company} brands={content.brands} catalog={catalog} />
      {/* <WhatsAppButton whatsapp={content.company.whatsapp} /> */}
    </SmoothScroll>
  );
}
