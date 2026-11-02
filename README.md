# Mastone Investments — Website

Marketing site for Mastone Investments Ltd, built with Next.js 16 (App Router), Tailwind CSS v4, shadcn/ui, Motion and Lenis.

```bash
npm install
npm run dev    # http://localhost:3000
npm run build
```

## Where things live

- `src/lib/site.ts` — all copy and data: contact details, hero slides, product catalogue, brands.
- `src/components/sections/` — page sections (hero slider, about, products, services, industries, contact, footer).
- `src/components/smooth-scroll.tsx` — Lenis smooth scrolling (also handles `#anchor` links).
- `public/images/` — logo, hero photos, product cut-outs and brand logos (extracted from the company profile PDF).

## Swapping images

The current photos come from the PDF and are low resolution. Drop higher-resolution files into `public/images/` with the same names (or update the paths in `src/lib/site.ts`) — hero photos should be at least 2400px wide.

## Contact form

There is no backend yet: the quote form opens WhatsApp with the enquiry pre-filled. To send email instead, add a route handler or a form service and update `onSubmit` in `src/components/sections/contact.tsx`.
