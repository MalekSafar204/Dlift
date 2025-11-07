import { supabase } from "@/lib/supabaseClient";
import { CraneCategoryRow, CraneRow } from "@/constants/types";

export async function getCategories(): Promise<CraneCategoryRow[]> {
  const { data, error } = await supabase
    .from("crane_categories")
    .select("*")
    .order("title", { ascending: true });
  if (error) throw error;
  return (data ?? []) as CraneCategoryRow[];
}

export async function getCranesByCategory(
  categoryId: string,
  opts?: {
    manufacturer?: string;
    minCapacityTon?: number;
  }
): Promise<CraneRow[]> {
  let q = supabase.from("cranes").select("*").eq("category_id", categoryId);

  if (opts?.manufacturer) {
    q = q.ilike("manufacturer", `%${opts.manufacturer}%`);
  }
  if (typeof opts?.minCapacityTon === "number") {
    q = q.gte("capacity_ton", opts.minCapacityTon);
  }

  const { data, error } = await q.order("capacity_ton", {
    ascending: true,
    nullsFirst: false,
  });
  if (error) throw error;
  return (data ?? []) as CraneRow[];
}

export async function getCranesCountByCategory(
  categoryId: string
): Promise<number> {
  const { count, error } = await supabase
    .from("cranes")
    .select("*", { count: "exact", head: true })
    .eq("category_id", categoryId);
  if (error) throw error;
  return count ?? 0;
}

export async function getCategoryByHref(
  href: string
): Promise<CraneCategoryRow | null> {
  const { data, error } = await supabase
    .from("crane_categories")
    .select("*")
    .eq("href", href)
    .single();
  if (error) {
    if ((error as any).code === "PGRST116") return null; // no rows
    throw error;
  }
  return data as CraneCategoryRow;
}

export async function getCategoriesWithCounts(): Promise<
  Array<CraneCategoryRow & { cranesCount: number }>
> {
  const cats = await getCategories();
  const counts = await Promise.all(
    cats.map((c) => getCranesCountByCategory(c.id))
  );
  return cats.map((c, i) => ({ ...c, cranesCount: counts[i] ?? 0 }));
}

export async function getCranes(): Promise<CraneRow[]> {
  const { data, error } = await supabase
    .from("cranes")
    .select("*")
    .order("category_id", { ascending: true })
    .order("name", { ascending: true });
  if (error) throw error;
  return (data ?? []) as CraneRow[];
}

export async function createCrane(
  craneData: Partial<CraneRow>
): Promise<CraneRow> {
  const { data, error } = await supabase
    .from("cranes")
    .insert([craneData])
    .select()
    .single();
  if (error) throw error;
  return data as CraneRow;
}

export async function updateCrane(
  id: string,
  updates: Partial<CraneRow>
): Promise<CraneRow> {
  // Remove id from updates to avoid conflicts
  const { id: _, ...updateFields } = updates;

  const { data, error } = await supabase
    .from("cranes")
    .update(updateFields)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as CraneRow;
}

export async function deleteCrane(id: string): Promise<void> {
  const { error } = await supabase.from("cranes").delete().eq("id", id);
  if (error) throw error;
}

export async function uploadCraneImage(
  file: File,
  craneId: string,
  categoryId: string
): Promise<string> {
  // Route through a server-side API so the upload uses authenticated server client
  const fd = new FormData();
  fd.append("file", file);
  fd.append("craneId", craneId);
  fd.append("categoryId", categoryId);

  const res = await fetch("/api/admin/storage/upload", {
    method: "POST",
    body: fd,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.error || `Upload failed with status ${res.status}`);
  }
  const json = await res.json();
  return json.publicUrl as string;
}

export async function deleteCraneImage(imageUrl: string): Promise<void> {
  // Extract the path from the full URL
  // URL format: https://cgbanfottrxxbyoeuegk.supabase.co/storage/v1/object/public/cranes/atc/atc-id.jpg
  const urlParts = imageUrl.split("/cranes/");
  if (urlParts.length < 2) return;

  const filePath = urlParts[1];

  const { error } = await supabase.storage.from("cranes").remove([filePath]);

  if (error) throw error;
}
