"use server";

import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { checkPassword, createSession, destroySession, requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { CONTENT_TAG, resetSection, writeSection } from "@/lib/content/store";
import { defaultContent } from "@/lib/content/defaults";
import { contentSchemas, type ContentKey } from "@/lib/content/schema";

export async function login(_prev: string | undefined, formData: FormData) {
  if (!(await checkPassword(String(formData.get("password") ?? "")))) return "Incorrect password";
  await createSession();
  redirect("/admin");
}

export async function logout() {
  await destroySession();
  redirect("/admin/login");
}

export type SaveResult = { ok: true } | { ok: false; errors: string[] };

export async function saveSection(key: ContentKey, value: unknown): Promise<SaveResult> {
  await requireAdmin();
  if (!Object.hasOwn(contentSchemas, key)) return { ok: false, errors: ["Unknown section"] };

  const parsed = contentSchemas[key].safeParse(value);
  if (!parsed.success) {
    return {
      ok: false,
      errors: parsed.error.issues.map((i) => (i.path.length ? `${i.path.map(humanize).join(" › ")}: ${i.message}` : i.message)),
    };
  }
  await writeSection(key, parsed.data);
  updateTag(CONTENT_TAG);
  return { ok: true };
}

export async function restoreDefault<K extends ContentKey>(key: K) {
  await requireAdmin();
  if (!Object.hasOwn(contentSchemas, key)) throw new Error("Unknown section");
  await resetSection(key);
  updateTag(CONTENT_TAG);
  return defaultContent[key];
}

const IMAGE_TYPES: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/gif": "gif",
};
const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;

export async function uploadImage(formData: FormData): Promise<{ url: string } | { error: string }> {
  await requireAdmin();
  const file = formData.get("file");
  if (!(file instanceof File)) return { error: "No file received" };
  // SVG is excluded on purpose: served from our own origin it could run scripts.
  const ext = IMAGE_TYPES[file.type];
  if (!ext) return { error: "Use a PNG, JPG, WebP, AVIF or GIF image" };
  if (file.size > MAX_UPLOAD_BYTES) return { error: "Images must be 4 MB or smaller" };

  const bytes = await file.arrayBuffer();
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  const id = `${[...new Uint8Array(hash)].slice(0, 12).map((b) => b.toString(16).padStart(2, "0")).join("")}.${ext}`;

  await (await db()).execute({
    sql: "INSERT OR IGNORE INTO media (id, content_type, data, created_at) VALUES (?, ?, ?, ?)",
    args: [id, file.type, new Uint8Array(bytes), Date.now()],
  });
  return { url: `/media/${id}` };
}

function humanize(segment: PropertyKey) {
  return typeof segment === "number" ? `#${segment + 1}` : String(segment);
}
