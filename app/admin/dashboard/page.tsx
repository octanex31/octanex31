'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { StatsCard } from '@/components/admin/stats-card';
import { DataTable } from '@/components/admin/data-table';
import { Button } from '@/components/ui/button';
import { GradientText } from '@/components/ui/gradient-text';
import { Users, CalendarCheck, MessageSquare, TrendingUp, ArrowRight, Plus, Eye, ExternalLink } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { formatDate, cn } from '@/lib/utils';
import type { Lead, DemoBooking } from '@/types';

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [totalLeads, setTotalLeads] = useState(0);
  const [newLeadsToday, setNewLeadsToday] = useState(0);
  const [pendingDemos, setPendingDemos] = useState(0);
  const [unreadFeedback, setUnreadFeedback] = useState(0);
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
  const [recentDemos, setRecentDemos] = useState<DemoBooking[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayStr = today.toISOString();

      console.log('[Admin Dashboard] Fetching dashboard data...');
      const results = await Promise.allSettled([
        supabase.from('leads').select('*', { count: 'exact', head: true }),
        supabase.from('leads').select('*', { count: 'exact', head: true }).gte('created_at', todayStr),
        supabase.from('demo_bookings').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('feedback').select('*', { count: 'exact', head: true }),
        supabase.from('leads').select('*').order('created_at', { ascending: false }).limit(5),
        supabase.from('demo_bookings').select('*').order('created_at', { ascending: false }).limit(5),
      ]);

      results.forEach((r, i) => {
        if (r.status === 'rejected') console.error(`[Admin Dashboard] Query ${i} failed:`, r.reason);
        else if (r.value.error) console.error(`[Admin Dashboard] Query ${i} returned error:`, r.value.error);
      });

      const [
        totalLeadsRes,
        todayLeadsRes,
        pendingDemosRes,
        unreadRes,
        leadsDataRes,
        demosDataRes,
      ] = results.map((r) => (r.status === 'fulfilled' ? r.value : { count: 0, data: null, error: null }));

      setTotalLeads(totalLeadsRes.count ?? 0);
      setNewLeadsToday(todayLeadsRes.count ?? 0);
      setPendingDemos(pendingDemosRes.count ?? 0);
      setUnreadFeedback(unreadRes.count ?? 0);
      setRecentLeads((leadsDataRes.data as Lead[]) || []);
      setRecentDemos((demosDataRes.data as DemoBooking[]) || []);

      console.log('[Admin Dashboard] Data loaded:', { totalLeads: totalLeadsRes.count, todayLeads: todayLeadsRes.count, pendingDemos: pendingDemosRes.count, unreadFeedback: unreadRes.count });
    } catch (error) {
      console.error('[Admin Dashboard] Fetch failed:', error);
    } finally {
      setLoading(false);
    }
  }

  const leadColumns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'service_interest', label: 'Service', sortable: true },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (item: Lead) => {
        const statusColors: Record<string, string> = {
          new: 'bg-electric-violet/15 text-violet-light border-electric-violet/20',
          contacted: 'bg-cyan-500/15 text-cyan border-cyan/20',
          qualified: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
          closed: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
        };
        return (
          <span className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border', statusColors[item.status] || '')}>
            {item.status}
          </span>
        );
      },
    },
    {
      key: 'created_at',
      label: 'Date',
      sortable: true,
      render: (item: Lead) => formatDate(item.created_at),
    },
  ];

  const demoColumns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    {
      key: 'date',
      label: 'Date',
      sortable: true,
      render: (item: DemoBooking) => formatDate(item.date),
    },
    { key: 'time_slot', label: 'Time', sortable: true },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (item: DemoBooking) => {
        const statusColors: Record<string, string> = {
          pending: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
          confirmed: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
          completed: 'bg-cyan-500/15 text-cyan border-cyan/20',
          cancelled: 'bg-red-500/15 text-red-400 border-red-500/20',
        };
        return (
          <span className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border', statusColors[item.status] || '')}>
            {item.status}
          </span>
        );
      },
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Dashboard</h1>
        <p className="mt-1 text-text-secondary">Welcome back to OctaNex31 admin panel</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Leads"
          value={loading ? '...' : totalLeads}
          icon={<Users className="h-5 w-5" />}
          gradient="from-electric-violet/20 to-cyan/10"
        />
        <StatsCard
          title="New Leads Today"
          value={loading ? '...' : newLeadsToday}
          icon={<TrendingUp className="h-5 w-5" />}
          gradient="from-orange/20 to-electric-violet/10"
        />
        <StatsCard
          title="Pending Demos"
          value={loading ? '...' : pendingDemos}
          icon={<CalendarCheck className="h-5 w-5" />}
          gradient="from-cyan/20 to-electric-violet/10"
        />
        <StatsCard
          title="Messages"
          value={loading ? '...' : unreadFeedback}
          icon={<MessageSquare className="h-5 w-5" />}
          gradient="from-violet-light/20 to-cyan/10"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-glass-border bg-glass-bg p-6 backdrop-blur-xl">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-text-primary">Recent Leads</h2>
            <Button variant="ghost" size="sm" onClick={() => router.push('/admin/leads')}>
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          <DataTable
            columns={leadColumns}
            data={recentLeads}
            keyField="id"
            searchable={false}
            pageSize={5}
            loading={loading}
            emptyMessage="No leads yet"
            onRowClick={(item) => router.push('/admin/leads')}
          />
        </div>

        <div className="rounded-2xl border border-glass-border bg-glass-bg p-6 backdrop-blur-xl">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-text-primary">Recent Demo Bookings</h2>
            <Button variant="ghost" size="sm" onClick={() => router.push('/admin/demo-bookings')}>
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          <DataTable
            columns={demoColumns}
            data={recentDemos}
            keyField="id"
            searchable={false}
            pageSize={5}
            loading={loading}
            emptyMessage="No demo bookings yet"
            onRowClick={(item) => router.push('/admin/demo-bookings')}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-glass-border bg-glass-bg p-6 backdrop-blur-xl">
        <h2 className="mb-4 text-lg font-semibold text-text-primary">Quick Actions</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Button variant="secondary" size="md" icon={<Plus className="h-4 w-4" />} onClick={() => router.push('/admin/portfolio')}>
            Add Portfolio Item
          </Button>
          <Button variant="secondary" size="md" icon={<Eye className="h-4 w-4" />} onClick={() => router.push('/admin/blog')}>
            Manage Blog
          </Button>
          <Button variant="secondary" size="md" icon={<ExternalLink className="h-4 w-4" />} onClick={() => window.open('/', '_blank')}>
            View Site
          </Button>
          <Button variant="secondary" size="md" icon={<CalendarCheck className="h-4 w-4" />} onClick={() => router.push('/admin/demo-bookings')}>
            View Bookings
          </Button>
        </div>
      </div>
    </div>
  );
}
