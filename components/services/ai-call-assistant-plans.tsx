'use client';

import { motion } from 'framer-motion';
import { Check, Phone, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/lib/utils';

interface CallTier {
  id: string;
  name: string;
  calls: number;
  price: number;
  monthlyLabel: string;
  features: string[];
  isPopular: boolean;
}

const callTiers: CallTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    calls: 100,
    price: 649,
    monthlyLabel: '/month',
    features: [
      '100 AI calls/month',
      'Natural voice AI',
      'Appointment booking',
      'Basic analytics',
      'Email support',
    ],
    isPopular: false,
  },
  {
    id: 'growth',
    name: 'Growth',
    calls: 200,
    price: 949,
    monthlyLabel: '/month',
    features: [
      '200 AI calls/month',
      'Natural voice AI',
      'Appointment booking',
      'Lead qualification',
      'Analytics dashboard',
      'Priority support',
    ],
    isPopular: true,
  },
  {
    id: 'pro',
    name: 'Pro',
    calls: 500,
    price: 1849,
    monthlyLabel: '/month',
    features: [
      '500 AI calls/month',
      'Natural voice AI',
      'Appointment booking',
      'Lead qualification',
      'Custom scripts',
      'Analytics dashboard',
      'CRM integration',
      'Priority support',
    ],
    isPopular: false,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    calls: 1200,
    price: 3949,
    monthlyLabel: '/month',
    features: [
      '1200 AI calls/month',
      'Natural voice AI',
      'Appointment booking',
      'Lead qualification',
      'Custom scripts',
      'Analytics dashboard',
      'CRM integration',
      'Dedicated account manager',
      '24/7 priority support',
    ],
    isPopular: false,
  },
];

function AICallAssistantPlans() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            <span className="bg-gradient-to-r from-electric-violet to-cyan bg-clip-text text-transparent">
              AI Call Assistant Plans
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-text-secondary">
            Choose the perfect plan for your business communication needs.
          </p>
        </div>

        <div className="mb-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass-bg px-6 py-2 text-sm text-text-secondary">
            <span className="text-electric-violet font-semibold">Setup Fee: ₹2,499</span>
            <span className="mx-2">|</span>
            <span>One-time payment</span>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {callTiers.map((tier, i) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={cn(
                'group relative flex flex-col rounded-2xl border p-5 backdrop-blur-xl transition-all duration-500',
                tier.isPopular
                  ? 'border-electric-violet/50 bg-electric-violet/5 shadow-[0_0_40px_rgba(212,175,55,0.1)] hover:shadow-[0_0_60px_rgba(212,175,55,0.2)]'
                  : 'border-glass-border bg-glass-bg hover:border-electric-violet/30 hover:shadow-[0_0_30px_rgba(212,175,55,0.08)]',
              )}
            >
              {tier.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge
                    variant="default"
                    className="bg-electric-violet px-4 py-1 text-xs text-white"
                  >
                    <Zap className="mr-1 h-3 w-3" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-electric-violet/10 text-electric-violet">
                <Phone className="h-5 w-5" />
              </div>

              <h3 className="mb-1 text-lg font-semibold text-text-primary">
                {tier.name}
              </h3>
              <p className="mb-1 text-sm text-text-secondary">
                {tier.calls} calls/month
              </p>

              <div className="mb-4">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-text-primary">
                    ₹{tier.price.toLocaleString()}
                  </span>
                  <span className="text-xs text-text-secondary">{tier.monthlyLabel}</span>
                </div>
              </div>

              <ul className="mb-6 flex flex-1 flex-col gap-2.5">
                {tier.features.map((feature, fi) => (
                  <li key={fi} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-electric-violet" />
                    <span className="text-xs text-text-secondary">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link href="/contact" className="block">
                <Button
                  variant={tier.isPopular ? 'primary' : 'secondary'}
                  className="w-full text-sm"
                >
                  Get Started
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { AICallAssistantPlans };
