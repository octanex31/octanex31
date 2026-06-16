'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Eye, Smartphone, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import type { PortfolioItem } from '@/types';

interface PortfolioCardProps {
  item: PortfolioItem;
  index?: number;
}

const typeConfig = {
  app: { icon: Smartphone, label: 'App', variant: 'info' as const },
  website: { icon: Globe, label: 'Website', variant: 'default' as const },
};

function PortfolioCard({ item, index = 0 }: PortfolioCardProps) {
  const config = typeConfig[item.type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        href={`/portfolio/${item.slug}`}
        className="group relative block overflow-hidden rounded-2xl"
      >
        <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-bg-secondary">
          {item.screenshots && item.screenshots[0] ? (
            <img
              src={item.screenshots[0]}
              alt={item.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-electric-violet/10 to-cyan/10 text-text-secondary">
              <config.icon className="h-12 w-12 opacity-30" />
            </div>
          )}
        </div>

        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-bg-primary/60 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex items-center gap-2 rounded-full border border-glass-border bg-glass-bg px-4 py-2 text-sm text-text-primary backdrop-blur-xl">
            <Eye className="h-4 w-4" />
            View Project
          </div>
        </div>

        <div className="mt-4">
          <div className="mb-1.5 flex items-center gap-2">
            <Badge variant={config.variant}>{config.label}</Badge>
          </div>
          <h3 className="text-lg font-semibold text-text-primary transition-colors group-hover:text-violet-light">
            {item.title}
          </h3>
          {item.description && (
            <p className="mt-1 text-sm text-text-secondary line-clamp-2">
              {item.description}
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

export { PortfolioCard };
