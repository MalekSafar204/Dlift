import { supabase } from '@/lib/supabaseClient';
import { CraneCategoryRow, CraneRow } from '@/constants/types';

export async function getCategories(): Promise<CraneCategoryRow[]> {
  const { data, error } = await supabase
    .from('crane_categories')
    .select('*')
    .order('title', { ascending: true });
  if (error) throw error;
  return (data ?? []) as CraneCategoryRow[];
}


export async function getCranesByCategory(categoryId: string, opts?: {
  manufacturer?: string;
  minCapacityTon?: number;
}): Promise<CraneRow[]> {
  let q = supabase.from('cranes').select('*').eq('category_id', categoryId);

  if (opts?.manufacturer) {
    q = q.ilike('manufacturer', `%${opts.manufacturer}%`);
  }
  if (typeof opts?.minCapacityTon === 'number') {
    q = q.gte('capacity_ton', opts.minCapacityTon);
  }

  const { data, error } = await q.order('capacity_ton', { ascending: true, nullsFirst: false });
  if (error) throw error;
  return (data ?? []) as CraneRow[];
}

export async function getCranesCountByCategory(categoryId: string): Promise<number> {
  const { count, error } = await supabase
    .from('cranes')
    .select('*', { count: 'exact', head: true })
    .eq('category_id', categoryId);
  if (error) throw error;
  return count ?? 0;
}

export async function getCategoryByHref(href: string): Promise<CraneCategoryRow | null> {
  const { data, error } = await supabase
    .from('crane_categories')
    .select('*')
    .eq('href', href)
    .single();
  if (error) {
    if ((error as any).code === 'PGRST116') return null; // no rows
    throw error;
  }
  return data as CraneCategoryRow;
}

export async function getCategoriesWithCounts(): Promise<Array<CraneCategoryRow & { cranesCount: number }>> {
  const cats = await getCategories();
  const counts = await Promise.all(cats.map(c => getCranesCountByCategory(c.id)));
  return cats.map((c, i) => ({ ...c, cranesCount: counts[i] ?? 0 }));
}
