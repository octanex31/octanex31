'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { CreditCard, X, Plus, Trash2, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import type { Plan } from '@/types';

export default function PricingPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    tagline: '',
    setup_fee: 0,
    monthly_label: '',
    features: [''],
    is_popular: false,
    is_active: true,
    display_order: 0,
  });
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    fetchPlans();
  }, []);

  async function fetchPlans() {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('plans').select('*').order('display_order', { ascending: true });
      if (error) throw error;
      setPlans((data as Plan[]) || []);
    } catch (error) {
      console.error('Error fetching plans:', error);
      showNotification('error', 'Failed to load plans');
    } finally {
      setLoading(false);
    }
  }

  function openEditModal(plan?: Plan) {
    if (plan) {
      setFormData({
        name: plan.name,
        tagline: plan.tagline || '',
        setup_fee: plan.setup_fee,
        monthly_label: plan.monthly_label || '',
        features: plan.features && plan.features.length > 0 ? [...plan.features.map((f) => (typeof f === 'string' ? f : JSON.stringify(f)))] : [''],
        is_popular: plan.is_popular,
        is_active: plan.is_active,
        display_order: plan.display_order,
      });
      setEditingPlan(plan);
    } else {
      setFormData({
        name: '',
        tagline: '',
        setup_fee: 0,
        monthly_label: '',
        features: [''],
        is_popular: false,
        is_active: true,
        display_order: plans.length,
      });
      setEditingPlan(null);
    }
    setEditModalOpen(true);
  }

  async function revalidate() {
    try {
      await fetch('/api/revalidate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ secret: 'admin' }) });
    } catch (e) {
      console.warn('Revalidation request failed (non-blocking):', e);
    }
  }

  async function savePlan() {
    if (!formData.name.trim()) {
      showNotification('error', 'Name is required');
      return;
    }
    try {
      const payload = {
        name: formData.name,
        tagline: formData.tagline || null,
        setup_fee: Number(formData.setup_fee),
        monthly_label: formData.monthly_label || null,
        features: formData.features.filter((f) => f.trim()),
        is_popular: formData.is_popular,
        is_active: formData.is_active,
        display_order: Number(formData.display_order),
      };

      console.log('[Admin Plans] Saving payload:', JSON.stringify(payload));
      if (editingPlan) {
        const { error } = await supabase.from('plans').update(payload).eq('id', editingPlan.id);
        if (error) throw new Error(error.message);
        console.log('[Admin Plans] Updated:', editingPlan.id);
      } else {
        const { error } = await supabase.from('plans').insert(payload);
        if (error) throw new Error(error.message);
        console.log('[Admin Plans] Created');
      }

      showNotification('success', editingPlan ? 'Plan updated' : 'Plan created');
      setEditModalOpen(false);
      await revalidate();
      fetchPlans();
    } catch (error) {
      console.error('[Admin Plans] Save failed:', error);
      showNotification('error', `Failed to save plan: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async function toggleActive(plan: Plan) {
    try {
      console.log('[Admin Plans] Toggling active:', plan.id);
      const { error } = await supabase.from('plans').update({ is_active: !plan.is_active }).eq('id', plan.id);
      if (error) throw new Error(error.message);
      setPlans((prev) => prev.map((p) => (p.id === plan.id ? { ...p, is_active: !p.is_active } : p)));
      showNotification('success', `Plan ${plan.is_active ? 'deactivated' : 'activated'}`);
      await revalidate();
    } catch (error) {
      console.error('[Admin Plans] Toggle active failed:', error);
      showNotification('error', `Failed to toggle status: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async function togglePopular(plan: Plan) {
    try {
      console.log('[Admin Plans] Toggling popular:', plan.id);
      const { error } = await supabase.from('plans').update({ is_popular: !plan.is_popular }).eq('id', plan.id);
      if (error) throw new Error(error.message);
      setPlans((prev) => prev.map((p) => (p.id === plan.id ? { ...p, is_popular: !p.is_popular } : p)));
      showNotification('success', plan.is_popular ? 'Popular tag removed' : 'Marked as popular');
      await revalidate();
    } catch (error) {
      console.error('[Admin Plans] Toggle popular failed:', error);
      showNotification('error', `Failed to update: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  function showNotification(type: 'success' | 'error', message: string) {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-text-primary">Pricing Plans</h1>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} variant="card" className="h-64" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Pricing Plans</h1>
          <p className="mt-1 text-sm text-text-secondary">Manage your subscription plans</p>
        </div>
        <Button variant="primary" icon={<Plus className="h-4 w-4" />} onClick={() => openEditModal()}>
          Add Plan
        </Button>
      </div>

      {plans.length === 0 ? (
        <Card className="p-12 text-center">
          <CreditCard className="mx-auto h-12 w-12 text-text-secondary/40" />
          <p className="mt-4 text-lg font-medium text-text-primary">No plans yet</p>
          <p className="mt-1 text-sm text-text-secondary">Create your first pricing plan</p>
          <Button variant="primary" className="mt-4" icon={<Plus className="h-4 w-4" />} onClick={() => openEditModal()}>
            Add Plan
          </Button>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                'relative rounded-2xl border p-6 backdrop-blur-xl transition-all duration-300',
                plan.is_popular
                  ? 'border-electric-violet/50 bg-electric-violet/5 shadow-[0_0_30px_rgba(212,175,55,0.1)]'
                  : plan.is_active
                    ? 'border-glass-border bg-glass-bg hover:border-electric-violet/30'
                    : 'border-glass-border/40 bg-glass-bg/50 opacity-60',
              )}
            >
              {plan.is_popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-electric-violet px-3 py-1 text-xs font-medium text-white">Popular</span>
                </div>
              )}

              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-text-primary">{plan.name}</h3>
                  {plan.tagline && <p className="mt-0.5 text-sm text-text-secondary">{plan.tagline}</p>}
                </div>
                <Badge variant={plan.is_active ? 'success' : 'default'}>
                  {plan.is_active ? 'Active' : 'Inactive'}
                </Badge>
              </div>

              <div className="mt-4">
                <p className="text-2xl font-bold text-text-primary">{formatPrice(plan.setup_fee)}</p>
                {plan.monthly_label && <p className="text-xs text-text-secondary">{plan.monthly_label}</p>}
              </div>

              {plan.features && plan.features.length > 0 && (
                <div className="mt-4 space-y-1.5">
                  {plan.features.map((f, i) => (
                    <p key={i} className="text-sm text-text-secondary flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-electric-violet" />
                      {typeof f === 'string' ? f : JSON.stringify(f)}
                    </p>
                  ))}
                </div>
              )}

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => openEditModal(plan)}>Edit</Button>
                <Button variant="ghost" size="sm" onClick={() => togglePopular(plan)}>
                  {plan.is_popular ? 'Remove Popular' : 'Mark Popular'}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => toggleActive(plan)}>
                  {plan.is_active ? 'Deactivate' : 'Activate'}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {editModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto"
            onClick={() => setEditModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl my-8"
            >
              <Card className="p-6">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-text-primary">{editingPlan ? 'Edit Plan' : 'Add Plan'}</h3>
                  <button onClick={() => setEditModalOpen(false)} className="text-text-secondary hover:text-text-primary">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <Input label="Plan Name" value={formData.name} onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))} placeholder="e.g. Basic" />
                  <Input label="Tagline" value={formData.tagline} onChange={(e) => setFormData((prev) => ({ ...prev, tagline: e.target.value }))} placeholder="Short tagline" />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input label="Setup Fee (₹)" type="number" value={formData.setup_fee} onChange={(e) => setFormData((prev) => ({ ...prev, setup_fee: Number(e.target.value) }))} />
                    <Input label="Monthly Label" value={formData.monthly_label} onChange={(e) => setFormData((prev) => ({ ...prev, monthly_label: e.target.value }))} placeholder="e.g. ₹999/month" />
                  </div>

                  <Input label="Display Order" type="number" value={formData.display_order} onChange={(e) => setFormData((prev) => ({ ...prev, display_order: Number(e.target.value) }))} />

                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.is_popular}
                        onChange={(e) => setFormData((prev) => ({ ...prev, is_popular: e.target.checked }))}
                        className="h-4 w-4 rounded border-glass-border bg-glass-bg text-electric-violet focus:ring-electric-violet"
                      />
                      <span className="text-sm text-text-secondary">Popular tag</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.is_active}
                        onChange={(e) => setFormData((prev) => ({ ...prev, is_active: e.target.checked }))}
                        className="h-4 w-4 rounded border-glass-border bg-glass-bg text-electric-violet focus:ring-electric-violet"
                      />
                      <span className="text-sm text-text-secondary">Active</span>
                    </label>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <label className="text-sm font-medium text-text-secondary">Features</label>
                      <Button variant="ghost" size="sm" icon={<Plus className="h-3 w-3" />} onClick={() => setFormData((prev) => ({ ...prev, features: [...prev.features, ''] }))}>
                        Add
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {formData.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            value={feature}
                            onChange={(e) => setFormData((prev) => ({ ...prev, features: prev.features.map((f, i) => (i === index ? e.target.value : f)) }))}
                            placeholder="Enter a feature"
                          />
                          {formData.features.length > 1 && (
                            <button onClick={() => setFormData((prev) => ({ ...prev, features: prev.features.filter((_, i) => i !== index) }))} className="text-red-400 hover:text-red-300 flex-shrink-0">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <Button variant="ghost" onClick={() => setEditModalOpen(false)}>Cancel</Button>
                  <Button variant="primary" onClick={savePlan}>{editingPlan ? 'Update' : 'Create'}</Button>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={cn(
              'fixed bottom-6 right-6 z-50 rounded-xl px-5 py-3 text-sm font-medium shadow-lg',
              notification.type === 'success' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30',
            )}
          >
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
