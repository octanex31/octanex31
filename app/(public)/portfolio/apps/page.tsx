import type { Metadata } from 'next';
import { getServiceSupabase } from '@/lib/supabase-server';
import { PortfolioCard } from '@/components/portfolio/portfolio-card';
import { GradientText } from '@/components/ui/gradient-text';
import type { PortfolioItem } from '@/types';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'App Portfolio | OctaNex31',
  description:
    'Explore our collection of custom mobile and web applications built for businesses across various industries.',
  openGraph: {
    title: 'App Portfolio | OctaNex31',
    description:
      'Browse our portfolio of custom mobile and web applications.',
  },
  alternates: { canonical: '/portfolio/apps' },
};

async function getApps(): Promise<PortfolioItem[]> {
  const supabase = getServiceSupabase();
  const { data } = await supabase
    .from('portfolio_items')
    .select('*')
    .eq('type', 'app')
    .order('display_order');
  return (data as PortfolioItem[]) ?? [];
}

export default async function PortfolioAppsPage() {
  const apps = await getApps();

  return (
    <>
      <section className="relative pt-28 pb-12 sm:pt-32 sm:pb-16">
        <div className="absolute inset-0 bg-gradient-radial from-electric-violet/10 via-transparent to-transparent" />
        <div className="container relative z-10 mx-auto px-4 text-center sm:px-6 lg:px-8">
          <GradientText as="h1" variant="violet-cyan" className="mb-6">
            App Portfolio
          </GradientText>
          <p className="mx-auto max-w-2xl text-lg text-text-secondary">
            From productivity tools to consumer apps, explore our collection of custom mobile and web
            applications crafted with cutting-edge technology and exceptional user experience.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-20 sm:px-6 lg:px-8">
        {apps.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {apps.map((item, i) => (
              <PortfolioCard key={item.id} item={item} index={i} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <h3 className="mb-2 text-xl font-semibold text-text-primary">
              No apps in portfolio yet
            </h3>
            <p className="text-text-secondary">
              We are working on amazing applications. Check back soon!
            </p>
          </div>
        )}
      </div>
    </>
  );
}
