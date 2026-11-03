import { Navbar } from "@/components/navbar";
import { ScrollProgress } from "@/components/scroll-progress";
import { SmoothScroll } from "@/components/smooth-scroll";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { HeroSlider } from "@/components/sections/hero-slider";
import { BrandMarquee } from "@/components/sections/brand-marquee";
import { About } from "@/components/sections/about";
import { Products } from "@/components/sections/products";
import { ParallaxBanner } from "@/components/sections/parallax-banner";
import { Services } from "@/components/sections/services";
import { Industries } from "@/components/sections/industries";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { getContent } from "@/lib/content/store";

export default async function Home() {
  const content = await getContent();

  return (
    <SmoothScroll>
      <ScrollProgress />
      <Navbar phone={content.company.phone} />
      <main>
        <HeroSlider slides={content.heroSlides} />
        <BrandMarquee brands={content.brands} />
        <About about={content.about} tagline={content.company.tagline} />
        <Products productCategories={content.productCategories} />
        <ParallaxBanner />
        <Services services={content.services} />
        <Industries industries={content.industries} />
        <Contact company={content.company} productCategories={content.productCategories} />
      </main>
      <Footer company={content.company} brands={content.brands} productCategories={content.productCategories} />
      <WhatsAppButton whatsapp={content.company.whatsapp} />
    </SmoothScroll>
  );
}
