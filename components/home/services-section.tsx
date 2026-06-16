'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Phone,
  Code2,
  Layout,
  Globe,
  MessageCircle,
  Star,
  ArrowRight,
} from 'lucide-react';
import { Section } from '@/components/ui/section';
import { supabase } from '@/lib/supabase';
import { formatPrice } from '@/lib/utils';

interface ServiceData {
  id: string;
  name: string;
  description: string;
  slug: string;
  icon: string;
  setup_fee: number;
}

function getServiceSlug(name: string): string {
  const slugMap: Record<string, string> = {
    'AI Call Assistant': 'ai-call-assistant',
    'Custom Apps': 'custom-apps',
    'Landing Pages': 'landing-pages',
    'Business Websites': 'business-websites',
    'WhatsApp Business Setup': 'whatsapp-business',
    'Google Reputation Growth': '/google-reputation-growth',
  };
  return slugMap[name] || name.toLowerCase().replace(/\s+/g, '-');
}

function getServiceIcon(name: string): React.ReactNode {
  const iconMap: Record<string, React.ReactNode> = {
    'AI Call Assistant': <Phone className="h-6 w-6" />,
    'Custom Apps': <Code2 className="h-6 w-6" />,
    'Landing Pages': <Layout className="h-6 w-6" />,
    'Business Websites': <Globe className="h-6 w-6" />,
    'WhatsApp Business Setup': <MessageCircle className="h-6 w-6" />,
    'Google Reputation Growth': <Star className="h-6 w-6" />,
  };
  return iconMap[name] || <Code2 className="h-6 w-6" />;
}

function ServicesSection() {
  const [services, setServices] = useState<ServiceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    async function fetchServices() {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('display_order');
      if (error) {
        console.error('[Public Services] Fetch error:', error);
        setFetchError(true);
      } else if (data) {
        setServices(
          data.map((s: any) => ({
            id: s.id,
            name: s.name,
            description: s.description || '',
            slug: getServiceSlug(s.name),
            icon: s.name,
            setup_fee: Number(s.setup_fee) || 0,
          })),
        );
      }
      setLoading(false);
    }
    fetchServices();
    const interval = setInterval(fetchServices, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Section id="services" title="Our Services" subtitle="Comprehensive digital solutions tailored to elevate your business" gradientBg>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="animate-pulse rounded-2xl bg-glass-bg border border-glass-border p-6 h-48" />
          ))}
        </div>
      </Section>
    );
  }

  if (fetchError) {
    return (
      <Section id="services" title="Our Services" subtitle="Comprehensive digital solutions tailored to elevate your business" gradientBg>
        <div className="rounded-2xl border border-glass-border bg-glass-bg p-8 text-center backdrop-blur-xl">
          <p className="text-text-secondary">Unable to load services. Please try again later.</p>
        </div>
      </Section>
    );
  }

  return (
    <Section
      id="services"
      title="Our Services"
      subtitle="Comprehensive digital solutions tailored to elevate your business"
      gradientBg
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group relative overflow-hidden rounded-2xl bg-glass-bg backdrop-blur-xl border border-glass-border p-6 transition-all duration-500 hover:border-electric-violet/40 hover:shadow-[0_0_40px_rgba(212,175,55,0.15)]"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-electric-violet/10 text-electric-violet transition-colors group-hover:bg-electric-violet/20">
              {getServiceIcon(service.name)}
            </div>

            <h3 className="mb-2 text-lg font-semibold text-text-primary">
              {service.name}
            </h3>
            <p className="mb-4 text-sm leading-relaxed text-text-secondary line-clamp-3">
              {service.description}
            </p>

            {service.setup_fee > 0 && (
              <div className="mb-4">
                <span className="text-xl font-bold text-text-primary">
                  {formatPrice(service.setup_fee)}
                </span>
                <span className="text-xs text-text-secondary"> setup</span>
              </div>
            )}

            <Link
              href={service.slug.startsWith('/') ? service.slug : `/services/${service.slug}`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-light transition-colors hover:text-cyan"
            >
              Learn More
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

export { ServicesSection };
