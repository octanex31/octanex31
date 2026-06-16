'use client';

import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { DataTable, defaultActions } from '@/components/admin/data-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RichTextEditor, type RichTextEditorHandle } from '@/components/admin/rich-text-editor';
import { FileText, X, Plus, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { slugify, formatDate, calculateReadingTime } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import type { BlogPost } from '@/types';

export default function BlogPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const editorRef = useRef<RichTextEditorHandle>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    cover_image_url: '',
    category: '',
    tags: '',
    meta_title: '',
    meta_description: '',
    og_image_url: '',
    status: 'draft' as 'draft' | 'published',
  });
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setPosts((data as BlogPost[]) || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
      showNotification('error', 'Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  }

  function openEditor(post?: BlogPost) {
    if (post) {
      setFormData({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt || '',
        cover_image_url: post.cover_image_url || '',
        category: post.category || '',
        tags: (post.tags || []).join(', '),
        meta_title: post.meta_title || '',
        meta_description: post.meta_description || '',
        og_image_url: post.og_image_url || '',
        status: post.status,
      });
      setEditingPost(post);
    } else {
      setFormData({
        title: '',
        slug: '',
        excerpt: '',
        cover_image_url: '',
        category: '',
        tags: '',
        meta_title: '',
        meta_description: '',
        og_image_url: '',
        status: 'draft',
      });
      setEditingPost(null);
    }
    setEditorOpen(true);
    // Content is set via the RichTextEditor ref after render
    setTimeout(() => {
      if (post && editorRef.current) {
        editorRef.current.setContent(post.content || '');
      } else if (editorRef.current) {
        editorRef.current.setContent('');
      }
    }, 100);
  }

  async function savePost() {
    if (!formData.title.trim() || !formData.slug.trim()) {
      showNotification('error', 'Title and slug are required');
      return;
    }
    try {
      const content = editorRef.current?.getContent() || '';
      const payload = {
        title: formData.title,
        slug: formData.slug,
        content: content || null,
        excerpt: formData.excerpt || null,
        cover_image_url: formData.cover_image_url || null,
        category: formData.category || null,
        tags: formData.tags.split(',').map((t) => t.trim()).filter(Boolean),
        meta_title: formData.meta_title || null,
        meta_description: formData.meta_description || null,
        og_image_url: formData.og_image_url || null,
        status: formData.status,
        reading_time: calculateReadingTime(content),
        published_at: formData.status === 'published' && !editingPost?.published_at ? new Date().toISOString() : editingPost?.published_at || null,
      };

      if (editingPost) {
        const { error } = await supabase.from('blog_posts').update(payload).eq('id', editingPost.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('blog_posts').insert({
          ...payload,
          published_at: formData.status === 'published' ? new Date().toISOString() : null,
        });
        if (error) throw error;
      }

      showNotification('success', editingPost ? 'Post updated' : 'Post created');
      setEditorOpen(false);
      fetchPosts();
      fetch('/api/revalidate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ secret: 'admin' }) }).catch(() => {});
    } catch (error) {
      console.error('Error saving post:', error);
      showNotification('error', 'Failed to save post');
    }
  }

  async function togglePublish(post: BlogPost) {
    const newStatus = post.status === 'published' ? 'draft' : 'published';
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({
          status: newStatus,
          published_at: newStatus === 'published' ? new Date().toISOString() : post.published_at,
        })
        .eq('id', post.id);
      if (error) throw error;
      setPosts((prev) => prev.map((p) => (p.id === post.id ? { ...p, status: newStatus } : p)));
      showNotification('success', `Post ${newStatus === 'published' ? 'published' : 'unpublished'}`);
      fetch('/api/revalidate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ secret: 'admin' }) }).catch(() => {});
    } catch {
      showNotification('error', 'Failed to toggle status');
    }
  }

  async function deletePost(id: string) {
    try {
      const { error } = await supabase.from('blog_posts').delete().eq('id', id);
      if (error) throw error;
      setPosts((prev) => prev.filter((p) => p.id !== id));
      showNotification('success', 'Post deleted');
      setDeleteConfirm(null);
      fetch('/api/revalidate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ secret: 'admin' }) }).catch(() => {});
    } catch {
      showNotification('error', 'Failed to delete post');
    }
  }

  function showNotification(type: 'success' | 'error', message: string) {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  }

  const columns = [
    { key: 'title', label: 'Title', sortable: true },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (item: BlogPost) => (
        <Badge variant={item.status === 'published' ? 'success' : 'warning'}>
          {item.status === 'published' ? 'Published' : 'Draft'}
        </Badge>
      ),
    },
    { key: 'category', label: 'Category', render: (item: BlogPost) => item.category || '-' },
    {
      key: 'reading_time',
      label: 'Read Time',
      render: (item: BlogPost) => (item.reading_time ? `${item.reading_time} min` : '-'),
    },
    {
      key: 'created_at',
      label: 'Created',
      sortable: true,
      render: (item: BlogPost) => formatDate(item.created_at),
    },
  ];

  const actions = [
    {
      label: 'Edit',
      icon: defaultActions.edit,
      onClick: (item: BlogPost) => openEditor(item),
    },
    {
      label: editingPost?.status === 'published' ? 'Unpublish' : 'Publish',
      icon: defaultActions.view,
      onClick: (item: BlogPost) => togglePublish(item),
    },
    {
      label: 'Delete',
      icon: defaultActions.delete,
      onClick: (item: BlogPost) => setDeleteConfirm(item.id),
      variant: 'danger' as const,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Blog</h1>
          <p className="mt-1 text-sm text-text-secondary">Manage blog posts</p>
        </div>
        <Button variant="primary" icon={<Plus className="h-4 w-4" />} onClick={() => openEditor()}>
          New Post
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={posts}
        keyField="id"
        searchable={true}
        searchKeys={['title', 'category', 'excerpt']}
        actions={actions}
        loading={loading}
        emptyMessage="No blog posts yet"
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
              className="w-full max-w-4xl my-8"
            >
              <Card className="p-6 max-h-[90vh] overflow-y-auto">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-text-primary">
                    {editingPost ? 'Edit Post' : 'New Post'}
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
                      onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value, slug: editingPost ? prev.slug : slugify(e.target.value) }))}
                      placeholder="Post title"
                    />
                    <Input
                      label="Slug"
                      value={formData.slug}
                      onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                      placeholder="post-slug"
                    />
                  </div>

                  <Textarea
                    label="Excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
                    rows={2}
                    placeholder="Brief excerpt..."
                  />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input
                      label="Cover Image URL"
                      value={formData.cover_image_url}
                      onChange={(e) => setFormData((prev) => ({ ...prev, cover_image_url: e.target.value }))}
                      placeholder="https://..."
                    />
                    <Input
                      label="Category"
                      value={formData.category}
                      onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                      placeholder="e.g. Technology"
                    />
                  </div>

                  <Input
                    label="Tags (comma separated)"
                    value={formData.tags}
                    onChange={(e) => setFormData((prev) => ({ ...prev, tags: e.target.value }))}
                    placeholder="react, nextjs, saas"
                  />

                  <div>
                    <label className="mb-2 block text-sm font-medium text-text-secondary">Content</label>
                    <RichTextEditor
                      ref={editorRef}
                      placeholder="Write your blog post content here..."
                    />
                  </div>

                  <div className="border-t border-glass-border pt-4">
                    <h4 className="mb-3 text-sm font-medium text-text-secondary">SEO Settings</h4>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Input
                        label="Meta Title"
                        value={formData.meta_title}
                        onChange={(e) => setFormData((prev) => ({ ...prev, meta_title: e.target.value }))}
                        placeholder="SEO title"
                      />
                      <Input
                        label="OG Image URL"
                        value={formData.og_image_url}
                        onChange={(e) => setFormData((prev) => ({ ...prev, og_image_url: e.target.value }))}
                        placeholder="https://..."
                      />
                    </div>
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
                      <span className="text-sm text-text-secondary">Save as Draft</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="status"
                        checked={formData.status === 'published'}
                        onChange={() => setFormData((prev) => ({ ...prev, status: 'published' }))}
                        className="h-4 w-4 border-glass-border bg-glass-bg text-electric-violet focus:ring-electric-violet"
                      />
                      <span className="text-sm text-text-secondary">Publish</span>
                    </label>
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <Button variant="ghost" onClick={() => setEditorOpen(false)}>Cancel</Button>
                  <Button variant="primary" onClick={savePost}>
                    {editingPost ? 'Update' : 'Create'}
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
                <h3 className="text-lg font-semibold text-text-primary">Delete Post</h3>
                <p className="mt-2 text-sm text-text-secondary">Are you sure? This cannot be undone.</p>
                <div className="mt-6 flex justify-center gap-3">
                  <Button variant="ghost" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
                  <Button variant="danger" onClick={() => deletePost(deleteConfirm)}>Delete</Button>
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
