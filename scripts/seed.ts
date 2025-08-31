/* eslint-disable no-console */
import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import { craneCategories } from '@/data/cranes'; 

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // service key bypasses RLS for write
);

function toObjectPath(p: string) {
  // your paths start with '/atc/..' -> store under 'atc/..' in bucket
  return p.replace(/^\//, '').replace(/^\//, '');
}

function capacityToNumber(cap: string | undefined | null): number | null {
  if (!cap) return null;
  // pick first integer in the string; if none, return null
  const m = cap.match(/(\d+(\.\d+)?)/);
  return m ? Number(m[1]) : null;
}

async function uploadIfNeeded(localRel: string): Promise<string | null> {
  // localRel examples: 'atc/LTM-1120.jpg'
  const bucketObjectKey = toObjectPath(localRel);
  const localFsPath = path.join(process.cwd(), 'public', 'cranes', localRel);

  if (!fs.existsSync(localFsPath)) {
    console.warn('Image missing locally, skipping upload:', localFsPath);
    return null;
  }

  const fileBuf = fs.readFileSync(localFsPath);
  const ext = path.extname(localFsPath).toLowerCase();
  const contentType =
    ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg'
    : ext === '.png' ? 'image/png'
    : ext === '.webp' ? 'image/webp'
    : 'application/octet-stream';

  const { error: upErr } = await supabase.storage
    .from('cranes')
    .upload(bucketObjectKey, fileBuf, { upsert: true, contentType });

  if (upErr) {
    // If it already exists and upsert failed for any reason, continue
    console.warn('Upload warning:', bucketObjectKey, upErr.message);
  }

  const { data } = supabase.storage.from('cranes').getPublicUrl(bucketObjectKey);
  return data.publicUrl;
}

async function main() {
  // Insert categories first
  for (const cat of craneCategories) {
    // Upload category image
    const catImageKey = toObjectPath(cat.image.replace(/^\//, '')); // e.g. 'ATC.jpg' → 'ATC.jpg'
    const catImageUrl = await uploadIfNeeded(catImageKey).catch(() => null);

    // Upsert category
    const { error: catErr } = await supabase
      .from('crane_categories')
      .upsert(
        {
          id: cat.id,
          title: cat.title,
          href: cat.href,
          description: cat.description,
          image_url: catImageUrl ?? null,
        },
        { onConflict: 'id' }
      );
    if (catErr) throw catErr;

    // Insert cranes
    for (const c of cat.cranes) {
      // Upload crane image (your `image` starts with '/atc/...'; we map to 'atc/...' under 'public/cranes')
      const rel = c.image.replace(/^\//, '');        // 'atc/LTM-1120.jpg'
      const craneImageUrl = await uploadIfNeeded(rel).catch(() => null);

      const { error: craneErr } = await supabase
        .from('cranes')
        .upsert(
          {
            id: c.id,
            category_id: cat.id,
            name: c.name,
            capacity_text: c.capacity,
            capacity_ton: capacityToNumber(c.capacity),
            year_text: c.year,
            manufacturer: c.manufacturer,
            image_url: craneImageUrl ?? null,
            description: c.description,
          },
          { onConflict: 'id' }
        );
      if (craneErr) throw craneErr;
    }
  }

  console.log('✅ Seed complete.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
