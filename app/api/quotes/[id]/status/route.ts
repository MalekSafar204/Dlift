import { NextResponse } from "next/server";
import { updateQuoteStatusServer } from "@/lib/quotesServiceServer";
import { requireAdminSession } from "@/lib/adminAuth";

export const runtime = "nodejs";

export async function PATCH(
  _req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const { id } = await ctx.params;
  if (!(await requireAdminSession()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  let body: any = {};
  try {
    body = await _req.json();
  } catch {}
  const status = body?.status;
  if (!["new", "in_review", "closed"].includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }
  try {
    const res = await updateQuoteStatusServer(id, status);
    return NextResponse.json(res);
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Failed to update status" },
      { status: 500 }
    );
  }
}
