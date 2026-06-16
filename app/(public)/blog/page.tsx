import type { Metadata } from 'next';
import Link from 'next/link';
import { getServiceSupabase } from '@/lib/supabase-server';
import { GradientText } from '@/components/ui/gradient-text';
import { Button } from '@/components/ui/button';
import { BlogCard } from '@/components/blog/blog-card';
import { BlogSidebar } from '@/components/blog/blog-sidebar';
import type { BlogPost } from '@/types';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Blog | OctaNex31',
  alternates: { canonical: '/blog' },
  description:
    'Insights, tutorials, and industry updates from OctaNex31. Learn about app development, web design, AI, digital marketing, and more.',
  openGraph: {
    title: 'Blog | OctaNex31',
    description:
      'Insights, tutorials, and industry updates from OctaNex31. Learn about app development, web design, AI, digital marketing, and more.',
  },
};

interface Props {
  searchParams: { page?: string; search?: string; category?: string; tag?: string };
}

const POSTS_PER_PAGE = 6;

export default async function BlogPage({ searchParams }: Props) {
  const supabase = getServiceSupabase();
  const currentPage = Math.max(1, parseInt(searchParams.page || '1', 10) || 1);
  const search = searchParams.search || '';
  const category = searchParams.category || '';
  const tag = searchParams.tag || '';

  let query = supabase
    .from('blog_posts')
    .select('*', { count: 'exact' })
    .eq('status', 'published');

  if (search) {
    query = query.ilike('title', `%${search}%`);
  }
  if (category) {
    query = query.eq('category', category);
  }
  if (tag) {
    query = query.contains('tags', [tag]);
  }

  const from = (currentPage - 1) * POSTS_PER_PAGE;
  const to = from + POSTS_PER_PAGE - 1;

  const { data: posts, count } = await query
    .order('published_at', { ascending: false })
    .range(from, to);

  const totalPages = count ? Math.ceil(count / POSTS_PER_PAGE) : 1;
  const blogPosts = (posts as BlogPost[]) ?? [];

  return (
    <>
      <section className="relative pt-28 pb-12 sm:pt-32 sm:pb-16">
        <div className="absolute inset-0 bg-gradient-radial from-electric-violet/10 via-transparent to-transparent" />
        <div className="container relative z-10 mx-auto px-4 text-center sm:px-6 lg:px-8">
          <GradientText as="h1" variant="violet-cyan" className="mb-6">
            Our Blog
          </GradientText>
          <p className="mx-auto max-w-2xl text-lg text-text-secondary">
            Insights, tutorials, and stories from the OctaNex31 team. Stay updated with the latest
            in tech, design, and digital business.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-20 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="flex-1">
            {search && (
              <p className="mb-6 text-sm text-text-secondary">
                Search results for: <span className="font-medium text-text-primary">&ldquo;{search}&rdquo;</span>
              </p>
            )}

            {blogPosts.length > 0 ? (
              <>
                <div className="grid gap-6 sm:grid-cols-2">
                  {blogPosts.map((post, i) => (
                    <BlogCard key={post.id} post={post} index={i} />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="mt-10 flex items-center justify-center gap-4">
                    {currentPage > 1 && (
                      <Link
                        href={`/blog?page=${currentPage - 1}${search ? `&search=${search}` : ''}${category ? `&category=${category}` : ''}${tag ? `&tag=${tag}` : ''}`}
                      >
                        <Button variant="outline" size="sm">Previous</Button>
                      </Link>
                    )}
                    <span className="text-sm text-text-secondary">
                      Page {currentPage} of {totalPages}
                    </span>
                    {currentPage < totalPages && (
                      <Link
                        href={`/blog?page=${currentPage + 1}${search ? `&search=${search}` : ''}${category ? `&category=${category}` : ''}${tag ? `&tag=${tag}` : ''}`}
                      >
                        <Button variant="outline" size="sm">Next</Button>
                      </Link>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="py-20 text-center">
                <h3 className="mb-2 text-xl font-semibold text-text-primary">No posts found</h3>
                <p className="mb-6 text-text-secondary">
                  {search ? 'No posts match your search. Try different keywords.' : 'No blog posts published yet.'}
                </p>
                {search && (
                  <Link href="/blog">
                    <Button variant="outline">Clear Search</Button>
                  </Link>
                )}
              </div>
            )}
          </div>

          <div className="w-full lg:w-80 xl:w-96">
            <div className="lg:sticky lg:top-24">
              <div className="mb-6">
                <form action="/blog" method="GET">
                  <input
                    type="text"
                    name="search"
                    defaultValue={search}
                    placeholder="Search posts..."
                    className="w-full rounded-xl border border-glass-border bg-glass-bg backdrop-blur-xl px-4 py-2.5 text-sm text-text-primary placeholder:text-text-secondary focus:border-electric-violet focus:outline-none"
                  />
                </form>
              </div>
              <BlogSidebar />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
