'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { DataTable, defaultActions } from '@/components/admin/data-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Image, X, Plus, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { slugify, formatDate } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import type { PortfolioItem } from '@/types';

export default function PortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    type: 'website' as 'app' | 'website',
    description: '',
    screenshots: [''],
    features: [''],
    benefits: [''],
    user_journey: [''],
    cta_text: '',
    cta_link: '',
    display_order: 0,
  });
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('portfolio').select('*').order('display_order', { ascending: true });
      if (error) throw error;
      setItems((data as PortfolioItem[]) || []);
    } catch (error) {
      console.error('Error fetching portfolio:', error);
      showNotification('error', 'Failed to load portfolio');
    } finally {
      setLoading(false);
    }
  }

  function openEditModal(item?: PortfolioItem) {
    if (item) {
      setFormData({
        title: item.title,
        slug: item.slug,
        type: item.type,
        description: item.description || '',
        screenshots: item.screenshots && item.screenshots.length > 0 ? [...item.screenshots] : [''],
        features: item.features && item.features.length > 0 ? [...item.features] : [''],
        benefits: item.benefits && item.benefits.length > 0 ? [...item.benefits] : [''],
        user_journey: item.user_journey && item.user_journey.length > 0 ? [...item.user_journey] : [''],
        cta_text: item.cta_text || '',
        cta_link: item.cta_link || '',
        display_order: item.display_order,
      });
      setEditingItem(item);
    } else {
      setFormData({
        title: '',
        slug: '',
        type: 'website',
        description: '',
        screenshots: [''],
        features: [''],
        benefits: [''],
        user_journey: [''],
        cta_text: '',
        cta_link: '',
        display_order: items.length,
      });
      setEditingItem(null);
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

  async function saveItem() {
    if (!formData.title.trim() || !formData.slug.trim()) {
      showNotification('error', 'Title and slug are required');
      return;
    }
    try {
      const payload = {
        title: formData.title,
        slug: formData.slug,
        type: formData.type,
        description: formData.description || null,
        screenshots: formData.screenshots.filter((s) => s.trim()),
        features: formData.features.filter((f) => f.trim()),
        benefits: formData.benefits.filter((b) => b.trim()),
        user_journey: formData.user_journey.filter((u) => u.trim()),
        cta_text: formData.cta_text || null,
        cta_link: formData.cta_link || null,
        display_order: Number(formData.display_order),
      };

      console.log('[Admin Portfolio] Saving payload:', JSON.stringify(payload));
      if (editingItem) {
        const { error } = await supabase.from('portfolio').update(payload).eq('id', editingItem.id);
        if (error) throw new Error(error.message);
        console.log('[Admin Portfolio] Updated:', editingItem.id);
      } else {
        const { error } = await supabase.from('portfolio').insert(payload);
        if (error) throw new Error(error.message);
        console.log('[Admin Portfolio] Created');
      }

      showNotification('success', editingItem ? 'Portfolio item updated' : 'Portfolio item created');
      setEditModalOpen(false);
      await revalidate();
      fetchItems();
    } catch (error) {
      console.error('[Admin Portfolio] Save failed:', error);
      showNotification('error', `Failed to save portfolio item: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async function deleteItem(id: string) {
    try {
      console.log('[Admin Portfolio] Deleting:', id);
      const { error } = await supabase.from('portfolio').delete().eq('id', id);
      if (error) throw new Error(error.message);
      setItems((prev) => prev.filter((i) => i.id !== id));
      showNotification('success', 'Portfolio item deleted');
      setDeleteConfirm(null);
      await revalidate();
    } catch (error) {
      console.error('[Admin Portfolio] Delete failed:', error);
      showNotification('error', `Failed to delete item: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  function showNotification(type: 'success' | 'error', message: string) {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  }

  function handleSlugGeneration(title: string) {
    setFormData((prev) => ({ ...prev, title, slug: editingItem ? prev.slug : slugify(title) }));
  }

  const filtered = typeFilter ? items.filter((i) => i.type === typeFilter) : items;

  const columns = [
    { key: 'title', label: 'Title', sortable: true },
    {
      key: 'type',
      label: 'Type',
      sortable: true,
      render: (item: PortfolioItem) => (
        <Badge variant={item.type === 'app' ? 'info' : 'default'}>{item.type}</Badge>
      ),
    },
    { key: 'slug', label: 'Slug', render: (item: PortfolioItem) => <span className="text-text-secondary text-xs">{item.slug}</span> },
    {
      key: 'display_order',
      label: 'Order',
      sortable: true,
      render: (item: PortfolioItem) => item.display_order,
    },
    {
      key: 'created_at',
      label: 'Created',
      sortable: true,
      render: (item: PortfolioItem) => formatDate(item.created_at),
    },
  ];

  const actions = [
    {
      label: 'Edit',
      icon: defaultActions.edit,
      onClick: (item: PortfolioItem) => openEditModal(item),
    },
    {
      label: 'Delete',
      icon: defaultActions.delete,
      onClick: (item: PortfolioItem) => setDeleteConfirm(item.id),
      variant: 'danger' as const,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Portfolio</h1>
          <p className="mt-1 text-sm text-text-secondary">Manage your portfolio items</p>
        </div>
        <Button variant="primary" icon={<Plus className="h-4 w-4" />} onClick={() => openEditModal()}>
          Add Item
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <Select
          options={[
            { value: '', label: 'All Types' },
            { value: 'website', label: 'Website' },
            { value: 'app', label: 'App' },
          ]}
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="w-40"
        />
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        keyField="id"
        searchable={true}
        searchKeys={['title', 'slug', 'description']}
        actions={actions}
        loading={loading}
        emptyMessage="No portfolio items yet"
      />

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
              className="w-full max-w-3xl my-8"
            >
              <Card className="p-6 max-h-[90vh] overflow-y-auto">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-text-primary">
                    {editingItem ? 'Edit Portfolio Item' : 'Add Portfolio Item'}
                  </h3>
                  <button onClick={() => setEditModalOpen(false)} className="text-text-secondary hover:text-text-primary">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input label="Title" value={formData.title} onChange={(e) => handleSlugGeneration(e.target.value)} placeholder="Item title" />
                    <Input label="Slug" value={formData.slug} onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))} placeholder="item-slug" />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Select
                      label="Type"
                      options={[
                        { value: 'website', label: 'Website' },
                        { value: 'app', label: 'App' },
                      ]}
                      value={formData.type}
                      onChange={(e) => setFormData((prev) => ({ ...prev, type: e.target.value as 'app' | 'website' }))}
                    />
                    <Input label="Display Order" type="number" value={formData.display_order} onChange={(e) => setFormData((prev) => ({ ...prev, display_order: Number(e.target.value) }))} />
                  </div>

                  <Textarea label="Description" value={formData.description} onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))} rows={3} />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input label="CTA Text" value={formData.cta_text} onChange={(e) => setFormData((prev) => ({ ...prev, cta_text: e.target.value }))} placeholder="Learn More" />
                    <Input label="CTA Link" value={formData.cta_link} onChange={(e) => setFormData((prev) => ({ ...prev, cta_link: e.target.value }))} placeholder="/contact" />
                  </div>

                      <ArrayInput label="Screenshots (URLs)" values={formData.screenshots} onChange={(v) => setFormData((prev) => ({ ...prev, screenshots: v }))} />
                      <ArrayInput label="Features" values={formData.features} onChange={(v) => setFormData((prev) => ({ ...prev, features: v }))} />
                      <ArrayInput label="Benefits" values={formData.benefits} onChange={(v) => setFormData((prev) => ({ ...prev, benefits: v }))} />
                      <ArrayInput label="User Journey Steps" values={formData.user_journey} onChange={(v) => setFormData((prev) => ({ ...prev, user_journey: v }))} />
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <Button variant="ghost" onClick={() => setEditModalOpen(false)}>Cancel</Button>
                  <Button variant="primary" onClick={saveItem}>{editingItem ? 'Update' : 'Create'}</Button>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        )}

        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setDeleteConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm"
            >
              <Card className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
                  <Trash2 className="h-6 w-6 text-red-400" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary">Delete Portfolio Item</h3>
                <p className="mt-2 text-sm text-text-secondary">Are you sure? This cannot be undone.</p>
                <div className="mt-6 flex justify-center gap-3">
                  <Button variant="ghost" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
                  <Button variant="danger" onClick={() => deleteItem(deleteConfirm)}>Delete</Button>
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

function ArrayInput({ label, values, onChange }: { label: string; values: string[]; onChange: (v: string[]) => void }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-sm font-medium text-text-secondary">{label}</label>
        <Button variant="ghost" size="sm" icon={<Plus className="h-3 w-3" />} onClick={() => onChange([...values, ''])}>
          Add
        </Button>
      </div>
      <div className="space-y-2">
        {values.map((val, index) => (
          <div key={index} className="flex items-center gap-2">
            <Input value={val} onChange={(e) => onChange(values.map((v, i) => (i === index ? e.target.value : v)))} placeholder="Enter value" />
            {values.length > 1 && (
              <button onClick={() => onChange(values.filter((_, i) => i !== index))} className="text-red-400 hover:text-red-300 flex-shrink-0">
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
