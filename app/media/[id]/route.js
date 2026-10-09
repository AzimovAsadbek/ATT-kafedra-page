import { eq } from "drizzle-orm";
import { db, media } from "@/lib/db";

// Admin paneldan yuklangan rasmlarni beradi. Har bir yuklash yangi ID oladi,
// shuning uchun javobni "immutable" sifatida uzoq muddat keshlash xavfsiz.
export async function GET(_request, { params }) {
  const { id } = await params;
  if (!/^[\w-]{1,64}$/.test(id)) return new Response("Not found", { status: 404 });

  const [file] = await db
    .select({ data: media.data, mimeType: media.mimeType })
    .from(media)
    .where(eq(media.id, id));

  if (!file) return new Response("Not found", { status: 404 });

  return new Response(new Uint8Array(file.data), {
    headers: {
      "Content-Type": file.mimeType,
      "Content-Length": String(file.data.length),
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
