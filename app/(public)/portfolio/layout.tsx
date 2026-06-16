import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio | OctaNex31',
  description:
    'Browse our portfolio of custom apps, websites, and digital solutions. Each project showcases our commitment to excellence and innovation.',
  alternates: { canonical: '/portfolio' },
  openGraph: {
    title: 'Portfolio | OctaNex31',
    description:
      'Browse our portfolio of custom apps, websites, and digital solutions.',
  },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
