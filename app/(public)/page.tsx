import { getServiceSupabase } from '@/lib/supabase-server';
import { Hero } from '@/components/home/hero';
import { ServicesSection } from '@/components/home/services-section';
import { PortfolioSection } from '@/components/home/portfolio-section';
import { HowWeHelpSection } from '@/components/home/how-we-help-section';
import { CTASection } from '@/components/home/cta-section';
import { FAQSection } from '@/components/home/faq-section';
import type { FAQ } from '@/types';

export const dynamic = 'force-dynamic';

async function getHomeData() {
  const supabase = getServiceSupabase();
  const faqsRes = await supabase.from('faqs').select('*').eq('is_active', true).order('display_order');
  return {
    faqs: (faqsRes.data ?? undefined) as FAQ[] | undefined,
  };
}

export default async function HomePage() {
  const { faqs } = await getHomeData();

  return (
    <>
      <Hero />
      <ServicesSection />
      <PortfolioSection />
      <HowWeHelpSection />
      <CTASection />
      <FAQSection faqs={faqs} />
    </>
  );
}
