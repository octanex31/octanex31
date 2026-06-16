'use client';

import { useEffect, useState } from 'react';
import { GoogleAnalytics } from '@next/third-parties/google';

function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : undefined;
}

export function Analytics() {
  const [enabled, setEnabled] = useState(false);
  const ga4Id = process.env.NEXT_PUBLIC_GA4_ID;

  useEffect(() => {
    if (ga4Id && getCookie('cookie-consent') === 'accepted') {
      setEnabled(true);
    }
  }, [ga4Id]);

  if (!ga4Id || !enabled) return null;
  return <GoogleAnalytics gaId={ga4Id} />;
}
