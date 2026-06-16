'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { formatDate, calculateReadingTime, truncate } from '@/lib/utils';
import type { BlogPost } from '@/types';

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

function BlogCard({ post, index = 0 }: BlogCardProps) {
  const readingTime = post.reading_time ?? calculateReadingTime(post.content);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group block overflow-hidden rounded-2xl border border-glass-border bg-glass-bg backdrop-blur-xl transition-all duration-500 hover:border-electric-violet/40 hover:shadow-[0_0_40px_rgba(212,175,55,0.15)]"
      >
        <div className="aspect-video overflow-hidden bg-bg-secondary">
          {post.cover_image_url ? (
            <img
              src={post.cover_image_url}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-electric-violet/10 to-cyan/10">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-electric-violet/10 text-electric-violet">
                <User className="h-6 w-6" />
              </div>
            </div>
          )}
        </div>

        <div className="p-5">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            {post.category && (
              <Badge variant="default">{post.category}</Badge>
            )}
            <div className="flex items-center gap-1.5 text-xs text-text-secondary">
              <Calendar className="h-3 w-3" />
              {post.published_at
                ? formatDate(post.published_at)
                : 'Draft'}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-text-secondary">
              <Clock className="h-3 w-3" />
              {readingTime} min read
            </div>
          </div>

          <h3 className="mb-2 text-lg font-semibold leading-tight text-text-primary transition-colors group-hover:text-violet-light">
            {post.title}
          </h3>

          {post.excerpt && (
            <p className="mb-4 text-sm leading-relaxed text-text-secondary line-clamp-2">
              {truncate(post.excerpt, 120)}
            </p>
          )}

          <div className="inline-flex items-center gap-1 text-sm font-medium text-violet-light transition-colors group-hover:text-cyan">
            Read More
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export { BlogCard };
