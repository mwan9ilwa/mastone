"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink, LayoutDashboard, LogOut } from "lucide-react";
import { logout } from "@/app/admin/actions";
import { adminSections } from "@/components/admin/sections";
import { cn } from "@/lib/utils";

const links = [{ href: "/admin", title: "Overview", icon: LayoutDashboard }, ...adminSections.map((s) => ({ ...s, href: `/admin/${s.slug}` }))];

export function AdminNav() {
  const pathname = usePathname();
  return (
    <aside className="bg-navy-900 text-white lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-64 lg:flex-col">
      <div className="flex items-center justify-between gap-3 px-5 py-4 lg:py-6">
        <Link href="/admin">
          <Image src="/images/logo-white.png" alt="Mastone Investments" width={354} height={101} className="h-8 w-auto" />
        </Link>
        <form action={logout} className="lg:hidden">
          <button type="submit" aria-label="Sign out" className="grid size-9 place-items-center rounded-lg text-white/70 hover:bg-white/10 hover:text-white">
            <LogOut className="size-4" />
          </button>
        </form>
      </div>
      <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-1 lg:flex-col lg:overflow-visible">
        {links.map((l) => {
          const active = pathname === l.href;
          return (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "flex shrink-0 items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active ? "bg-brand text-navy-900" : "text-white/70 hover:bg-white/10 hover:text-white"
              )}
            >
              <l.icon className="size-4" />
              {l.title}
            </Link>
          );
        })}
      </nav>
      <div className="hidden gap-1 border-t border-white/10 p-3 lg:grid">
        <a href="/" target="_blank" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white">
          <ExternalLink className="size-4" /> View website
        </a>
        <form action={logout}>
          <button type="submit" className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white">
            <LogOut className="size-4" /> Sign out
          </button>
        </form>
      </div>
    </aside>
  );
}
