'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Orb {
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

function Hero() {
  const orbs = useMemo<Orb[]>(() => {
    const colors = [
      'bg-electric-violet/20',
      'bg-cyan/20',
      'bg-orange/15',
      'bg-violet-light/15',
    ];
    return Array.from({ length: 8 }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 60 + Math.random() * 120,
      duration: 6 + Math.random() * 8,
      delay: Math.random() * 4,
      color: colors[i % colors.length],
    }));
  }, []);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-20">
      <div className="absolute inset-0 bg-grid opacity-30" />

      <div className="absolute inset-0 bg-gradient-radial from-electric-violet/10 via-transparent to-transparent" />

      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-3xl ${orb.color}`}
          style={{
            width: orb.size,
            height: orb.size,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
          }}
          animate={{
            x: [0, 30, -20, 15, 0],
            y: [0, -25, 15, -10, 0],
            scale: [1, 1.1, 0.95, 1.05, 1],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass-bg px-4 py-1.5 text-sm text-text-secondary backdrop-blur-xl"
        >
          <Sparkles className="h-3.5 w-3.5 text-electric-violet" />
          Your Digital Success Partner
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          <span className="bg-gradient-to-r from-electric-violet via-violet-light to-cyan bg-clip-text text-transparent">
            Where Ideas Become
            <br />
            Digital Empires
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg"
        >
          OctaNex31 is a premium digital agency specializing in crafting
          innovative apps, stunning websites, and AI-powered solutions that
          elevate brands and drive real business growth.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link href="/contact?demo=1">
            <Button
              variant="primary"
              size="lg"
              className="bg-orange hover:bg-orange/90 shadow-orange/25 hover:shadow-orange/40"
              icon={<Phone className="h-5 w-5" />}
            >
              Book a Demo
            </Button>
          </Link>
          <Link href="/how-it-works">
            <Button
              variant="outline"
              size="lg"
              icon={<ArrowRight className="h-5 w-5" />}
            >
              Learn More
            </Button>
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col items-center gap-2 text-xs text-text-secondary"
        >
          <span>Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="h-8 w-5 rounded-full border border-glass-border flex items-start justify-center pt-1.5"
          >
            <div className="h-1.5 w-1.5 rounded-full bg-electric-violet" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export { Hero };
