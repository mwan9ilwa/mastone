import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { db } from "@/lib/db";
import { defaultContent } from "./defaults";
import { contentSchemas, type ContentKey, type SiteContent } from "./schema";

export const CONTENT_TAG = "content";

/** Reads every section straight from the database, falling back to the defaults for anything unsaved or invalid. */
export async function readContent(): Promise<SiteContent> {
  const { rows } = await (await db()).execute("SELECT key, value FROM content");
  const content = { ...defaultContent } as Record<ContentKey, unknown>;
  for (const row of rows) {
    const key = row.key as ContentKey;
    if (!Object.hasOwn(contentSchemas, key)) continue;
    const parsed = contentSchemas[key].safeParse(JSON.parse(row.value as string));
    if (parsed.success) content[key] = parsed.data;
    else console.error(`Ignoring invalid stored content for "${key}"`, parsed.error);
  }
  return content as SiteContent;
}

/** Cached copy for the public site. Saving from the dashboard expires it via updateTag(CONTENT_TAG). */
export async function getContent(): Promise<SiteContent> {
  "use cache";
  cacheTag(CONTENT_TAG);
  cacheLife("max");
  return readContent();
}

export async function writeSection<K extends ContentKey>(key: K, value: SiteContent[K]) {
  await (await db()).execute({
    sql: `INSERT INTO content (key, value, updated_at) VALUES (?, ?, ?)
          ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`,
    args: [key, JSON.stringify(value), Date.now()],
  });
}

export async function resetSection(key: ContentKey) {
  await (await db()).execute({ sql: "DELETE FROM content WHERE key = ?", args: [key] });
}
