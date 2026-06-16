import type { Metadata } from 'next';
import { getServiceSupabase } from '@/lib/supabase-server';
import { PortfolioCard } from '@/components/portfolio/portfolio-card';
import { GradientText } from '@/components/ui/gradient-text';
import type { PortfolioItem } from '@/types';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Website Portfolio | OctaNex31',
  description:
    'Browse our collection of modern, responsive websites built for businesses across industries.',
  openGraph: {
    title: 'Website Portfolio | OctaNex31',
    description:
      'Browse our portfolio of professionally designed websites.',
  },
  alternates: { canonical: '/portfolio/websites' },
};

async function getWebsites(): Promise<PortfolioItem[]> {
  const supabase = getServiceSupabase();
  const { data } = await supabase
    .from('portfolio_items')
    .select('*')
    .eq('type', 'website')
    .order('display_order');
  return (data as PortfolioItem[]) ?? [];
}

export default async function PortfolioWebsitesPage() {
  const websites = await getWebsites();

  return (
    <>
      <section className="relative pt-28 pb-12 sm:pt-32 sm:pb-16">
        <div className="absolute inset-0 bg-gradient-radial from-electric-violet/10 via-transparent to-transparent" />
        <div className="container relative z-10 mx-auto px-4 text-center sm:px-6 lg:px-8">
          <GradientText as="h1" variant="violet-cyan" className="mb-6">
            Website Portfolio
          </GradientText>
          <p className="mx-auto max-w-2xl text-lg text-text-secondary">
            Modern, responsive, and conversion-optimized websites that make a lasting impression.
            From e-commerce to corporate portals, we build websites that deliver results.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-20 sm:px-6 lg:px-8">
        {websites.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {websites.map((item, i) => (
              <PortfolioCard key={item.id} item={item} index={i} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <h3 className="mb-2 text-xl font-semibold text-text-primary">
              No websites in portfolio yet
            </h3>
            <p className="text-text-secondary">
              We are working on amazing websites. Check back soon!
            </p>
          </div>
        )}
      </div>
    </>
  );
}
