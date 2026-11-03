# SEO guide

**Goal:** when someone in Zambia searches Google for one of our products or categories (e.g. "SUNWARD SWE210", "YTO tractors Zambia", "diesel generator Lusaka"), this site appears in the top 5 results.

No one can guarantee a Google position. The steps below are the ones that decide it, in order of impact. The code side is mostly done; most of what remains is outside the code: Google Search Console, a Google Business Profile, content and links.

## 1. What the site already does

| Item | Where | What it gives Google |
| --- | --- | --- |
| Title, description, keywords, canonical URL, `en_ZM` locale | `src/app/layout.tsx`, `src/app/page.tsx` | What the page is about and the one URL to rank |
| `robots.txt` | `src/app/robots.ts` | Allows crawling and blocks `/admin` |
| `sitemap.xml` with product images | `src/app/sitemap.ts` | Every product photo, so products can appear in Google Images |
| Structured data (JSON-LD) | `src/lib/json-ld.ts` | Business name, address, phones, email, map, brands and the full product catalogue |
| Social share image | `src/app/opengraph-image.tsx` | Preview card on WhatsApp, Facebook, LinkedIn and X |
| One stable `<h1>`, alt text on images | `src/app/page.tsx`, sections | Clear page topic and image context |
| `noindex` on the dashboard | `src/app/admin/layout.tsx` | Keeps admin pages out of Google |

The sitemap and structured data are built from dashboard content, so new or renamed products are picked up automatically after a save.

## 2. Launch checklist (do once)

### 2.1 Set the domain

Set `NEXT_PUBLIC_SITE_URL` to the live domain, e.g. `https://mastone.co.zm` (no trailing slash), then rebuild and redeploy. It is read **at build time**.

- **Vercel:** Settings → Environment Variables.
- **Cloudflare:** add it to the build environment (and `.dev.vars` for `npm run preview:cf`).

Until it's set, canonical links, the sitemap and share previews point at `localhost`.

A `.zm` domain (`.co.zm` or `.zm`) is a strong signal to Google that the business serves Zambia. Use one if possible.

### 2.2 Google Search Console

1. Go to <https://search.google.com/search-console> and add the domain as a **URL prefix** property.
2. Choose the **HTML tag** method. Copy only the `content="…"` value into `GOOGLE_SITE_VERIFICATION`, redeploy, then click **Verify**.
3. **Sitemaps** → submit `sitemap.xml`.
4. **URL Inspection** → paste the homepage URL → **Request indexing**.
5. Check **Pages** after a few days to confirm the homepage is indexed.

### 2.3 Bing Webmaster Tools

At <https://www.bing.com/webmasters>, either import the Search Console property (quickest) or use the meta tag method with `BING_SITE_VERIFICATION`. Submit the sitemap there too. Bing also feeds DuckDuckGo and some AI assistants.

### 2.4 Google Business Profile (most important for Zambia)

For searches with local intent ("excavator Lusaka", "tractors near me"), the Google Maps listing at the top of the results usually matters more than the website ranking.

1. Create the profile at <https://business.google.com> for **Mastone Investments Ltd**, Plot No. 24603, along 7070 Road, Chibombo.
2. Category: *Construction machine dealer*. Add *Tractor dealer*, *Generator shop*, *Truck dealer* and *Machine repair service* as extra categories.
3. Use **exactly** the same name, address and phone numbers as the website footer.
4. Add the website URL, opening hours, and real photos of the yard, machines and team.
5. Add each product category under **Products**, with a photo and a link to the site.
6. Ask happy customers for Google reviews and reply to every one. Reviews strongly affect local ranking.
7. Post an update (new stock, a delivery, a promotion) at least twice a month.

### 2.5 Dashboard clean-up

- **Company → Facebook URL:** replace the placeholder search link with the real Facebook page URL. It's then added to the structured data as an official profile.
- **Products:** make sure every product has its brand, full model name and specs filled in. These are the words people search for.

### 2.6 Check it works

- <https://search.google.com/test/rich-results>: paste the homepage URL. It should detect *Organization* / *Local business*.
- <https://www.opengraph.xyz>: paste the URL to preview the share card.
- Visit `/robots.txt` and `/sitemap.xml` on the live site.
- <https://pagespeed.web.dev>: aim for green on mobile. Most people in Zambia browse on phones over mobile data.

## 3. What gets us into the top 5

### 3.1 One page per category and per product ✅ done

Every category and product has its own page, generated from the dashboard content:

| Page | Example | Title (shown in Google) |
| --- | --- | --- |
| Catalogue | `/products` | Construction, Mining & Agricultural Equipment for Sale in Zambia |
| Category | `/products/excavators` | SUNWARD Excavators for Sale in Zambia |
| Product | `/products/excavators/sunward-swe210` | SUNWARD SWE210 Hydraulic Excavator for Sale in Zambia |

