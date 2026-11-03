"use client";

import { Label } from "@/components/ui/label";
import { ContentIcon } from "@/components/content-icons";
import { FieldGrid, ImageField, ListEditor, SelectField, SpecsField, StringListField, TextField } from "@/components/admin/fields";
import { SectionEditor } from "@/components/admin/section-editor";
import { adminSections } from "@/components/admin/sections";
import { iconNames, type ContentKey, type HeroSlide, type IconName, type Industry, type Service, type SiteContent } from "@/lib/content/schema";

type EditorProps<K extends ContentKey> = { initial: SiteContent[K] };

function Shell<K extends ContentKey>({
  sectionKey,
  initial,
  children,
}: {
  sectionKey: K;
  initial: SiteContent[K];
  children: (value: SiteContent[K], set: (value: SiteContent[K]) => void) => React.ReactNode;
}) {
  const meta = adminSections.find((s) => s.key === sectionKey)!;
  return (
    <SectionEditor sectionKey={sectionKey} initial={initial} title={meta.title} description={meta.description}>
      {children}
    </SectionEditor>
  );
}

function Panel({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-5 rounded-xl bg-white p-5 ring-1 ring-border">{children}</div>;
}

const iconOptions = iconNames.map((n) => ({ value: n, label: n.replace(/(\d+)$/, "").replace(/([a-z])([A-Z])/g, "$1 $2") }));

function IconField({ value, onChange }: { value: IconName; onChange: (v: IconName) => void }) {
  return (
    <div className="flex items-end gap-3">
      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-navy-900 text-brand">
        <ContentIcon name={value} className="size-5" />
      </span>
      <SelectField label="Icon" value={value} options={iconOptions} onChange={onChange} className="flex-1" />
    </div>
  );
}

export function CompanyEditor({ initial }: EditorProps<"company">) {
  return (
    <Shell sectionKey="company" initial={initial}>
      {(c, set) => {
        const field = (key: Exclude<keyof typeof c, "address">) => ({ value: c[key] ?? "", onChange: (v: string) => set({ ...c, [key]: v }) });
        return (
          <Panel>
            <FieldGrid>
              <TextField label="Company name" {...field("name")} />
              <TextField label="Tagline" {...field("tagline")} />
              <TextField label="Phone" {...field("phone")} placeholder="+260 979 106 666" />
              <TextField label="Second phone (optional)" {...field("secondaryPhone")} placeholder="+260 972 249 991" />
              <TextField label="WhatsApp number" {...field("whatsapp")} hint="Digits only, with country code" placeholder="260979106666" />
              <TextField label="Email" type="email" {...field("email")} />
              <TextField label="Facebook page name" {...field("facebook")} />
              <TextField label="Facebook page link" {...field("facebookUrl")} className="sm:col-span-2" />
              <TextField label="Google Maps link" {...field("mapUrl")} hint="Where “Open in Google Maps” and the footer link go" className="sm:col-span-2" />
              <TextField
                label="Map location"
                {...field("mapLocation")}
                placeholder="Chibombo, Zambia  or  -14.6567, 28.0733"
                hint="What the map on the contact section shows: a place name, an address, or exact coordinates (right-click the spot in Google Maps to copy them). Leave blank to use the address."
                className="sm:col-span-2"
              />
            </FieldGrid>
            <StringListField label="Address lines" values={c.address} onChange={(address) => set({ ...c, address })} />
          </Panel>
        );
      }}
    </Shell>
  );
}

export function HeroEditor({ initial }: EditorProps<"heroSlides">) {
  return (
    <Shell sectionKey="heroSlides" initial={initial}>
      {(slides, set) => (
        <ListEditor
          items={slides}
          onChange={set}
          addLabel="Add slide"
          title={(s) => s.title.join(" ")}
          create={(): HeroSlide => ({ eyebrow: "", title: ["", ""], text: "", image: "", kind: "photo" })}
          render={(s, patch) => (
            <FieldGrid>
              <TextField label="Small heading" value={s.eyebrow} onChange={(eyebrow) => patch({ eyebrow })} />
              <SelectField
                label="Layout"
                value={s.kind}
                onChange={(kind) => patch({ kind })}
                options={[
                  { value: "photo", label: "Full-width photo" },
                  { value: "product", label: "Product cut-out on branded backdrop" },
                ]}
              />
              <TextField label="Title (white)" value={s.title[0]} onChange={(t) => patch({ title: [t, s.title[1]] })} />
              <TextField label="Title (highlighted)" value={s.title[1]} onChange={(t) => patch({ title: [s.title[0], t] })} />
              <TextField label="Text" multiline value={s.text} onChange={(text) => patch({ text })} className="sm:col-span-2" />
              <ImageField label={s.kind === "photo" ? "Background photo" : "Main product image"} value={s.image} onChange={(image) => patch({ image })} dark />
              {s.kind === "product" && (
                <>
                  <ImageField
                    label="Second product image (optional)"
                    value={s.secondaryImage ?? ""}
                    onChange={(secondaryImage) => patch({ secondaryImage })}
                    dark
                  />
                  <TextField
                    label="Backdrop word (optional)"
                    value={s.backdropWord ?? ""}
                    onChange={(backdropWord) => patch({ backdropWord })}
                    placeholder="e.g. Agriculture"
                  />
                </>
              )}
            </FieldGrid>
          )}
        />
      )}
    </Shell>
  );
}

export function ProductsEditor({ initial }: EditorProps<"productCategories">) {
  return (
    <Shell sectionKey="productCategories" initial={initial}>
      {(categories, set) => (
        <ListEditor
          items={categories}
          onChange={set}
          addLabel="Add category"
          collapsible
          title={(c) => `${c.label} · ${c.products.length} product${c.products.length === 1 ? "" : "s"}`}
          create={() => ({ id: crypto.randomUUID().slice(0, 8), label: "", blurb: "", products: [] })}
          render={(c, patch) => (
            <div className="grid gap-5">
              <FieldGrid>
                <TextField label="Category name" value={c.label} onChange={(label) => patch({ label })} />
                <TextField label="Short description" value={c.blurb} onChange={(blurb) => patch({ blurb })} />
                <TextField
                  label="Enquiry number (optional)"
                  value={c.enquiryPhone ?? ""}
                  onChange={(enquiryPhone) => patch({ enquiryPhone })}
                  placeholder="e.g. +260 972 249 991"
                  hint="WhatsApp and call enquiries for products in this category go here. Leave blank to use the main WhatsApp number."
                  className="sm:col-span-2"
                />
              </FieldGrid>
              <div className="grid gap-2 rounded-xl bg-secondary/60 p-3">
                <Label>Products</Label>
                <ListEditor
                  items={c.products}
                  onChange={(products) => patch({ products })}
                  addLabel="Add product"
                  collapsible
                  title={(p) => [p.brand, p.name].filter(Boolean).join(" ")}
                  create={() => ({ name: "", models: "", image: "", brand: "", specs: [] })}
                  render={(p, patchProduct) => (
                    <FieldGrid>
                      <TextField label="Model / name" value={p.name} onChange={(name) => patchProduct({ name })} placeholder="SWE210" />
                      <TextField label="Brand" value={p.brand} onChange={(brand) => patchProduct({ brand })} />
                      <TextField
                        label="Enquiry number (optional)"
                        value={p.enquiryPhone ?? ""}
                        onChange={(enquiryPhone) => patchProduct({ enquiryPhone })}
                        placeholder={c.enquiryPhone ?? "Uses the category / main number"}
                        hint="Overrides the category’s enquiry number for this product only."
                        className="sm:col-span-2"
                      />
                      <TextField
                        label="Type / description"
                        value={p.models}
                        onChange={(models) => patchProduct({ models })}
                        placeholder="Hydraulic excavator"
                        className="sm:col-span-2"
                      />
                      <ImageField label="Image" value={p.image} onChange={(image) => patchProduct({ image })} hint="Transparent PNGs look best" className="sm:col-span-2" />
                      <div className="sm:col-span-2">
                        <SpecsField label="Specifications" values={p.specs} onChange={(specs) => patchProduct({ specs })} />
                      </div>
                    </FieldGrid>
                  )}
                />
              </div>
            </div>
          )}
        />
      )}
    </Shell>
  );
}

export function BrandsEditor({ initial }: EditorProps<"brands">) {
  return (
    <Shell sectionKey="brands" initial={initial}>
      {(brands, set) => (
        <ListEditor
          items={brands}
          onChange={set}
          addLabel="Add brand"
          title={(b) => b.name}
          create={() => ({ name: "", logo: "" })}
          render={(b, patch) => (
            <FieldGrid>
              <TextField label="Brand name" value={b.name} onChange={(name) => patch({ name })} />
              <ImageField label="Logo" value={b.logo} onChange={(logo) => patch({ logo })} />
            </FieldGrid>
          )}
        />
      )}
    </Shell>
  );
}

export function AboutEditor({ initial }: EditorProps<"about">) {
  return (
    <Shell sectionKey="about" initial={initial}>
      {(about, set) => (
        <div className="grid gap-6">
          <Panel>
            <StringListField
              label="Paragraphs"
              multiline
              addLabel="Add paragraph"
              values={about.paragraphs}
              onChange={(paragraphs) => set({ ...about, paragraphs })}
            />
            <p className="-mt-3 text-xs text-muted-foreground">Wrap words in **double asterisks** to make them bold.</p>
            <StringListField label="Highlights" addLabel="Add highlight" values={about.points} onChange={(points) => set({ ...about, points })} />
          </Panel>
          <div className="grid gap-2">
            <Label>Stats</Label>
            <ListEditor
              items={about.stats}
              onChange={(stats) => set({ ...about, stats })}
              addLabel="Add stat"
              title={(s) => `${s.value}${s.suffix ?? ""} ${s.label}`}
              create={() => ({ value: 0, label: "", format: true })}
              render={(s, patch) => (
                <FieldGrid className="sm:grid-cols-3">
                  <TextField label="Number" type="number" value={String(s.value)} onChange={(v) => patch({ value: Number(v) })} />
                  <TextField label="Suffix (optional)" value={s.suffix ?? ""} onChange={(suffix) => patch({ suffix })} placeholder="+ or kVA" />
                  <TextField label="Label" value={s.label} onChange={(label) => patch({ label })} />
                  <label className="flex items-center gap-2 text-sm sm:col-span-3">
                    <input type="checkbox" checked={s.format} onChange={(e) => patch({ format: e.target.checked })} className="size-4 accent-brand" />
                    Show thousands separator (turn off for years, e.g. 2025)
                  </label>
                </FieldGrid>
              )}
            />
          </div>
        </div>
      )}
    </Shell>
  );
}

export function ServicesEditor({ initial }: EditorProps<"services">) {
  return (
    <Shell sectionKey="services" initial={initial}>
      {(services, set) => (
        <ListEditor
          items={services}
          onChange={set}
          addLabel="Add service"
          title={(s) => s.title}
          create={(): Service => ({ icon: "Wrench", title: "", text: "" })}
          render={(s, patch) => (
            <FieldGrid>
              <TextField label="Title" value={s.title} onChange={(title) => patch({ title })} />
              <IconField value={s.icon} onChange={(icon) => patch({ icon })} />
              <TextField label="Description" multiline value={s.text} onChange={(text) => patch({ text })} className="sm:col-span-2" />
            </FieldGrid>
          )}
        />
      )}
    </Shell>
  );
}

export function IndustriesEditor({ initial }: EditorProps<"industries">) {
  return (
    <Shell sectionKey="industries" initial={initial}>
      {(industries, set) => (
        <ListEditor
          items={industries}
          onChange={set}
          addLabel="Add industry"
          title={(s) => s.title}
          create={(): Industry => ({ icon: "Factory", title: "", text: "", image: "" })}
          render={(s, patch) => (
            <FieldGrid>
              <TextField label="Title" value={s.title} onChange={(title) => patch({ title })} />
              <IconField value={s.icon} onChange={(icon) => patch({ icon })} />
              <TextField label="Description" multiline value={s.text} onChange={(text) => patch({ text })} />
              <ImageField label="Image" value={s.image} onChange={(image) => patch({ image })} dark />
            </FieldGrid>
          )}
        />
      )}
    </Shell>
  );
}
