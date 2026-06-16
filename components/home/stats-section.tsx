'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, Users, Smartphone, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatItem {
  value: number;
  label: string;
  suffix: string;
  icon: React.ReactNode;
}

const stats: StatItem[] = [
  { value: 50, label: 'Projects Completed', suffix: '+', icon: <Briefcase className="h-5 w-5" /> },
  { value: 35, label: 'Happy Clients', suffix: '+', icon: <Users className="h-5 w-5" /> },
  { value: 20, label: 'Apps Delivered', suffix: '+', icon: <Smartphone className="h-5 w-5" /> },
  { value: 500, label: 'Support Hours', suffix: '+', icon: <Clock className="h-5 w-5" /> },
];

function AnimatedCounter({
  value,
  suffix,
  isInView,
}: {
  value: number;
  suffix: string;
  isInView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = Math.max(1, Math.floor(value / 60));
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, duration / 60);
    return () => clearInterval(timer);
  }, [value, isInView]);

  return (
    <span className="text-4xl font-bold sm:text-5xl">
      {count}
      {suffix}
    </span>
  );
}

function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section className="relative px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="container mx-auto">
        <div
          ref={ref}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-glass-border bg-glass-bg p-6 text-center backdrop-blur-xl transition-all duration-500 hover:border-electric-violet/40 hover:shadow-[0_0_40px_rgba(212,175,55,0.15)]"
            >
              <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-electric-violet/10 text-electric-violet">
                {stat.icon}
              </div>
              <div className="mb-1 bg-gradient-to-r from-electric-violet to-cyan bg-clip-text text-transparent">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  isInView={isInView}
                />
              </div>
              <p className="text-sm text-text-secondary">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { StatsSection };
