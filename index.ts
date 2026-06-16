export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  business_type: string | null;
  service_interest: string | null;
  message: string | null;
  status: 'new' | 'contacted' | 'qualified' | 'closed';
  notes: string | null;
  created_at: string;
}

export interface DemoBooking {
  id: string;
  name: string;
  email: string;
  phone: string;
  business_type: string | null;
  service_interest: string | null;
  date: string;
  time_slot: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes: string | null;
  created_at: string;
}

export interface Feedback {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

export interface Testimonial {
  id: string;
  client_name: string;
  business: string | null;
  rating: number;
  text: string;
  photo_url: string | null;
  display_order: number;
  created_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  excerpt: string | null;
  cover_image_url: string | null;
  category: string | null;
  tags: string[] | null;
  meta_title: string | null;
  meta_description: string | null;
  og_image_url: string | null;
  status: 'draft' | 'published';
  published_at: string | null;
  reading_time: number | null;
  created_at: string;
  updated_at: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  client_type: string | null;
  problem: string | null;
  solution: string | null;
  results: string | null;
  screenshots: string[] | null;
  meta_title: string | null;
  meta_description: string | null;
  status: 'draft' | 'published';
  created_at: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  slug: string;
  type: 'app' | 'website';
  description: string | null;
  screenshots: string[] | null;
  features: string[] | null;
  benefits: string[] | null;
  user_journey: string[] | null;
  cta_text: string | null;
  cta_link: string | null;
  display_order: number;
  created_at: string;
}

export interface Service {
  id: string;
  name: string;
  description: string | null;
  setup_fee: number;
  plans: any[] | null;
  features: string[] | null;
  is_active: boolean;
  display_order: number;
  created_at: string;
}

export interface Plan {
  id: string;
  name: string;
  tagline: string | null;
  setup_fee: number;
  monthly_label: string | null;
  features: any[] | null;
  is_popular: boolean;
  is_active: boolean;
  display_order: number;
  created_at: string;
}

export interface SiteSetting {
  id: string;
  key: string;
  value: string;
  updated_at: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

export interface Media {
  id: string;
  filename: string;
  url: string;
  size: number | null;
  type: string | null;
  uploaded_at: string;
}
