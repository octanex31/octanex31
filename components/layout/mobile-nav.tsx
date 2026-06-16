'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { X, Hexagon, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MobileNavLink {
  href: string;
  label: string;
}

interface MobileNavProps {
  links: MobileNavLink[];
  onClose: () => void;
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const panelVariants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: { type: 'spring', damping: 25, stiffness: 200 },
  },
  exit: {
    x: '100%',
    transition: { type: 'spring', damping: 30, stiffness: 250 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.1 + i * 0.05, duration: 0.3 },
  }),
};

function MobileNav({ links, onClose }: MobileNavProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex"
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, transition: { delay: 0.2 } }}
    >
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <motion.nav
        className="relative ml-auto flex h-full w-full max-w-sm flex-col bg-glass-bg backdrop-blur-2xl border-l border-glass-border"
        variants={panelVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="flex items-center justify-between border-b border-glass-border px-6 py-4">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-lg font-bold"
            onClick={onClose}
          >
            <Hexagon className="h-6 w-6 text-electric-violet" />
            <span className="bg-gradient-to-r from-electric-violet to-cyan bg-clip-text text-transparent">
              OctaNex31
            </span>
          </Link>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-white/5 hover:text-text-primary"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          <ul className="flex flex-col gap-1">
            {links.map((link, i) => (
              <motion.li
                key={link.href}
                custom={i}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="block rounded-xl px-4 py-3 text-base font-medium text-text-secondary transition-all duration-200 hover:bg-electric-violet/10 hover:text-text-primary"
                >
                  {link.label}
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="border-t border-glass-border px-6 py-5">
          <Link href="/contact?demo=1" onClick={onClose}>
            <Button
              variant="primary"
              className="w-full bg-orange hover:bg-orange/90"
              icon={<Phone className="h-4 w-4" />}
            >
              Book a Demo
            </Button>
          </Link>
        </div>
      </motion.nav>
    </motion.div>
  );
}

export { MobileNav, type MobileNavProps, type MobileNavLink };
