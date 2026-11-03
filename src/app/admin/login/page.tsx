import Image from "next/image";
import { LoginForm } from "@/components/admin/login-form";

export default function LoginPage() {
  return (
    <main className="grid min-h-svh place-items-center bg-navy-900 px-4">
      <div className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-2xl">
        <Image src="/images/logo-color.png" alt="Mastone Investments" width={354} height={101} className="h-10 w-auto" priority />
        <h1 className="mt-6 font-heading text-2xl font-bold tracking-wide text-navy uppercase">Website dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">Sign in to edit the website content.</p>
        <LoginForm />
      </div>
    </main>
  );
}
