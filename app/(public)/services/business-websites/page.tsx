import { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/ui/section';
import { GradientText } from '@/components/ui/gradient-text';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import {
  Globe,
  ShoppingCart,
  Users,
  Shield,
  MessageSquare,
  Settings,
  CheckCircle2,
} from 'lucide-react';
import { getServiceSupabase } from '@/lib/supabase-server';
import { formatPrice } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Business Websites - OctaNex31',
  description:
    'Professional business websites with custom design, CMS integration, SEO optimization, and ongoing support.',
  openGraph: {
    title: 'Business Websites - OctaNex31',
    description:
      'Professional multi-page websites that establish your brand authority and showcase your services.',
  },
  alternates: { canonical: '/services/business-websites' },
};

const features = [
  {
    icon: Globe,
    title: 'Custom Website',
    description: 'Tailored design reflecting your brand identity',
  },
  {
    icon: ShoppingCart,
    title: 'E-commerce Ready',
    description: 'Online store integration if needed',
  },
  {
    icon: Users,
    title: 'Client Portal',
    description: 'Secure client area for your customers',
  },
  {
    icon: Shield,
    title: 'Security First',
    description: 'SSL, firewalls, and regular security updates',
  },
  {
    icon: MessageSquare,
    title: 'Contact Forms',
    description: 'Smart forms with automated responses',
  },
  {
    icon: Settings,
    title: 'CMS Included',
    description: 'Easy content management without coding',
  },
];

const benefits = [
  'Professional online presence',
  'Mobile-first responsive design',
  'SEO optimized structure',
  'Fast loading performance',
  'Ongoing maintenance & support',
  'Analytics & reporting dashboard',
  'Scalable architecture',
  '24/7 uptime monitoring',
];

export default async function BusinessWebsitesPage() {
  const supabase = getServiceSupabase();
  const { data: service } = await supabase
    .from('services')
    .select('*')
    .eq('name', 'Business Websites')
    .single();

  return (
    <main className="min-h-screen">
      <Section className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
            <GradientText as="span">Business Websites</GradientText>
          </h1>
          <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto">
            Professional, scalable business websites that establish your online presence 
            and drive growth. Fully managed with CMS, SEO, and ongoing support.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <GlassCard key={i} className="p-6 text-center">
                <div className="w-12 h-12 rounded-lg bg-electric-violet/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-electric-violet" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-text-secondary text-sm">{feature.description}</p>
              </GlassCard>
            );
          })}
        </div>

        <p className="mx-auto max-w-xl text-center text-xs leading-relaxed text-text-secondary/70 -mt-14 mb-20">
          🛒 E-commerce functionality — additional charges apply based on number of products, payment gateway, and custom features required
        </p>

        <div className="max-w-3xl mx-auto mb-20">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-text-primary mb-8 text-center">
            What&apos;s Included
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {benefits.map((benefit, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan mt-0.5 shrink-0" />
                <span className="text-text-secondary">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-xl mx-auto text-center">
          <GlassCard className="p-8">
            <div className="text-4xl font-display font-bold text-electric-violet mb-2">
              {formatPrice(service?.setup_fee || 7999)}
            </div>
            <p className="text-text-secondary mb-2">One-time setup, then {formatPrice(service?.monthly_fee || 2499)}/month</p>
            <p className="text-text-secondary mb-6">
              Professional business website with CMS, SEO, and ongoing support.
            </p>
            <Link href="/contact">
              <Button variant="primary" size="lg">
                Book a Demo
              </Button>
            </Link>
          </GlassCard>
        </div>
      </Section>
    </main>
  );
}
