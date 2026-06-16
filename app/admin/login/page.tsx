'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Hexagon } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'salunkheshivam18@gmail.com';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.replace('/admin/dashboard');
      } else {
        setCheckingSession(false);
      }
    });
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    router.replace('/admin/dashboard');
  }

  if (checkingSession) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-bg-primary">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-electric-violet border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-bg-primary px-4">
      <div className="pointer-events-none absolute inset-0 bg-gradient-radial from-electric-violet/10 via-transparent to-transparent" />
      <div className="pointer-events-none absolute -top-40 -right-40 h-80 w-80 rounded-full bg-electric-violet/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-cyan/5 blur-3xl" />

      <div className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-electric-violet/10 backdrop-blur-xl">
              <Hexagon className="h-9 w-9 text-electric-violet" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-text-primary">OctaNex31 Admin</h1>
          <p className="mt-1 text-sm text-text-secondary">
            Sign in to manage your digital empire
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="glass-card space-y-5 p-6 sm:p-8"
        >
          {error && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-text-secondary"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={adminEmail}
              autoComplete="email"
              className="w-full rounded-xl border border-glass-border bg-glass-bg px-4 py-2.5 text-sm text-text-primary placeholder-text-secondary/50 outline-none backdrop-blur-xl transition-all duration-200 focus:border-electric-violet/50 focus:shadow-[0_0_20px_rgba(212,175,55,0.15)]"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-text-secondary"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              className="w-full rounded-xl border border-glass-border bg-glass-bg px-4 py-2.5 text-sm text-text-primary placeholder-text-secondary/50 outline-none backdrop-blur-xl transition-all duration-200 focus:border-electric-violet/50 focus:shadow-[0_0_20px_rgba(212,175,55,0.15)]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-electric-violet px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-electric-violet/20 transition-all duration-200 hover:bg-electric-violet/90 hover:shadow-electric-violet/30 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Signing in…
              </span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-text-secondary">
          &copy; {new Date().getFullYear()} OctaNex31. All rights reserved.
        </p>
      </div>
    </div>
  );
}
