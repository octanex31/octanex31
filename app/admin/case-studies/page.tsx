'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { DataTable, defaultActions } from '@/components/admin/data-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, X, Plus, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { slugify, formatDate } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import type { CaseStudy } from '@/types';

export default function CaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingStudy, setEditingStudy] = useState<CaseStudy | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    client_type: '',
    problem: '',
    solution: '',
    results: '',
    screenshots: [''],
    meta_title: '',
    meta_description: '',
    status: 'draft' as 'draft' | 'published',
  });
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  async function fetchCaseStudies() {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('case_studies').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setCaseStudies((data as CaseStudy[]) || []);
    } catch (error) {
      console.error('Error fetching case studies:', error);
      showNotification('error', 'Failed to load case studies');
    } finally {
      setLoading(false);
    }
  }

  function openEditor(study?: CaseStudy) {
    if (study) {
      setFormData({
        title: study.title,
        slug: study.slug,
        client_type: study.client_type || '',
        problem: study.problem || '',
        solution: study.solution || '',
        results: study.results || '',
        screenshots: study.screenshots && study.screenshots.length > 0 ? [...study.screenshots] : [''],
        meta_title: study.meta_title || '',
        meta_description: study.meta_description || '',
        status: study.status,
      });
      setEditingStudy(study);
    } else {
      setFormData({
        title: '',
        slug: '',
        client_type: '',
        problem: '',
        solution: '',
        results: '',
        screenshots: [''],
        meta_title: '',
        meta_description: '',
        status: 'draft',
      });
      setEditingStudy(null);
    }
    setEditorOpen(true);
  }

  async function saveStudy() {
    if (!formData.title.trim() || !formData.slug.trim()) {
      showNotification('error', 'Title and slug are required');
      return;
    }
    try {
      const payload = {
        title: formData.title,
        slug: formData.slug,
        client_type: formData.client_type || null,
        problem: formData.problem || null,
        solution: formData.solution || null,
        results: formData.results || null,
        screenshots: formData.screenshots.filter((s) => s.trim()),
        meta_title: formData.meta_title || null,
        meta_description: formData.meta_description || null,
        status: formData.status,
      };

      if (editingStudy) {
        const { error } = await supabase.from('case_studies').update(payload).eq('id', editingStudy.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('case_studies').insert(payload);
        if (error) throw error;
      }

      showNotification('success', editingStudy ? 'Case study updated' : 'Case study created');
      setEditorOpen(false);
      fetchCaseStudies();
      fetch('/api/revalidate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ secret: 'admin' }) }).catch(() => {});
    } catch (error) {
      console.error('Error saving case study:', error);
      showNotification('error', 'Failed to save case study');
    }
  }

  async function togglePublish(study: CaseStudy) {
    const newStatus = study.status === 'published' ? 'draft' : 'published';
    try {
      const { error } = await supabase.from('case_studies').update({ status: newStatus }).eq('id', study.id);
      if (error) throw error;
      setCaseStudies((prev) => prev.map((s) => (s.id === study.id ? { ...s, status: newStatus } : s)));
      showNotification('success', `Case study ${newStatus === 'published' ? 'published' : 'unpublished'}`);
      fetch('/api/revalidate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ secret: 'admin' }) }).catch(() => {});
    } catch {
      showNotification('error', 'Failed to toggle status');
    }
  }

  async function deleteStudy(id: string) {
    try {
      const { error } = await supabase.from('case_studies').delete().eq('id', id);
      if (error) throw error;
      setCaseStudies((prev) => prev.filter((s) => s.id !== id));
      showNotification('success', 'Case study deleted');
      setDeleteConfirm(null);
      fetch('/api/revalidate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ secret: 'admin' }) }).catch(() => {});
    } catch {
      showNotification('error', 'Failed to delete case study');
    }
  }

  function showNotification(type: 'success' | 'error', message: string) {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  }

  const columns = [
    { key: 'title', label: 'Title', sortable: true },
    { key: 'client_type', label: 'Client Type', sortable: true, render: (item: CaseStudy) => item.client_type || '-' },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (item: CaseStudy) => (
        <Badge variant={item.status === 'published' ? 'success' : 'warning'}>
          {item.status === 'published' ? 'Published' : 'Draft'}
        </Badge>
      ),
    },
    {
      key: 'created_at',
      label: 'Created',
      sortable: true,
      render: (item: CaseStudy) => formatDate(item.created_at),
    },
  ];

  const actions = [
    {
      label: 'Edit',
      icon: defaultActions.edit,
      onClick: (item: CaseStudy) => openEditor(item),
    },
    {
      label: 'Toggle Publish',
      icon: defaultActions.view,
      onClick: (item: CaseStudy) => togglePublish(item),
    },
    {
      label: 'Delete',
      icon: defaultActions.delete,
      onClick: (item: CaseStudy) => setDeleteConfirm(item.id),
      variant: 'danger' as const,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Case Studies</h1>
          <p className="mt-1 text-sm text-text-secondary">Manage case studies</p>
        </div>
        <Button variant="primary" icon={<Plus className="h-4 w-4" />} onClick={() => openEditor()}>
          New Case Study
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={caseStudies}
        keyField="id"
        searchable={true}
        searchKeys={['title', 'client_type']}
        actions={actions}
        loading={loading}
        emptyMessage="No case studies yet"
      />

      <AnimatePresence>
        {editorOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto"
            onClick={() => setEditorOpen(false)}
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
                    {editingStudy ? 'Edit Case Study' : 'New Case Study'}
                  </h3>
                  <button onClick={() => setEditorOpen(false)} className="text-text-secondary hover:text-text-primary">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input
                      label="Title"
                      value={formData.title}
                      onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value, slug: editingStudy ? prev.slug : slugify(e.target.value) }))}
                      placeholder="Case study title"
                    />
                    <Input
                      label="Slug"
                      value={formData.slug}
                      onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                      placeholder="case-study-slug"
                    />
                  </div>

                  <Input
                    label="Client Type"
                    value={formData.client_type}
                    onChange={(e) => setFormData((prev) => ({ ...prev, client_type: e.target.value }))}
                    placeholder="e.g. SaaS Startup, Enterprise"
                  />

                  <Textarea
                    label="Problem"
                    value={formData.problem}
                    onChange={(e) => setFormData((prev) => ({ ...prev, problem: e.target.value }))}
                    rows={3}
                    placeholder="Describe the problem..."
                  />

                  <Textarea
                    label="Solution"
                    value={formData.solution}
                    onChange={(e) => setFormData((prev) => ({ ...prev, solution: e.target.value }))}
                    rows={3}
                    placeholder="Describe the solution..."
                  />

                  <Textarea
                    label="Results"
                    value={formData.results}
                    onChange={(e) => setFormData((prev) => ({ ...prev, results: e.target.value }))}
                    rows={3}
                    placeholder="Describe the results..."
                  />

                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <label className="text-sm font-medium text-text-secondary">Screenshots (URLs)</label>
                      <Button variant="ghost" size="sm" icon={<Plus className="h-3 w-3" />} onClick={() => setFormData((prev) => ({ ...prev, screenshots: [...prev.screenshots, ''] }))}>
                        Add
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {formData.screenshots.map((url, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            value={url}
                            onChange={(e) => setFormData((prev) => ({ ...prev, screenshots: prev.screenshots.map((s, i) => (i === index ? e.target.value : s)) }))}
                            placeholder="https://..."
                          />
                          {formData.screenshots.length > 1 && (
                            <button onClick={() => setFormData((prev) => ({ ...prev, screenshots: prev.screenshots.filter((_, i) => i !== index) }))} className="text-red-400 hover:text-red-300 flex-shrink-0">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-glass-border pt-4">
                    <h4 className="mb-3 text-sm font-medium text-text-secondary">SEO</h4>
                    <Input
                      label="Meta Title"
                      value={formData.meta_title}
                      onChange={(e) => setFormData((prev) => ({ ...prev, meta_title: e.target.value }))}
                      placeholder="SEO title"
                    />
                    <Textarea
                      label="Meta Description"
                      value={formData.meta_description}
                      onChange={(e) => setFormData((prev) => ({ ...prev, meta_description: e.target.value }))}
                      rows={2}
                      placeholder="SEO description..."
                    />
                  </div>

                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="status"
                        checked={formData.status === 'draft'}
                        onChange={() => setFormData((prev) => ({ ...prev, status: 'draft' }))}
                        className="h-4 w-4 border-glass-border bg-glass-bg text-electric-violet focus:ring-electric-violet"
                      />
                      <span className="text-sm text-text-secondary">Draft</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="status"
                        checked={formData.status === 'published'}
                        onChange={() => setFormData((prev) => ({ ...prev, status: 'published' }))}
                        className="h-4 w-4 border-glass-border bg-glass-bg text-electric-violet focus:ring-electric-violet"
                      />
                      <span className="text-sm text-text-secondary">Published</span>
                    </label>
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <Button variant="ghost" onClick={() => setEditorOpen(false)}>Cancel</Button>
                  <Button variant="primary" onClick={saveStudy}>
                    {editingStudy ? 'Update' : 'Create'}
                  </Button>
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
                <h3 className="text-lg font-semibold text-text-primary">Delete Case Study</h3>
                <p className="mt-2 text-sm text-text-secondary">Are you sure? This cannot be undone.</p>
                <div className="mt-6 flex justify-center gap-3">
                  <Button variant="ghost" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
                  <Button variant="danger" onClick={() => deleteStudy(deleteConfirm)}>Delete</Button>
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
