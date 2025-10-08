import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createQuoteServer } from '@/lib/quotesService';
import { sendQuoteEmails } from '@/lib/email';


const QuoteSchema = z.object({
  categoryId: z.string().min(1),
  modelId: z.string().optional().nullable(),
  company: z.string().min(1),
  contactName: z.string().min(1),
  phone: z.string().min(5),
  email: z.string().email(),
  workType: z.string().min(1),
  location: z.string().min(1),
  startDate: z.string().min(1),
  endDate: z.string().min(1),
  capacityNeeded: z.string().optional(),
  preferredManufacturer: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const data = QuoteSchema.parse(json);

    // Derive a non-null capacity string fallback if none provided
    const capacityFallback = (data.capacityNeeded && data.capacityNeeded.trim()) || 'unspecified';

    const inserted = await createQuoteServer({
      category_id: data.categoryId,
      model_id: data.modelId ?? null,
      company: data.company,
      contact_name: data.contactName,
      phone: data.phone,
      email: data.email,
      work_type: data.workType,
      location: data.location,
      start_date: data.startDate,
      end_date: data.endDate,
      capacity_needed: capacityFallback,
      preferred_manufacturer: data.preferredManufacturer ?? null,
      notes: data.notes ?? null,
      status: 'new',
    });

    // Non-blocking notifications
    sendQuoteEmails(inserted).catch(() => {});

    return NextResponse.json({ id: inserted.id }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? 'Invalid payload' }, { status: 400 });
  }
}
