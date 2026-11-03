import { db } from "@/lib/db";

/** Serves images uploaded from the dashboard. Names are content hashes, so responses never change and cache forever. */
export async function GET(_req: Request, ctx: RouteContext<"/media/[file]">) {
  const { file } = await ctx.params;
  const { rows } = await (await db()).execute({
    sql: "SELECT content_type, data FROM media WHERE id = ?",
    args: [file],
  });
  const row = rows[0];
  if (!row) return new Response("Not found", { status: 404 });

  return new Response(row.data as ArrayBuffer, {
    headers: {
      "Content-Type": row.content_type as string,
      "Cache-Control": "public, max-age=31536000, s-maxage=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
