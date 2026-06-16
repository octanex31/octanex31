'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { StatsCard } from '@/components/admin/stats-card';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { BarChart3, Users, CalendarCheck, MessageSquare, TrendingUp, ExternalLink, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface DailyLeads {
  date: string;
  count: number;
}

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [totalLeads, setTotalLeads] = useState(0);
  const [leadsThisMonth, setLeadsThisMonth] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);
  const [totalFeedback, setTotalFeedback] = useState(0);
  const [dailyLeads, setDailyLeads] = useState<DailyLeads[]>([]);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  async function fetchAnalytics() {
    try {
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
      sevenDaysAgo.setHours(0, 0, 0, 0);
      const sevenDaysAgoStr = sevenDaysAgo.toISOString();

      const [
        { count: totalLeadsCount },
        { count: monthLeadsCount },
        { count: bookingsCount },
        { count: feedbackCount },
        { data: leadsData },
      ] = await Promise.all([
        supabase.from('leads').select('*', { count: 'exact', head: true }),
        supabase.from('leads').select('*', { count: 'exact', head: true }).gte('created_at', startOfMonth),
        supabase.from('demo_bookings').select('*', { count: 'exact', head: true }),
        supabase.from('feedback').select('*', { count: 'exact', head: true }),
        supabase.from('leads').select('created_at').gte('created_at', sevenDaysAgoStr).order('created_at', { ascending: true }),
      ]);

      setTotalLeads(totalLeadsCount ?? 0);
      setLeadsThisMonth(monthLeadsCount ?? 0);
      setTotalBookings(bookingsCount ?? 0);
      setTotalFeedback(feedbackCount ?? 0);

      const dailyMap: Record<string, number> = {};
      for (let i = 0; i < 7; i++) {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        dailyMap[d.toISOString().split('T')[0]] = 0;
      }

      (leadsData as { created_at: string }[] || []).forEach((lead) => {
        const dateKey = new Date(lead.created_at).toISOString().split('T')[0];
        if (dailyMap[dateKey] !== undefined) {
          dailyMap[dateKey]++;
        }
      });

      setDailyLeads(Object.entries(dailyMap).map(([date, count]) => ({ date, count })));
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  }

  function copyGATag() {
    const tag = `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>`;
    navigator.clipboard.writeText(tag);
    setNotification('GA4 snippet copied!');
    setTimeout(() => setNotification(null), 2000);
  }

  const maxLeadCount = Math.max(...dailyLeads.map((d) => d.count), 1);

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-text-primary">Analytics</h1>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} variant="card" className="h-28" />
          ))}
        </div>
        <Skeleton variant="card" className="h-64" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Analytics</h1>
        <p className="mt-1 text-text-secondary">Overview of your site analytics</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Leads"
          value={totalLeads}
          icon={<Users className="h-5 w-5" />}
          gradient="from-electric-violet/20 to-cyan/10"
        />
        <StatsCard
          title="Leads This Month"
          value={leadsThisMonth}
          icon={<TrendingUp className="h-5 w-5" />}
          gradient="from-orange/20 to-electric-violet/10"
        />
        <StatsCard
          title="Demo Bookings"
          value={totalBookings}
          icon={<CalendarCheck className="h-5 w-5" />}
          gradient="from-cyan/20 to-electric-violet/10"
        />
        <StatsCard
          title="Messages"
          value={totalFeedback}
          icon={<MessageSquare className="h-5 w-5" />}
          gradient="from-violet-light/20 to-cyan/10"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="mb-4 text-lg font-semibold text-text-primary">Leads (Last 7 Days)</h2>
          {dailyLeads.length === 0 ? (
            <p className="py-8 text-center text-sm text-text-secondary">No lead data for the last 7 days</p>
          ) : (
            <div className="flex items-end gap-2" style={{ height: 200 }}>
              {dailyLeads.map((day) => {
                const height = day.count > 0 ? (day.count / maxLeadCount) * 100 : 5;
                return (
                  <div key={day.date} className="flex flex-1 flex-col items-center gap-1">
                    <span className="text-xs font-medium text-text-primary">{day.count}</span>
                    <div
                      className="w-full rounded-lg bg-gradient-to-t from-electric-violet to-cyan transition-all duration-500"
                      style={{ height: `${Math.max(height, 5)}%` }}
                    />
                    <span className="text-[10px] text-text-secondary whitespace-nowrap">
                      {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </Card>

        <Card className="p-6">
          <h2 className="mb-4 text-lg font-semibold text-text-primary">GA4 Integration</h2>
          <div className="space-y-4">
            <p className="text-sm text-text-secondary">
              To enable Google Analytics 4, add the following tag to your <code className="rounded bg-bg-secondary px-1.5 py-0.5 text-electric-violet">layout.tsx</code>:
            </p>
            <div className="relative rounded-xl border border-glass-border bg-bg-secondary p-4">
              <pre className="overflow-x-auto text-xs text-text-secondary">
{`<!-- Google tag (gtag.js) -->
&lt;script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"&gt;&lt;/script&gt;
&lt;script&gt;
  window.dataLayer = window.dataLayer || [];
  function gtag(){{dataLayer.push(arguments);}}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
&lt;/script&gt;`}
              </pre>
              <button
                onClick={copyGATag}
                className="absolute right-2 top-2 rounded-lg p-1.5 text-text-secondary hover:bg-white/5 hover:text-text-primary"
                title="Copy snippet"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>

            <div className="rounded-xl border border-glass-border bg-glass-bg p-4">
              <h3 className="text-sm font-medium text-text-primary">Setup Instructions</h3>
              <ol className="mt-2 space-y-2 text-sm text-text-secondary list-decimal list-inside">
                <li>Go to <a href="https://analytics.google.com" target="_blank" rel="noopener noreferrer" className="text-electric-violet hover:underline">Google Analytics</a> and create a new property</li>
                <li>Copy your Measurement ID (format: <code className="text-electric-violet">G-XXXXXXXXXX</code>)</li>
                <li>Replace <code className="text-electric-violet">G-XXXXXXXXXX</code> in the snippet above</li>
                <li>Add the snippet to <code className="text-electric-violet">app/layout.tsx</code> in the <code className="text-electric-violet">&lt;head&gt;</code></li>
                <li>Alternatively, use the <code className="text-electric-violet">@next/third-parties</code> GoogleAnalytics component</li>
              </ol>
            </div>

            <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
              <p className="text-sm text-amber-400">
                Note: Real-time GA4 data requires additional backend setup and API keys. The data shown here is from your local database.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {dailyLeads.length > 0 && (
        <Card className="p-6">
          <h2 className="mb-4 text-lg font-semibold text-text-primary">Lead Data</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-glass-border">
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-text-secondary">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-text-secondary">Leads</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-text-secondary">% of Total</th>
                </tr>
              </thead>
              <tbody>
                {dailyLeads.map((day) => (
                  <tr key={day.date} className="border-b border-glass-border/50">
                    <td className="px-4 py-3 text-sm text-text-primary">
                      {new Date(day.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                    </td>
                    <td className="px-4 py-3 text-sm text-text-primary">{day.count}</td>
                    <td className="px-4 py-3 text-sm text-text-secondary">
                      {totalLeads > 0 ? ((day.count / totalLeads) * 100).toFixed(1) : 0}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed bottom-6 right-6 z-50 rounded-xl bg-emerald-500/20 px-5 py-3 text-sm font-medium text-emerald-400 shadow-lg border border-emerald-500/30"
          >
            {notification}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
