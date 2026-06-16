import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | OctaNex31',
  description:
    'Get in touch with OctaNex31. Have a project in mind? Send us a message and we will get back to you within 24 hours.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Us | OctaNex31',
    description:
      'Get in touch with OctaNex31. Have a project in mind? Send us a message and we will get back to you within 24 hours.',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
