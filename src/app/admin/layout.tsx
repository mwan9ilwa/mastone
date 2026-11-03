import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Mastone Investments",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return <div className="min-h-svh bg-secondary/60">{children}</div>;
}
