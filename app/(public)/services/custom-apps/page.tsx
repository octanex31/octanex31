import type { Metadata } from 'next';
import Link from 'next/link';
import { Smartphone, CheckCircle2, Code, Palette, Zap, Shield, ArrowRight, Monitor, Layers, GitBranch, Container } from 'lucide-react';
import { Section } from '@/components/ui/section';
import { GradientText } from '@/components/ui/gradient-text';
import { Button } from '@/components/ui/button';
import { getServiceSupabase } from '@/lib/supabase-server';
import { formatPrice } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Custom App Development | OctaNex31',
  description:
    'Get tailor-made mobile and web applications built with cutting-edge technology. OctaNex31 delivers custom apps that drive business growth.',
  openGraph: {
    title: 'Custom App Development | OctaNex31',
    description:
      'Tailored mobile and web applications built with cutting-edge technology.',
  },
  alternates: { canonical: '/services/custom-apps' },
};

const features = [
  {
    icon: <Smartphone className="h-6 w-6" />,
    title: 'Cross-Platform Development',
    description: 'Build once, deploy everywhere. iOS, Android, and Web from a single codebase.',
  },
  {
    icon: <Palette className="h-6 w-6" />,
    title: 'Stunning UI/UX Design',
    description: 'Beautiful, intuitive interfaces designed with user psychology and conversion optimization in mind.',
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: 'High Performance',
    description: 'Optimized for speed and responsiveness. Apps that load fast and feel native.',
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: 'Enterprise Security',
    description: 'End-to-end encryption, secure authentication, and industry-standard data protection.',
  },
  {
    icon: <Code className="h-6 w-6" />,
    title: 'Clean Code Architecture',
    description: 'Modular, maintainable code with comprehensive documentation and testing. Deployment to Play Store ($25 one-time) & App Store ($99/year) available.',
  },
  {
    icon: <Layers className="h-6 w-6" />,
    title: 'Scalable Infrastructure',
    description: 'Cloud-native architecture that grows with your user base seamlessly.',
  },
];

const process = [
  { step: '01', title: 'Discovery', description: 'Understanding your vision, goals, and target audience.' },
  { step: '02', title: 'Design', description: 'Wireframing, prototyping, and UI/UX design with feedback loops.' },
  { step: '03', title: 'Development', description: 'Agile development with regular sprint reviews and updates.' },
  { step: '04', title: 'Testing', description: 'Comprehensive QA including unit, integration, and user acceptance testing.' },
  { step: '05', title: 'Launch', description: 'Deployment to app stores or servers with monitoring.' },
  { step: '06', title: 'Support', description: 'Ongoing maintenance, updates, and feature enhancements.' },
];

const benefits = [
  'Tailored specifically to your business requirements',
  'Full ownership of source code and intellectual property',
  'Scalable from MVP to enterprise-grade application',
  'Integration with existing systems and third-party services',
  'Dedicated project manager and development team',
  'Regular updates, maintenance, and priority support',
  'Performance optimization and analytics integration',
  'Future-proof technology stack with latest frameworks',
];

export default async function CustomAppsPage() {
  const supabase = getServiceSupabase();
  const { data: service } = await supabase
    .from('services')
    .select('*')
    .eq('name', 'Custom Apps')
    .single();

  return (
    <>
      <section className="relative pt-28 pb-12 sm:pt-32 sm:pb-16">
        <div className="absolute inset-0 bg-gradient-radial from-electric-violet/10 via-transparent to-transparent" />
        <div className="container relative z-10 mx-auto px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-electric-violet/10">
            <Smartphone className="h-8 w-8 text-electric-violet" />
          </div>
          <GradientText as="h1" variant="violet-cyan" className="mb-4">
            Custom App Development
          </GradientText>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-text-secondary">
            Transform your ideas into powerful, scalable applications. From MVPs to enterprise
            solutions, we build apps that users love and businesses rely on.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/contact">
              <Button variant="primary" size="lg" icon={<ArrowRight className="h-5 w-5" />}>
                Start Your Project
              </Button>
            </Link>
            <Link href="/portfolio/apps">
              <Button variant="outline" size="lg">
                View Portfolio
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Section title="Key Features" subtitle="What you get with every custom app" gradientBg>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <div
              key={i}
              className="rounded-2xl border border-glass-border bg-glass-bg backdrop-blur-xl p-6 transition-all duration-500 hover:border-electric-violet/40"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-electric-violet/10 text-electric-violet">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-text-primary">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-text-secondary">{feature.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Our Process" subtitle="How we bring your app to life">
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-electric-violet via-cyan to-transparent" />
          <div className="flex flex-col gap-8">
            {process.map((item, i) => (
              <div key={i} className="relative flex items-start gap-6">
                <div className="relative z-10 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full border border-glass-border bg-bg-secondary text-electric-violet">
                  <span className="text-sm font-bold">{item.step}</span>
                </div>
                <div className="pt-4">
                  <h3 className="mb-1 text-lg font-semibold text-text-primary">{item.title}</h3>
                  <p className="text-sm text-text-secondary">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section title="Why Choose Custom Development?" subtitle="Benefits of building a tailored solution" gradientBg>
        <div className="grid gap-4 sm:grid-cols-2">
          {benefits.map((benefit, i) => (
            <div key={i} className="flex items-start gap-3 rounded-xl border border-glass-border bg-glass-bg backdrop-blur-xl p-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-electric-violet" />
              <span className="text-sm text-text-primary">{benefit}</span>
            </div>
          ))}
        </div>
      </Section>

      <section className="relative overflow-hidden px-4 py-20 sm:py-28">
        <div className="absolute inset-0 bg-gradient-radial from-electric-violet/15 via-orange/5 to-transparent" />
        <div className="container relative z-10 mx-auto max-w-3xl text-center">
          <div className="rounded-2xl border border-glass-border bg-glass-bg backdrop-blur-xl p-8 mb-8">
            <div className="flex flex-wrap items-center justify-center gap-8">
              <div>
                <p className="text-sm text-text-secondary">Setup Fee</p>
                <p className="text-3xl font-bold text-text-primary">{formatPrice(service?.setup_fee || 2499)}</p>
              </div>
              <div className="h-12 w-px bg-glass-border" />
              <div>
                <p className="text-sm text-text-secondary">Monthly Subscription</p>
                <p className="text-3xl font-bold text-text-primary">{formatPrice(service?.monthly_fee || 999)}</p>
              </div>
            </div>
          </div>
          <p className="mb-8 text-center text-xs text-text-secondary/70">
            💡 Price varies based on required features and complexity of the application
          </p>
          <GradientText as="h2" variant="violet-orange" className="mb-6">
            Ready to Build Your App?
          </GradientText>
          <p className="mb-10 text-lg text-text-secondary">
            Let&apos;s discuss your vision and create something extraordinary together.
          </p>
          <Link href="/contact">
            <Button variant="primary" size="lg" className="bg-orange hover:bg-orange/90" icon={<ArrowRight className="h-5 w-5" />}>
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
