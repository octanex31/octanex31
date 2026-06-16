import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/ui/section';
import { GradientText } from '@/components/ui/gradient-text';
import { Button } from '@/components/ui/button';
import {
  Target,
  Eye,
  Heart,
  Code,
  Smartphone,
  Globe,
  Cpu,
  Bot,
  BarChart3,
  Palette,
  Shield,
  Zap,
  Store,
  ArrowRight,
  Quote,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | OctaNex31',
  alternates: { canonical: '/about' },
  description:
    'OctaNex31 is a premium digital agency founded by Shivam Salunkhe. We craft innovative apps, websites, and AI-powered solutions.',
  openGraph: {
    title: 'About Us | OctaNex31',
    description:
      'OctaNex31 is a premium digital agency founded by Shivam Salunkhe. We craft innovative apps, websites, and AI-powered solutions.',
  },
};

const values = [
  {
    icon: <Target className="h-6 w-6" />,
    title: 'Mission-Driven',
    description: 'We focus on delivering measurable results that drive real business growth for our clients.',
  },
  {
    icon: <Eye className="h-6 w-6" />,
    title: 'Visionary Thinking',
    description: 'We anticipate trends and leverage emerging technologies to keep our clients ahead of the curve.',
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: 'Client-First Approach',
    description: 'Your success is our success. We prioritize transparent communication and long-term partnerships.',
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: 'Innovation at Core',
    description: 'We constantly explore new technologies and methodologies to deliver cutting-edge solutions.',
  },
];

const values2 = [
  { icon: <Bot className="h-6 w-6" />, title: 'Focused on Modern Automation', description: 'We help businesses streamline operations using AI and smart automation tools.' },
  { icon: <Globe className="h-6 w-6" />, title: 'Building Digital Presence', description: 'From websites to apps, we craft digital identities that make businesses discoverable.' },
  { icon: <Zap className="h-6 w-6" />, title: 'Affordable for Growing Brands', description: 'Premium digital solutions at prices that make sense for startups and local businesses.' },
  { icon: <Store className="h-6 w-6" />, title: 'Built for Startups, Gyms & Local Businesses', description: 'We specialize in helping small and medium businesses compete in the digital age.' },
];

