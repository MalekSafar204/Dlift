import { supabase } from '@/lib/supabaseClient';

export async function getCategories() {
  const { data, error } = await supabase
    .from('crane_categories')
    .select('*')
    .order('title', { ascending: true });
  if (error) throw error;
  return data;
}


export async function getCranesByCategory(categoryId: string, opts?: {
  manufacturer?: string;
  minCapacityTon?: number;
}) {
  let q = supabase.from('cranes').select('*').eq('category_id', categoryId);

  if (opts?.manufacturer) {
    q = q.ilike('manufacturer', `%${opts.manufacturer}%`);
  }
  if (typeof opts?.minCapacityTon === 'number') {
    q = q.gte('capacity_ton', opts.minCapacityTon);
  }

  const { data, error } = await q.order('capacity_ton', { ascending: true, nullsFirst: false });
  if (error) throw error;
  return data;
}
