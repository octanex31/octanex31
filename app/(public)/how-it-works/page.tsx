'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  MessageCircle,
  ClipboardList,
  Palette,
  Rocket,
  RefreshCw,
  Globe,
  Layout,
  Phone,
  Bot,
  Code2,
  Star,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GradientText } from '@/components/ui/gradient-text';

const steps = [
  {
    icon: <MessageCircle className="h-6 w-6" />,
    title: 'Contact Us',
    description:
      'Reach out through our form, WhatsApp, or call. We respond within 24 hours to schedule your free consultation.',
    color: 'from-amber-500 to-yellow-600',
    glow: 'shadow-amber-500/25',
  },
  {
    icon: <ClipboardList className="h-6 w-6" />,
    title: 'Requirement Discussion',
    description:
      'We dive deep into your business goals, target audience, and vision to craft a tailored digital strategy.',
    color: 'from-yellow-500 to-amber-600',
    glow: 'shadow-yellow-500/25',
  },
  {
    icon: <Palette className="h-6 w-6" />,
    title: 'Design & Setup',
    description:
      'Our team designs and builds your solution with modern tech, premium UI/UX, and performance optimization.',
    color: 'from-yellow-600 to-orange-700',
    glow: 'shadow-amber-600/25',
  },
  {
    icon: <Rocket className="h-6 w-6" />,
    title: 'Launch & Delivery',
    description:
      'We deploy your project, configure domains, set up analytics, and ensure everything runs flawlessly.',
    color: 'from-amber-400 to-yellow-500',
    glow: 'shadow-amber-500/25',
  },
  {
    icon: <RefreshCw className="h-6 w-6" />,
    title: 'Support & Improvements',
    description:
      'Ongoing maintenance, updates, and enhancements to keep your digital presence growing with your business.',
    color: 'from-amber-500 to-yellow-600',
    glow: 'shadow-amber-500/25',
  },
];

