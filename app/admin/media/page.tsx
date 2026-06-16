'use client';

import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Image, Upload, Copy, Trash2, FileType, HardDrive } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDate } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import type { Media } from '@/types';

export default function MediaPage() {
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  async function fetchMedia() {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('media').select('*').order('uploaded_at', { ascending: false });
      if (error) throw error;
      setMedia((data as Media[]) || []);
    } catch (error) {
      console.error('Error fetching media:', error);
      showNotification('error', 'Failed to load media');
    } finally {
      setLoading(false);
    }
  }

  async function uploadFile(file: File) {
    if (!file) return;
    setUploading(true);
    try {
      const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('media')
        .upload(filename, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage.from('media').getPublicUrl(filename);
      const publicUrl = urlData?.publicUrl || '';

      const { error: dbError } = await supabase.from('media').insert({
        filename: file.name,
        url: publicUrl,
        size: file.size,
        type: file.type,
      });

      if (dbError) throw dbError;

      showNotification('success', 'File uploaded successfully');
      fetchMedia();
    } catch (error) {
      console.error('Error uploading file:', error);
      showNotification('error', 'Failed to upload file');
    } finally {
      setUploading(false);
    }
  }

  async function deleteFile(mediaItem: Media) {
    try {
      const path = mediaItem.url.split('/').pop();
      if (path) {
        await supabase.storage.from('media').remove([path]);
      }
      const { error } = await supabase.from('media').delete().eq('id', mediaItem.id);
      if (error) throw error;
      setMedia((prev) => prev.filter((m) => m.id !== mediaItem.id));
      showNotification('success', 'File deleted');
      setDeleteConfirm(null);
    } catch {
      showNotification('error', 'Failed to delete file');
    }
  }

  function copyUrl(url: string) {
    navigator.clipboard.writeText(url);
    showNotification('success', 'URL copied to clipboard');
  }

  function formatSize(bytes: number | null): string {
    if (!bytes) return '-';
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    return `${size.toFixed(1)} ${units[unitIndex]}`;
  }

  function showNotification(type: 'success' | 'error', message: string) {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  const isImageFile = (type: string | null) => type?.startsWith('image/');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Media Library</h1>
          <p className="mt-1 text-sm text-text-secondary">Upload and manage media files</p>
        </div>
        <div>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            className="hidden"
            accept="image/*,video/*,application/pdf"
          />
          <Button
            variant="primary"
            icon={uploading ? undefined : <Upload className="h-4 w-4" />}
            onClick={() => fileInputRef.current?.click()}
            loading={uploading}
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} variant="card" className="aspect-square" />
          ))}
        </div>
      ) : media.length === 0 ? (
        <Card className="p-12 text-center">
          <Image className="mx-auto h-12 w-12 text-text-secondary/40" />
          <p className="mt-4 text-lg font-medium text-text-primary">No media yet</p>
          <p className="mt-1 text-sm text-text-secondary">Upload your first file</p>
          <Button
            variant="primary"
            className="mt-4"
            icon={<Upload className="h-4 w-4" />}
            onClick={() => fileInputRef.current?.click()}
          >
            Upload File
          </Button>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {media.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="group relative overflow-hidden rounded-2xl border border-glass-border bg-glass-bg backdrop-blur-xl transition-all duration-300 hover:border-electric-violet/30"
            >
              <div className="aspect-square overflow-hidden">
                {isImageFile(item.type) ? (
                  <img
                    src={item.url}
                    alt={item.filename}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-bg-secondary">
                    <FileType className="h-12 w-12 text-text-secondary/40" />
                  </div>
                )}
              </div>

              <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/60 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <button
                  onClick={() => copyUrl(item.url)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                  title="Copy URL"
                >
                  <Copy className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setDeleteConfirm(item.id)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/20 text-red-400 backdrop-blur-sm transition-colors hover:bg-red-500/30"
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="p-3">
                <p className="truncate text-sm font-medium text-text-primary">{item.filename}</p>
                <div className="mt-1 flex items-center gap-3 text-xs text-text-secondary">
                  <span className="flex items-center gap-1">
                    <HardDrive className="h-3 w-3" />
                    {formatSize(item.size)}
                  </span>
                  <span>{item.type || 'Unknown'}</span>
                </div>
                <p className="mt-0.5 text-xs text-text-secondary">{formatDate(item.uploaded_at)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
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
                <h3 className="text-lg font-semibold text-text-primary">Delete File</h3>
                <p className="mt-2 text-sm text-text-secondary">Are you sure? This cannot be undone.</p>
                <div className="mt-6 flex justify-center gap-3">
                  <Button variant="ghost" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      const item = media.find((m) => m.id === deleteConfirm);
                      if (item) deleteFile(item);
                    }}
                  >
                    Delete
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
