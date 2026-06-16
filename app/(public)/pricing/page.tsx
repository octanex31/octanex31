import type { Metadata } from 'next';
import Link from 'next/link';
import { getServiceSupabase } from '@/lib/supabase-server';
import { formatPrice } from '@/lib/utils';
import { Section } from '@/components/ui/section';
import { GradientText } from '@/components/ui/gradient-text';
import { Button } from '@/components/ui/button';
import { PricingCard } from '@/components/services/pricing-card';
import type { Plan } from '@/types';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Pricing | OctaNex31',
  alternates: { canonical: '/pricing' },
  description:
    'Transparent pricing plans for OctaNex31 digital services. Choose from Starter, Growth, or Empire plans with flexible setup fees and monthly options.',
  openGraph: {
    title: 'Pricing | OctaNex31',
    description:
      'Transparent pricing plans for OctaNex31 digital services. Choose from Starter, Growth, or Empire plans.',
  },
};

async function getPlans(): Promise<Plan[]> {
  const supabase = getServiceSupabase();
  const { data } = await supabase
    .from('plans')
    .select('*')
    .eq('is_active', true)
    .order('display_order');
  return (data as Plan[]) ?? [];
}

export default async function PricingPage() {
  const plans = await getPlans();

  const allPlans =
    plans.length >= 3
      ? plans
      : [
          {
            id: 'starter',
            name: 'Starter',
            tagline: 'Perfect for early-stage startups and small businesses',
            setup_fee: 3999,
            monthly_label: 'Pay only for AI Call plan',
            features: [
              'Custom app or website development',
              'Up to 5 pages/screens',
              'Basic UI/UX design',
              'Mobile responsive design',
              '1 month post-launch support',
              'Basic SEO setup',
              'Email support',
            ],
            is_popular: false,
            is_active: true,
            display_order: 1,
            created_at: '',
          },
          {
            id: 'growth',
            name: 'Growth',
            tagline: 'Ideal for growing businesses ready to scale',
            setup_fee: 6999,
            monthly_label: 'Pay only for AI Call plan',
            features: [
              'Custom app or website development',
              'Up to 15 pages/screens',
              'Premium UI/UX design',
              'Advanced animations & interactions',
              '3 months post-launch support',
              'Advanced SEO & analytics',
              'API integrations',
              'WhatsApp Business Setup Included — Worth ₹299',
              'Priority email & chat support',
            ],
            is_popular: true,
            is_active: true,
            display_order: 2,
            created_at: '',
          },
          {
            id: 'empire',
            name: 'Empire',
            tagline: 'For enterprises demanding comprehensive solutions',
            setup_fee: 9999,
            monthly_label: '₹3,999/month',
            features: [
              'Custom app or website development',
              'Unlimited pages/screens',
              'Enterprise UI/UX design system',
              'Custom animations & micro-interactions',
              '12 months post-launch support',
              'Full SEO & marketing suite',
              'Advanced API & third-party integrations',
              'Dedicated project manager',
              'WhatsApp Business Setup Included — Worth ₹299',
              'Priority phone & chat support',
              'Free monthly maintenance',
              'Free SSL & hosting setup',
            ],
            is_popular: false,
            is_active: true,
            display_order: 3,
            created_at: '',
          },
        ];

  const faqs = [
    {
      q: 'What is the setup fee for?',
      a: 'The one-time setup fee covers initial consultation, design, development, testing, and deployment of your project. It varies based on the complexity and scope of your requirements.',
    },
    {
      q: 'Can I switch plans later?',
      a: 'Yes, you can upgrade or downgrade your plan at any time. We will adjust your monthly subscription accordingly.',
    },
    {
      q: 'Are there any hidden charges?',
      a: 'No. We believe in transparent pricing. All costs are clearly communicated upfront in your project proposal.',
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept all major credit/debit cards, UPI, net banking, and bank transfers for Indian customers.',
    },
    {
      q: 'Do you offer refunds?',
      a: 'Yes, we have a fair refund policy. Please refer to our Refund Policy page for detailed information.',
    },
    {
      q: 'Is there a discount for annual plans?',
      a: 'Yes, annual subscriptions come with a 15% discount. Contact us for a customized annual plan quote.',
    },
  ];

  return (
    <>
      <section className="relative pt-28 pb-12 sm:pt-32 sm:pb-16">
        <div className="absolute inset-0 bg-gradient-radial from-electric-violet/10 via-transparent to-transparent" />
        <div className="container relative z-10 mx-auto px-4 text-center sm:px-6 lg:px-8">
          <GradientText as="h1" variant="violet-cyan" className="mb-6">
            Transparent Pricing
          </GradientText>
          <p className="mx-auto max-w-2xl text-lg text-text-secondary">
            Choose the perfect plan for your business. All plans include setup, development, and
            post-launch support. No hidden fees, no surprises.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
          {allPlans.map((plan, i) => (
            <PricingCard key={plan.id} plan={plan} index={i} />
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-glass-border bg-glass-bg backdrop-blur-xl p-6 sm:p-8">
          <h3 className="mb-6 text-center text-xl font-semibold text-text-primary">
            Plan Comparison
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-glass-border">
                  <th className="py-3 pr-4 font-medium text-text-primary">Feature</th>
                  {allPlans.map((plan) => (
                    <th key={plan.id} className="px-4 py-3 font-medium text-text-primary">
                      {plan.name}
                      {plan.is_popular && (
                        <span className="ml-2 text-xs text-electric-violet">★</span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: 'Setup Fee', value: (p: Plan) => formatPrice(p.setup_fee) },
                  { label: 'Monthly', value: (p: Plan) => p.monthly_label || '-' },
                  { label: 'Pages/Screens', value: (p: Plan) => {
                    const map: Record<string, string> = { Starter: 'Up to 5', Growth: 'Up to 15', Empire: 'Unlimited' };
                    return map[p.name] || '-';
                  }},
                  { label: 'UI/UX Design', value: (p: Plan) => {
                    const map: Record<string, string> = { Starter: 'Basic', Growth: 'Premium', Empire: 'Enterprise' };
                    return map[p.name] || '-';
                  }},
                  { label: 'Post-Launch Support', value: (p: Plan) => {
                    const map: Record<string, string> = { Starter: '1 Month', Growth: '3 Months', Empire: '12 Months' };
                    return map[p.name] || '-';
                  }},
                  { label: 'SEO Setup', value: (p: Plan) => {
                    const map: Record<string, string> = { Starter: 'Basic', Growth: 'Advanced', Empire: 'Full Suite' };
                    return map[p.name] || '-';
                  }},
                  { label: 'Dedicated Manager', value: (p: Plan) => p.name === 'Empire' ? '✓' : '-', },
                ].map((row) => (
                  <tr key={row.label} className="border-b border-glass-border/50">
                    <td className="py-3 pr-4 text-text-secondary">{row.label}</td>
                    {allPlans.map((plan) => (
                      <td key={plan.id} className="px-4 py-3 text-text-primary">
                        {row.value(plan)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-center text-xs text-text-secondary">
            * All plans include mobile-responsive design, basic SEO, and email support.
          </p>
        </div>
      </Section>

      <Section
        id="faq"
        title="Pricing FAQ"
        subtitle="Common questions about our pricing"
        gradientBg
      >
        <div className="mx-auto max-w-3xl">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-glass-border py-5 last:border-0">
              <h3 className="mb-2 text-base font-medium text-text-primary">{faq.q}</h3>
              <p className="text-sm leading-relaxed text-text-secondary">{faq.a}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="relative overflow-hidden px-4 py-20 sm:py-28">
        <div className="absolute inset-0 bg-gradient-radial from-electric-violet/15 via-orange/5 to-transparent" />
        <div className="container relative z-10 mx-auto max-w-3xl text-center">
          <GradientText as="h2" variant="violet-orange" className="mb-6">
            Not Sure Which Plan?
          </GradientText>
          <p className="mb-10 text-lg text-text-secondary">
            Book a free demo and we will help you choose the perfect plan for your business.
          </p>
          <Link href="/book-demo">
            <Button variant="primary" size="lg" className="bg-orange hover:bg-orange/90">
              Book a Free Demo
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
