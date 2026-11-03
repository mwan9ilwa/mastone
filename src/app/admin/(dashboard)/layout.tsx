import { AdminNav } from "@/components/admin/admin-nav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdminNav />
      {/* Each page has its own loading.tsx boundary, so navigating between sections shows the shell instantly. */}
      <main className="px-4 py-8 sm:px-8 lg:ml-64">{children}</main>
    </>
  );
}
