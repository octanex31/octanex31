'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Section } from '@/components/ui/section';
import type { Testimonial } from '@/types';

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={cn(
            'h-4 w-4',
            i < rating
              ? 'fill-orange text-orange'
              : 'fill-none text-text-secondary/30',
          )}
        />
      ))}
    </div>
  );
}

interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
}

function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const [isPaused, setIsPaused] = useState(false);
  const [fetched, setFetched] = useState<Testimonial[] | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const { supabase } = await import('@/lib/supabase');
        const { data } = await supabase
          .from('testimonials')
          .select('*')
          .order('display_order')
          .limit(10);
        if (data && data.length > 0) setFetched(data);
      } catch {
        // silent
      }
    }
    if (!testimonials) {
      fetchTestimonials();
      const interval = setInterval(fetchTestimonials, 30000);
      return () => clearInterval(interval);
    }
  }, [testimonials]);

  const items = fetched || testimonials || [];

  if (items.length === 0) return null;

  const doubled = [...items, ...items];

  return (
    <Section
      id="testimonials"
      title="What Our Clients Say"
      subtitle="Hear from businesses that have partnered with us"
      gradientBg
    >
      <div
        ref={ref}
        className="relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div
          className="flex gap-6"
          animate={
            isInView
              ? { x: ['0%', `-${(items.length / doubled.length) * 100}%`] }
              : {}
          }
          transition={{
            x: {
              duration: 40,
              repeat: Infinity,
              ease: 'linear',
              ...(isPaused && { speed: 0 }),
            },
          }}
          style={{ width: `${doubled.length * 420}px` }}
        >
          {doubled.map((item, i) => (
            <div
              key={`${item.id}-${i}`}
              className="w-[400px] flex-shrink-0"
            >
              <div className="flex h-full flex-col rounded-2xl border border-glass-border bg-glass-bg p-6 backdrop-blur-xl">
                <Quote className="mb-3 h-6 w-6 text-electric-violet/40" />
                <p className="mb-4 flex-1 text-sm leading-relaxed text-text-secondary">
                  &ldquo;{item.text}&rdquo;
                </p>
                <div className="mt-auto">
                  <Stars rating={item.rating} />
                  <div className="mt-2">
                    <p className="text-sm font-semibold text-text-primary">
                      {item.client_name}
                    </p>
                    {item.business && (
                      <p className="text-xs text-text-secondary">
                        {item.business}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}

export { TestimonialsSection };
