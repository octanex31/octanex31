'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : undefined;
}

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consented = getCookie('cookie-consent');
    if (consented !== 'accepted' && consented !== 'rejected') {
      setVisible(true);
    }
  }, []);

  function accept() {
    setCookie('cookie-consent', 'accepted', 365);
    setVisible(false);
    window.location.reload();
  }

  function reject() {
    setCookie('cookie-consent', 'rejected', 365);
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 border-t border-glass-border bg-bg-primary/95 backdrop-blur-xl p-4"
        >
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <p className="text-center text-sm text-text-secondary sm:text-left">
              We use cookies to enhance your experience and analyze site traffic. By clicking
              &quot;Accept&quot;, you consent to our use of cookies.{' '}
              <Link href="/privacy-policy" className="text-violet-light underline hover:text-cyan transition-colors">
                Learn more
              </Link>
            </p>
            <div className="flex shrink-0 gap-3">
              <Button variant="outline" size="sm" onClick={reject}>
                Reject
              </Button>
              <Button variant="primary" size="sm" onClick={accept}>
                Accept
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
