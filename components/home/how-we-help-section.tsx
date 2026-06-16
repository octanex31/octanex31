'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Lightbulb, Code, Rocket, BarChart3, Sparkles, Target } from 'lucide-react';
import { Section } from '@/components/ui/section';

const steps = [
  {
    icon: <Lightbulb className="h-6 w-6" />,
    title: 'Understand Your Vision',
    description: 'We start by learning about your business, goals, and target audience to craft a strategy that works.',
    color: 'from-electric-violet to-amber-500',
  },
  {
    icon: <Target className="h-6 w-6" />,
    title: 'Plan & Design',
    description: 'We create wireframes, prototypes, and a clear roadmap so you know exactly what you are getting.',
    color: 'from-cyan to-amber-500',
  },
  {
    icon: <Code className="h-6 w-6" />,
    title: 'Build & Develop',
    description: 'Our team builds your product using modern frameworks, clean code, and best practices.',
    color: 'from-electric-violet to-cyan',
  },
  {
    icon: <Rocket className="h-6 w-6" />,
    title: 'Launch & Deploy',
    description: 'We handle deployment, testing, and ensure everything runs smoothly before going live.',
    color: 'from-orange to-amber-500',
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: 'Grow & Optimize',
    description: 'Post-launch analytics, SEO, and continuous improvements to help your business scale.',
    color: 'from-amber-400 to-amber-600',
  },
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: 'Ongoing Support',
    description: 'We are always here. Maintenance updates, new features, and priority support when you need it.',
    color: 'from-amber-500 to-amber-700',
  },
];

function HowWeHelpSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <Section
      id="how-we-help"
      title="How We Help Businesses Grow"
      subtitle="From idea to launch and beyond — a seamless journey with OctaNex31"
    >
      <div ref={ref} className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-electric-violet via-cyan to-orange hidden md:block" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="group relative rounded-2xl border border-glass-border bg-glass-bg backdrop-blur-xl p-6 transition-all duration-500 hover:border-electric-violet/40 hover:shadow-[0_0_40px_rgba(212,175,55,0.1)]"
            >
              <div className="relative z-10 mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-electric-violet/10 text-electric-violet transition-colors group-hover:bg-electric-violet/20">
                {step.icon}
              </div>
              <div className="absolute -top-px -right-px h-16 w-16 rounded-bl-3xl rounded-tr-2xl bg-gradient-to-br opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-20" />
              <h3 className="relative z-10 mb-2 text-lg font-semibold text-text-primary">
                {step.title}
              </h3>
              <p className="relative z-10 text-sm leading-relaxed text-text-secondary">
                {step.description}
              </p>
              <div className="relative z-10 mt-4 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-glass-border text-xs font-mono text-text-secondary">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="h-px flex-1 bg-gradient-to-r from-glass-border to-transparent" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

export { HowWeHelpSection };
