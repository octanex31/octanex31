import type { Metadata } from 'next';
import Link from 'next/link';
import { getServiceSupabase } from '@/lib/supabase-server';
import { formatPrice, cn } from '@/lib/utils';
import { Section } from '@/components/ui/section';
import { GradientText } from '@/components/ui/gradient-text';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, X, ArrowRight, Shield, RefreshCw, Clock, Headphones, Zap, Database, Lock } from 'lucide-react';
import type { SiteSetting } from '@/types';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Maintenance Plans | OctaNex31',
  alternates: { canonical: '/maintenance' },
  description:
    'Keep your digital products running smoothly with OctaNex31 maintenance plans. Basic, Standard, and Premium tiers available.',
  openGraph: {
    title: 'Maintenance Plans | OctaNex31',
    description:
      'Keep your digital products running smoothly with OctaNex31 maintenance plans. Basic, Standard, and Premium tiers available.',
  },
};

interface MaintenanceTier {
  name: string;
  price: number;
  originalPrice?: number;
  popular?: boolean;
  features: { name: string; included: boolean }[];
}

async function getSiteSettings(): Promise<Record<string, string>> {
  const supabase = getServiceSupabase();
  const { data } = await supabase.from('site_settings').select('key, value');
  const settings: Record<string, string> = {};
  if (data) {
    (data as SiteSetting[]).forEach((s) => { settings[s.key] = s.value; });
  }
  return settings;
}

