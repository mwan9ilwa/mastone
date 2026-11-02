import { Navbar } from "@/components/navbar";
import { ScrollProgress } from "@/components/scroll-progress";
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

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <HeroSlider />
        <BrandMarquee />
        <About />
        <Products />
        <ParallaxBanner />
        <Services />
        <Industries />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
