import { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/ui/section';
import { GradientText } from '@/components/ui/gradient-text';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import {
  MessageCircle,
  Bot,
  BarChart3,
  Users,
  Reply,
  Tag,
  CheckCircle2,
  Zap,
} from 'lucide-react';
import { getServiceSupabase } from '@/lib/supabase-server';
import { formatPrice } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'WhatsApp Business Setup - OctaNex31',
  description:
    'Professional WhatsApp Business setup with automation, broadcast tools, and integration services.',
  openGraph: {
    title: 'WhatsApp Business Setup - OctaNex31',
    description:
      'Streamline your customer communication with a professionally configured WhatsApp Business account.',
  },
  alternates: { canonical: '/services/whatsapp-business' },
};

const features = [
  {
    icon: MessageCircle,
    title: 'Business Profile Setup',
    description: 'Complete profile optimization with catalog setup',
  },
  {
    icon: Bot,
    title: 'Chat Automation',
    description: 'Automated replies and quick response templates',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Track message stats and engagement metrics',
  },
  {
    icon: Users,
    title: 'Broadcast Lists',
    description: 'Send updates to multiple customers at once',
  },
  {
    icon: Reply,
    title: 'Quick Replies',
    description: 'Pre-saved responses for common queries',
  },
  {
    icon: Tag,
    title: 'Catalog Management',
    description: 'Showcase products with rich media catalogs',
  },
];

export default async function WhatsAppBusinessPage() {
  const supabase = getServiceSupabase();
  const { data: service } = await supabase
    .from('services')
    .select('*')
    .eq('name', 'WhatsApp Business Setup')
    .single();

  const benefits = [
    `Standard setup at just ${formatPrice(service?.setup_fee || 299)}`,
    'FREE in Plan 2 (Growth) and Plan 3 (Empire)',
    'Professional business profile with verification',
    'Automated greeting and away messages',
    'Product catalog with images and prices',
    'Broadcast messaging to customers',
    'Integration with your website',
    'Chat analytics and insights',
  ];

  return (
    <main className="min-h-screen">
      <Section className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
            <GradientText as="span">WhatsApp Business Setup</GradientText>
          </h1>
          <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto">
            Transform your customer communication with a professional WhatsApp Business 
            setup. Automation, catalog management, and analytics included.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
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

        <div className="max-w-3xl mx-auto mb-16">
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

        <div className="max-w-3xl mx-auto">
          <GlassCard className="p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-display font-bold text-text-primary mb-2">
                Pricing
              </h3>
              <div className="text-4xl font-display font-bold text-electric-violet mb-2">
                {formatPrice(service?.setup_fee || 299)}
              </div>
              <p className="text-text-secondary">Standard Setup</p>
            </div>
            <div className="bg-electric-violet/5 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 text-cyan mb-1">
                <Zap className="w-4 h-4" />
                <span className="font-semibold">Free in Plans 2 & 3</span>
              </div>
              <p className="text-text-secondary text-sm">
              WhatsApp Business Setup is included at no additional cost when you choose the Growth or Empire plan.
              </p>
            </div>
            <div className="text-center">
              <Link href="/book-demo">
                <Button variant="primary" size="lg">
                  Book a Demo
                </Button>
              </Link>
            </div>
          </GlassCard>
        </div>
      </Section>
    </main>
  );
}