export default async function MaintenancePage() {
  const settings = await getSiteSettings();

  const basicPrice = settings.maintenance_basic_price ? parseInt(settings.maintenance_basic_price) : 1499;
  const standardPrice = settings.maintenance_standard_price ? parseInt(settings.maintenance_standard_price) : 3499;
  const premiumPrice = settings.maintenance_premium_price ? parseInt(settings.maintenance_premium_price) : 5999;

  const tiers: MaintenanceTier[] = [
    {
      name: 'Basic',
      price: basicPrice,
      features: [
        { name: 'Monthly security updates', included: true },
        { name: 'Monthly backup', included: true },
        { name: 'Uptime monitoring', included: true },
        { name: 'Email support', included: true },
        { name: 'Response time: 48 hours', included: true },
        { name: 'Content updates (2 hrs/month)', included: true },
        { name: 'Performance optimization', included: false },
        { name: 'SEO monitoring', included: false },
        { name: 'Priority support', included: false },
        { name: 'Weekly backups', included: false },
        { name: 'Daily monitoring', included: false },
        { name: 'Dedicated account manager', included: false },
        { name: '24/7 phone support', included: false },
        { name: 'Quarterly strategy call', included: false },
      ],
    },
    {
      name: 'Standard',
      price: standardPrice,
      popular: true,
      features: [
        { name: 'Monthly security updates', included: true },
        { name: 'Weekly backups', included: true },
        { name: 'Uptime monitoring', included: true },
        { name: 'Email & chat support', included: true },
        { name: 'Response time: 24 hours', included: true },
        { name: 'Content updates (5 hrs/month)', included: true },
        { name: 'Performance optimization', included: true },
        { name: 'SEO monitoring', included: true },
        { name: 'Priority support', included: true },
        { name: 'Daily monitoring', included: false },
        { name: 'Dedicated account manager', included: false },
        { name: '24/7 phone support', included: false },
        { name: 'Quarterly strategy call', included: false },
      ],
    },
    {
      name: 'Premium',
      price: premiumPrice,
      features: [
        { name: 'Weekly security updates', included: true },
        { name: 'Daily backups', included: true },
        { name: '24/7 uptime monitoring', included: true },
        { name: 'Email, chat & phone support', included: true },
        { name: 'Response time: 4 hours', included: true },
        { name: 'Content updates (15 hrs/month)', included: true },
        { name: 'Performance optimization', included: true },
        { name: 'SEO monitoring & reporting', included: true },
        { name: 'Priority support', included: true },
        { name: 'Daily monitoring', included: true },
        { name: 'Dedicated account manager', included: true },
        { name: '24/7 phone support', included: true },
        { name: 'Quarterly strategy call', included: true },
      ],
    },
  ];

  return (
    <>
      <section className="relative pt-28 pb-12 sm:pt-32 sm:pb-16">
        <div className="absolute inset-0 bg-gradient-radial from-electric-violet/10 via-transparent to-transparent" />
        <div className="container relative z-10 mx-auto px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-electric-violet/10">
            <RefreshCw className="h-8 w-8 text-electric-violet" />
          </div>
          <GradientText as="h1" variant="violet-cyan" className="mb-6">
            Maintenance Plans
          </GradientText>
          <p className="mx-auto max-w-2xl text-lg text-text-secondary">
            Keep your digital products secure, up-to-date, and performing at their best with our
            professional maintenance plans.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid gap-6 lg:grid-cols-3">
          {tiers.map((tier, i) => (
            <div
              key={tier.name}
              className={cn(
                'relative flex flex-col rounded-2xl border p-6 backdrop-blur-xl transition-all duration-500',
                tier.popular
                  ? 'border-electric-violet/50 bg-electric-violet/5 shadow-[0_0_40px_rgba(212,175,55,0.1)]'
                  : 'border-glass-border bg-glass-bg hover:border-electric-violet/30',
              )}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge variant="default" className="bg-electric-violet px-4 py-1 text-xs text-white">
                    Most Popular
                  </Badge>
                </div>
              )}

              <h3 className="mb-1 text-xl font-semibold text-text-primary">{tier.name}</h3>
              <div className="mb-6">
                <span className="text-3xl font-bold text-text-primary">{formatPrice(tier.price)}</span>
                <span className="text-sm text-text-secondary">/month</span>
              </div>

              <ul className="mb-8 flex flex-1 flex-col gap-3">
                {tier.features.map((feature) => (
                  <li key={feature.name} className="flex items-start gap-3">
                    {feature.included ? (
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-electric-violet" />
                    ) : (
                      <X className="mt-0.5 h-4 w-4 flex-shrink-0 text-text-secondary/40" />
                    )}
                    <span className={cn(
                      'text-sm',
                      feature.included ? 'text-text-primary' : 'text-text-secondary/40',
                    )}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>

              <Link href="/contact?service=maintenance">
                <Button
                  variant={tier.popular ? 'primary' : 'secondary'}
                  className="w-full"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Why Maintenance Matters" gradientBg>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: <Shield className="h-6 w-6" />, title: 'Security', desc: 'Regular security patches protect your site from vulnerabilities and attacks.' },
            { icon: <Zap className="h-6 w-6" />, title: 'Performance', desc: 'Optimized code and databases ensure fast loading speeds and smooth operation.' },
            { icon: <Database className="h-6 w-6" />, title: 'Backups', desc: 'Regular backups ensure your data is safe and recoverable at all times.' },
            { icon: <Lock className="h-6 w-6" />, title: 'Compliance', desc: 'Stay compliant with latest web standards, regulations, and best practices.' },
          ].map((item, i) => (
            <div key={i} className="rounded-2xl border border-glass-border bg-glass-bg backdrop-blur-xl p-6 text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-electric-violet/10 text-electric-violet">
                {item.icon}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-text-primary">{item.title}</h3>
              <p className="text-sm text-text-secondary">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="relative overflow-hidden px-4 py-20 sm:py-28">
        <div className="absolute inset-0 bg-gradient-radial from-electric-violet/15 via-orange/5 to-transparent" />
        <div className="container relative z-10 mx-auto max-w-3xl text-center">
          <GradientText as="h2" variant="violet-orange" className="mb-6">
            Need a Custom Plan?
          </GradientText>
          <p className="mb-10 text-lg text-text-secondary">
            We offer tailored maintenance solutions for businesses with specific requirements.
            Contact us to discuss your needs.
          </p>
          <Link href="/contact">
            <Button variant="primary" size="lg" className="bg-orange hover:bg-orange/90" icon={<ArrowRight className="h-5 w-5" />}>
              Contact Us
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
