'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

function CTASection() {
  return (
    <section className="relative overflow-hidden px-4 py-20 sm:py-28 lg:py-36">
      <div className="absolute inset-0 bg-gradient-radial from-electric-violet/15 via-orange/5 to-transparent" />

      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        <div className="h-72 w-72 rounded-full bg-electric-violet/10 blur-3xl sm:h-96 sm:w-96" />
      </motion.div>

      <div className="container relative z-10 mx-auto max-w-3xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-6 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl"
        >
          <span className="bg-gradient-to-r from-orange via-violet-light to-electric-violet bg-clip-text text-transparent">
            Ready to Build Your
            <br />
            Digital Empire?
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10 text-base leading-relaxed text-text-secondary sm:text-lg"
        >
          Let&apos;s discuss your vision and create something extraordinary
          together. Your journey to digital success starts here.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link href="/contact?demo=1">
            <Button
              variant="primary"
              size="lg"
              className="bg-orange hover:bg-orange/90 shadow-orange/25 hover:shadow-orange/40 text-base sm:text-lg"
              icon={<Phone className="h-5 w-5 sm:h-6 sm:w-6" />}
            >
              Book a Free Demo
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export { CTASection };
