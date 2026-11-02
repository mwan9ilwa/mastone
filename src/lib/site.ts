export const company = {
  name: "Mastone Investments Ltd",
  tagline: "Must be one, must to be number one",
  phone: "+260 979 106 666",
  phoneHref: "tel:+260979106666",
  whatsapp: "260979106666",
  email: "mastoneinvestmentltd@gmail.com",
  facebook: "Mastone Investment Ltd",
  // No page URL in the profile yet, so this searches Facebook for the page name. Replace with the real page link.
  facebookUrl: "https://www.facebook.com/search/top?q=Mastone%20Investment%20Ltd",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Plot%2024603%2C%207070%20Road%2C%20Chibombo%2C%20Zambia",
  address: ["Plot No. 24603, along 7070 Road", "Chibombo District, Lusaka, Zambia"],
  mapQuery: "Chibombo, Zambia",
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Services", href: "#services" },
  { label: "Industries", href: "#industries" },
  { label: "Contact", href: "#contact" },
];

export type HeroSlide = {
  eyebrow: string;
  title: [string, string];
  text: string;
  image: string;
  /** "photo" fills the slide; "product" floats a cut-out over a branded backdrop */
  kind: "photo" | "product";
  backdropWord?: string;
  secondaryImage?: string;
};

export const heroSlides: HeroSlide[] = [
  {
    eyebrow: "Official SUNWARD Supplier",
    title: ["Machines Built", "To Move Mountains"],
    text: "High-performance loaders, excavators and drill rigs for construction and mining across Zambia — backed by genuine parts and expert support.",
    image: "/images/hero-loader.png",
    kind: "photo",
  },
  {
    eyebrow: "Established 2025 · Lusaka, Zambia",
    title: ["Your Partner In", "Equipment & Power"],
    text: "An integrated provider of machinery, power systems, commercial vehicles and after-sales service designed to keep your operations moving.",
    image: "/images/sunward-facility.png",
    kind: "photo",
  },
  {
    eyebrow: "YTO Tractors",
    title: ["Power The", "Harvest Season"],
    text: "Rugged, fuel-efficient YTO tractors from 60 to 300 hp — engineered for African soils and long working days.",
    image: "/images/products/tractor-elp3004.png",
    secondaryImage: "/images/products/tractor-ex1054.png",
    kind: "product",
    backdropWord: "Agriculture",
  },
  {
    eyebrow: "WEICHAI Diesel Generators",
    title: ["Power That", "Never Stops"],
    text: "Diesel generator sets from 41 kVA to 1,250 kVA, plus WEICHAI and SINOTRUK HOWO trucks to keep your business moving.",
    image: "/images/products/genset-weichai.png",
    secondaryImage: "/images/products/howo-truck.png",
    kind: "product",
    backdropWord: "Power",
  },
];

export type Product = {
  name: string;
  models: string;
  image: string;
  brand: string;
};

export const productCategories: {
  id: string;
  label: string;
  blurb: string;
  products: Product[];
}[] = [
  {
    id: "construction",
    label: "Construction & Mining",
    blurb: "SUNWARD machinery trusted on job sites worldwide since 1999.",
    products: [
      { name: "Wheel Loader", models: "SL52W", image: "/images/products/loader-sl52w.png", brand: "SUNWARD" },
      { name: "Mini Loader", models: "Skid steer series", image: "/images/products/mini-loader.png", brand: "SUNWARD" },
      { name: "Rock Drill Rig", models: "Surface drilling", image: "/images/products/rock-drill.png", brand: "SUNWARD" },
      { name: "Excavator", models: "SWE210 · SWE375F · SWE385F · SWE600F · SWE950E-3H", image: "/images/products/excavator.png", brand: "SUNWARD" },
    ],
  },
  {
    id: "agriculture",
    label: "Agriculture",
    blurb: "YTO (Dongfanghong) tractors for every farm size.",
    products: [
      { name: "Heavy-Duty Tractor", models: "YTO ELP-3004 · YTO ELX 2404", image: "/images/products/tractor-elp3004.png", brand: "YTO" },
      { name: "Mid-Range Tractor", models: "YTO E1954 · EX1304 · EX1754", image: "/images/products/tractor-e1954.png", brand: "YTO" },
      { name: "Utility Tractor", models: "YTO EX1054 · EX854 · NLX954 · EM604", image: "/images/products/tractor-ex1054.png", brand: "YTO" },
    ],
  },
  {
    id: "vehicles",
    label: "Commercial Vehicles",
    blurb: "WEICHAI Landking light trucks and SINOTRUK HOWO heavy trucks.",
    products: [
      { name: "Containerised Truck", models: "WEICHAI Landking", image: "/images/products/container-truck.png", brand: "WEICHAI" },
      { name: "Light Truck", models: "WEICHAI Landking", image: "/images/products/light-truck.png", brand: "WEICHAI" },
      { name: "Refrigerated Truck", models: "WEICHAI Landking", image: "/images/products/refrigerated-truck.png", brand: "WEICHAI" },
      { name: "HOWO Tipper Truck", models: "SINOTRUK HOWO", image: "/images/products/howo-truck.png", brand: "SINOTRUK" },
    ],
  },
  {
    id: "power",
    label: "Power Generation",
    blurb: "WEICHAI diesel generator sets from 41 kVA to 1,250 kVA.",
    products: [
      { name: "Silent Generator Set", models: "Canopy type · low-noise enclosure", image: "/images/products/genset-silent.png", brand: "WEICHAI" },
      { name: "Open Generator Set", models: "Open frame · 41 – 1,250 kVA", image: "/images/products/genset-open.png", brand: "WEICHAI" },
      { name: "Soundproof Genset", models: "Weatherproof enclosure", image: "/images/products/genset-weichai.png", brand: "WEICHAI" },
    ],
  },
];

export const brands = [
  { name: "SUNWARD", logo: "/images/brands/sunward.png" },
  { name: "WEICHAI", logo: "/images/brands/weichai.png" },
  { name: "SINOTRUK", logo: "/images/brands/sinotruk.png" },
  { name: "YTO", logo: "/images/brands/yto.png" },
  { name: "SHACMAN", logo: "/images/brands/shacman.png" },
  { name: "Cummins", logo: "/images/brands/cummins.png" },
];
