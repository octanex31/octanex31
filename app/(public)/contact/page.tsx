'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { GradientText } from '@/components/ui/gradient-text';
import { contactSchema } from '@/lib/validators';

const contactMethods = [
  { href: 'tel:+918975938518', icon: <Phone className="h-5 w-5" />, label: 'Call Us' },
  { href: 'https://wa.me/918975938518', icon: <MessageCircle className="h-5 w-5" />, label: 'WhatsApp' },
  { href: 'mailto:salunkheshivam18@gmail.com', icon: <Mail className="h-5 w-5" />, label: 'Email' },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [serverError, setServerError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setServerError('');

    const result = contactSchema.safeParse(formData);
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
          { action: 'submit' }
        );
      }

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, recaptchaToken: token }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to send message');
      }

      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err: any) {
      setStatus('error');
      setServerError(err.message || 'Something went wrong. Please try again.');
    }
  }, [formData]);

  return (
    <>
      <section className="relative pt-28 pb-12 sm:pt-32 sm:pb-16">
        <div className="absolute inset-0 bg-gradient-radial from-electric-violet/10 via-transparent to-transparent" />
        <div className="container relative z-10 mx-auto px-4 text-center sm:px-6 lg:px-8">
          <GradientText as="h1" variant="violet-cyan" className="mb-6">
            Get in Touch
          </GradientText>
          <p className="mx-auto max-w-2xl text-lg text-text-secondary">
            Have a project in mind? We would love to hear from you. Send us a message and we will
            get back to you within 24 hours.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center rounded-2xl border border-green-500/30 bg-green-500/10 p-12 text-center"
              >
                <CheckCircle2 className="mb-4 h-16 w-16 text-green-400" />
                <h3 className="mb-2 text-2xl font-bold text-text-primary">Message Sent!</h3>
                <p className="mb-6 text-text-secondary">
                  Thank you for reaching out. We will get back to you within 24 hours.
                </p>
                <Button variant="outline" onClick={() => setStatus('idle')}>
                  Send Another Message
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-text-primary">
                      Full Name *
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
                      Email Address *
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      error={errors.email}
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-text-primary">
                    Phone Number (optional)
                  </label>
                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 89759 38518"
                    error={errors.phone}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-text-primary">
                    Message *
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    rows={5}
                    error={errors.message}
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
                  loading={status === 'loading'}
                  icon={<Send className="h-4 w-4" />}
                >
                  Send Message
                </Button>
              </form>
            )}
          </div>

          <div>
            <div className="rounded-2xl border border-glass-border bg-glass-bg backdrop-blur-xl p-6">
              <h3 className="mb-6 text-lg font-semibold text-text-primary">Contact Information</h3>

              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-electric-violet/10 text-electric-violet">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">Email</p>
                    <a href="mailto:salunkheshivam18@gmail.com" className="text-sm text-violet-light transition-colors hover:text-cyan">
                      salunkheshivam18@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-electric-violet/10 text-electric-violet">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">Phone</p>
                    <a href="tel:+918975938518" className="text-sm text-violet-light transition-colors hover:text-cyan">
                      +91 89759 38518
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-electric-violet/10 text-electric-violet">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">Location</p>
                    <p className="text-sm text-text-secondary">India</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-glass-border pt-6">
                <p className="mb-4 text-sm font-medium text-text-primary">Reach Us</p>
                <div className="flex flex-col gap-3">
                  {contactMethods.map((method) => (
                    <a
                      key={method.label}
                      href={method.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 rounded-lg border border-glass-border px-4 py-3 text-sm text-text-secondary transition-all hover:border-electric-violet hover:text-electric-violet"
                    >
                      {method.icon}
                      {method.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
