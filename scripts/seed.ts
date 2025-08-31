/* eslint-disable no-console */

// Load env from .env.local (first) then .env (fallback)
import { config as loadEnv } from 'dotenv';
loadEnv({ path: '.env.local' });
loadEnv();

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { craneCategories } from '../data/cranes'; // <-- use relative path (tsx doesn't resolve "@/")

// ---- CONFIG ----
const BASE_LOCAL_DIR = 'public'; // your images live under /public now
const BUCKET = 'cranes';         // storage bucket name you created earlier

// If any category hero image path in the data doesn't match your real files,
// put an override here (relative to /public). Example shown, keep empty if not needed.
const categoryImageOverrides: Record<string, string> = {
  // atc: 'ATC.jpg',
  // tc: 'TC.jpg',
  // rtc: 'RTC2.jpg',
  // special: 'MOBILE.jpg',
  // equipment: 'SUPPORT.jpg',
  // crawler: 'crawler/crawler.jpg',
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // service key bypasses RLS (server-only!)
);

function toObjectPath(p: string) {
  // turn "/atc/LTM-1120.jpg" into "atc/LTM-1120.jpg"
  return p.replace(/^\//, '');
}

function capacityToNumber(cap: string | undefined | null): number | null {
  if (!cap) return null;
  const m = cap.match(/(\d+(\.\d+)?)/);
  return m ? Number(m[1]) : null;
}

async function uploadIfNeeded(localRel: string): Promise<string | null> {
  // localRel examples: 'ATC.jpg' or 'atc/LTM-1120.jpg'
  const bucketObjectKey = toObjectPath(localRel);
  const localFsPath = path.join(process.cwd(), BASE_LOCAL_DIR, localRel);

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
    .from(BUCKET)
    .upload(bucketObjectKey, fileBuf, { upsert: true, contentType });

  if (upErr) {
    console.warn('Upload warning:', bucketObjectKey, upErr.message);
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(bucketObjectKey);
  return data.publicUrl;
}

async function verifyAllFiles() {
  const missing: string[] = [];

  for (const cat of craneCategories) {
    const catRel = toObjectPath(categoryImageOverrides[cat.id] ?? cat.image);
    if (!fs.existsSync(path.join(process.cwd(), BASE_LOCAL_DIR, catRel))) {
      missing.push(catRel);
    }
    for (const c of cat.cranes) {
      const rel = toObjectPath(c.image);
      if (!fs.existsSync(path.join(process.cwd(), BASE_LOCAL_DIR, rel))) {
        missing.push(rel);
      }
    }
  }

  if (missing.length) {
    console.error('❌ Missing local files (check names/case & folders):\n' + missing.join('\n'));
    process.exit(1);
  }
}

async function main() {
  // Hard stop if any file path doesn't exist locally
  await verifyAllFiles();

  // Insert/Upsert categories
  for (const cat of craneCategories) {
    const catImageRel = toObjectPath(categoryImageOverrides[cat.id] ?? cat.image);
    const catImageUrl = await uploadIfNeeded(catImageRel).catch(() => null);

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

    // Insert/Upsert cranes
    for (const c of cat.cranes) {
      const rel = toObjectPath(c.image); // e.g. 'atc/LTM-1120.jpg'
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
