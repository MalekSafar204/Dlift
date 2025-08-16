export interface Crane {
  name: string;
  capacity: string;
  year: string;
  manufacturer: string;
}

export interface CraneCategory {
  id: string;
  title: string;
  href: string;
  description: string;
  cranes: Crane[];
  image: string;
}
