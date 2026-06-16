import { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/ui/section';
import { GradientText } from '@/components/ui/gradient-text';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import {
  TrendingUp,
  QrCode,
  MessageSquare,
  Star,
  BarChart3,
  MessageCircle,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Target,
  Users,
  Search,
  Shield,
  Zap,
  Bell,
} from 'lucide-react';
import { getServiceSupabase } from '@/lib/supabase-server';
import { formatPrice } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Google Reputation Growth - OctaNex31',
  description:
    'Build trust, attract more patients, and grow your local presence through a systematic Google review strategy.',
  openGraph: {
    title: 'Google Reputation Growth - OctaNex31',
    description:
      'Build trust, attract more patients, and grow your local presence through a systematic Google review strategy.',
  },
  alternates: { canonical: '/google-reputation-growth' },
};

const offerings = [
  {
    icon: Target,
    title: 'Google Review Growth Strategy',
    description: 'A tailored plan to increase your volume of genuine Google reviews through proven collection methods.',
  },
  {
    icon: QrCode,
    title: 'Review Collection Systems',
    description: 'Automated systems that make it effortless for satisfied customers to leave reviews at the right moment.',
  },
  {
    icon: Star,
    title: 'QR Code Review Collection',
    description: 'Physical and digital QR codes on receipts, tables, counters, and packaging linking directly to your Google review page.',
  },
  {
    icon: MessageSquare,
    title: 'Follow-up Review Requests',
    description: 'Automated follow-up messages via WhatsApp and SMS after a purchase or service requesting a Google review.',
  },
  {
    icon: Users,
    title: 'Customer Feedback Collection',
    description: 'Structured feedback forms that capture sentiment before directing happy customers to leave a public review.',
  },
  {
    icon: BarChart3,
    title: 'Reputation Monitoring',
    description: 'Real-time monitoring of all incoming reviews across Google with instant notifications.',
  },
  {
    icon: MessageCircle,
    title: 'Review Response Guidance',
    description: 'Professional templates and guidance for replying to both positive and negative reviews.',
  },
  {
    icon: MapPin,
    title: 'Local Business Trust Building',
    description: 'Build local credibility through a strong review profile, increasing visibility in local search.',
  },
];

const benefits = [
  'More visibility in Google local search',
  'Higher trust with new patients/customers',
  'More inbound leads without paid ads',
  'Competitive advantage over similar businesses nearby',
  'Real-time alerts for new reviews',
];

const process = [
  { step: '01', title: 'Audit Your Current Google Reputation', description: 'We analyze your existing Google Business Profile, current reviews, and competitor landscape to create a baseline.' },
  { step: '02', title: 'Set Up Automated Review Collection Systems', description: 'We deploy automated follow-up systems and direct review links across all your customer touchpoints.' },
  { step: '03', title: 'Deploy QR Codes at Your Location', description: 'Physical and digital QR codes placed on counters, tables, receipts, and packaging for instant review access.' },
  { step: '04', title: 'Send Follow-up Review Requests via WhatsApp/SMS', description: 'Automated follow-up messages after service delivery, gently requesting a Google review.' },
  { step: '05', title: 'Monitor and Respond to All Reviews', description: 'Real-time alerts for every new review with professional response templates at your fingertips.' },
  { step: '06', title: 'Analyze Growth and Optimize Monthly', description: 'Monthly reports on review volume, sentiment, and visibility with strategy adjustments.' },
];

const faqs = [
  { q: 'How long before I see results?', a: 'Most clients see a 30-50% increase in review count within 60 days.' },
  { q: 'Is this against Google\'s guidelines?', a: 'No. We use compliant review request methods — no fake reviews, no incentivized reviews.' },
  { q: 'What types of businesses benefit most?', a: 'Clinics, doctors, dentists, salons, and any local business where trust drives decisions.' },
  { q: 'Do you respond to reviews on my behalf?', a: 'Yes. We provide response templates and can manage responses for you.' },
];

export default async function GoogleReputationGrowthPage() {
  const supabase = getServiceSupabase();
  const { data: service } = await supabase
    .from('services')
    .select('*')
    .eq('name', 'Google Reputation Growth')
    .single();

  return (
    <main className="min-h-screen">
      {/* HERO */}
      <Section className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
            <GradientText as="span">Google Reputation Growth</GradientText>
          </h1>
          <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Build trust, attract more patients, and grow your local presence through a systematic Google review strategy.
          </p>
          <Link href="/contact">
            <Button variant="primary" size="lg">
              Get Started
            </Button>
          </Link>
        </div>

        {/* SERVICES / FEATURES */}
        <h2 className="text-2xl md:text-3xl font-display font-bold text-text-primary mb-12 text-center">
          Everything You Need to Grow Your Reputation
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {offerings.map((offering, i) => {
            const Icon = offering.icon;
            return (
              <GlassCard key={i} className="p-6 text-center">
                <div className="w-12 h-12 rounded-lg bg-electric-violet/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-electric-violet" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">{offering.title}</h3>
                <p className="text-text-secondary text-sm">{offering.description}</p>
              </GlassCard>
            );
          })}
        </div>

        {/* PROCESS */}
        <div className="max-w-3xl mx-auto mb-20">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-text-primary mb-12 text-center">
            How It Works
          </h2>
          <div className="space-y-8">
            {process.map((item, i) => (
              <div key={i} className="flex gap-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-electric-violet/10 text-sm font-bold text-electric-violet">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-1">{item.title}</h3>
                  <p className="text-text-secondary text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BENEFITS */}
        <div className="max-w-3xl mx-auto mb-20">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-text-primary mb-8 text-center">
            Why Your Reputation Matters
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

        {/* FAQ */}
        <div className="max-w-3xl mx-auto mb-20">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-text-primary mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <GlassCard key={i} className="p-5">
                <h3 className="text-base font-semibold text-text-primary mb-1">{faq.q}</h3>
                <p className="text-text-secondary text-sm">{faq.a}</p>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-xl mx-auto text-center">
          <GlassCard className="p-8">
            <h2 className="text-2xl font-display font-bold text-text-primary mb-2">
              Ready to Build Your Google Reputation?
            </h2>
            <p className="text-text-secondary mb-6">
              Let's set up your review growth system in the next 7 days.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button variant="primary" size="lg">
                  Book a Free Strategy Call
                </Button>
              </Link>
              <Link href="https://wa.me/918975938518" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg">
                  WhatsApp Us
                </Button>
              </Link>
            </div>
          </GlassCard>
        </div>
      </Section>
    </main>
  );
}
