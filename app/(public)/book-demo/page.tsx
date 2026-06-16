'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Phone,
  MessageCircle,
  Shield,
  Sparkles,
  Send,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { GradientText } from '@/components/ui/gradient-text';
import { demoBookingSchema } from '@/lib/validators';
import { getTimeSlots } from '@/lib/utils';

const services = [
  'Landing Page',
  'Website',
  'AI Call Assistant',
  'WhatsApp Automation',
  'Custom App',
];

const trustItems = [
  {
    icon: <Sparkles className="h-5 w-5" />,
    text: 'Free consultation — no charges, no commitment',
  },
  {
    icon: <Clock className="h-5 w-5" />,
    text: 'Response within 24 hours',
  },
  {
    icon: <Shield className="h-5 w-5" />,
    text: 'No obligation demo — see value before you decide',
  },
];

export default function BookDemoPage() {
  const timeSlots = getTimeSlots();

  const [formData, setFormData] = useState({
    name: '',
    business_name: '',
    phone: '',
    whatsapp_number: '',
    business_type: '',
    service_interest: '',
    time_slot: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [serverError, setServerError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setServerError('');

    const result = demoBookingSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setStatus('loading');

    try {
      let token = '';
      if (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
        token = await (window as any).grecaptcha.execute(
          process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
          { action: 'submit' },
        );
      }

      const res = await fetch('/api/demo-bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, recaptchaToken: token }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to book demo');
      }

      setStatus('success');
      setFormData({
        name: '',
        business_name: '',
        phone: '',
        whatsapp_number: '',
        business_type: '',
        service_interest: '',
        time_slot: '',
        message: '',
      });
    } catch (err: any) {
      setStatus('error');
      setServerError(err.message || 'Something went wrong. Please try again.');
    }
  }, [formData]);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-12 sm:pt-32 sm:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-electric-violet/10 via-transparent to-transparent" />
        <div className="absolute top-10 left-5 w-64 h-64 bg-electric-violet/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-5 w-80 h-80 bg-cyan/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="container relative z-10 mx-auto px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-electric-violet to-cyan p-4 shadow-lg shadow-electric-violet/25">
              <Calendar className="h-8 w-8 text-white" />
            </div>
            <GradientText as="h1" variant="violet-cyan" className="mb-6">
              Book a Free Demo
            </GradientText>
            <p className="mx-auto max-w-2xl text-lg text-text-secondary">
              See exactly how OctaNex31 can transform your business. No pitches, no pressure —
              just a live walkthrough tailored to your needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <div className="container mx-auto px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-12 text-center"
              >
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20">
                  <CheckCircle2 className="h-10 w-10 text-emerald-400" />
                </div>
                <h3 className="mb-2 text-2xl font-bold text-text-primary">
                  Demo Request Received!
                </h3>
                <p className="mb-2 max-w-md text-text-secondary">
                  Thank you for your interest. Our team will review your requirements and reach
                  out within 24 hours to confirm your demo slot.
                </p>
                <p className="mb-8 text-sm text-text-secondary">
                  You will receive a confirmation via WhatsApp or call at your provided number.
                </p>
                <Button variant="primary" onClick={() => setStatus('idle')}>
                  Book Another Demo
                </Button>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                onSubmit={handleSubmit}
                className="space-y-5 rounded-2xl border border-glass-border bg-glass-bg/50 backdrop-blur-xl p-6 sm:p-8"
              >
                <div className="mb-6 flex items-center gap-2 border-b border-glass-border pb-4">
                  <Send className="h-5 w-5 text-electric-violet" />
                  <h2 className="text-lg font-semibold text-text-primary">
                    Tell Us About Your Business
                  </h2>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-text-primary">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      error={errors.name}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-text-primary">
                      Business Name <span className="text-red-400">*</span>
                    </label>
                    <Input
                      name="business_name"
                      value={formData.business_name}
                      onChange={handleChange}
                      placeholder="Your business name"
                      error={errors.business_name}
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-text-primary">
                      Phone Number <span className="text-red-400">*</span>
                    </label>
                    <Input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 89759 38518"
                      error={errors.phone}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-text-primary">
                      WhatsApp Number <span className="text-red-400">*</span>
                    </label>
                    <Input
                      name="whatsapp_number"
                      type="tel"
                      value={formData.whatsapp_number}
                      onChange={handleChange}
                      placeholder="+91 89759 38518"
                      error={errors.whatsapp_number}
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-text-primary">
                      Business Type
                    </label>
                    <Input
                      name="business_type"
                      value={formData.business_type}
                      onChange={handleChange}
                      placeholder="e.g., Startup, Retail, Restaurant"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-text-primary">
                      Interested Service <span className="text-red-400">*</span>
                    </label>
                    <Select
                      name="service_interest"
                      value={formData.service_interest}
                      onChange={handleChange}
                      error={errors.service_interest}
                      options={[
                        { value: '', label: 'Select a service' },
                        ...services.map((s) => ({ value: s, label: s })),
                      ]}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-text-primary">
                    Preferred Time (IST) <span className="text-red-400">*</span>
                  </label>
                  <Select
                    name="time_slot"
                    value={formData.time_slot}
                    onChange={handleChange}
                    error={errors.time_slot}
                    options={[
                      { value: '', label: 'Select a time slot' },
                      ...timeSlots.map((slot) => ({ value: slot, label: slot })),
                    ]}
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-text-primary">
                    Message (Optional)
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your project or any specific requirements..."
                    rows={3}
                    className="w-full rounded-xl border border-glass-border bg-white/5 px-4 py-3 text-sm text-text-primary placeholder-text-secondary/50 transition-all duration-200 focus:border-electric-violet/50 focus:outline-none focus:ring-1 focus:ring-electric-violet/30 resize-none"
                  />
                </div>

                {serverError && (
                  <div className="flex items-start gap-2 rounded-xl bg-red-500/10 border border-red-500/30 p-4">
                    <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-400" />
                    <p className="text-sm text-red-300">{serverError}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  loading={status === 'loading'}
                  icon={<Calendar className="h-4 w-4" />}
                >
                  Book Free Demo
                </Button>
              </motion.form>
            )}
          </div>

          {/* Trust Section */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="rounded-2xl border border-glass-border bg-glass-bg/50 backdrop-blur-xl p-6"
              >
                <h3 className="mb-5 text-lg font-semibold text-text-primary">
                  Why Book a Demo?
                </h3>

                <div className="space-y-4">
                  {trustItems.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                        {item.icon}
                      </div>
                      <p className="pt-2 text-sm text-text-secondary">{item.text}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="rounded-2xl border border-glass-border bg-glass-bg/50 backdrop-blur-xl p-6"
              >
                <h3 className="mb-4 text-lg font-semibold text-text-primary">
                  Prefer to Call?
                </h3>
                <div className="space-y-3">
                  <a
                    href="tel:+918975938518"
                    className="flex items-center gap-3 rounded-xl bg-electric-violet/5 p-3 transition-all duration-200 hover:bg-electric-violet/10"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-electric-violet/10 text-electric-violet">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary">Call Us</p>
                      <p className="text-xs text-text-secondary">+91 89759 38518</p>
                    </div>
                  </a>
                  <a
                    href={`https://wa.me/918975938518?text=Hi,%20I%20want%20to%20book%20a%20demo`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl bg-emerald-500/5 p-3 transition-all duration-200 hover:bg-emerald-500/10"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                      <MessageCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary">WhatsApp Us</p>
                      <p className="text-xs text-text-secondary">Quick replies via chat</p>
                    </div>
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="rounded-2xl border border-glass-border bg-glass-bg/50 backdrop-blur-xl p-6"
              >
                <h3 className="mb-3 text-lg font-semibold text-text-primary">
                  Demo Details
                </h3>
                <ul className="space-y-3 text-sm text-text-secondary">
                  <li className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-electric-violet" />
                    Duration: 30-45 minutes
                  </li>
                  <li className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-electric-violet" />
                    Platform: Google Meet / Zoom
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-electric-violet" />
                    Free consultation, no obligation
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
