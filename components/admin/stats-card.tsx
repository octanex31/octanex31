'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isUp: boolean;
  };
  gradient?: string;
}

const defaultGradients = [
  'from-electric-violet/20 to-cyan/10',
  'from-orange/20 to-electric-violet/10',
  'from-cyan/20 to-electric-violet/10',
  'from-violet-light/20 to-cyan/10',
];

function StatsCard({
  title,
  value,
  icon,
  trend,
  gradient,
}: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'relative overflow-hidden rounded-2xl border border-glass-border bg-glass-bg p-5 backdrop-blur-xl transition-all duration-300 hover:border-electric-violet/30 hover:shadow-[0_0_30px_rgba(212,175,55,0.08)]',
      )}
    >
      <div
        className={cn(
          'pointer-events-none absolute inset-0 bg-gradient-to-br opacity-30',
          gradient || defaultGradients[0],
        )}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium text-text-secondary uppercase tracking-wider">
              {title}
            </p>
            <p className="mt-1 text-2xl font-bold text-text-primary">
              {value}
            </p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-electric-violet/10 text-electric-violet">
            {icon}
          </div>
        </div>

        {trend && (
          <div className="mt-3 flex items-center gap-1.5">
            {trend.isUp ? (
              <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
            ) : (
              <TrendingDown className="h-3.5 w-3.5 text-red-400" />
            )}
            <span
              className={cn(
                'text-xs font-medium',
                trend.isUp ? 'text-emerald-400' : 'text-red-400',
              )}
            >
              {trend.value}%
            </span>
            <span className="text-xs text-text-secondary">vs last month</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export { StatsCard };
