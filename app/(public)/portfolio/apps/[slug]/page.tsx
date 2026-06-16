import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getServiceSupabase } from '@/lib/supabase-server';
import { PortfolioCard } from '@/components/portfolio/portfolio-card';
import { PortfolioDetail as PortfolioDetailComponent } from '@/components/portfolio/portfolio-detail';
import { Section } from '@/components/ui/section';
import type { PortfolioItem } from '@/types';

export const dynamic = 'force-dynamic';

interface Props {
  params: { slug: string };
}

async function getPortfolioItem(slug: string): Promise<PortfolioItem | null> {
  const supabase = getServiceSupabase();
  const { data } = await supabase
    .from('portfolio_items')
    .select('*')
    .eq('slug', slug)
    .eq('type', 'app')
    .single();
  return data as PortfolioItem | null;
}

async function getRelated(currentId: string): Promise<PortfolioItem[]> {
  const supabase = getServiceSupabase();
  const { data } = await supabase
    .from('portfolio_items')
    .select('*')
    .eq('type', 'app')
    .neq('id', currentId)
    .order('display_order')
    .limit(3);
  return (data as PortfolioItem[]) ?? [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = await getPortfolioItem(params.slug);
  if (!item) return { title: 'Not Found | OctaNex31' };
  return {
    title: `${item.title} | OctaNex31 Portfolio`,
    description: item.description ?? `View our ${item.title} app portfolio project.`,
    alternates: { canonical: `/portfolio/apps/${params.slug}` },
    openGraph: {
      title: `${item.title} | OctaNex31 Portfolio`,
      description: item.description ?? `View our ${item.title} app portfolio project.`,
      images: item.screenshots?.[0] ? [{ url: item.screenshots[0] }] : [],
    },
  };
}

export default async function PortfolioAppDetailPage({ params }: Props) {
  const item = await getPortfolioItem(params.slug);
  if (!item) notFound();

  const related = await getRelated(item.id);

  return (
    <>
      <PortfolioDetailComponent item={item} />

      {related.length > 0 && (
        <Section title="Related Projects" gradientBg>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((rel, i) => (
              <PortfolioCard key={rel.id} item={rel} index={i} />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
