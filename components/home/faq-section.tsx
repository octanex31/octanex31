'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { Section } from '@/components/ui/section';
import { supabase } from '@/lib/supabase';
import type { FAQ } from '@/types';

interface FAQSectionProps {
  faqs?: FAQ[];
}

function FAQSection({ faqs: propFaqs }: FAQSectionProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [fetched, setFetched] = useState<FAQ[] | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    async function fetchFaqs() {
      const { data } = await supabase
        .from('faqs')
        .select('*')
        .eq('is_active', true)
        .order('display_order');
      if (data && data.length > 0) setFetched(data as FAQ[]);
    }
    if (!propFaqs) {
      fetchFaqs();
      const interval = setInterval(fetchFaqs, 30000);
      return () => clearInterval(interval);
    }
  }, [propFaqs]);

  const items = propFaqs || fetched || [];

  if (items.length === 0) return null;

  return (
    <Section
      id="faq"
      title="Frequently Asked Questions"
      subtitle="Everything you need to know about working with us"
    >
      <div ref={ref} className="mx-auto max-w-3xl">
        {items.map((faq, i) => {
          const isOpen = openId === faq.id;
          return (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="border-b border-glass-border last:border-0"
            >
              <button
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-violet-light"
              >
                <span className="text-base font-medium text-text-primary">
                  {faq.question}
                </span>
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg border border-glass-border bg-glass-bg text-text-secondary">
                  {isOpen ? (
                    <Minus className="h-3.5 w-3.5" />
                  ) : (
                    <Plus className="h-3.5 w-3.5" />
                  )}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 text-sm leading-relaxed text-text-secondary">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

export { FAQSection };
