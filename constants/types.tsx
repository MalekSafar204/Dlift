// export interface Crane {
//   id: string;
//   name: string;
//   capacity: string;
//   year: string;
//   manufacturer: string;
//   image: string;
//   description: string;
// }

export interface CraneCategory {
  id: string;
  title: string;
  href: string;
  description: string;
  cranes: CraneRow[];
  image: string;
}

export interface QuoteFormState {
  categoryId: string;
  modelName: string;
  company: string;
  contactName: string;
  phone: string;
  email: string;
  workType: string;
  location: string;
  startDate: string;
  endDate: string;
}

// Supabase DB row types
export interface CraneCategoryRow {
  id: string;
  title: string;
  href: string;
  description: string;
  image_url: string | null;
}

export interface CraneRow {
  id: string;
  category_id: string;
  name: string;
  capacity_text: string | null;
  capacity_ton: number | null;
  year_text: string | null;
  manufacturer: string | null;
  image_url: string | null;
  description: string | null;
  spec_category_text?: string | null;
  spec_main_boom_min_m?: number | null;
  spec_main_boom_max_m?: number | null;
  spec_max_hoist_height_m?: number | null;
  spec_jib_type?: string | null;
  spec_jib_min_m?: number | null;
  spec_jib_max_m?: number | null;
  spec_source?: string | null;
  spec_raw?: unknown | null;
  image_key?: string | null;
}

// UI-layer types used across multiple components
export interface UiCategory {
  id: string;
  title: string;
  href: string;
  description: string;
  image: string;
  cranesCount?: number; // optional so it can be reused where count isn’t needed
}

export interface UiCrane {
  id: string;
  name: string;
  capacity: string;
  year: string;
  manufacturer: string;
  image: string;
  description: string;
  // Extended spec fields (optional in UI)
  specCategoryText?: string | null;
  mainBoomMinM?: number | null;
  mainBoomMaxM?: number | null;
  maxHoistHeightM?: number | null;
  jibType?: string | null;
  jibMinM?: number | null;
  jibMaxM?: number | null;
  capacityTon?: number | null; // normalized numeric capacity
}

// API payloads
export type QuoteRequestPayload = {
  categoryId: string;
  modelId?: string | null; // Using model name today; you can switch to id later
  company: string;
  contactName: string;
  phone: string;
  email: string;
  workType: string;
  location: string;
  startDate: string; // yyyy-mm-dd
  endDate: string; // yyyy-mm-dd
  capacityNeeded?: string; // Used by custom request variant
  preferredManufacturer?: string | null;
  notes?: string | null;
};

// Quote requests (Supabase table: quote_requests)
export type QuoteStatus = "new" | "in_review" | "closed";

// Row as stored in the DB
export interface QuoteRequestRow {
  id: string; // uuid
  category_id: string | null; // text, can be null if freeform
  model_id: string | null; // text, optional
  company: string;
  contact_name: string;
  phone: string | null;
  email: string;
  work_type: string | null;
  location: string | null;
  start_date: string | null; // date (yyyy-mm-dd)
  end_date: string | null; // date (yyyy-mm-dd)
  capacity_needed: string | null;
  preferred_manufacturer: string | null;
  notes: string | null;
  status: QuoteStatus; // enum
  created_at: string; // timestamptz ISO string
}