const services = [
  {
    icon: <Globe className="h-7 w-7" />,
    title: 'Websites',
    description: 'Full-fledged business websites with modern design, SEO, and admin panels you can manage yourself.',
    gradient: 'from-amber-500 to-yellow-600',
  },
  {
    icon: <Layout className="h-7 w-7" />,
    title: 'Landing Pages',
    description: 'High-converting, single-purpose pages designed to capture leads and drive sales instantly.',
    gradient: 'from-yellow-500 to-amber-600',
  },
  {
    icon: <Phone className="h-7 w-7" />,
    title: 'AI Call Assistant',
    description: 'Never miss a lead. AI-powered voice assistant handles calls, answers queries, and books appointments 24/7.',
    gradient: 'from-yellow-600 to-orange-700',
  },
  {
    icon: <Bot className="h-7 w-7" />,
    title: 'WhatsApp Automation',
    description: 'Automate customer responses, send bulk updates, manage orders, and engage leads directly on WhatsApp.',
    gradient: 'from-amber-400 to-yellow-500',
  },
  {
    icon: <Code2 className="h-7 w-7" />,
    title: 'Custom Apps',
    description: 'Tailored mobile and web applications built from the ground up to solve your unique business challenges.',
    gradient: 'from-amber-500 to-yellow-600',
  },
  {
    icon: <Star className="h-7 w-7" />,
    title: 'Google Reputation Growth',
    description: 'Build a powerful online reputation with strategic review generation, reputation monitoring, and professional response management across all platforms.',
    gradient: 'from-amber-500 to-yellow-600',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export default function HowItWorksPage() {
  return (
    <>
      {/* SECTION 1 — Hero */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-radial from-electric-violet/15 via-transparent to-transparent" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-electric-violet/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-orange/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

        <motion.div
          className="container relative z-10 mx-auto px-4 text-center sm:px-6 lg:px-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-6 inline-flex items-center gap-2 rounded-full border border-electric-violet/20 bg-electric-violet/10 px-4 py-1.5 text-sm text-violet-light">
            <Sparkles className="h-4 w-4" />
            Simple Digital Solutions for Modern Businesses
          </motion.div>

          <motion.h1 variants={itemVariants} className="mx-auto max-w-4xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            <GradientText as="span" variant="violet-cyan">
              From Idea to Launch
            </GradientText>
            <br />
            <span className="text-text-primary">We Handle It All</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="mx-auto mt-6 max-w-2xl text-lg text-text-secondary">
            No technical jargon. No complexity. Just a clear, straightforward process that takes your
            business from where it is to where it needs to be — online, automated, and growing.
          </motion.p>

          <motion.div variants={itemVariants} className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/book-demo">
              <Button variant="primary" size="lg" icon={<Rocket className="h-4 w-4" />}>
                Book Free Demo
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" icon={<MessageCircle className="h-4 w-4" />}>
                Talk to Us
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* SECTION 2 — Process Timeline */}
      <section className="relative py-20 sm:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">
              How We <GradientText as="span" variant="violet-cyan">Work</GradientText>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-text-secondary">
              A proven process that delivers results. No guesswork, no surprises — just clear steps from start to success.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-8 top-0 hidden h-full w-px bg-gradient-to-b from-electric-violet via-cyan to-transparent md:block" />

            <div className="space-y-8 md:space-y-12">
              {steps.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group relative md:ml-20"
                >
                  <div className="absolute left-4 top-6 z-10 hidden md:block">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${step.color} ${step.glow} shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                      {step.icon}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-glass-border bg-glass-bg/50 backdrop-blur-xl p-6 transition-all duration-300 hover:border-electric-violet/30 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] md:p-8">
                    <div className="mb-3 flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${step.color} md:hidden`}>
                        {step.icon}
                      </div>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-electric-violet/10 text-sm font-bold text-violet-light">
                        0{i + 1}
                      </div>
                    </div>
                    <h3 className="mb-2 text-xl font-semibold text-text-primary">
                      {step.title}
                    </h3>
                    <p className="leading-relaxed text-text-secondary">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — Interactive Service Highlights */}
      <section className="relative py-20 sm:py-28">
        <div className="absolute inset-0 bg-gradient-radial from-orange/5 via-transparent to-transparent" />
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">
              What <GradientText as="span" variant="violet-orange">We Build</GradientText>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-text-secondary">
              Every solution is crafted to your specific needs. Here is what we specialize in.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                variants={itemVariants}
                className="group relative overflow-hidden rounded-2xl border border-glass-border bg-glass-bg/50 backdrop-blur-xl p-6 transition-all duration-500 hover:border-electric-violet/40 hover:shadow-[0_0_40px_rgba(212,175,55,0.15)]"
              >
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br opacity-0 blur-2xl transition-all duration-500 group-hover:opacity-30"
                  style={{ backgroundImage: `linear-gradient(135deg, ${service.gradient})` }}
                />

                <div className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${service.gradient} shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                  {service.icon}
                </div>

                <h3 className="mb-3 text-xl font-semibold text-text-primary group-hover:text-violet-light transition-colors">
                  {service.title}
                </h3>

                <p className="mb-6 text-sm leading-relaxed text-text-secondary">
                  {service.description}
                </p>

                <Link
                  href="/book-demo"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-light transition-all duration-200 hover:text-cyan group/link"
                >
                  Get Started
                  <ChevronRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-1" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 4 — Final CTA */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-electric-violet/20 via-transparent to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-electric-violet/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-10 w-64 h-64 bg-cyan/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container relative z-10 mx-auto px-4 text-center sm:px-6 lg:px-8"
        >
          <h2 className="text-4xl font-bold text-text-primary sm:text-5xl lg:text-6xl">
            Ready to Grow <GradientText as="span" variant="violet-cyan">Your Business</GradientText>?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-text-secondary">
            Join businesses that have transformed their digital presence with OctaNex31.
            Your success story starts here.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/book-demo">
              <Button variant="primary" size="lg" icon={<Rocket className="h-4 w-4" />}>
                Book Free Demo
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" icon={<MessageCircle className="h-4 w-4" />}>
                Contact Us
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}
