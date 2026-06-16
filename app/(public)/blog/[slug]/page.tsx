import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getServiceSupabase } from '@/lib/supabase-server';
import { formatDate, calculateReadingTime } from '@/lib/utils';
import { Section } from '@/components/ui/section';
import { Button } from '@/components/ui/button';
import { BlogCard } from '@/components/blog/blog-card';
import { Badge } from '@/components/ui/badge';

export const dynamic = 'force-dynamic';
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Share2,
  Twitter,
  Facebook,
  Linkedin,
  Link as LinkIcon,
} from 'lucide-react';
import type { BlogPost } from '@/types';

interface Props {
  params: { slug: string };
}

async function getPost(slug: string): Promise<BlogPost | null> {
  const supabase = getServiceSupabase();
  const { data } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();
  return data as BlogPost | null;
}

async function getRelated(category: string | null, currentId: string): Promise<BlogPost[]> {
  if (!category) return [];
  const supabase = getServiceSupabase();
  const { data } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')
    .eq('category', category)
    .neq('id', currentId)
    .order('published_at', { ascending: false })
    .limit(3);
  return (data as BlogPost[]) ?? [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return { title: 'Not Found | OctaNex31' };
  return {
    title: post.meta_title || `${post.title} | OctaNex31 Blog`,
    description: post.meta_description || post.excerpt || '',
    alternates: { canonical: `/blog/${params.slug}` },
    openGraph: {
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt || '',
      images: post.og_image_url || post.cover_image_url ? [{ url: post.og_image_url || post.cover_image_url! }] : [],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  const related = await getRelated(post.category, post.id);
  const readingTime = post.reading_time ?? calculateReadingTime(post.content);

  const shareUrl = `https://octanex31.vercel.app/blog/${post.slug}`;

  return (
    <>
      <article className="relative pt-28 pb-12 sm:pt-32">
        <div className="absolute inset-0 bg-gradient-radial from-electric-violet/10 via-transparent to-transparent" />
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-text-secondary transition-colors hover:text-violet-light"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          <div className="mx-auto max-w-3xl">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              {post.category && <Badge variant="info">{post.category}</Badge>}
              <div className="flex items-center gap-1.5 text-sm text-text-secondary">
                <Calendar className="h-4 w-4" />
                {post.published_at ? formatDate(post.published_at) : 'Draft'}
              </div>
              <div className="flex items-center gap-1.5 text-sm text-text-secondary">
                <Clock className="h-4 w-4" />
                {readingTime} min read
              </div>
            </div>

            <h1 className="mb-6 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl text-text-primary">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="mb-8 text-lg text-text-secondary">{post.excerpt}</p>
            )}

            <div className="mb-8 flex items-center gap-3 border-y border-glass-border py-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-electric-violet/10 text-electric-violet">
                <User className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">OctaNex31 Team</p>
                <p className="text-xs text-text-secondary">Published on {post.published_at ? formatDate(post.published_at) : 'N/A'}</p>
              </div>
            </div>
          </div>

          {post.cover_image_url && (
            <div className="mx-auto mb-12 max-w-4xl overflow-hidden rounded-2xl">
              <img
                src={post.cover_image_url}
                alt={post.title}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          <div className="mx-auto max-w-3xl">
            {post.content && (
              <div
                className="prose prose-invert prose-violet max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            )}

            {post.tags && post.tags.length > 0 && (
              <div className="mt-8 flex flex-wrap items-center gap-2">
                <span className="text-sm text-text-secondary">Tags:</span>
                {post.tags.map((tag) => (
                  <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`}>
                    <Badge variant="default" className="cursor-pointer hover:bg-electric-violet/25">
                      {tag}
                    </Badge>
                  </Link>
                ))}
              </div>
            )}

            <div className="mt-8 flex items-center gap-3 border-t border-glass-border pt-6">
              <span className="flex items-center gap-1.5 text-sm text-text-secondary">
                <Share2 className="h-4 w-4" />
                Share:
              </span>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-glass-bg border border-glass-border text-text-secondary transition-colors hover:text-cyan hover:border-cyan"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-glass-bg border border-glass-border text-text-secondary transition-colors hover:text-cyan hover:border-cyan"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-glass-bg border border-glass-border text-text-secondary transition-colors hover:text-cyan hover:border-cyan"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <button
                onClick={() => navigator.clipboard.writeText(shareUrl)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-glass-bg border border-glass-border text-text-secondary transition-colors hover:text-cyan hover:border-cyan"
              >
                <LinkIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <Section title="Related Posts" gradientBg>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((rel, i) => (
              <BlogCard key={rel.id} post={rel} index={i} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/blog">
              <Button variant="outline" size="lg">
                View All Posts
              </Button>
            </Link>
          </div>
        </Section>
      )}
    </>
  );
}
