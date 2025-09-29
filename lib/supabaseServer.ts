import { createClient } from '@supabase/supabase-js';

// Server-side Supabase client using the Service Role key (bypasses RLS). Never expose this key to the client.
export const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);
