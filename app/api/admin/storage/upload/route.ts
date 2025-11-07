import { NextResponse } from "next/server";
import { createAuthenticatedSupabaseClient } from "@/lib/supabaseAuth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file");
    const craneId = String(form.get("craneId") || "").trim();
    const categoryId = String(form.get("categoryId") || "").trim();

    if (!(file instanceof Blob)) {
      return NextResponse.json({ error: "Missing file" }, { status: 400 });
    }
    if (!craneId || !categoryId) {
      return NextResponse.json(
        { error: "Missing craneId or categoryId" },
        { status: 400 }
      );
    }

    const supabase = await createAuthenticatedSupabaseClient();

    // Derive filename and path
    const originalName = (file as any).name || "upload.bin";
    const fileExt = originalName.split(".").pop()?.toLowerCase() || "jpg";
    const fileName = `${craneId}.${fileExt}`;
    const filePath = `${categoryId}/${fileName}`;

    // Attempt upload without upsert first
    const attempt1 = await supabase.storage
      .from("cranes")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (attempt1.error) {
      // If conflict, try delete then re-upload
      if ((attempt1.error as any).statusCode === "409") {
        const del = await supabase.storage.from("cranes").remove([filePath]);
        if (del.error) {
          return NextResponse.json(
            { error: `Delete denied: ${del.error.message}` },
            { status: 403 }
          );
        }
        const attempt2 = await supabase.storage
          .from("cranes")
          .upload(filePath, file, { cacheControl: "3600", upsert: false });
        if (attempt2.error) {
          return NextResponse.json(
            { error: `Upload failed after delete: ${attempt2.error.message}` },
            { status: 403 }
          );
        }
      } else {
        return NextResponse.json(
          {
            error: `Upload failed: ${attempt1.error.message}. If this mentions row-level security, ensure INSERT on storage.objects for bucket_id='cranes' and role 'authenticated'.`,
          },
          { status: 403 }
        );
      }
    }

    const { data: pub } = supabase.storage
      .from("cranes")
      .getPublicUrl(filePath);
    return NextResponse.json({ publicUrl: pub.publicUrl });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Upload failed" },
      { status: 500 }
    );
  }
}
