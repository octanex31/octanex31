# OctaNex31 — Premium Agency Website & CMS

> **Where Ideas Become Digital Empires**
>
> Owned & operated by **Shivam Salunkhe**

A fully functional, production-ready SaaS-grade agency website and CMS platform built with Next.js 14, Supabase, and modern web technologies.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Framer Motion, Lucide Icons |
| **Backend** | Supabase (PostgreSQL, Auth, Storage, Realtime) |
| **Forms** | React Hook Form + Zod validation |
| **Rich Text** | TipTap editor |
| **Email** | Resend (3,000 emails/month free tier) |
| **Analytics** | Google Analytics 4 + Google Search Console |
| **Hosting** | Vercel (free tier) |

---

## Project Structure

```
octanex31/
├── app/
│   ├── (public)/          # Public-facing pages
│   │   ├── page.tsx       # Home
│   │   ├── services/      # Service pages
│   │   ├── pricing/       # Pricing plans
│   │   ├── portfolio/     # Portfolio showcase (apps + websites)
│   │   ├── blog/          # Blog with pagination
│   │   ├── case-studies/  # Case studies
│   │   ├── about/         # About page
│   │   ├── contact/       # Contact form
│   │   ├── book-demo/     # Demo booking system
│   │   ├── maintenance/   # Maintenance plans
│   │   ├── privacy-policy/
│   │   ├── terms-of-service/
│   │   └── refund-policy/
│   ├── admin/             # Protected admin dashboard
│   │   ├── login/
│   │   ├── dashboard/
│   │   ├── leads/
│   │   ├── demo-bookings/
│   │   ├── feedback/
│   │   ├── services/
│   │   ├── portfolio/
│   │   ├── pricing/
│   │   ├── testimonials/
│   │   ├── blog/
│   │   ├── case-studies/
│   │   ├── media/
│   │   ├── settings/
│   │   └── analytics/
│   ├── api/               # API routes
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── ui/                # Base UI primitives
│   ├── layout/            # Header, Footer, Navigation
│   ├── home/              # Homepage sections
│   ├── services/          # Service & pricing components
│   ├── portfolio/         # Portfolio components
│   ├── blog/              # Blog components
│   └── admin/             # Admin dashboard components
├── lib/                   # Utilities, Supabase clients, validators
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript interfaces
├── supabase/
│   └── migrations/        # SQL migrations
├── email-templates/       # Email templates
└── public/                # Static assets
```

---

## Environment Variables

Copy `.env.local.example` to `.env.local` and fill in the values:

```bash
cp .env.local.example .env.local
```

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-only) |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | Google reCAPTCHA v3 site key |
| `RECAPTCHA_SECRET_KEY` | Google reCAPTCHA v3 secret key |
| `NEXT_PUBLIC_GA4_ID` | Google Analytics 4 measurement ID |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Google Search Console verification code |
| `RESEND_API_KEY` | Resend API key for email sending |
| `RESEND_FROM_EMAIL` | Sender email address (default: salunkheshivam18@gmail.com) |
| `ADMIN_EMAIL` | Admin email for auth (default: salunkheshivam18@gmail.com) |
| `NEXT_PUBLIC_SITE_URL` | Public site URL (default: https://octanex31.vercel.app) |

---

## Setup Instructions

### 1. Clone & Install

```bash
git clone <repo-url> octanex31
cd octanex31
npm install
```

### 2. Supabase Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** → run `supabase/migrations/001_init.sql` to create all tables and policies
3. Go to **SQL Editor** → run `supabase/seed.sql` to populate initial data
4. Go to **Storage** → the `media` bucket is created via migration (if not, create it manually as a public bucket)
5. Go to **Authentication** → enable email/password sign-in
6. Copy your project URL, anon key, and service role key to `.env.local`

### 3. reCAPTCHA Setup

1. Go to [google.com/recaptcha/admin](https://www.google.com/recaptcha/admin)
2. Create a v3 key for your domain (use `localhost` for development)
3. Copy site key and secret key to `.env.local`

### 4. Email Setup (Resend)

1. Sign up at [resend.com](https://resend.com)
2. Create an API key → copy to `.env.local` as `RESEND_API_KEY`
3. On the free tier, you can use `salunkheshivam18@gmail.com` as the sender
4. Verify your domain later for custom sender address

### 5. Run Development

```bash
npm run dev
```

Visit `http://localhost:3000` for the public site.
Visit `http://localhost:3000/admin/login` for the admin dashboard.
Login with: `salunkheshivam18@gmail.com` (set up password in Supabase Auth).

---

## Deployment (Vercel)

### Automatic Deploy

1. Push code to GitHub/GitLab
2. Import repository in Vercel
3. Add all environment variables in Vercel project settings
4. Deploy — Vercel auto-detects Next.js

### Post-Deployment

1. Update reCAPTCHA keys for your production domain
2. Update Resend sender domain if using custom domain
3. Configure GA4 and Google Search Console
4. Set custom domain (optional — see below)

---

## Domain Upgrade Guide

When you purchase a custom domain (e.g., `octanex31.in`):

1. **Add domain in Vercel dashboard** under your project settings → Domains
2. **Update DNS records** as instructed by Vercel
3. **Change one environment variable**:
   ```
   NEXT_PUBLIC_SITE_URL=https://octanex31.in
   ```
4. **Update Resend sender** (optional):
   ```
   RESEND_FROM_EMAIL=noreply@octanex31.in
   ```
5. **Update reCAPTCHA keys** to include your new domain

**No code changes required** — all URLs are driven by `NEXT_PUBLIC_SITE_URL`.

---

## Features

### Public Website
- Responsive dark-mode design with glassmorphism
- Service showcase with detailed pages
- Pricing plans with comparison
- Portfolio gallery (apps + websites)
- Blog with TipTap editor content
- Case studies
- Demo booking system (calendar-style)
- Contact form with reCAPTCHA
- Maintenance plans
- Legal pages (privacy, terms, refund)
- SEO optimized (metadata, sitemap, robots.txt, JSON-LD)

### Admin Dashboard (`/admin`)
- Overview with stats cards
- Lead management (view, filter, update status, add notes)
- Demo booking management (view, confirm, reschedule)
- Feedback/messages management
- Services management (edit descriptions, prices)
- Portfolio management (add/edit/delete items)
- Pricing plans management
- Testimonials management (add/edit/delete/reorder)
- Blog CMS with TipTap rich text editor
- Case studies management
- Media library (upload, manage files)
- Site settings (homepage content, contact info, SEO)
- Analytics dashboard

### Security
- Supabase Auth for admin access
- Row Level Security (RLS) on all tables
- reCAPTCHA v3 on all public forms
- Rate limiting on API routes
- Security headers (CSP, X-Frame-Options, etc.)
- Input validation with Zod

### Email Automation
- New lead notification → admin
- New demo booking → admin + confirmation to visitor
- New feedback/message → admin
- Powered by Resend

---

## Admin Login

- **URL**: `/admin/login`
- **Email**: `salunkheshivam18@gmail.com`
- **Password**: Set via Supabase Auth dashboard

Only Shivam Salunkhe has admin access.

---

## Maintenance

All public website content is editable from the admin dashboard:
- Prices, plans, and services
- Portfolio items and screenshots
- Testimonials and FAQ
- Blog posts and case studies
- Homepage sections and SEO settings
- Contact information and footer content

No code changes needed for content updates.

---

## License

© 2024 OctaNex31 — Owned by Shivam Salunkhe. All rights reserved.
