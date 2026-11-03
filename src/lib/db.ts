import "server-only";
import { createClient, type Client } from "@libsql/client";

let client: Client | undefined;
let ready: Promise<unknown> | undefined;

/**
 * libSQL works the same on Vercel (Node) and Cloudflare Workers (HTTP). Point TURSO_DATABASE_URL at a Turso
 * database in production; locally it falls back to a SQLite file so the dashboard works with no setup.
 */
export async function db() {
  client ??= createClient({
    url: process.env.TURSO_DATABASE_URL ?? "file:local.db",
    authToken: process.env.TURSO_AUTH_TOKEN,
  });
  ready ??= client
    .batch(
      [
        "CREATE TABLE IF NOT EXISTS content (key TEXT PRIMARY KEY, value TEXT NOT NULL, updated_at INTEGER NOT NULL)",
        "CREATE TABLE IF NOT EXISTS media (id TEXT PRIMARY KEY, content_type TEXT NOT NULL, data BLOB NOT NULL, created_at INTEGER NOT NULL)",
      ],
      "write"
    )
    .catch((err) => {
      ready = undefined;
      throw err;
    });
  await ready;
  return client;
}
