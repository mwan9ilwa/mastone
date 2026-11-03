import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { adminSections } from "@/components/admin/sections";
import { requireAdmin } from "@/lib/auth";

export default async function AdminHome() {
  await requireAdmin();
  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="font-heading text-3xl font-bold tracking-wide text-navy uppercase">Website content</h1>
      <p className="mt-1 text-sm text-muted-foreground">Choose a section to edit. Saved changes appear on the live site straight away.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {adminSections.map((s) => (
          <Link
            key={s.slug}
            href={`/admin/${s.slug}`}
            className="group flex items-start gap-4 rounded-2xl bg-white p-5 ring-1 ring-border transition-all hover:-translate-y-0.5 hover:shadow-lg hover:ring-brand/50"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-navy-900 text-brand transition-colors group-hover:bg-brand group-hover:text-navy-900">
              <s.icon className="size-5" />
            </span>
            <span className="flex-1">
              <span className="block font-semibold text-navy">{s.title}</span>
              <span className="mt-0.5 block text-sm text-muted-foreground">{s.description}</span>
            </span>
            <ArrowRight className="mt-1 size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
          </Link>
        ))}
      </div>
    </div>
  );
}
