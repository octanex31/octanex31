import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book a Free Demo | OctaNex31',
  description:
    'Book a free demo with OctaNex31. See exactly how we can transform your business with AI-powered apps, websites, and automation tools.',
  alternates: { canonical: '/book-demo' },
  openGraph: {
    title: 'Book a Free Demo | OctaNex31',
    description:
      'Book a free demo with OctaNex31. See exactly how we can transform your business.',
  },
};

export default function BookDemoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
