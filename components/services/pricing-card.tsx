'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/lib/utils';
import type { Plan } from '@/types';

interface PricingCardProps {
  plan: Plan;
  index?: number;
  serviceSlug?: string;
}

function PricingCard({ plan, index = 0, serviceSlug }: PricingCardProps) {
  const features: string[] = Array.isArray(plan.features)
    ? plan.features.map((f: any) =>
        typeof f === 'string' ? f : f.name + (f.detail ? ` — ${f.detail}` : '') + (f.included === false ? ' (Add-on)' : ''),
      )
    : typeof plan.features === 'object' && plan.features !== null
      ? Object.values(plan.features)
      : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        'group relative flex flex-col rounded-2xl border p-6 backdrop-blur-xl transition-all duration-500',
        plan.is_popular
          ? 'border-electric-violet/50 bg-electric-violet/5 shadow-[0_0_40px_rgba(212,175,55,0.1)] hover:shadow-[0_0_60px_rgba(212,175,55,0.2)]'
          : 'border-glass-border bg-glass-bg hover:border-electric-violet/30 hover:shadow-[0_0_30px_rgba(212,175,55,0.08)]',
      )}
    >
      {plan.is_popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge variant="default" className="px-4 py-1 text-xs bg-electric-violet text-white">
            <Zap className="mr-1 h-3 w-3" />
            Most Popular
          </Badge>
        </div>
      )}

      <div className="mb-5">
        <h3 className="text-lg font-semibold text-text-primary">
          {plan.name}
        </h3>
        {plan.tagline && (
          <p className="mt-1 text-sm text-text-secondary">{plan.tagline}</p>
        )}
      </div>

      <div className="mb-4">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-text-primary">
            {formatPrice(plan.setup_fee)}
          </span>
          <span className="text-sm text-text-secondary">setup</span>
        </div>
        {plan.monthly_label && (
          <p className="mt-1 text-xs text-text-secondary">
            {plan.monthly_label}
          </p>
        )}
      </div>

      <p className="mb-4 text-xs leading-relaxed text-text-secondary/80">
        Starting from <span className="font-medium text-text-secondary">{formatPrice(plan.setup_fee)}</span> — final price increases based on features &amp; functions selected
      </p>

      <div className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-electric-violet/15 bg-electric-violet/5 px-3 py-1">
        <span className="text-xs text-electric-violet">⚡ Price varies based on complexity and features</span>
      </div>

      {features.length > 0 && (
        <ul className="mb-8 flex flex-1 flex-col gap-3">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-electric-violet" />
              <span className="text-sm text-text-secondary">{feature}</span>
            </li>
          ))}
        </ul>
      )}

      <Link
        href={
          serviceSlug
            ? `/contact?service=${serviceSlug}&plan=${plan.id}`
            : '/contact?demo=1'
        }
      >
        <Button
          variant={plan.is_popular ? 'primary' : 'secondary'}
          className="w-full"
        >
          Get Started
        </Button>
      </Link>
    </motion.div>
  );
}

export { PricingCard };
