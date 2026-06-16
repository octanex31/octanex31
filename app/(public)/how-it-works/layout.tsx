import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How It Works | OctaNex31',
  description:
    'Learn how OctaNex31 works. From consultation to launch, we handle everything. A proven process that delivers results for your business.',
  alternates: { canonical: '/how-it-works' },
  openGraph: {
    title: 'How It Works | OctaNex31',
    description:
      'Learn how OctaNex31 works. From consultation to launch, we handle everything.',
  },
};

export default function HowItWorksLayout({ children }: { children: React.ReactNode }) {
  return children;
}
