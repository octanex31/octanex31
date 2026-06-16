import { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/ui/section';
import { GradientText } from '@/components/ui/gradient-text';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import {
  Rocket,
  Palette,
  Zap,
  Smartphone,
  Search,
  BarChart3,
  CheckCircle2,
} from 'lucide-react';
import { getServiceSupabase } from '@/lib/supabase-server';
import { formatPrice } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Landing Pages - OctaNex31',
  description:
    'High-converting landing pages designed to capture leads and drive sales. Fully responsive, SEO-optimized, and built for performance.',
  openGraph: {
    title: 'Landing Pages - OctaNex31',
    description:
      'High-converting landing pages designed to capture leads and drive sales.',
  },
  alternates: { canonical: '/services/landing-pages' },
};

const features = [
  {
    icon: Palette,
    title: 'Custom Design',
    description: 'Tailored to your brand with unique visual identity',
  },
  {
    icon: Zap,
    title: 'Fast Loading',
    description: 'Optimized for speed with 90+ Lighthouse score',
  },
  {
    icon: Smartphone,
    title: 'Fully Responsive',
    description: 'Perfect on all devices — mobile, tablet, desktop',
  },
  {
    icon: Search,
    title: 'SEO Optimized',
    description: 'Built with on-page SEO best practices',
  },
  {
    icon: BarChart3,
    title: 'Analytics Ready',
    description: 'GA4 integrated for tracking conversions',
  },
  {
    icon: Rocket,
    title: 'CTA Focused',
    description: 'Strategically placed calls-to-action for maximum conversions',
  },
];

const benefits = [
  'Lead generation focused design',
  'A/B testing ready structure',
  'Fast deployment (3-5 business days)',
  'CMS integration for easy updates',
  'Form integration with automations',
  'reCAPTCHA protected forms',
];

export default async function LandingPagesPage() {
  const supabase = getServiceSupabase();
  const { data: service } = await supabase
    .from('services')
    .select('*')
    .eq('name', 'Landing Pages')
    .single();

  return (
    <main className="min-h-screen">
      <Section className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
            <GradientText as="span">Landing Pages</GradientText>
          </h1>
          <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto">
            High-converting, beautifully designed landing pages that turn visitors into customers. 
            Fully responsive, SEO-optimized, and built for performance.
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
              {formatPrice(service?.setup_fee || 3999)}
            </div>
            <p className="text-text-secondary mb-2">One-time setup, then {formatPrice(service?.monthly_fee || 999)}/month</p>
            <p className="text-text-secondary mb-6">
              High-converting landing page with custom design, SEO, and analytics.
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
