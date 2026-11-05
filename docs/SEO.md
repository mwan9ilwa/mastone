# SEO guide

**Goal:** help people searching for Mastone and the equipment it sells find the official site. Google decides ranking; no technical setting can guarantee first place, especially for broad searches such as "tractors".

The technical SEO setup is in place, but the live sitemap currently uses a Vercel hostname instead of the official domain. The code now defaults to `https://www.mastoneinvestments.com`; redeploy before submitting the sitemap. Search Console, a complete Google Business Profile, useful local content and reputable links are the main remaining work.

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

The site defaults to `https://www.mastoneinvestments.com`. If `NEXT_PUBLIC_SITE_URL` is set in the deployment environment, make sure it is exactly `https://www.mastoneinvestments.com` (no trailing slash), then rebuild and redeploy. It is read **at build time**.

- **Vercel:** Settings → Environment Variables.
- **Cloudflare:** add it to the build environment (and `.dev.vars` for `npm run preview:cf`).

After deploying, check that `/robots.txt`, `/sitemap.xml`, and each page's canonical URL use `www.mastoneinvestments.com`, not a Vercel preview hostname.

### 2.2 Google Search Console

1. Open <https://search.google.com/search-console> and add a **Domain** property: `mastoneinvestments.com` (no `https://` and no `www`).
2. Google will provide a DNS TXT record. Add that record with the domain's DNS provider, preserving the full value, then return to Search Console and click **Verify**. DNS changes can take time to propagate. Domain properties include both `www` and non-`www` URLs and require DNS verification.
3. In the verified property, open **Sitemaps** and submit `https://www.mastoneinvestments.com/sitemap.xml`.
4. Use **URL Inspection** for `https://www.mastoneinvestments.com/` and `https://www.mastoneinvestments.com/products/agriculture`; check that Google-selected canonical URLs use the official domain and request indexing.
5. Check **Indexing → Pages** and **Performance → Search results** over time. Indexing and ranking are not immediate or guaranteed.

If you prefer the HTML-tag method, add a separate **URL-prefix** property for `https://www.mastoneinvestments.com/`. Copy its verification token into `GOOGLE_SITE_VERIFICATION`, redeploy, and then click **Verify**. DNS verification of the Domain property is generally simpler because it covers all subdomains and protocols.

### 2.3 Bing Webmaster Tools

At <https://www.bing.com/webmasters>, either import the Search Console property (quickest) or use the meta tag method with `BING_SITE_VERIFICATION`. Submit the sitemap there too. Bing also feeds DuckDuckGo and some AI assistants.

### 2.4 Google Business Profile

For local searches ("excavator Lusaka", "tractors near me"), a complete and accurate Maps listing can improve local visibility, but does not guarantee a particular position.

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

## 5. Ranking priorities

- **Searches for "Mastone":** keep the exact business name and official domain consistent across the site, Google Business Profile, social profiles and reputable business directories. Request indexing after deployment.
- **Searches for tractors:** the Agriculture catalogue route stays `/products/agriculture`, while its page title and heading now explicitly say "YTO Tractors". Keep each tractor model's name, accurate specifications, availability and useful Zambia-specific details up to date.
- **Broad searches such as "tractors":** are highly competitive and may have mixed search intent. Build useful, original information, earn relevant links (especially from manufacturer dealer pages), and keep the Business Profile current. No one can guarantee a first-place result.

Review Search Console monthly. Improve pages for relevant queries that get impressions but few clicks; allow time for Google to recrawl and reassess updates.

## 6. Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Optional | Overrides the official domain default; used in canonical URLs, sitemap, robots.txt, share previews and structured data. Read at build time. |
| `GOOGLE_SITE_VERIFICATION` | Optional | Google Search Console HTML-tag token for a URL-prefix property; DNS TXT verification is recommended for the Domain property. |
| `BING_SITE_VERIFICATION` | Optional | Bing Webmaster Tools `msvalidate.01` code |
