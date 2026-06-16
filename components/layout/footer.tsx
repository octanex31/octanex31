'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Hexagon,
  Mail,
  Phone,
  MessageCircle,
  ArrowUpRight,
  ExternalLink,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/book-demo', label: 'Book Demo' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const serviceLinks = [
  { href: '/services/ai-call-assistant', label: 'AI Call Assistant' },
  { href: '/services/custom-apps', label: 'Custom Apps' },
  { href: '/services/landing-pages', label: 'Landing Pages' },
  { href: '/services/business-websites', label: 'Business Websites' },
  { href: '/services/whatsapp-business', label: 'WhatsApp Business' },
  { href: '/google-reputation-growth', label: 'Google Reputation Growth' },
];

const policyLinks = [
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms-of-service', label: 'Terms of Service' },
  { href: '/refund-policy', label: 'Refund Policy' },
];

const whatsappNumber = '+918975938518';
const whatsappClean = whatsappNumber.replace(/[^0-9]/g, '');

function FooterLink({ href, label, external }: { href: string; label: string; external?: boolean }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1 text-sm text-text-secondary transition-all duration-200 hover:text-violet-light"
    >
      {label}
      {external && <ArrowUpRight className="h-3 w-3" />}
    </Link>
  );
}

function Footer() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const year = new Date().getFullYear();

  const fetchSettings = async () => {
    const { data } = await supabase
      .from('site_settings')
      .select('key, value');
    if (data) {
      const map: Record<string, string> = {};
      data.forEach((s) => (map[s.key] = s.value));
      setSettings(map);
    }
  };

  useEffect(() => {
    fetchSettings();
    const interval = setInterval(fetchSettings, 30000);
    return () => clearInterval(interval);
  }, []);

  const email = settings.contact_email || 'salunkheshivam18@gmail.com';
  const phone = settings.contact_phone || '+918975938518';
  const whatsapp = settings.whatsapp_number || '+918975938518';
  const phoneDisplay = phone.replace('+91', '+91 ').replace(/(\d{5})(\d{5})/, '$1 $2');
  const whatsappCleanNum = whatsapp.replace(/[^0-9]/g, '');

  return (
    <footer className="relative border-t border-glass-border bg-bg-primary">
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-electric-violet/40 to-transparent" />

      <div className="container mx-auto px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5 text-xl font-bold">
              <Hexagon className="h-7 w-7 text-electric-violet" />
              <span className="bg-gradient-to-r from-electric-violet to-cyan bg-clip-text text-transparent">
                OctaNex31
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-text-secondary">
              A premium digital agency crafting innovative apps, websites, and
              AI-powered solutions that transform ideas into digital empires.
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={`https://wa.me/${whatsappCleanNum}?text=Hi%20OctaNex31%2C%20I%27d%20like%20to%20know%20more%20about%20your%20services`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-glass-border px-4 py-2 text-sm text-text-secondary transition-all duration-200 hover:border-electric-violet/50 hover:text-electric-violet hover:shadow-[0_0_15px_rgba(212,175,55,0.2)]"
              >
                <MessageCircle className="h-4 w-4" />
                Chat on WhatsApp
              </a>
              <a
                href={`tel:${phone}`}
                className="inline-flex items-center gap-2 rounded-lg border border-glass-border px-4 py-2 text-sm text-text-secondary transition-all duration-200 hover:border-electric-violet/50 hover:text-electric-violet hover:shadow-[0_0_15px_rgba(212,175,55,0.2)]"
              >
                <Phone className="h-4 w-4" />
                Call Now
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-text-primary">Quick Links</h3>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}><FooterLink href={link.href} label={link.label} /></li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-text-primary">Services</h3>
            <ul className="flex flex-col gap-2.5">
              {serviceLinks.map((link) => (
                <li key={link.href}><FooterLink href={link.href} label={link.label} /></li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-text-primary">Contact</h3>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href={`mailto:${email}`}
                  className="inline-flex items-center gap-2.5 text-sm text-text-secondary transition-colors hover:text-violet-light"
                >
                  <Mail className="h-4 w-4 text-electric-violet" />
                  {email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${phone}`}
                  className="inline-flex items-center gap-2.5 text-sm text-text-secondary transition-colors hover:text-violet-light"
                >
                  <Phone className="h-4 w-4 text-electric-violet" />
                  {phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${whatsappCleanNum}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-sm text-text-secondary transition-colors hover:text-violet-light"
                >
                  <MessageCircle className="h-4 w-4 text-electric-violet" />
                  {whatsapp}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-glass-border pt-8 sm:flex-row">
          <p className="text-xs text-text-secondary">&copy; {year} OctaNex31. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {policyLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-xs text-text-secondary transition-colors hover:text-violet-light">
                {link.label}
              </Link>
            ))}
          </div>
          <p className="text-xs text-text-secondary">
            Built with <span className="text-red-500">&hearts;</span> by Shivam Salunkhe
          </p>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
