import { z } from 'zod';

export const leadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  business_type: z.string().optional(),
  service_interest: z.string().optional(),
  message: z.string().optional(),
});

export const demoBookingSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  business_name: z.string().min(2, 'Business name must be at least 2 characters'),
  phone: z.string().min(10, 'Phone must be at least 10 characters'),
  whatsapp_number: z.string().min(10, 'WhatsApp number must be at least 10 characters'),
  business_type: z.string().optional(),
  service_interest: z.string().min(1, 'Please select a service'),
  time_slot: z.string().min(1, 'Preferred time is required'),
  message: z.string().optional(),
});

export const feedbackSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export const blogPostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  content: z.string().optional(),
  excerpt: z.string().optional(),
  cover_image_url: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
  og_image_url: z.string().optional(),
  status: z.enum(['draft', 'published']),
});

export const caseStudySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  client_type: z.string().optional(),
  problem: z.string().optional(),
  solution: z.string().optional(),
  results: z.string().optional(),
  screenshots: z.array(z.string()).optional(),
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
  status: z.enum(['draft', 'published']),
});

export const testimonialSchema = z.object({
  client_name: z.string().min(1, 'Client name is required'),
  business: z.string().optional(),
  rating: z.coerce.number().min(1, 'Rating must be at least 1').max(5, 'Rating must be at most 5'),
  text: z.string().min(1, 'Text is required'),
  photo_url: z.string().optional(),
  display_order: z.coerce.number().int().optional(),
});

export const portfolioSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  type: z.enum(['app', 'website']),
  description: z.string().optional(),
  screenshots: z.array(z.string()).optional(),
  features: z.array(z.string()).optional(),
  benefits: z.array(z.string()).optional(),
  user_journey: z.array(z.string()).optional(),
  cta_text: z.string().optional(),
  cta_link: z.string().optional(),
});

export const serviceSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  setup_fee: z.coerce.number().min(0, 'Setup fee must be non-negative'),
  plans: z.array(z.any()).optional(),
  features: z.array(z.string()).optional(),
  is_active: z.boolean().optional(),
  display_order: z.coerce.number().int().optional(),
});

export const planSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  tagline: z.string().optional(),
  setup_fee: z.coerce.number().min(0, 'Setup fee must be non-negative'),
  monthly_label: z.string().optional(),
  features: z.array(z.any()).optional(),
  is_popular: z.boolean().optional(),
  display_order: z.coerce.number().int().optional(),
});

export const siteSettingSchema = z.object({
  key: z.string().min(1, 'Key is required'),
  value: z.string().min(1, 'Value is required'),
});

export const faqSchema = z.object({
  question: z.string().min(1, 'Question is required'),
  answer: z.string().min(1, 'Answer is required'),
  display_order: z.coerce.number().int().optional(),
  is_active: z.boolean().optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;
export type DemoBookingInput = z.infer<typeof demoBookingSchema>;
export type FeedbackInput = z.infer<typeof feedbackSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type BlogPostInput = z.infer<typeof blogPostSchema>;
export type CaseStudyInput = z.infer<typeof caseStudySchema>;
export type TestimonialInput = z.infer<typeof testimonialSchema>;
export type PortfolioInput = z.infer<typeof portfolioSchema>;
export type ServiceInput = z.infer<typeof serviceSchema>;
export type PlanInput = z.infer<typeof planSchema>;
export type SiteSettingInput = z.infer<typeof siteSettingSchema>;
export type FAQInput = z.infer<typeof faqSchema>;
