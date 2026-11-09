import { z } from "zod";
import { getVideoEmbedUrl } from "./video";

const text = z.string().trim().min(1, "Required");
const image = z.string().trim().min(1, "Image is required");
/** Blank optional fields are stored as absent rather than "". */
const optionalText = z
  .string()
  .trim()
  .transform((v) => v || undefined)
  .optional();

export const iconNames = [
  "Truck",
  "Headset",
  "Wrench",
  "Package",
  "Droplet",
  "ShieldCheck",
  "Building2",
  "Pickaxe",
  "Sprout",
  "Zap",
  "Factory",
  "Tractor",
  "Fuel",
  "Cog",
  "HardHat",
  "Award",
] as const;

export const companySchema = z.object({
  name: text,
  tagline: text,
  phone: text,
  /** Optional second line, shown beside the main number. */
  secondaryPhone: optionalText,
  whatsapp: z.string().trim().regex(/^\d{8,15}$/, "Digits only, with country code (e.g. 260979106666)"),
  email: z.email(),
  facebook: text,
  facebookUrl: z.url(),
  mapUrl: z.url(),
  /** What the embedded map centres on: a place name, address or "lat, lng". Falls back to the address. */
  mapLocation: optionalText,
  address: z.array(text).min(1),
});

export const heroSlideSchema = z.object({
  eyebrow: text,
  title: z.tuple([text, text]),
  text: text,
  image,
  /** "photo" fills the slide; "product" floats a cut-out over a branded backdrop */
  kind: z.enum(["photo", "product"]),
  backdropWord: optionalText,
  secondaryImage: optionalText,
});

export const specSchema = z.object({ label: text, value: text });

export const productSchema = z.object({
  name: text,
  models: text,
  image,
  brand: text,
  /** WhatsApp/phone number for enquiries about this product; overrides the category's. */
  enquiryPhone: optionalText,
  /** Technical specifications, shown in order on the product card. */
  specs: z.array(specSchema).default([]),
});

export const productCategorySchema = z.object({
  id: text,
  label: text,
  blurb: text,
  /** WhatsApp/phone number for enquiries about this category. Falls back to the company WhatsApp number. */
  enquiryPhone: optionalText,
  products: z.array(productSchema),
});

export const brandSchema = z.object({ name: text, logo: image });

export const aboutSchema = z.object({
  /** Wrap words in **double asterisks** to bold them. */
  paragraphs: z.array(text).min(1),
  points: z.array(text),
  stats: z.array(
    z.object({
      value: z.coerce.number(),
      suffix: optionalText,
      label: text,
      /** Show thousands separators (turn off for years). */
      format: z.boolean().default(true),
    })
  ),
});

export const serviceSchema = z.object({ icon: z.enum(iconNames), title: text, text: text });

export const industrySchema = serviceSchema.extend({ image });

export const testimonialSchema = z.object({
  quote: text,
  name: text,
  position: optionalText,
  company: optionalText,
  image: optionalText,
});

export const showcaseItemSchema = z
  .object({
    kind: z.enum(["photo", "video"]),
    title: text,
    description: optionalText,
    image: optionalText,
    videoUrl: optionalText,
    poster: optionalText,
  })
  .superRefine((item, ctx) => {
    if (item.kind === "photo" && !item.image) {
      ctx.addIssue({ code: "custom", path: ["image"], message: "Image is required" });
    }
    if (item.kind === "video") {
      if (!item.videoUrl) {
        ctx.addIssue({ code: "custom", path: ["videoUrl"], message: "Video URL is required" });
      } else if (!getVideoEmbedUrl(item.videoUrl)) {
        ctx.addIssue({
          code: "custom",
          path: ["videoUrl"],
          message:
            "Use a supported video link (YouTube, Vimeo, Dailymotion, Facebook, TikTok, Instagram, Rumble, Loom, Wistia or Streamable) or an MP4/WebM URL",
        });
      }
    }
  });

export const contentSchemas = {
  company: companySchema,
  heroSlides: z.array(heroSlideSchema).min(1, "Add at least one slide"),
  productCategories: z.array(productCategorySchema).min(1, "Add at least one category"),
  brands: z.array(brandSchema),
  about: aboutSchema,
  services: z.array(serviceSchema),
  industries: z.array(industrySchema),
  testimonials: z.array(testimonialSchema),
  showcase: z.array(showcaseItemSchema),
};

export type ContentKey = keyof typeof contentSchemas;
export type SiteContent = { [K in ContentKey]: z.output<(typeof contentSchemas)[K]> };

export type IconName = (typeof iconNames)[number];
export type Company = SiteContent["company"];
export type HeroSlide = z.output<typeof heroSlideSchema>;
export type Product = z.output<typeof productSchema>;
export type ProductCategory = z.output<typeof productCategorySchema>;
export type Brand = z.output<typeof brandSchema>;
export type About = SiteContent["about"];
export type Service = z.output<typeof serviceSchema>;
export type Industry = z.output<typeof industrySchema>;
export type Testimonial = z.output<typeof testimonialSchema>;
export type ShowcaseItem = z.output<typeof showcaseItemSchema>;
