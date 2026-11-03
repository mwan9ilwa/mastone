# Mastone Investments — Website

Marketing site for Mastone Investments Ltd, built with Next.js 16 (App Router), Tailwind CSS v4, shadcn/ui, Motion and Lenis, with a small admin dashboard at `/admin` for editing the content. It deploys to either **Vercel** or **Cloudflare Workers** from the same code.

```bash
npm install
cp .env.example .env.local   # then set ADMIN_PASSWORD and SESSION_SECRET
npm run dev                  # http://localhost:3000, dashboard at /admin
npm run build
```

Locally the content is stored in a SQLite file (`local.db`, git-ignored), so no database account is needed for development.

## Where things live

- `src/lib/content/schema.ts`: the shape of all editable content (validated with zod on save).
- `src/lib/content/defaults.ts`: the original copy and data. A section that has never been saved from the dashboard shows these.
- `src/lib/content/store.ts`: reads and writes content. The public page uses a cached copy (`'use cache'` + `cacheTag`), and each dashboard save calls `updateTag` so the change is live immediately.
- `src/app/admin/`: the dashboard (login, section editors, Server Actions in `actions.ts`).
- `src/app/media/[file]/route.ts`: serves images uploaded from the dashboard (stored in the database).
- `src/components/sections/`: page sections (hero slider, about, products, services, industries, contact, footer).
- `public/images/`: logo, hero photos, product cut-outs and brand logos.

Section headings and the parallax banner text are still in the components; everything else is editable from the dashboard.

## Dashboard

Sign in at `/admin` with `ADMIN_PASSWORD`. Each section (company details, hero slides, products, brands, about, services, industries) has its own editor with **Save**, **Discard** and **Restore original**. Images can be uploaded (PNG, JPG, WebP, AVIF or GIF, up to 4 MB) or referenced by path, e.g. `/images/products/excavator.png`.

## Deploying

Both targets need a [Turso](https://turso.tech) database (free tier is plenty), because libSQL is reachable from both runtimes over HTTP:

```bash
turso db create mastone
turso db show mastone --url        # → TURSO_DATABASE_URL
turso db tokens create mastone     # → TURSO_AUTH_TOKEN
```

The tables are created automatically on first use.

| Variable | Purpose |
| --- | --- |
| `ADMIN_PASSWORD` | Dashboard password |
| `SESSION_SECRET` | Signs the login cookie (`openssl rand -base64 32`) |
| `TURSO_DATABASE_URL` | `libsql://…` URL of the Turso database |
| `TURSO_AUTH_TOKEN` | Turso access token |
| `NEXT_PUBLIC_SITE_URL` | Live domain, e.g. `https://mastone.co.zm`. Needed at build time for SEO (canonical URLs, sitemap, share previews) |
| `GOOGLE_SITE_VERIFICATION`, `BING_SITE_VERIFICATION` | Optional search console verification codes |

After the first deploy, follow the launch checklist in [docs/SEO.md](docs/SEO.md) (Search Console, Google Business Profile, etc.).

### Vercel

Import the repo in Vercel, add the variables above under **Settings → Environment Variables**, and deploy. No other configuration is needed; `wrangler.jsonc` and `open-next.config.ts` are ignored.

### Cloudflare Workers

Uses [OpenNext for Cloudflare](https://opennext.js.org/cloudflare). R2 caches the prerendered pages and D1 tracks cache tags, so dashboard saves reach the live site straight away.

```bash
npx wrangler login
npx wrangler r2 bucket create mastone-next-cache
npx wrangler d1 create mastone-next-tags     # paste the database_id into wrangler.jsonc
npx wrangler secret put ADMIN_PASSWORD        # repeat for SESSION_SECRET, TURSO_DATABASE_URL, TURSO_AUTH_TOKEN
npm run deploy:cf
```

`npm run preview:cf` runs the Workers build locally (put the variables in `.dev.vars`).

Images uploaded from the dashboard are served without Next's image optimizer on both hosts, because Cloudflare's optimizer can only read static files. They are cached by browsers and CDNs for a year. Keep uploads reasonably sized.

## SEO

See [docs/SEO.md](docs/SEO.md) for what's in place, the launch checklist and the plan for ranking product searches in Zambia.

## Contact form

The quote form opens WhatsApp with the enquiry pre-filled; its phone number comes from the dashboard's company details. To send email instead, add a route handler or a form service and update `onSubmit` in `src/components/sections/contact.tsx`.
