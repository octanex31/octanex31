'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Smartphone, Globe, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Section } from '@/components/ui/section';
import { GradientText } from '@/components/ui/gradient-text';
import { Button } from '@/components/ui/button';
import { PortfolioCard } from '@/components/portfolio/portfolio-card';
import type { PortfolioItem } from '@/types';

type TabType = 'app' | 'website';

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState<TabType>('app');
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPortfolio() {
      try {
        const { supabase } = await import('@/lib/supabase');
        const { data } = await supabase
          .from('portfolio_items')
          .select('*')
          .eq('type', activeTab)
          .order('display_order');
        if (data) setItems(data as PortfolioItem[]);
      } catch {
        setItems([]);
      } finally {
        setLoading(false);
      }
    }
    setLoading(true);
    fetchPortfolio();
  }, [activeTab]);

  return (
    <>
      <section className="relative pt-28 pb-12 sm:pt-32 sm:pb-16">
        <div className="absolute inset-0 bg-gradient-radial from-electric-violet/10 via-transparent to-transparent" />
        <div className="container relative z-10 mx-auto px-4 text-center sm:px-6 lg:px-8">
          <GradientText as="h1" variant="violet-cyan" className="mb-6">
            Our Portfolio
          </GradientText>
          <p className="mx-auto max-w-2xl text-lg text-text-secondary">
            Showcasing our finest digital creations. Each project represents our commitment to
            excellence, innovation, and client satisfaction.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex justify-center">
          <div className="inline-flex rounded-xl border border-glass-border bg-glass-bg p-1 backdrop-blur-xl">
            {(['app', 'website'] as TabType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  'flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-all duration-200',
                  activeTab === tab
                    ? 'bg-electric-violet text-white shadow-lg shadow-electric-violet/25'
                    : 'text-text-secondary hover:text-text-primary',
                )}
              >
                {tab === 'app' ? (
                  <Smartphone className="h-4 w-4" />
                ) : (
                  <Globe className="h-4 w-4" />
                )}
                {tab === 'app' ? 'Apps' : 'Websites'}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/3] rounded-2xl bg-bg-secondary" />
                <div className="mt-4 space-y-2">
                  <div className="h-4 w-20 rounded bg-bg-secondary" />
                  <div className="h-5 w-3/4 rounded bg-bg-secondary" />
                  <div className="h-4 w-full rounded bg-bg-secondary" />
                </div>
              </div>
            ))}
          </div>
        ) : items.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, i) => (
              <PortfolioCard key={item.id} item={item} index={i} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-electric-violet/10">
              {activeTab === 'app' ? (
                <Smartphone className="h-8 w-8 text-electric-violet" />
              ) : (
                <Globe className="h-8 w-8 text-electric-violet" />
              )}
            </div>
            <h3 className="mb-2 text-xl font-semibold text-text-primary">
              No {activeTab === 'app' ? 'apps' : 'websites'} yet
            </h3>
            <p className="mb-6 text-text-secondary">
              We are working on amazing {activeTab === 'app' ? 'apps' : 'websites'}. Check back soon!
            </p>
            <Link href="/contact">
              <Button variant="primary">Be the First Client</Button>
            </Link>
          </div>
        )}

        <div className="mt-10 text-center">
          <Link href="/contact">
            <Button variant="outline" size="lg" icon={<ArrowRight className="h-5 w-5" />}>
              Start Your Project
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
