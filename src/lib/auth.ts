import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { connection } from "next/server";

const COOKIE = "mastone_admin";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

// Web Crypto rather than node:crypto, so this runs unchanged on Node and on Cloudflare Workers.
const encoder = new TextEncoder();

function env(name: "ADMIN_PASSWORD" | "SESSION_SECRET") {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not set. Add it to .env.local (dev) or your host's environment variables.`);
  return value;
}

function hmacKey() {
  return crypto.subtle.importKey("raw", encoder.encode(env("SESSION_SECRET")), { name: "HMAC", hash: "SHA-256" }, false, [
    "sign",
    "verify",
  ]);
}

const toBase64Url = (buf: ArrayBuffer) =>
  btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

function fromBase64Url(s: string) {
  const bin = atob(s.replace(/-/g, "+").replace(/_/g, "/"));
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
}

/** Constant-time password check: compare HMACs instead of the raw strings. */
export async function checkPassword(input: string) {
  const key = await hmacKey();
  const expected = await crypto.subtle.sign("HMAC", key, encoder.encode(env("ADMIN_PASSWORD")));
  return crypto.subtle.verify("HMAC", key, expected, encoder.encode(input));
}

export async function createSession() {
  const expires = String(Date.now() + MAX_AGE * 1000);
  const sig = await crypto.subtle.sign("HMAC", await hmacKey(), encoder.encode(expires));
  (await cookies()).set(COOKIE, `${expires}.${toBase64Url(sig)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function destroySession() {
  (await cookies()).delete(COOKIE);
}

export async function isAdmin() {
  // The expiry check reads the clock, which Cache Components only allows at request time.
  await connection();
  const token = (await cookies()).get(COOKIE)?.value;
  const [expires, sig] = token?.split(".") ?? [];
  if (!expires || !sig || Number(expires) < Date.now()) return false;
  try {
    return await crypto.subtle.verify("HMAC", await hmacKey(), fromBase64Url(sig), encoder.encode(expires));
  } catch {
    return false;
  }
}

/** Call at the top of every admin page and Server Action; UI checks alone don't protect data. */
export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}
