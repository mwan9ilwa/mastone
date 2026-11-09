"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { Reveal, SectionLabel } from "@/components/reveal";
import { isUploaded } from "@/lib/content/format";
import type { ShowcaseItem } from "@/lib/content/schema";
import { getVideoEmbedUrl } from "@/lib/content/video";

export function Showcase({ items }: { items: ShowcaseItem[] }) {
  const [activePhoto, setActivePhoto] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const photos = items.filter((item) => item.kind === "photo" && item.image);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (activePhoto !== null && !dialog.open) dialog.showModal();
    if (activePhoto === null && dialog.open) dialog.close();
  }, [activePhoto]);

  const movePhoto = (direction: -1 | 1) => {
    setActivePhoto((current) =>
      current === null ? null : (current + direction + photos.length) % photos.length
    );
  };
  const selectedPhoto = activePhoto === null ? null : photos[activePhoto];

  return (
    <section id="showcase" className="relative overflow-hidden bg-secondary/60 py-24 sm:py-32">
      <div className="pointer-events-none absolute -top-40 -right-40 size-[36rem] rounded-full bg-brand/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <SectionLabel>Project Showcase</SectionLabel>
          <h2 className="mt-5 font-heading text-4xl leading-[0.95] font-bold tracking-tight text-navy uppercase sm:text-6xl">
            See our work <span className="text-brand-deep">in action</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            A closer look at the equipment and projects we help bring to life.
          </p>
        </Reveal>

        {items.length > 0 ? (
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => (
              <Reveal key={`${item.title}-${index}`} delay={(index % 3) * 0.08}>
                <article className="group h-full overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-border transition-shadow hover:shadow-xl">
                  <div className="relative aspect-[4/3] overflow-hidden bg-navy-900">
                    {item.kind === "photo" && item.image ? (
                      <button
                        type="button"
                        onClick={() => setActivePhoto(photos.indexOf(item))}
                        aria-label={`View ${item.title} photo`}
                        className="absolute inset-0 size-full cursor-zoom-in"
                      >
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          unoptimized={isUploaded(item.image)}
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <span aria-hidden="true" className="absolute inset-0 grid place-items-center bg-navy-900/0 text-white/0 transition-colors group-hover:bg-navy-900/20 group-hover:text-white">
                          <ZoomIn className="size-10" />
                        </span>
                      </button>
                    ) : item.kind === "video" && item.videoUrl ? (
                      isDirectVideo(item.videoUrl) ? (
                        <video
                          src={item.videoUrl}
                          poster={item.poster}
                          controls
                          playsInline
                          preload="none"
                          aria-label={item.title}
                          className="size-full object-cover"
                        >
                          Your browser does not support video playback.
                        </video>
                      ) : (
                        <iframe
                          src={getVideoEmbedUrl(item.videoUrl) ?? ""}
                          title={item.title}
                          loading="lazy"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                          className="size-full border-0"
                        />
                      )
                    ) : null}
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-2xl font-bold tracking-wide text-navy uppercase">{item.title}</h3>
                    {item.description && <p className="mt-2 leading-relaxed text-muted-foreground">{item.description}</p>}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="mx-auto mt-12 max-w-xl rounded-3xl border border-dashed border-navy/20 bg-white/70 px-6 py-10 text-center text-muted-foreground">
            Project photos and videos will be featured here soon.
          </p>
        )}
      </div>
      <dialog
        ref={dialogRef}
        aria-label="Photo viewer"
        onClose={() => setActivePhoto(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setActivePhoto(null);
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") movePhoto(-1);
          if (event.key === "ArrowRight") movePhoto(1);
        }}
        className="fixed inset-0 m-auto max-h-[90vh] w-[calc(100%-2rem)] max-w-6xl overflow-visible border-0 bg-transparent p-0 text-white backdrop:bg-navy-900/90"
      >
        {selectedPhoto?.image && (
          <div className="relative h-[min(80vh,800px)] w-full">
            <Image
              src={selectedPhoto.image}
              alt={selectedPhoto.title}
              fill
              sizes="100vw"
              unoptimized={isUploaded(selectedPhoto.image)}
              className="object-contain"
            />
            <button
              type="button"
              onClick={() => setActivePhoto(null)}
              aria-label="Close photo viewer"
              className="absolute -top-12 right-0 grid size-10 place-items-center rounded-full bg-white/10 hover:bg-white/20"
            >
              <X className="size-6" />
            </button>
            {photos.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => movePhoto(-1)}
                  aria-label="Previous photo"
                  className="absolute top-1/2 left-2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-black/50 hover:bg-black/75 sm:-left-14"
                >
                  <ChevronLeft className="size-7" />
                </button>
                <button
                  type="button"
                  onClick={() => movePhoto(1)}
                  aria-label="Next photo"
                  className="absolute top-1/2 right-2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-black/50 hover:bg-black/75 sm:-right-14"
                >
                  <ChevronRight className="size-7" />
                </button>
              </>
            )}
            <p className="absolute right-0 -bottom-8 left-0 text-center text-sm text-white/80">{selectedPhoto.title}</p>
          </div>
        )}
      </dialog>
    </section>
  );
}

function isDirectVideo(url: string) {
  return /\.(mp4|webm)(?:$|[?#])/i.test(url);
}
