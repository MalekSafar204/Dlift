export interface Crane {
  id: string;
  name: string;
  capacity: string;
  year: string;
  manufacturer: string;
  image: string;
  description: string;
}

export interface CraneCategory {
  id: string;
  title: string;
  href: string;
  description: string;
  cranes: Crane[];
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
  endDate: string;   // yyyy-mm-dd
  capacityNeeded?: string; // Used by custom request variant
  preferredManufacturer?: string | null;
  notes?: string | null;
};