Each page has its own title, meta description, canonical URL, breadcrumbs (also as structured data, so Google can show them in results), a WhatsApp/call enquiry button and links to related products. Product pages also carry `Product` structured data with the full spec list. All pages are in `sitemap.xml`.

How it works with the dashboard:

- **Adding a product or category** creates its page automatically (rendered on first visit, then cached) and adds it to the sitemap.
- **URLs come from the names:** the category label and the product's brand + name (e.g. "SUNWARD" + "SWE210" → `sunward-swe210`). **Renaming a product or category changes its URL** and the old URL stops working, which loses its Google ranking. Avoid renaming once pages are indexed; if you must, ask a developer to add a redirect in `next.config.ts`.
- **Fill in the "models" field with the product type** (e.g. "Hydraulic excavator", "4WD tractor"). It goes into the page title, and it's what people search for.
- **Specs matter:** the first three specs appear in the Google description, and all of them on the page.
- **Prices:** without prices, products can't get Google's product rich results (price/stock shown in results). Showing prices, even "from K…", would unlock them.

Code: routes in `src/app/products/`, URLs and page copy in `src/lib/catalog.ts`, structured data in `src/lib/json-ld.ts`.

### 3.2 Unique written content

Competitors often copy the manufacturer's text. Write 150–300 words of our own for each product page, covering:

- what jobs it suits in Zambia (mining on the Copperbelt, farming in Central and Southern Province, road works);
- availability, delivery, financing or lease options, warranty, and spare parts held in stock;
- after-sales service and response times.

Words customers actually use ("price", "for sale", "in Lusaka", "in Zambia") should appear naturally in titles and text.

### 3.3 Links from other sites

Links from trusted Zambian and industry sites are one of Google's strongest ranking signals. Get listed or linked on:

- SUNWARD, YTO, WEICHAI, SINOTRUK and SHACMAN **official dealer pages** (ask each brand to list us as the Zambia dealer; this is the most valuable link);
- Zambian business directories: ZDA, Zambia Chamber of Commerce, Yellow Pages Zambia, ZambiaInvest, etc.;
- industry associations (Chamber of Mines, Zambia National Farmers Union), trade shows (Agritech Expo) and local news coverage of deliveries or partnerships;
- our own Facebook, LinkedIn, YouTube and TikTok profiles, each linking back to the site.

### 3.4 Keep it active

- Add new stock and photos through the dashboard as it arrives.
- Short news or case-study posts ("10 YTO tractors delivered to a farm in Mkushi") give Google fresh content and people a reason to link to the site. *(Needs a news section; not built yet.)*
- Short machine videos on YouTube, linked from the product pages.

## 4. Target searches

Track these in Search Console (**Performance → Queries**, filtered to **Country: Zambia**):

| Category | Example searches |
| --- | --- |
| Excavators | SUNWARD excavator Zambia, SWE210, SWE375F, SWE385F, SWE600F, SWE950E, mining excavator for sale Zambia |
| Loaders & drill rigs | SUNWARD SL52W wheel loader, wheel loader Zambia, rock drilling rig Zambia, SWDE152B |
| Agriculture | YTO tractor Zambia, YTO ELP3004, ELX 2404, E1954, EX1754, EX1304, EX1054, NLX 954, EX 854, EM604, tractor price Zambia |
| Commercial vehicles | SINOTRUK HOWO Zambia, SHACMAN truck Zambia, tipper truck for sale Lusaka |
| Power generation | WEICHAI generator Zambia, diesel generator Lusaka, silent generator Zambia, 100 kVA generator price |
| Brand / local | Mastone Investments, equipment dealer Chibombo, heavy machinery Lusaka |

## 5. What to expect

- **Brand name searches** ("Mastone Investments"): top result within days to a few weeks of indexing.
- **Exact model numbers** (e.g. "SWE385F Zambia"): competition is low and each model now has its own page, so the top 5 is realistic within 1–3 months of indexing.
- **Broad category searches** ("excavator Zambia", "generator Lusaka"): the hardest. Expect 3–6+ months, and it depends mostly on the Business Profile, reviews and links in section 3.

Review Search Console monthly. Queries with many impressions but a low position are the next pages to improve.

## 6. Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yes, for production | Live domain used in canonical URLs, sitemap, robots.txt, share previews and structured data. Read at build time. |
| `GOOGLE_SITE_VERIFICATION` | Optional | Google Search Console HTML-tag code |
| `BING_SITE_VERIFICATION` | Optional | Bing Webmaster Tools `msvalidate.01` code |
