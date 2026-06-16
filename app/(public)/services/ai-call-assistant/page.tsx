import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, Bot, Brain, BarChart3, CheckCircle2, ArrowRight, Mic, MessageSquare, Settings, Shield, Zap } from 'lucide-react';
import { Section } from '@/components/ui/section';
import { GradientText } from '@/components/ui/gradient-text';
import { Button } from '@/components/ui/button';
import { AICallAssistantPlans } from '@/components/services/ai-call-assistant-plans';

export const metadata: Metadata = {
  title: 'AI Call Assistant | OctaNex31',
  description:
    'Transform your business communication with OctaNex31 AI Call Assistant. Automated inbound and outbound calls with natural AI conversation.',
  openGraph: {
    title: 'AI Call Assistant | OctaNex31',
    description:
      'Never miss a business opportunity again.',
  },
  alternates: { canonical: '/services/ai-call-assistant' },
};

const steps = [
  {
    icon: <Phone className="h-6 w-6" />,
    title: 'Connect Your Number',
    description: 'Port your existing business number or get a new one. Set up call forwarding rules in minutes.',
  },
  {
    icon: <Bot className="h-6 w-6" />,
    title: 'Configure AI Assistant',
    description: 'Train your AI assistant with your business knowledge, FAQs, and preferred conversation style.',
  },
  {
    icon: <Brain className="h-6 w-6" />,
    title: 'AI Handles Calls',
    description: 'Your AI assistant answers and makes calls 24/7, handling inquiries, appointments, and follow-ups naturally.',
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: 'Review & Optimize',
    description: 'Get detailed analytics, call transcripts, and insights. Continuously improve your AI assistant performance.',
  },
];

const techSpecs = [
  'Natural Language Processing (NLP) for human-like conversations',
  'Multi-language support with real-time translation capabilities',
  'Automatic speech recognition with 95%+ accuracy',
  'Context-aware conversation management with memory retention',
  'Seamless CRM and calendar integration via API',
  'Custom voice training and tone customization',
  'Real-time call transcription and sentiment analysis',
  'Automated follow-up scheduling and reminder system',
  'End-to-end encryption for all communications',
  'Scalable infrastructure handling 10,000+ concurrent calls',
  'Intelligent call routing with IVR-style menu support',
  'Detailed analytics dashboard with actionable insights',
];

const faqs = [
  {
    q: 'How does the AI Call Assistant work?',
    a: 'Our AI Call Assistant uses advanced natural language processing to handle inbound and outbound calls automatically. It can answer queries, book appointments, take orders, and more with human-like conversation.',
  },
  {
    q: 'What languages does it support?',
    a: 'The AI Call Assistant supports over 20 languages including English, Hindi, Marathi, Gujarati, Tamil, Telugu, Bengali, and more Indian regional languages.',
  },
  {
    q: 'Can I keep my existing phone number?',
    a: 'Yes, you can port your existing business number to our system. We also provide new virtual numbers if you prefer.',
  },
  {
    q: 'How accurate is the AI?',
    a: 'Our AI achieves over 95% speech recognition accuracy and continuously improves through machine learning. It can understand various accents, dialects, and speech patterns.',
  },
  {
    q: 'Is my data secure?',
    a: 'Absolutely. All calls are encrypted end-to-end. We comply with data protection regulations and never share or sell your data. Call recordings are stored securely.',
  },
  {
    q: 'Can I review call recordings?',
    a: 'Yes, all calls are recorded and transcribed automatically. You can review them anytime through your dashboard, along with sentiment analysis and performance metrics.',
  },
];

export default function AICallAssistantPage() {
  return (
    <>
      <section className="relative pt-28 pb-12 sm:pt-32 sm:pb-16">
        <div className="absolute inset-0 bg-gradient-radial from-electric-violet/10 via-transparent to-transparent" />
        <div className="container relative z-10 mx-auto px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-electric-violet/10">
            <Phone className="h-8 w-8 text-electric-violet" />
          </div>
          <GradientText as="h1" variant="violet-cyan" className="mb-4">
            AI Call Assistant
          </GradientText>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-text-secondary">
            Never miss a business opportunity. Your 24/7 AI receptionist handles calls, books
            appointments, and nurtures leads while you focus on growth.
          </p>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/5 px-6 py-2 text-sm text-cyan">
            <Zap className="h-4 w-4" />
            Free first 10 AI calls included
          </div>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/book-demo">
              <Button variant="primary" size="lg" icon={<Phone className="h-5 w-5" />}>
                Book a Demo
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Section
        id="how-it-works"
        title="How It Works"
        subtitle="Get started in four simple steps"
        gradientBg
      >
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 hidden w-px bg-gradient-to-b from-electric-violet via-cyan to-transparent md:block" />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <div
                key={i}
                className="group relative rounded-2xl border border-glass-border bg-glass-bg backdrop-blur-xl p-6 transition-all duration-500 hover:border-electric-violet/40"
              >
                <div className="relative z-10 mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-electric-violet/10 text-electric-violet">
                  {step.icon}
                </div>
                <div className="absolute -top-3 left-4 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-electric-violet text-xs font-bold text-white">
                  {i + 1}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-text-primary">{step.title}</h3>
                <p className="text-sm leading-relaxed text-text-secondary">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="tech-specs" title="Technical Specifications">
        <div className="mx-auto max-w-3xl">
          <div className="grid gap-3 sm:grid-cols-2">
            {techSpecs.map((spec, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl border border-glass-border bg-glass-bg backdrop-blur-xl p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-electric-violet" />
                <span className="text-sm text-text-primary">{spec}</span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center font-mono text-xs opacity-40" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            Powered by MyCallGenie engine — integrated via OctaNex31 infrastructure.
          </p>
        </div>
      </Section>

      <AICallAssistantPlans />

      <Section
        id="faq"
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about AI Call Assistant"
        gradientBg
      >
        <div className="mx-auto max-w-3xl">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-glass-border py-5 last:border-0">
              <h3 className="mb-2 text-base font-medium text-text-primary">{faq.q}</h3>
              <p className="text-sm leading-relaxed text-text-secondary">{faq.a}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="relative overflow-hidden px-4 py-20 sm:py-28">
        <div className="absolute inset-0 bg-gradient-radial from-electric-violet/15 via-orange/5 to-transparent" />
        <div className="container relative z-10 mx-auto max-w-3xl text-center">
          <GradientText as="h2" variant="violet-orange" className="mb-6">
            Ready to Automate Your Calls?
          </GradientText>
          <p className="mb-10 text-lg text-text-secondary">
            Join hundreds of businesses using AI Call Assistant to never miss a lead again.
          </p>
          <Link href="/book-demo">
            <Button variant="primary" size="lg" className="bg-orange hover:bg-orange/90" icon={<Phone className="h-5 w-5" />}>
              Book a Free Demo
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
