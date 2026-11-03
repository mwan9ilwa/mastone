import Image from "next/image";
import { isUploaded } from "@/lib/content/format";
import type { Brand } from "@/lib/content/schema";

export function BrandMarquee({ brands }: { brands: Brand[] }) {
  const row = [...brands, ...brands];
  return (
    <section aria-label="Brands we supply" className="relative border-y border-border bg-white py-8">
      <div className="mx-auto mb-6 max-w-7xl px-4 text-center text-xs font-semibold tracking-[0.3em] text-muted-foreground uppercase sm:px-6">
        Trusted global brands we supply &amp; support
      </div>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="animate-marquee flex w-max items-center gap-16 pr-16">
          {[...row, ...row].map((brand, i) => (
            <div
              key={`${brand.name}-${i}`}
              className="relative h-14 w-36 shrink-0 opacity-60 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
            >
              <Image src={brand.logo} alt={i < brands.length ? brand.name : ""} fill sizes="144px" unoptimized={isUploaded(brand.logo)} className="object-contain mix-blend-multiply" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
