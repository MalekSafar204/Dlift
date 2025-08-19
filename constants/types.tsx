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
