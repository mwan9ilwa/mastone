"use client";

import { useActionState } from "react";
import { Loader2, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/app/admin/actions";

export function LoginForm() {
  const [error, action, pending] = useActionState(login, undefined);
  return (
    <form action={action} className="mt-6 grid gap-4">
      <div className="grid gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" required autoFocus autoComplete="current-password" className="h-11" />
      </div>
      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
      <Button type="submit" disabled={pending} className="h-11 rounded-full font-semibold">
        {pending ? <Loader2 className="animate-spin" /> : <LogIn />} Sign in
      </Button>
    </form>
  );
}
