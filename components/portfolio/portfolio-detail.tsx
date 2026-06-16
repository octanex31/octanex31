'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  CheckCircle2,
  Smartphone,
  Globe,
  ArrowRight,
  Star,
  Target,
  Route,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/ui/section';
import type { PortfolioItem } from '@/types';

interface PortfolioDetailProps {
  item: PortfolioItem;
}

function PortfolioDetail({ item }: PortfolioDetailProps) {
  const isApp = item.type === 'app';

  return (
    <>
      <section className="relative pt-28 pb-12 sm:pt-32 sm:pb-16">
        <div className="absolute inset-0 bg-gradient-radial from-electric-violet/10 via-transparent to-transparent" />
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/portfolio"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-text-secondary transition-colors hover:text-violet-light"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              variant={isApp ? 'info' : 'default'}
              className="mb-4"
            >
              {isApp ? 'App' : 'Website'}
            </Badge>

            <h1 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
              <span className="bg-gradient-to-r from-electric-violet to-cyan bg-clip-text text-transparent">
                {item.title}
              </span>
            </h1>

            {item.description && (
              <p className="max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
                {item.description}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {item.screenshots && item.screenshots.length > 0 && (
        <Section>
          <div className="grid gap-4 sm:grid-cols-2">
            {item.screenshots.map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="overflow-hidden rounded-2xl border border-glass-border bg-bg-secondary"
              >
                <img
                  src={src}
                  alt={`${item.title} screenshot ${i + 1}`}
                  className="h-full w-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </Section>
      )}

      {item.features && item.features.length > 0 && (
        <Section
          title="Key Features"
          gradientBg
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {item.features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-3 rounded-xl border border-glass-border bg-glass-bg p-4 backdrop-blur-xl"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-electric-violet" />
                <span className="text-sm text-text-primary">{feature}</span>
              </motion.div>
            ))}
          </div>
        </Section>
      )}

      {item.benefits && item.benefits.length > 0 && (
        <Section title="Benefits">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {item.benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-glass-border bg-glass-bg p-6 backdrop-blur-xl"
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-electric-violet/10 text-electric-violet">
                  <Star className="h-5 w-5" />
                </div>
                <p className="text-sm text-text-primary">{benefit}</p>
              </motion.div>
            ))}
          </div>
        </Section>
      )}

      {item.user_journey && item.user_journey.length > 0 && (
        <Section
          title="User Journey"
          subtitle="How users experience the product"
          gradientBg
        >
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-electric-violet via-cyan to-transparent" />
            <div className="flex flex-col gap-8">
              {item.user_journey.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative flex items-start gap-5 pl-0"
                >
                  <div className="relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-glass-border bg-bg-secondary text-electric-violet">
                    <Route className="h-5 w-5" />
                  </div>
                  <div className="pt-2.5">
                    <p className="text-sm text-text-primary">{step}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>
      )}

      <Section>
        <div className="text-center">
          <h3 className="mb-4 text-2xl font-bold text-text-primary">
            Want Something Like This?
          </h3>
          <p className="mb-8 text-text-secondary">
            Let&apos;s build your dream project together.
          </p>
          <Link
            href={item.cta_link || '/contact?demo=1'}
          >
            <Button
              variant="primary"
              size="lg"
              className="bg-orange hover:bg-orange/90"
              icon={
                item.cta_text ? (
                  <ArrowRight className="h-5 w-5" />
                ) : (
                  <ArrowRight className="h-5 w-5" />
                )
              }
            >
              {item.cta_text || 'Book a Demo'}
            </Button>
          </Link>
        </div>
      </Section>
    </>
  );
}

export { PortfolioDetail };
