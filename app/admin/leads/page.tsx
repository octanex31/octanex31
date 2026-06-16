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
import { Users, Search, Plus, X, StickyNote, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDate } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import type { Lead } from '@/types';

const statusOptions = [
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'qualified', label: 'Qualified' },
  { value: 'closed', label: 'Closed' },
];

const statusColors: Record<string, 'default' | 'info' | 'success' | 'warning' | 'danger'> = {
  new: 'default',
  contacted: 'info',
  qualified: 'success',
  closed: 'warning',
};

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [notesModalOpen, setNotesModalOpen] = useState(false);
  const [notesText, setNotesText] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  async function fetchLeads() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setLeads((data as Lead[]) || []);
    } catch (error) {
      console.error('Error fetching leads:', error);
      showNotification('error', 'Failed to load leads');
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(leadId: string, status: string) {
    try {
      const { error } = await supabase.from('leads').update({ status }).eq('id', leadId);
      if (error) throw error;
      setLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, status: status as Lead['status'] } : l)));
      showNotification('success', 'Status updated');
    } catch {
      showNotification('error', 'Failed to update status');
    }
  }

  async function saveNotes() {
    if (!selectedLead) return;
    try {
      const { error } = await supabase.from('leads').update({ notes: notesText }).eq('id', selectedLead.id);
      if (error) throw error;
      setLeads((prev) => prev.map((l) => (l.id === selectedLead.id ? { ...l, notes: notesText } : l)));
      showNotification('success', 'Notes saved');
      setNotesModalOpen(false);
      setSelectedLead(null);
    } catch {
      showNotification('error', 'Failed to save notes');
    }
  }

  async function deleteLead(id: string) {
    try {
      const { error } = await supabase.from('leads').delete().eq('id', id);
      if (error) throw error;
      setLeads((prev) => prev.filter((l) => l.id !== id));
      showNotification('success', 'Lead deleted');
      setDeleteConfirm(null);
    } catch {
      showNotification('error', 'Failed to delete lead');
    }
  }

  function showNotification(type: 'success' | 'error', message: string) {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  }

  function openNotesModal(lead: Lead) {
    setSelectedLead(lead);
    setNotesText(lead.notes || '');
    setNotesModalOpen(true);
  }

  const filteredLeads = leads.filter((lead) => {
    if (statusFilter && lead.status !== statusFilter) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      if (!lead.name.toLowerCase().includes(q) && !lead.email.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'phone', label: 'Phone', sortable: true, render: (item: Lead) => item.phone || '-' },
    {
      key: 'service_interest',
      label: 'Service',
      sortable: true,
      render: (item: Lead) => item.service_interest || '-',
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (item: Lead) => (
        <Select
          options={statusOptions}
          value={item.status}
          onChange={(e) => updateStatus(item.id, e.target.value)}
          className="w-32"
        />
      ),
    },
    {
      key: 'created_at',
      label: 'Date',
      sortable: true,
      render: (item: Lead) => formatDate(item.created_at),
    },
    {
      key: 'notes',
      label: 'Notes',
      render: (item: Lead) => (
        <button
          onClick={(e) => { e.stopPropagation(); openNotesModal(item); }}
          className="flex items-center gap-1 text-xs text-text-secondary hover:text-electric-violet transition-colors"
        >
          <StickyNote className="h-3.5 w-3.5" />
          {item.notes ? 'View' : 'Add'}
        </button>
      ),
    },
  ];

  const actions = [
    {
      label: 'Delete',
      icon: defaultActions.delete,
      onClick: (item: Lead) => setDeleteConfirm(item.id),
      variant: 'danger' as const,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Leads</h1>
          <p className="mt-1 text-sm text-text-secondary">Manage all incoming leads</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="w-full sm:w-64">
          <Input
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<Search className="h-4 w-4" />}
          />
        </div>
        <Select
          options={[{ value: '', label: 'All Statuses' }, ...statusOptions]}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-40"
        />
      </div>

      <DataTable
        columns={columns}
        data={filteredLeads}
        keyField="id"
        searchable={false}
        actions={actions}
        loading={loading}
        emptyMessage="No leads found"
      />

      <AnimatePresence>
        {notesModalOpen && selectedLead && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setNotesModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg"
            >
              <Card className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-text-primary">Notes for {selectedLead.name}</h3>
                  <button onClick={() => setNotesModalOpen(false)} className="text-text-secondary hover:text-text-primary">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <Textarea
                  label="Notes"
                  value={notesText}
                  onChange={(e) => setNotesText(e.target.value)}
                  rows={5}
                  placeholder="Add notes about this lead..."
                />
                <div className="mt-4 flex justify-end gap-3">
                  <Button variant="ghost" onClick={() => setNotesModalOpen(false)}>Cancel</Button>
                  <Button variant="primary" onClick={saveNotes}>Save Notes</Button>
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
                <h3 className="text-lg font-semibold text-text-primary">Delete Lead</h3>
                <p className="mt-2 text-sm text-text-secondary">Are you sure you want to delete this lead? This action cannot be undone.</p>
                <div className="mt-6 flex justify-center gap-3">
                  <Button variant="ghost" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
                  <Button variant="danger" onClick={() => deleteLead(deleteConfirm)}>Delete</Button>
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
