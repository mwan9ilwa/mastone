import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // Old category URLs that Google already discovered. They were merged into one category;
  // permanent redirects pass their ranking to the new URLs instead of returning 404s.
  async redirects() {
    const merged = "/products/mining-and-construction-equipment";
    return ["excavators", "loaders-and-drill-rigs"].flatMap((old) => [
      { source: `/products/${old}`, destination: merged, permanent: true },
      { source: `/products/${old}/:product`, destination: `${merged}/:product`, permanent: true },
    ]);
  },
  experimental: {
    // Dashboard image uploads go through a Server Action; uploads are capped at 4 MB, plus multipart overhead.
    serverActions: { bodySizeLimit: "5mb" },
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
