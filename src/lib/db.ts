import "server-only";
import { createClient, type Client } from "@libsql/client";

let client: Client | undefined;
let ready: Promise<unknown> | undefined;

/** Env values pasted into a host's dashboard often pick up whitespace or the quotes from a .env file. */
const envValue = (name: string) => process.env[name]?.trim().replace(/^(["'])(.*)\1$/, "$2") || undefined;

/**
 * libSQL works the same on Vercel (Node) and Cloudflare Workers (HTTP). Point TURSO_DATABASE_URL at a Turso
 * database in production; locally it falls back to a SQLite file so the dashboard works with no setup.
 */
export async function db() {
  const url = envValue("TURSO_DATABASE_URL") ?? "file:local.db";
  const authToken = envValue("TURSO_AUTH_TOKEN");
  client ??= createClient({ url, authToken });
  ready ??= client
    .batch(
      [
        "CREATE TABLE IF NOT EXISTS content (key TEXT PRIMARY KEY, value TEXT NOT NULL, updated_at INTEGER NOT NULL)",
        "CREATE TABLE IF NOT EXISTS media (id TEXT PRIMARY KEY, content_type TEXT NOT NULL, data BLOB NOT NULL, created_at INTEGER NOT NULL)",
      ],
      "write"
    )
    .catch(async (err) => {
      client = undefined;
      ready = undefined;
      throw new Error(await describeConnectionError(url, authToken, err), { cause: err });
    });
  await ready;
  return client;
}

/** The libSQL client drops the server's response body, which is what actually says what's wrong. Fetch it once. */
async function describeConnectionError(url: string, authToken: string | undefined, err: unknown) {
  const original = err instanceof Error ? err.message : String(err);
  if (url.startsWith("file:")) return `Could not open the local database (${url}): ${original}`;

  let host = url;
  let detail = original;
  try {
    const endpoint = new URL(url.replace(/^libsql:/, "https:"));
    host = endpoint.host;
    const res = await fetch(new URL("/v2/pipeline", endpoint), {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(authToken && { Authorization: `Bearer ${authToken}` }) },
      body: JSON.stringify({ requests: [{ type: "execute", stmt: { sql: "SELECT 1" } }, { type: "close" }] }),
    });
    if (!res.ok) detail = `HTTP ${res.status}: ${(await res.text()).slice(0, 300) || res.statusText}`;
  } catch {
    // Keep the original message if the diagnostic request itself fails.
  }
  return [
    `Could not connect to the Turso database at ${host} (${detail}).`,
    `Check TURSO_DATABASE_URL (libsql://<db>-<org>.turso.io) and TURSO_AUTH_TOKEN (from \`turso db tokens create <db>\`)`,
    `are set for this environment${authToken ? "" : " — no auth token is set"}.`,
  ].join(" ");
}
