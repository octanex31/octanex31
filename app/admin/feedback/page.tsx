'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { DataTable, defaultActions } from '@/components/admin/data-table';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, X, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDate, truncate } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import type { Feedback } from '@/types';

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Feedback | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    fetchFeedback();
  }, []);

  async function fetchFeedback() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('feedback')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setFeedback((data as Feedback[]) || []);
    } catch (error) {
      console.error('Error fetching feedback:', error);
      showNotification('error', 'Failed to load messages');
    } finally {
      setLoading(false);
    }
  }

  async function deleteFeedback(id: string) {
    try {
      const { error } = await supabase.from('feedback').delete().eq('id', id);
      if (error) throw error;
      setFeedback((prev) => prev.filter((f) => f.id !== id));
      showNotification('success', 'Message deleted');
      setDeleteConfirm(null);
    } catch {
      showNotification('error', 'Failed to delete message');
    }
  }

  function showNotification(type: 'success' | 'error', message: string) {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  }

  const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    {
      key: 'message',
      label: 'Message',
      sortable: true,
      render: (item: Feedback) => (
        <button
          onClick={(e) => { e.stopPropagation(); setSelectedMessage(item); }}
          className="text-left text-text-secondary hover:text-electric-violet transition-colors"
        >
          {truncate(item.message, 60)}
        </button>
      ),
    },
    {
      key: 'created_at',
      label: 'Date',
      sortable: true,
      render: (item: Feedback) => formatDate(item.created_at),
    },
  ];

  const actions = [
    {
      label: 'Delete',
      icon: defaultActions.delete,
      onClick: (item: Feedback) => setDeleteConfirm(item.id),
      variant: 'danger' as const,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Feedback & Messages</h1>
        <p className="mt-1 text-sm text-text-secondary">View messages from site visitors</p>
      </div>

      <DataTable
        columns={columns}
        data={feedback}
        keyField="id"
        searchable={true}
        searchKeys={['name', 'email', 'message']}
        actions={actions}
        loading={loading}
        emptyMessage="No messages yet"
      />

      <AnimatePresence>
        {selectedMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setSelectedMessage(null)}
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
                  <h3 className="text-lg font-semibold text-text-primary">Message from {selectedMessage.name}</h3>
                  <button onClick={() => setSelectedMessage(null)} className="text-text-secondary hover:text-text-primary">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="mb-4 space-y-2">
                  <p className="text-sm text-text-secondary">
                    <span className="font-medium text-text-primary">Email:</span> {selectedMessage.email}
                  </p>
                  <p className="text-sm text-text-secondary">
                    <span className="font-medium text-text-primary">Date:</span> {formatDate(selectedMessage.created_at)}
                  </p>
                </div>
                <div className="rounded-xl border border-glass-border bg-bg-secondary p-4">
                  <p className="text-sm text-text-primary whitespace-pre-wrap">{selectedMessage.message}</p>
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
                <h3 className="text-lg font-semibold text-text-primary">Delete Message</h3>
                <p className="mt-2 text-sm text-text-secondary">Are you sure you want to delete this message?</p>
                <div className="mt-6 flex justify-center gap-3">
                  <Button variant="ghost" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
                  <Button variant="danger" onClick={() => deleteFeedback(deleteConfirm)}>Delete</Button>
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
