import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getServiceSupabase } from '@/lib/supabase-server';
import { Section } from '@/components/ui/section';
import { GradientText } from '@/components/ui/gradient-text';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, TrendingUp, Lightbulb, Target, CheckCircle2, ArrowRight } from 'lucide-react';
import type { CaseStudy } from '@/types';

export const dynamic = 'force-dynamic';

interface Props {
  params: { slug: string };
}

async function getCaseStudy(slug: string): Promise<CaseStudy | null> {
  const supabase = getServiceSupabase();
  const { data } = await supabase
    .from('case_studies')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();
  return data as CaseStudy | null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const study = await getCaseStudy(params.slug);
  if (!study) return { title: 'Not Found | OctaNex31' };
  return {
    title: study.meta_title || `${study.title} | OctaNex31 Case Studies`,
    description: study.meta_description || `Read how we helped ${study.client_type || 'a client'} achieve digital success.`,
    alternates: { canonical: `/case-studies/${params.slug}` },
    openGraph: {
      title: study.meta_title || study.title,
      description: study.meta_description || `Read how we helped ${study.client_type || 'a client'} achieve digital success.`,
    },
  };
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const study = await getCaseStudy(params.slug);
  if (!study) notFound();

  return (
    <>
      <section className="relative pt-28 pb-12 sm:pt-32 sm:pb-16">
        <div className="absolute inset-0 bg-gradient-radial from-electric-violet/10 via-transparent to-transparent" />
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/case-studies"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-text-secondary transition-colors hover:text-violet-light"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Case Studies
          </Link>

          <div className="mx-auto max-w-4xl">
            {study.client_type && (
              <Badge variant="info" className="mb-4">{study.client_type}</Badge>
            )}
            <GradientText as="h1" variant="violet-cyan" className="mb-6">
              {study.title}
            </GradientText>
          </div>
        </div>
      </section>

      {study.screenshots && study.screenshots.length > 0 && (
        <Section>
          <div className="grid gap-4 sm:grid-cols-2">
            {study.screenshots.map((src, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl border border-glass-border bg-bg-secondary"
              >
                <img
                  src={src}
                  alt={`${study.title} screenshot ${i + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </Section>
      )}

      {study.problem && (
        <Section title="The Challenge" gradientBg>
          <div className="mx-auto max-w-3xl">
            <div className="flex items-start gap-4 rounded-2xl border border-glass-border bg-glass-bg backdrop-blur-xl p-6">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-orange/10 text-orange">
                <Target className="h-6 w-6" />
              </div>
              <div>
                <p className="text-base leading-relaxed text-text-primary">{study.problem}</p>
              </div>
            </div>
          </div>
        </Section>
      )}

      {study.solution && (
        <Section title="Our Solution">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-start gap-4 rounded-2xl border border-glass-border bg-glass-bg backdrop-blur-xl p-6">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-electric-violet/10 text-electric-violet">
                <Lightbulb className="h-6 w-6" />
              </div>
              <div>
                <p className="text-base leading-relaxed text-text-primary">{study.solution}</p>
              </div>
            </div>
          </div>
        </Section>
      )}

      {study.results && (
        <Section title="The Results" gradientBg>
          <div className="mx-auto max-w-3xl">
            <div className="flex items-start gap-4 rounded-2xl border border-glass-border bg-glass-bg backdrop-blur-xl p-6">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-orange/10 text-orange">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div>
                <p className="text-base leading-relaxed text-text-primary">{study.results}</p>
              </div>
            </div>
          </div>
        </Section>
      )}

      <section className="relative overflow-hidden px-4 py-20 sm:py-28">
        <div className="absolute inset-0 bg-gradient-radial from-electric-violet/15 via-orange/5 to-transparent" />
        <div className="container relative z-10 mx-auto max-w-3xl text-center">
          <GradientText as="h2" variant="violet-orange" className="mb-6">
            Want Results Like These?
          </GradientText>
          <p className="mb-10 text-lg text-text-secondary">
            Let&apos;s discuss how OctaNex31 can help transform your business.
          </p>
          <Link href="/contact?demo=1">
            <Button variant="primary" size="lg" className="bg-orange hover:bg-orange/90" icon={<ArrowRight className="h-5 w-5" />}>
              Book a Free Consultation
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
