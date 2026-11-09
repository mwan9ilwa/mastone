"use client";

import Image from "next/image";
import { Quote } from "lucide-react";
import { Reveal, SectionLabel } from "@/components/reveal";
import { isUploaded } from "@/lib/content/format";
import type { Testimonial } from "@/lib/content/schema";

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section id="testimonials" className="relative overflow-hidden bg-navy-900 py-24 text-white sm:py-32">
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="pointer-events-none absolute -right-40 -bottom-40 size-[40rem] rounded-full bg-brand/15 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <SectionLabel light>Customer Stories</SectionLabel>
          <h2 className="mt-5 font-heading text-4xl leading-[0.95] font-bold tracking-tight uppercase sm:text-6xl">
            Built on <span className="text-brand">trust</span>
          </h2>
          <p className="mt-6 text-lg text-white/65">
            Hear from the people who count on Mastone to keep their work moving.
          </p>
        </Reveal>

        {testimonials.length > 0 ? (
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Reveal key={`${testimonial.name}-${index}`} delay={(index % 3) * 0.08}>
                <figure className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur sm:p-8">
                  <Quote aria-hidden="true" className="size-9 fill-brand/15 text-brand" />
                  <blockquote className="mt-5 flex-1 text-lg leading-relaxed text-white/85">
                    “{testimonial.quote}”
                  </blockquote>
                  <figcaption className="mt-7 flex items-center gap-4 border-t border-white/10 pt-5">
                    {testimonial.image ? (
                      <div className="relative size-12 shrink-0 overflow-hidden rounded-full bg-white/10">
                        <Image
                          src={testimonial.image}
                          alt=""
                          fill
                          sizes="48px"
                          unoptimized={isUploaded(testimonial.image)}
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <span aria-hidden="true" className="grid size-12 shrink-0 place-items-center rounded-full bg-brand font-heading text-lg font-bold text-navy-900">
                        {testimonial.name.trim().slice(0, 1).toUpperCase()}
                      </span>
                    )}
                    <span>
                      <span className="block font-semibold">{testimonial.name}</span>
                      {(testimonial.position || testimonial.company) && (
                        <span className="mt-0.5 block text-sm text-white/55">
                          {[testimonial.position, testimonial.company].filter(Boolean).join(", ")}
                        </span>
                      )}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="mx-auto mt-12 max-w-xl rounded-3xl border border-dashed border-white/20 bg-white/[0.04] px-6 py-10 text-center text-white/65">
            Customer testimonials will be featured here soon.
          </p>
        )}
      </div>
    </section>
  );
}
