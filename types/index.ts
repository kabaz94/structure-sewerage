export interface Service {
  slug: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  image?: string;
  featured?: boolean;
  category: "sewerage" | "civil" | "hygiene" | "emergency" | "machinery";
  longDescription?: string;
  subServices?: { title: string; items: string[] }[];
}

export interface Project {
  slug: string;
  client: string;
  sector: string;
  title: string;
  description: string;
  tags: string[];
  images: string[];
}

export interface Certification {
  name: string;
  standard: string;
  icon: string;
  image?: string;
}

export interface Client {
  name: string;
  logo: string;
}

export interface Stat {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  isDecimal?: boolean;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  logo?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  image: string;
  content: string;
  tags: string[];
}

export interface ContactFormData {
  fullName: string;
  companyName?: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  honeypot?: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface Product {
  slug: string;
  title: string;
  description: string;
  category: string;
  features: string[];
  image?: string;
}
