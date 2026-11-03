"use client";

import { useId, useRef, useState, useTransition } from "react";
import { ArrowDown, ArrowUp, ChevronDown, ImageUp, Loader2, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { uploadImage } from "@/app/admin/actions";
import { cn } from "@/lib/utils";

type FieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  placeholder?: string;
  className?: string;
};

export function TextField({ label, value, onChange, hint, placeholder, className, multiline, type }: FieldProps & { multiline?: boolean; type?: string }) {
  const id = useId();
  return (
    <div className={cn("grid content-start gap-1.5", className)}>
      <Label htmlFor={id}>{label}</Label>
      {multiline ? (
        <Textarea id={id} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} rows={3} className="bg-white" />
      ) : (
        <Input id={id} type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="h-9 bg-white" />
      )}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

export function SelectField<T extends string>({
  label,
  value,
  options,
  onChange,
  className,
}: {
  label: string;
  value: T;
  options: readonly { value: T; label: string }[];
  onChange: (value: T) => void;
  className?: string;
}) {
  const id = useId();
  return (
    <div className={cn("grid content-start gap-1.5", className)}>
      <Label htmlFor={id}>{label}</Label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="h-9 rounded-lg border border-input bg-white px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

/** Upload an image (stored in the database) or type the path of one already in /public. */
export function ImageField({ label, value, onChange, hint, className, dark }: FieldProps & { dark?: boolean }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, startUpload] = useTransition();

  const upload = (file: File) => {
    const data = new FormData();
    data.set("file", file);
    startUpload(async () => {
      const result = await uploadImage(data);
      if ("error" in result) toast.error(result.error);
      else onChange(result.url);
    });
  };

  return (
    <div className={cn("grid content-start gap-1.5", className)}>
      <Label>{label}</Label>
      <div className="flex gap-3">
        <div
          className={cn(
            "relative grid size-20 shrink-0 place-items-center overflow-hidden rounded-lg ring-1 ring-border",
            dark ? "bg-navy-900" : "bg-secondary"
          )}
        >
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element -- plain preview of whatever URL is typed in
            <img src={value} alt="" className="size-full object-contain p-1" />
          ) : (
            <ImageUp className="size-6 text-muted-foreground" />
          )}
        </div>
        <div className="grid flex-1 content-start gap-2">
          <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder="/images/… or upload" className="h-9 bg-white" />
          <div className="flex gap-2">
            <Button type="button" variant="outline" size="sm" disabled={uploading} onClick={() => fileRef.current?.click()}>
              {uploading ? <Loader2 className="animate-spin" /> : <ImageUp />}
              {uploading ? "Uploading…" : "Upload image"}
            </Button>
            {value && (
              <Button type="button" variant="ghost" size="sm" onClick={() => onChange("")}>
                Clear
              </Button>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/avif,image/gif"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) upload(file);
              e.target.value = "";
            }}
          />
        </div>
      </div>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

/** One editable string per line-item, e.g. address lines or bullet points. */
export function StringListField({ label, values, onChange, addLabel = "Add line", multiline }: {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  addLabel?: string;
  multiline?: boolean;
}) {
  return (
    <div className="grid gap-1.5">
      <Label>{label}</Label>
      {values.map((v, i) => (
        <div key={i} className="flex items-start gap-2">
          {multiline ? (
            <Textarea value={v} rows={4} onChange={(e) => onChange(values.with(i, e.target.value))} className="bg-white" />
          ) : (
            <Input value={v} onChange={(e) => onChange(values.with(i, e.target.value))} className="h-9 bg-white" />
          )}
          <ItemControls index={i} count={values.length} items={values} onChange={onChange} />
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" className="justify-self-start" onClick={() => onChange([...values, ""])}>
        <Plus /> {addLabel}
      </Button>
    </div>
  );
}

type Spec = { label: string; value: string };

/** Label/value rows, e.g. a product's technical specifications. */
export function SpecsField({ label, values, onChange }: { label: string; values: Spec[]; onChange: (values: Spec[]) => void }) {
  const set = (i: number, changes: Partial<Spec>) => onChange(values.with(i, { ...values[i], ...changes }));
  return (
    <div className="grid gap-1.5">
      <Label>{label}</Label>
      {values.length > 0 && (
        <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)_auto] gap-x-2 text-xs text-muted-foreground">
          <span>Specification</span>
          <span>Value</span>
        </div>
      )}
      {values.map((spec, i) => (
        <div key={i} className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)_auto] items-center gap-2">
          <Input value={spec.label} onChange={(e) => set(i, { label: e.target.value })} placeholder="Operating weight" aria-label="Specification" className="h-9 bg-white" />
          <Input value={spec.value} onChange={(e) => set(i, { value: e.target.value })} placeholder="21,800 kg" aria-label="Value" className="h-9 bg-white" />
          <ItemControls index={i} count={values.length} items={values} onChange={onChange} />
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" className="justify-self-start" onClick={() => onChange([...values, { label: "", value: "" }])}>
        <Plus /> Add specification
      </Button>
    </div>
  );
}

/**
 * A reorderable list of cards. `render` receives a `patch` helper that merges changes into that item.
 * With `collapsible`, cards start closed and open from their header; newly added cards open straight away.
 */
export function ListEditor<T>({
  items,
  onChange,
  create,
  title,
  render,
  addLabel,
  collapsible = false,
}: {
  items: T[];
  onChange: (items: T[]) => void;
  create: () => NoInfer<T>;
  title: (item: NoInfer<T>, index: number) => string;
  render: (item: NoInfer<T>, patch: (changes: Partial<NoInfer<T>>) => void, index: number) => React.ReactNode;
  addLabel: string;
  collapsible?: boolean;
}) {
  // Open state is kept by position and moved along with the items below.
  const [open, setOpen] = useState<boolean[]>([]);
  const isOpen = (i: number) => !collapsible || (open[i] ?? false);
  const setAll = (value: boolean) => setOpen(items.map(() => value));
  const toggle = (i: number) => setOpen((o) => Array.from({ length: items.length }, (_, j) => (j === i ? !o[j] : (o[j] ?? false))));

  return (
    <div className="grid gap-4">
      {collapsible && items.length > 1 && (
        <div className="-mb-2 flex justify-end gap-1">
          <Button type="button" variant="ghost" size="sm" onClick={() => setAll(true)}>
            Expand all
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={() => setAll(false)}>
            Collapse all
          </Button>
        </div>
      )}
      {items.map((item, i) => (
        <section key={i} className="rounded-xl bg-white ring-1 ring-border">
          <header className={cn("flex items-center justify-between gap-3 px-4 py-2.5", isOpen(i) && "border-b border-border")}>
            <h3 className="min-w-0 flex-1 text-sm font-semibold text-navy">
              {collapsible ? (
                <button type="button" onClick={() => toggle(i)} aria-expanded={isOpen(i)} className="flex w-full items-center gap-2 text-left">
                  <ChevronDown className={cn("size-4 shrink-0 text-muted-foreground transition-transform", !isOpen(i) && "-rotate-90")} />
                  <span className="text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                  <span className="truncate">{title(item, i) || "Untitled"}</span>
                </button>
              ) : (
                <span className="block truncate">
                  <span className="mr-2 text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                  {title(item, i) || "Untitled"}
                </span>
              )}
            </h3>
            <ItemControls
              index={i}
              count={items.length}
              items={items}
              onChange={onChange}
              onMoved={(to) =>
                setOpen((o) => {
                  const next = Array.from({ length: items.length }, (_, j) => o[j] ?? false);
                  [next[i], next[to]] = [next[to], next[i]];
                  return next;
                })
              }
              onRemoved={() => setOpen((o) => o.filter((_, j) => j !== i))}
            />
          </header>
          {isOpen(i) && <div className="p-4">{render(item, (changes) => onChange(items.with(i, { ...item, ...changes })), i)}</div>}
        </section>
      ))}
      <Button
        type="button"
        variant="outline"
        className="h-10 justify-self-start"
        onClick={() => {
          setOpen((o) => [...Array.from({ length: items.length }, (_, j) => o[j] ?? false), true]);
          onChange([...items, create()]);
        }}
      >
        <Plus /> {addLabel}
      </Button>
    </div>
  );
}

function ItemControls<T>({
  index,
  count,
  items,
  onChange,
  onMoved,
  onRemoved,
}: {
  index: number;
  count: number;
  items: T[];
  onChange: (items: T[]) => void;
  onMoved?: (to: number) => void;
  onRemoved?: () => void;
}) {
  const move = (to: number) => {
    const next = [...items];
    [next[index], next[to]] = [next[to], next[index]];
    onChange(next);
    onMoved?.(to);
  };
  return (
    <div className="flex shrink-0 gap-0.5">
      <Button type="button" variant="ghost" size="icon-sm" aria-label="Move up" disabled={index === 0} onClick={() => move(index - 1)}>
        <ArrowUp />
      </Button>
      <Button type="button" variant="ghost" size="icon-sm" aria-label="Move down" disabled={index === count - 1} onClick={() => move(index + 1)}>
        <ArrowDown />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-label="Remove"
        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
        onClick={() => {
          onChange(items.filter((_, j) => j !== index));
          onRemoved?.();
        }}
      >
        <Trash2 />
      </Button>
    </div>
  );
}

export function FieldGrid({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("grid gap-4 sm:grid-cols-2", className)}>{children}</div>;
}
