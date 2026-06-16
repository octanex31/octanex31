'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Briefcase, X, Plus, Trash2, GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import type { Service } from '@/types';

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    setup_fee: 0,
    features: [''],
    is_active: true,
    display_order: 0,
  });
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  async function fetchServices() {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('services').select('*').order('display_order', { ascending: true });
      if (error) throw error;
      setServices((data as Service[]) || []);
    } catch (error) {
      console.error('Error fetching services:', error);
      showNotification('error', 'Failed to load services');
    } finally {
      setLoading(false);
    }
  }

  function openEditModal(service?: Service) {
    if (service) {
      setFormData({
        name: service.name,
        description: service.description || '',
        setup_fee: service.setup_fee,
        features: service.features && service.features.length > 0 ? [...service.features] : [''],
        is_active: service.is_active,
        display_order: service.display_order,
      });
      setEditingService(service);
    } else {
      setFormData({
        name: '',
        description: '',
        setup_fee: 0,
        features: [''],
        is_active: true,
        display_order: services.length,
      });
      setEditingService(null);
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

  async function saveService() {
    if (!formData.name.trim()) {
      showNotification('error', 'Name is required');
      return;
    }
    try {
      const payload = {
        name: formData.name,
        description: formData.description || null,
        setup_fee: Number(formData.setup_fee),
        features: formData.features.filter((f) => f.trim()),
        is_active: formData.is_active,
        display_order: Number(formData.display_order),
      };

      console.log('[Admin Services] Saving service payload:', JSON.stringify(payload));
      if (editingService) {
        const { error } = await supabase.from('services').update(payload).eq('id', editingService.id);
        if (error) throw new Error(error.message);
        console.log('[Admin Services] Service updated successfully:', editingService.id);
      } else {
        const { error } = await supabase.from('services').insert(payload);
        if (error) throw new Error(error.message);
        console.log('[Admin Services] Service created successfully');
      }

      showNotification('success', editingService ? 'Service updated' : 'Service created');
      setEditModalOpen(false);
      await revalidate();
      fetchServices();
    } catch (error) {
      console.error('[Admin Services] Save failed:', error);
      showNotification('error', `Failed to save service: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async function toggleActive(service: Service) {
    try {
      console.log('[Admin Services] Toggling active state for:', service.id);
      const { error } = await supabase.from('services').update({ is_active: !service.is_active }).eq('id', service.id);
      if (error) throw new Error(error.message);
      setServices((prev) => prev.map((s) => (s.id === service.id ? { ...s, is_active: !s.is_active } : s)));
      showNotification('success', `Service ${service.is_active ? 'deactivated' : 'activated'}`);
      await revalidate();
    } catch (error) {
      console.error('[Admin Services] Toggle failed:', error);
      showNotification('error', `Failed to toggle status: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  function showNotification(type: 'success' | 'error', message: string) {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  }

  function addFeature() {
    setFormData((prev) => ({ ...prev, features: [...prev.features, ''] }));
  }

  function removeFeature(index: number) {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  }

  function updateFeature(index: number, value: string) {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.map((f, i) => (i === index ? value : f)),
    }));
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-text-primary">Services</h1>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} variant="card" className="h-48" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Services</h1>
          <p className="mt-1 text-sm text-text-secondary">Manage your service offerings</p>
        </div>
        <Button variant="primary" icon={<Plus className="h-4 w-4" />} onClick={() => openEditModal()}>
          Add Service
        </Button>
      </div>

      {services.length === 0 ? (
        <Card className="p-12 text-center">
          <Briefcase className="mx-auto h-12 w-12 text-text-secondary/40" />
          <p className="mt-4 text-lg font-medium text-text-primary">No services yet</p>
          <p className="mt-1 text-sm text-text-secondary">Create your first service to get started</p>
          <Button variant="primary" className="mt-4" icon={<Plus className="h-4 w-4" />} onClick={() => openEditModal()}>
            Add Service
          </Button>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                'rounded-2xl border p-6 backdrop-blur-xl transition-all duration-300',
                service.is_active
                  ? 'border-glass-border bg-glass-bg hover:border-electric-violet/30'
                  : 'border-glass-border/40 bg-glass-bg/50 opacity-60',
              )}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-text-primary">{service.name}</h3>
                  <p className="mt-1 text-sm text-text-secondary line-clamp-2">{service.description || 'No description'}</p>
                </div>
                <Badge variant={service.is_active ? 'success' : 'default'}>
                  {service.is_active ? 'Active' : 'Inactive'}
                </Badge>
              </div>

              <div className="mt-4">
                <p className="text-sm text-text-secondary">
                  Setup Fee: <span className="font-medium text-text-primary">{formatPrice(service.setup_fee)}</span>
                </p>
                {service.features && service.features.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {service.features.slice(0, 3).map((f, i) => (
                      <span key={i} className="rounded-full bg-electric-violet/10 px-2 py-0.5 text-xs text-violet-light">
                        {f}
                      </span>
                    ))}
                    {service.features.length > 3 && (
                      <span className="text-xs text-text-secondary">+{service.features.length - 3} more</span>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-4 flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => openEditModal(service)}>Edit</Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleActive(service)}
                >
                  {service.is_active ? 'Deactivate' : 'Activate'}
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
                  <h3 className="text-lg font-semibold text-text-primary">
                    {editingService ? 'Edit Service' : 'Add Service'}
                  </h3>
                  <button onClick={() => setEditModalOpen(false)} className="text-text-secondary hover:text-text-primary">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <Input
                    label="Name"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Service name"
                  />
                  <Textarea
                    label="Description"
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Service description"
                    rows={3}
                  />
                  <Input
                    label="Setup Fee (₹)"
                    type="number"
                    value={formData.setup_fee}
                    onChange={(e) => setFormData((prev) => ({ ...prev, setup_fee: Number(e.target.value) }))}
                  />
                  <Input
                    label="Display Order"
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData((prev) => ({ ...prev, display_order: Number(e.target.value) }))}
                  />

                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <label className="text-sm font-medium text-text-secondary">Features</label>
                      <Button variant="ghost" size="sm" icon={<Plus className="h-3 w-3" />} onClick={addFeature}>
                        Add
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {formData.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            value={feature}
                            onChange={(e) => updateFeature(index, e.target.value)}
                            placeholder="Enter a feature"
                          />
                          {formData.features.length > 1 && (
                            <button
                              onClick={() => removeFeature(index)}
                              className="text-red-400 hover:text-red-300 flex-shrink-0"
                            >
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
                  <Button variant="primary" onClick={saveService}>
                    {editingService ? 'Update' : 'Create'}
                  </Button>
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
