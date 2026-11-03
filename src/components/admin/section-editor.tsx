"use client";

import { useEffect, useState, useTransition } from "react";
import { ExternalLink, Loader2, RotateCcw, Save } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { restoreDefault, saveSection } from "@/app/admin/actions";
import type { ContentKey, SiteContent } from "@/lib/content/schema";

/** Holds a section's draft, and saves or resets it. Editors render the fields via `children`. */
export function SectionEditor<K extends ContentKey>({
  sectionKey,
  initial,
  title,
  description,
  children,
}: {
  sectionKey: K;
  initial: SiteContent[K];
  title: string;
  description: string;
  children: (value: SiteContent[K], set: (value: SiteContent[K]) => void) => React.ReactNode;
}) {
  const [value, setValue] = useState(initial);
  const [saved, setSaved] = useState(initial);
  const [errors, setErrors] = useState<string[]>([]);
  const [pending, startTransition] = useTransition();
  const dirty = JSON.stringify(value) !== JSON.stringify(saved);

  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const save = () =>
    startTransition(async () => {
      const result = await saveSection(sectionKey, value);
      if (result.ok) {
        setSaved(value);
        setErrors([]);
        toast.success("Saved", { description: "The live site has been updated." });
      } else {
        setErrors(result.errors);
        toast.error("Please fix the highlighted problems");
      }
    });

  const reset = () => {
    if (!confirm(`Restore “${title}” to the original website content? Your changes to this section will be lost.`)) return;
    startTransition(async () => {
      const original = await restoreDefault(sectionKey);
      setValue(original);
      setSaved(original);
      setErrors([]);
      toast.success("Restored the original content");
    });
  };

  return (
    <div className="mx-auto max-w-4xl pb-24">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-wide text-navy uppercase">{title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
        <a href="/" target="_blank" className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-deep hover:text-navy">
          View site <ExternalLink className="size-3.5" />
        </a>
      </header>

      {errors.length > 0 && (
        <div role="alert" className="mt-6 rounded-xl bg-destructive/10 p-4 text-sm text-destructive">
          <p className="font-semibold">Couldn&apos;t save yet:</p>
          <ul className="mt-1 list-disc pl-5">
            {errors.slice(0, 8).map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6">{children(value, setValue)}</div>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-white/90 backdrop-blur lg:left-64">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 px-4 py-3 sm:px-8">
          <Button type="button" variant="ghost" onClick={reset} disabled={pending}>
            <RotateCcw /> Restore original
          </Button>
          <div className="flex items-center gap-3">
            {dirty && <span className="hidden text-sm text-muted-foreground sm:inline">Unsaved changes</span>}
            {dirty && (
              <Button type="button" variant="outline" onClick={() => setValue(saved)} disabled={pending} className="h-10 px-4">
                Discard
              </Button>
            )}
            <Button type="button" onClick={save} disabled={pending || !dirty} className="h-10 px-5 font-semibold">
              {pending ? <Loader2 className="animate-spin" /> : <Save />}
              Save changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
