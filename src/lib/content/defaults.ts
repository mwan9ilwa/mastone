import type {
  About,
  Brand,
  Company,
  HeroSlide,
  Industry,
  ProductCategory,
  Service,
  ShowcaseItem,
  SiteContent,
  Testimonial,
} from "./schema";

const company: Company = {
  name: "Mastone Investments Ltd",
  tagline: "Must be one, must to be number one",
  phone: "+260 979 106 666",
  secondaryPhone: "+260 972 249 991",
  whatsapp: "260979106666",
  email: "mastoneinvestmentltd@gmail.com",
  facebook: "Mastone Investment Ltd",
  // No page URL in the profile yet, so this searches Facebook for the page name. Replace with the real page link.
  facebookUrl: "https://www.facebook.com/search/top?q=Mastone%20Investment%20Ltd",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Plot%2024603%2C%207070%20Road%2C%20Chibombo%2C%20Zambia",
  mapLocation: "Chibombo, Zambia",
  address: ["Plot No. 24603, along 7070 Road", "Chibombo District, Lusaka, Zambia"],
};

const heroSlides: HeroSlide[] = [
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

/** Shorthand for spec tables: [label, value] pairs. */
const specs = (...rows: [string, string][]) => rows.map(([label, value]) => ({ label, value }));

const productCategories: ProductCategory[] = [
  {
    id: "construction",
    label: "Excavators",
    blurb: "SUNWARD hydraulic excavators from 21 to 94 tonnes for construction, quarrying and mining.",
    products: [
      {
        name: "SWE210",
        models: "Hydraulic excavator",
        image: "/images/products/excavator.png",
        brand: "SUNWARD",
        specs: specs(
          ["Operating weight", "21,800 kg"],
          ["Bucket capacity", "1 m³"],
          ["Engine", "Isuzu 6BG1"],
          ["Rated power", "113.2 kW @ 2100 rpm"],
          ["Emission", "GB II (direct injection)"]
        ),
      },
      {
        name: "SWE375F",
        models: "Hydraulic excavator",
        image: "/images/products/excavator.png",
        brand: "SUNWARD",
        specs: specs(
          ["Operating weight", "37,500 kg"],
          ["Bucket capacity", "1.8 m³"],
          ["Engine", "Isuzu 6HK1"],
          ["Rated power", "212 kW @ 2000 rpm"],
          ["Emission", "GB III (common rail injection)"]
        ),
      },
      {
        name: "SWE385F Standard",
        models: "Hydraulic excavator",
        image: "/images/products/excavator.png",
        brand: "SUNWARD",
        specs: specs(
          ["Operating weight", "37,500 kg"],
          ["Bucket capacity", "1.8 m³"],
          ["Engine", "Cummins 6LTAA8.9"],
          ["Rated power", "241 kW @ 2000 rpm"],
          ["Emission", "GB II (direct injection)"]
        ),
      },
      {
        name: "SWE385F Africa Mining",
        models: "Mining excavator",
        image: "/images/products/excavator.png",
        brand: "SUNWARD",
        enquiryPhone: "+260 972 249 991",
        specs: specs(
          ["Operating weight", "38,500 kg"],
          ["Bucket capacity", "1.8 m³"],
          ["Engine", "Cummins 6LTAA8.9"],
          ["Rated power", "241 kW @ 2000 rpm"],
          ["Emission", "GB II (direct injection)"]
        ),
      },
      {
        name: "SWE600F",
        models: "Large hydraulic excavator",
        image: "/images/products/excavator.png",
        brand: "SUNWARD",
        specs: specs(
          ["Operating weight", "52,800 kg"],
          ["Bucket capacity", "3.2 m³"],
          ["Engine", "Isuzu GH-6WG1"],
          ["Rated power", "348 kW @ 1800 rpm"],
          ["Emission", "GB III (common rail injection)"]
        ),
      },
      {
        name: "SWE950E-3H",
        models: "Mining excavator",
        image: "/images/products/excavator.png",
        brand: "SUNWARD",
        enquiryPhone: "+260 972 249 991",
        specs: specs(
          ["Operating weight", "93,800 kg"],
          ["Bucket capacity", "6.5 m³"],
          ["Engine", "Volvo Penta TAD1643VE-B"],
          ["Rated power", "565 kW @ 1900 rpm"],
          ["Emission", "GB III (common rail injection)"]
        ),
      },
    ],
  },
  {
    id: "loaders-drills",
    label: "Loaders & Drill Rigs",
    blurb: "SUNWARD wheel loaders, mini loaders and surface rock drilling rigs.",
    products: [
      {
        name: "SL52W",
        models: "Wheel loader",
        image: "/images/products/loader-sl52w.png",
        brand: "SUNWARD",
        specs: specs(
          ["Operating weight", "16,800 ± 300 kg"],
          ["Rated load capacity", "5,000 kg"],
          ["Bucket capacity", "3 m³"],
          ["Engine", "Weichai WD10G220E21"],
          ["Rated power", "162 kW @ 2200 rpm"],
          ["Emission", "GB II (direct injection)"]
        ),
      },
      {
        name: "SWDE152B",
        models: "Surface rock drilling rig",
        image: "/images/products/rock-drill.png",
        brand: "SUNWARD",
        enquiryPhone: "+260 972 249 991",
        specs: specs(
          ["Operating weight", "22,500 kg"],
          ["Engine", "Cummins QSL8.9-C360-30"],
          ["Rated power", "264 kW @ 2100 rpm"],
          ["Emission", "GB II (direct injection)"],
          ["Hole diameter", "138 – 165 mm"],
          ["DTH hammer", "5″, 6″"],
          ["Drill tube diameter", "102 mm"],
          ["Max hole depth", "36 m (6 × 6 m)"]
        ),
      },
      { name: "Mini Loader", models: "Skid steer series", image: "/images/products/mini-loader.png", brand: "SUNWARD", specs: [] },
    ],
  },
  {
    id: "agriculture",
    label: "Agriculture",
    blurb: "YTO (Dongfanghong) tractors for every farm size, with YTO spare parts and after-sales service.",
    products: [
      {
        name: "ELP3004",
        models: "Heavy-duty 4WD tractor",
        image: "/images/products/tractor-elp3004.png",
        brand: "YTO",
        specs: specs(
          ["Power take-off", "540 / 1000 rpm"],
          ["Gears", "40F + 40R"],
          ["Engine speed", "2200 rpm"],
          ["Dimensions", "5935 × 2760 × 3350 mm"]
        ),
      },
      {
        name: "ELX 2404",
        models: "Heavy-duty 4WD tractor",
        image: "/images/products/tractor-elp3004.png",
        brand: "YTO",
        specs: specs(
          ["Power take-off", "540 / 1000 rpm"],
          ["Engine", "YTO 6-cylinder air-cooled turbocharged diesel"],
          ["Drive", "4WD"],
          ["Gears", "12F / 4R (optional 24F / 8R)"],
          ["Transmission", "12 + 4 gear shift"],
          ["Dimensions", "5430 × 2750 × 3130 mm"]
        ),
      },
      {
        name: "E1954",
        models: "4WD tractor",
        image: "/images/products/tractor-e1954.png",
        brand: "YTO",
        specs: specs(
          ["Diesel engine", "SC8D215G2"],
          ["PTO clutch", "Electro-hydraulic control"],
          ["Tyre size", "16.9-28 / 20.8-38 (double rear tyres)"],
          ["PTO output speed", "540 / 1000 rpm"],
          ["Cab", "Air-conditioned, streamlined"]
        ),
      },
      {
        name: "EX1754",
        models: "4WD tractor",
        image: "/images/products/tractor-e1954.png",
        brand: "YTO",
        specs: specs(
          ["Power take-off", "540 / 1000 rpm"],
          ["Engine", "YTO 6-cylinder"],
          ["Drive", "4WD"],
          ["Cab", "Enclosed, air-conditioned"],
          ["Transmission", "18F + 6R"]
        ),
      },
      {
        name: "EX1304",
        models: "4WD tractor",
        image: "/images/products/tractor-e1954.png",
        brand: "YTO",
        specs: specs(
          ["Power take-off", "540 / 1000 rpm"],
          ["Engine", "YTO 6-cylinder"],
          ["Drive", "4WD"],
          ["Engine power", "95.6 kW (130 hp)"],
          ["Transmission", "12 + 4 gear shift"]
        ),
      },
      {
        name: "EX1054",
        models: "Utility 4WD tractor",
        image: "/images/products/tractor-ex1054.png",
        brand: "YTO",
        specs: specs(
          ["Power take-off", "540 / 1000 rpm"],
          ["Engine", "LR4V5-23 diesel"],
          ["Drive", "4WD"],
          ["Clutch", "Independent, double action"],
          ["Transmission", "12F + 4R"],
          ["Dimensions", "4450 × 1905 × 2755 mm"]
        ),
      },
      {
        name: "NLX 954",
        models: "Utility 4WD tractor",
        image: "/images/products/tractor-ex1054.png",
        brand: "YTO",
        specs: specs(
          ["Power take-off", "540 / 1000 rpm"],
          ["Engine", "YTO 6-cylinder air-cooled turbocharged diesel"],
          ["Drive", "4WD"],
          ["Gears", "12F / 4R (optional 24F / 8R)"],
          ["Transmission", "12 + 4 gear shift"],
          ["Dimensions", "5430 × 2750 × 3130 mm"]
        ),
      },
      {
        name: "EX 854",
        models: "Utility tractor",
        image: "/images/products/tractor-ex1054.png",
        brand: "YTO",
        specs: specs(
          ["Power take-off", "540 / 1000 rpm"],
          ["Gears", "40F + 40R"],
          ["Engine speed", "2200 rpm"],
          ["Dimensions", "5935 × 2760 × 3350 mm"]
        ),
      },
      {
        name: "EM604",
        models: "Compact tractor",
        image: "/images/products/tractor-ex1054.png",
        brand: "YTO",
        specs: specs(
          ["Diesel engine", "SC8D215G2"],
          ["PTO clutch", "Electro-hydraulic control"],
          ["Tyre size", "16.9-28 / 20.8-38 (double rear tyres)"],
          ["PTO output speed", "540 / 1000 rpm"]
        ),
      },
    ],
  },
  {
    id: "vehicles",
    label: "Commercial Vehicles",
    blurb: "WEICHAI Landking light trucks and SINOTRUK HOWO heavy trucks.",
    products: [
      { name: "Containerised Truck", models: "WEICHAI Landking", image: "/images/products/container-truck.png", brand: "WEICHAI", specs: [] },
      { name: "Light Truck", models: "WEICHAI Landking", image: "/images/products/light-truck.png", brand: "WEICHAI", specs: [] },
      { name: "Refrigerated Truck", models: "WEICHAI Landking", image: "/images/products/refrigerated-truck.png", brand: "WEICHAI", specs: [] },
      { name: "HOWO Tipper Truck", models: "SINOTRUK HOWO", image: "/images/products/howo-truck.png", brand: "SINOTRUK", specs: [] },
    ],
  },
  {
    id: "power",
    label: "Power Generation",
    enquiryPhone: "+260 972 249 991",
    blurb: "WEICHAI diesel generator sets from 41 kVA to 1,250 kVA.",
    products: [
      { name: "Silent Generator Set", models: "Canopy type · low-noise enclosure", image: "/images/products/genset-silent.png", brand: "WEICHAI", specs: [] },
      { name: "Open Generator Set", models: "Open frame · 41 – 1,250 kVA", image: "/images/products/genset-open.png", brand: "WEICHAI", specs: [] },
      { name: "Soundproof Genset", models: "Weatherproof enclosure", image: "/images/products/genset-weichai.png", brand: "WEICHAI", specs: [] },
    ],
  },
];

const brands: Brand[] = [
  { name: "SUNWARD", logo: "/images/brands/sunward.png" },
  { name: "WEICHAI", logo: "/images/brands/weichai.png" },
  { name: "SINOTRUK", logo: "/images/brands/sinotruk.png" },
  { name: "YTO", logo: "/images/brands/yto.png" },
  { name: "SHACMAN", logo: "/images/brands/shacman.png" },
  { name: "Cummins", logo: "/images/brands/cummins.png" },
];

const about: About = {
  paragraphs: [
    "Established in 2025, **Mastone Investments Ltd.** is a leading integrated equipment and power solutions provider based in Zambia, delivering high-quality machinery, power systems, commercial vehicles and after-sales support to customers across multiple industries.",
    "We proudly supply SUNWARD machinery — a globally recognised brand serving the heavy-duty equipment industry since 1999. Through strong partnerships and professional technical support, we provide reliable, efficient and innovative solutions tailored to the demands of the African market.",
  ],
  points: [
    "Construction, mining & farming equipment",
    "Generators & premium engine oils",
    "Genuine spare parts supply",
    "Maintenance & technical support",
  ],
  stats: [
    { value: 2025, label: "Established in Zambia", format: false },
    { value: 6, suffix: "+", label: "Global partner brands", format: true },
    { value: 25, suffix: "+", label: "Years of SUNWARD engineering", format: true },
    { value: 1250, suffix: " kVA", label: "Max generator capacity", format: true },
  ],
};

const services: Service[] = [
  { icon: "Truck", title: "Equipment Supply", text: "Construction, mining and farming machinery, commercial vehicles and power systems from trusted global brands." },
  { icon: "Headset", title: "Technical Support", text: "Professional guidance on selection, commissioning and operation from engineers who know the machines." },
  { icon: "Wrench", title: "Maintenance", text: "Scheduled servicing and repairs that maximise uptime and extend the working life of your fleet." },
  { icon: "Package", title: "Spare Parts Supply", text: "Reliable access to genuine spare parts to keep your equipment running at peak performance." },
  { icon: "Droplet", title: "Premium Engine Oils", text: "High-grade lubricants that protect engines working in demanding African conditions." },
  { icon: "ShieldCheck", title: "After-Sales Service", text: "Long-term partnership and responsive after-sales care designed to keep your operations moving." },
];

const industries: Industry[] = [
  { icon: "Building2", title: "Construction", text: "Loaders, excavators and mini loaders for roads, buildings and infrastructure.", image: "/images/products/excavator.png" },
  { icon: "Pickaxe", title: "Mining", text: "Heavy excavators and rock drill rigs for surface mining and quarrying.", image: "/images/products/rock-drill.png" },
  { icon: "Sprout", title: "Agriculture", text: "YTO tractors from 60 to 300 hp for smallholder and commercial farms.", image: "/images/products/tractor-ex1054.png" },
  { icon: "Truck", title: "Logistics", text: "Light, refrigerated, containerised and HOWO heavy trucks for every load.", image: "/images/products/howo-truck.png" },
  { icon: "Zap", title: "Power & Energy", text: "Diesel generator sets from 41 kVA to 1,250 kVA for prime and standby power.", image: "/images/products/genset-weichai.png" },
  { icon: "Factory", title: "Industry", text: "Equipment, lubricants and after-sales support for plants and workshops.", image: "/images/products/loader-sl52w.png" },
];

const testimonials: Testimonial[] = [];
const showcase: ShowcaseItem[] = [];

/** The content the site shipped with; used for any section that hasn't been saved from the dashboard yet. */
export const defaultContent: SiteContent = {
  company,
  heroSlides,
  productCategories,
  brands,
  about,
  services,
  industries,
  testimonials,
  showcase,
};
