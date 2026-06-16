import type { Metadata } from 'next';
import Link from 'next/link';
import { getServiceSupabase } from '@/lib/supabase-server';
import { GradientText } from '@/components/ui/gradient-text';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Briefcase, TrendingUp } from 'lucide-react';
import type { CaseStudy } from '@/types';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Case Studies | OctaNex31',
  alternates: { canonical: '/case-studies' },
  description:
    'Read detailed case studies showcasing how OctaNex31 delivers digital solutions that drive real business results.',
  openGraph: {
    title: 'Case Studies | OctaNex31',
    description:
      'Read detailed case studies showcasing how OctaNex31 delivers digital solutions that drive real business results.',
  },
};

async function getCaseStudies(): Promise<CaseStudy[]> {
  const supabase = getServiceSupabase();
  const { data } = await supabase
    .from('case_studies')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false });
  return (data as CaseStudy[]) ?? [];
}

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies();

  return (
    <>
      <section className="relative pt-28 pb-12 sm:pt-32 sm:pb-16">
        <div className="absolute inset-0 bg-gradient-radial from-electric-violet/10 via-transparent to-transparent" />
        <div className="container relative z-10 mx-auto px-4 text-center sm:px-6 lg:px-8">
          <GradientText as="h1" variant="violet-cyan" className="mb-6">
            Case Studies
          </GradientText>
          <p className="mx-auto max-w-2xl text-lg text-text-secondary">
            Discover how we have helped businesses transform their digital presence and achieve
            remarkable results through our innovative solutions.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-20 sm:px-6 lg:px-8">
        {caseStudies.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((study, i) => (
              <Link
                key={study.id}
                href={`/case-studies/${study.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-glass-border bg-glass-bg backdrop-blur-xl p-6 transition-all duration-500 hover:border-electric-violet/40 hover:shadow-[0_0_40px_rgba(212,175,55,0.15)]"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-electric-violet/10 text-electric-violet">
                  <Briefcase className="h-6 w-6" />
                </div>

                {study.client_type && (
                  <Badge variant="info" className="mb-3">{study.client_type}</Badge>
                )}

                <h3 className="mb-3 text-xl font-semibold text-text-primary transition-colors group-hover:text-violet-light">
                  {study.title}
                </h3>

                {study.problem && (
                  <div className="mb-3">
                    <p className="mb-1 text-xs font-medium uppercase tracking-wider text-text-secondary">
                      Challenge
                    </p>
                    <p className="text-sm leading-relaxed text-text-secondary line-clamp-3">
                      {study.problem}
                    </p>
                  </div>
                )}

                {study.results && (
                  <div className="mb-4 flex items-start gap-2 rounded-lg bg-electric-violet/5 p-3">
                    <TrendingUp className="mt-0.5 h-4 w-4 flex-shrink-0 text-orange" />
                    <p className="text-sm text-text-primary line-clamp-2">{study.results}</p>
                  </div>
                )}

                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-light transition-colors group-hover:text-cyan">
                  Read Full Case Study
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-electric-violet/10">
              <Briefcase className="h-8 w-8 text-electric-violet" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-text-primary">No case studies yet</h3>
            <p className="text-text-secondary">
              We are documenting our success stories. Check back soon!
            </p>
          </div>
        )}
      </div>
    </>
  );
}