const techStack = [
  { name: 'React / Next.js', icon: <Code className="h-5 w-5" />, category: 'Frontend' },
  { name: 'React Native / Flutter', icon: <Smartphone className="h-5 w-5" />, category: 'Mobile' },
  { name: 'Node.js / Python', icon: <Code className="h-5 w-5" />, category: 'Backend' },
  { name: 'AWS / Vercel / Firebase', icon: <Globe className="h-5 w-5" />, category: 'Infrastructure' },
  { name: 'OpenAI / LangChain', icon: <Cpu className="h-5 w-5" />, category: 'AI / ML' },
  { name: 'TypeScript / JavaScript', icon: <Code className="h-5 w-5" />, category: 'Languages' },
  { name: 'Tailwind CSS / Framer Motion', icon: <Palette className="h-5 w-5" />, category: 'Design' },
  { name: 'Supabase / PostgreSQL', icon: <BarChart3 className="h-5 w-5" />, category: 'Database' },
  { name: 'GitHub Actions / CI/CD', icon: <Bot className="h-5 w-5" />, category: 'DevOps' },
  { name: 'Stripe / Razorpay', icon: <Shield className="h-5 w-5" />, category: 'Payments' },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative pt-28 pb-12 sm:pt-32 sm:pb-16">
        <div className="absolute inset-0 bg-gradient-radial from-electric-violet/10 via-transparent to-transparent" />
        <div className="container relative z-10 mx-auto px-4 text-center sm:px-6 lg:px-8">
          <GradientText as="h1" variant="violet-cyan" className="mb-6">
            About OctaNex31
          </GradientText>
          <p className="mx-auto max-w-2xl text-lg text-text-secondary">
            We are a premium digital agency on a mission to transform ideas into digital empires.
            Founded with a passion for innovation, we deliver excellence in every project.
          </p>
        </div>
      </section>

      <Section title="Our Story" gradientBg>
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-glass-border bg-glass-bg backdrop-blur-xl p-8">
            <Quote className="mb-4 h-8 w-8 text-electric-violet/40" />
            <p className="mb-4 text-base leading-relaxed text-text-primary">
              OctaNex31 was born from a vision to bridge the gap between ambitious ideas and
              exceptional digital execution. Founded by Shivam Salunkhe, our agency brings together
              expertise in software engineering, design, and artificial intelligence to create
              solutions that truly make a difference.
            </p>
            <p className="text-base leading-relaxed text-text-primary">
              Starting as a solo venture, OctaNex31 has grown into a trusted digital partner for
              businesses across India and beyond. We believe in the power of technology to transform
              businesses, and we are committed to delivering solutions that exceed expectations.
              Every project we undertake is driven by a passion for excellence and a relentless
              pursuit of innovation.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Why OctaNex31?" subtitle="What sets us apart from the rest">
        <div className="grid gap-6 sm:grid-cols-2">
          {values.map((value, i) => (
            <div
              key={i}
              className="rounded-2xl border border-glass-border bg-glass-bg backdrop-blur-xl p-6 transition-all duration-500 hover:border-electric-violet/40"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-electric-violet/10 text-electric-violet">
                {value.icon}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-text-primary">{value.title}</h3>
              <p className="text-sm leading-relaxed text-text-secondary">{value.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="absolute inset-0 bg-gradient-radial from-electric-violet/5 via-transparent to-transparent" />
        <div className="container relative z-10 mx-auto">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-text-primary sm:text-3xl">What We Stand For</h2>
            <p className="mt-2 text-text-secondary">Honest, affordable digital solutions for real businesses</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {values2.map((item, i) => (
              <div
                key={i}
                className="group rounded-2xl border border-glass-border bg-glass-bg backdrop-blur-xl p-6 transition-all duration-500 hover:border-electric-violet/40 hover:shadow-[0_0_40px_rgba(212,175,55,0.1)] hover:-translate-y-1"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-electric-violet/10 text-electric-violet transition-colors group-hover:bg-electric-violet/20">
                  {item.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-text-primary">{item.title}</h3>
                <p className="text-sm leading-relaxed text-text-secondary">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section title="Meet the Founder" gradientBg>
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-glass-border bg-glass-bg backdrop-blur-xl p-8 text-center">
            <div className="mx-auto mb-6 h-28 w-28 overflow-hidden rounded-full border-2 border-electric-violet/30">
              <div className="flex h-full w-full items-center justify-center bg-electric-violet/10 text-3xl font-bold text-electric-violet">
                SS
              </div>
            </div>
            <h3 className="mb-1 text-2xl font-bold text-text-primary">Shivam Salunkhe</h3>
            <p className="mb-4 text-sm text-violet-light">Founder & Lead Developer</p>
            <p className="mb-6 text-sm leading-relaxed text-text-secondary">
              With a deep passion for technology and innovation, Shivam founded OctaNex31 to help
              businesses harness the power of digital. His expertise spans full-stack development,
              AI integration, and building scalable digital products that drive measurable results.
            </p>
            <Link href="/contact">
              <Button variant="outline" size="md">Get in Touch</Button>
            </Link>
          </div>
        </div>
      </Section>

      <Section title="Our Tech Stack" subtitle="Technologies we use to build digital excellence">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {techStack.map((tech, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-xl border border-glass-border bg-glass-bg backdrop-blur-xl p-4 transition-all duration-300 hover:border-electric-violet/30"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-electric-violet/10 text-electric-violet">
                {tech.icon}
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">{tech.name}</p>
                <p className="text-xs text-text-secondary">{tech.category}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <section className="relative overflow-hidden px-4 py-20 sm:py-28">
        <div className="absolute inset-0 bg-gradient-radial from-electric-violet/15 via-orange/5 to-transparent" />
        <div className="container relative z-10 mx-auto max-w-3xl text-center">
          <GradientText as="h2" variant="violet-orange" className="mb-6">
            Let&apos;s Build Something Amazing
          </GradientText>
          <p className="mb-10 text-lg text-text-secondary">
            Ready to start your digital journey? We&apos;d love to hear about your project.
          </p>
          <Link href="/contact">
            <Button variant="primary" size="lg" className="bg-orange hover:bg-orange/90" icon={<ArrowRight className="h-5 w-5" />}>
              Start Your Project
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
