'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatDate, cn } from '@/lib/utils';
import type { BlogPost } from '@/types';

interface BlogSidebarProps {
  categories?: string[];
  tags?: string[];
  recentPosts?: BlogPost[];
}

const defaultCategories = [
  'App Development',
  'Web Development',
  'AI & Machine Learning',
  'Digital Marketing',
  'SEO Tips',
  'Business Growth',
  'Technology',
  'Case Studies',
];

const defaultTags = [
  'react',
  'nextjs',
  'tailwindcss',
  'ai',
  'mobile',
  'web',
  'seo',
  'marketing',
  'startup',
  'design',
  'framer-motion',
  'typescript',
];

function BlogSidebar({
  categories,
  tags,
  recentPosts,
}: BlogSidebarProps) {
  const [fetchedCategories, setFetchedCategories] = useState<string[] | null>(
    null,
  );
  const [fetchedTags, setFetchedTags] = useState<string[] | null>(null);
  const [fetchedRecent, setFetchedRecent] = useState<BlogPost[] | null>(null);

  useEffect(() => {
    async function fetchSidebar() {
      try {
        const { supabase } = await import('@/lib/supabase');
        const { data: posts } = await supabase
          .from('blog_posts')
          .select('category, tags, id, title, slug, published_at, cover_image_url')
          .eq('status', 'published')
          .order('published_at', { ascending: false })
          .limit(5);
        if (posts) {
          const cats = Array.from(
            new Set(posts.map((p) => p.category).filter(Boolean)),
          ) as string[];
          const tg = Array.from(
            new Set(posts.flatMap((p) => p.tags || [])),
          ) as string[];
          if (cats.length > 0) setFetchedCategories(cats);
          if (tg.length > 0) setFetchedTags(tg);
          setFetchedRecent(posts as BlogPost[]);
        }
      } catch {
        // Use defaults
      }
    }
    fetchSidebar();
    const interval = setInterval(fetchSidebar, 30000);
    return () => clearInterval(interval);
  }, []);

  const displayCategories = fetchedCategories || categories || defaultCategories;
  const displayTags = fetchedTags || tags || defaultTags;
  const displayRecent =
    fetchedRecent || recentPosts || [];

  return (
    <aside className="flex flex-col gap-8">
      {displayCategories.length > 0 && (
        <div className="rounded-2xl border border-glass-border bg-glass-bg p-5 backdrop-blur-xl">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-primary">
            Categories
          </h3>
          <ul className="flex flex-col gap-1.5">
            {displayCategories.map((cat) => (
              <li key={cat}>
                <Link
                  href={`/blog?category=${encodeURIComponent(cat)}`}
                  className="block rounded-lg px-3 py-2 text-sm text-text-secondary transition-all hover:bg-electric-violet/10 hover:text-violet-light"
                >
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {displayRecent.length > 0 && (
        <div className="rounded-2xl border border-glass-border bg-glass-bg p-5 backdrop-blur-xl">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-primary">
            Recent Posts
          </h3>
          <ul className="flex flex-col gap-4">
            {displayRecent.slice(0, 4).map((post) => (
              <li key={post.id}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex items-start gap-3"
                >
                  <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-bg-secondary">
                    {post.cover_image_url ? (
                      <img
                        src={post.cover_image_url}
                        alt={post.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-electric-violet/10 text-xs text-electric-violet">
                        N
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-text-primary transition-colors group-hover:text-violet-light line-clamp-2">
                      {post.title}
                    </p>
                    {post.published_at && (
                      <p className="mt-0.5 text-xs text-text-secondary">
                        {formatDate(post.published_at)}
                      </p>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {displayTags.length > 0 && (
        <div className="rounded-2xl border border-glass-border bg-glass-bg p-5 backdrop-blur-xl">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-primary">
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {displayTags.map((tag) => (
              <Link
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
              >
                <Badge
                  variant="default"
                  className="cursor-pointer transition-colors hover:bg-electric-violet/25"
                >
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}

export { BlogSidebar };
