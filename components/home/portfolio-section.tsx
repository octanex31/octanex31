'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Eye, Smartphone, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Section } from '@/components/ui/section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';

interface PortfolioItem {
  id: string;
  title: string;
  type: 'app' | 'website';
  description: string;
  slug: string;
}

type TabType = 'app' | 'website';

function PortfolioSection() {
  const [activeTab, setActiveTab] = useState<TabType>('app');
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    async function fetchItems() {
      const { data, error } = await supabase
        .from('portfolio_items')
        .select('*')
        .order('display_order');
      if (error) {
        console.error('[Public Portfolio] Fetch error:', error);
        setFetchError(true);
      } else if (data) {
        setItems(
          data.map((item: any) => ({
            id: item.id,
            title: item.title,
            type: item.type,
            description: item.description || '',
            slug: item.slug || '',
          })),
        );
      }
      setLoading(false);
    }
    fetchItems();
    const interval = setInterval(fetchItems, 30000);
    return () => clearInterval(interval);
  }, []);

  const filtered = items.filter((item) => item.type === activeTab);

  return (
    <Section
      id="portfolio"
      title="Our Work"
      subtitle="Showcasing our finest digital creations"
    >
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
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse rounded-2xl bg-glass-bg border border-glass-border aspect-[4/3]" />
          ))}
        </div>
      ) : fetchError ? (
        <div className="rounded-2xl border border-glass-border bg-glass-bg p-8 text-center backdrop-blur-xl">
          <p className="text-text-secondary">Unable to load portfolio. Please try again later.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                href={`/portfolio/${item.type === 'app' ? 'apps' : 'websites'}/${item.slug}`}
                className="group relative block overflow-hidden rounded-2xl"
              >
                <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-bg-secondary">
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-electric-violet/10 to-cyan/10 text-text-secondary">
                    {item.type === 'app' ? (
                      <Smartphone className="h-12 w-12 opacity-30" />
                    ) : (
                      <Globe className="h-12 w-12 opacity-30" />
                    )}
                  </div>
                </div>

                <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-bg-primary/60 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                  <div className="flex items-center gap-2 rounded-full border border-glass-border bg-glass-bg px-4 py-2 text-sm text-text-primary backdrop-blur-xl">
                    <Eye className="h-4 w-4" />
                    View Project
                  </div>
                </div>

                <div className="mt-4">
                  <div className="mb-1.5 flex items-center gap-2">
                    <Badge variant={item.type === 'app' ? 'info' : 'default'}>
                      {item.type === 'app' ? 'App' : 'Website'}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary transition-colors group-hover:text-violet-light">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-text-secondary line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="mt-10 text-center"
      >
        <Link href="/portfolio">
          <Button variant="outline" size="lg" icon={<ArrowRight className="h-5 w-5" />}>
            View Full Portfolio
          </Button>
        </Link>
      </motion.div>
    </Section>
  );
}

export { PortfolioSection };
