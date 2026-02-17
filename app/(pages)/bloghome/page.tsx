'use client';

import SeoHead from '@/app/components/seo/seoHead';
import { SEO_IMAGE } from '@/app/constants/appconstants';
import { getPaginatedBlogs } from '@/app/services';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import BlogCard from './blogCard';

type Blog = {
  coverImage?: { url?: string };
  title: string;
  slug: string;
  author?: string;
  publishedAt: string;
  excerpt?: string;
  video?: { url?: string }[];
  description?: string;
  is_main?: boolean;
};

const blogCache: {
  data: Blog[] | null;
  fetchedAt: number | null;
} = {
  data: null,
  fetchedAt: null,
};

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

function BlogSkeleton({ variant = 'small' }: { variant?: 'small' | 'featured' | 'compact' }) {
  return (
    <div className="animate-pulse rounded-lg bg-white dark:bg-secondary-dark shadow-lg overflow-hidden">
      {/* Image */}
      <div
        className={`w-full bg-gray-300 dark:bg-gray-700
          ${variant === 'featured' ? 'h-64' : variant === 'compact' ? 'h-24' : 'h-36'}
        `}
      />

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="h-3 w-1/3 bg-gray-300 dark:bg-gray-700 rounded" />
        <div className="h-5 w-3/4 bg-gray-300 dark:bg-gray-700 rounded" />
        {variant !== 'compact' && (
          <>
            <div className="h-3 w-full bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="h-3 w-2/3 bg-gray-300 dark:bg-gray-700 rounded" />
          </>
        )}
      </div>
    </div>
  );
}

export default function BlogsHomePage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (blogCache.data) {
      setBlogs(blogCache.data);
      setLoading(false);
      return;
    }

    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await getPaginatedBlogs(1, 6);
        const data = res?.data ?? [];

        setBlogs(data);
        blogCache.data = data;
        blogCache.fetchedAt = Date.now();
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const featuredBlog = blogs.find((b) => b.is_main === true);
  const leftBlogs = blogs.filter((b) => !b.is_main).slice(0, 2);
  const rightBlogs = blogs.filter((b) => !b.is_main).slice(2, 5);

  const seoUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://insonix.com'}/`;

  if (loading) {
    return (
      <section className="w-full py-16 md:py-24 bg-white dark:bg-foreground">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center animate-pulse">
            <div className="h-4 w-40 mx-auto bg-gray-300 dark:bg-gray-700 rounded mb-4" />
            <div className="h-10 w-2/3 mx-auto bg-gray-300 dark:bg-gray-700 rounded" />
          </div>

          <div className="grid md:grid-cols-8 gap-6">
            <aside className="md:col-span-2 space-y-4">
              <BlogSkeleton />
              <BlogSkeleton />
            </aside>

            <main className="md:col-span-4">
              <BlogSkeleton variant="featured" />
            </main>

            <aside className="md:col-span-2 space-y-4">
              <BlogSkeleton variant="compact" />
              <BlogSkeleton variant="compact" />
              <BlogSkeleton variant="compact" />
            </aside>
          </div>
          <div className="mt-10 flex justify-center animate-pulse">
            <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <SeoHead title="Blogs - Dolcera" description="Read the latest blog stories, insights, and updates from Dolcera team." keywords="blogs, tech blogs, insonix blogs, development, software" image={SEO_IMAGE} url={seoUrl} author="Dolcera Team" />

      {!loading && blogs?.length > 0 && (
        <section className="w-full py-16 md:py-24 bg-primary-50 dark:bg-foreground ">
          <div className="container mx-auto text-center">
            <header>
              <p className="text-sm font-medium uppercase tracking-wider mb-2 text-gray-800 dark:text-gray-400">The Legal Practice Insights</p>

              <h1>Thoughts on the Digital Horizon</h1>
            </header>
            <main className="container mx-auto max-w-full px-4 py-10">
              <div className="grid md:grid-cols-8 gap-6">
                <aside className="md:col-span-2 space-y-4">
                  {leftBlogs.map((blog) => (
                    <BlogCard key={blog.slug} blog={blog} variant="left" />
                  ))}
                </aside>

                <main className="md:col-span-4">{featuredBlog && <BlogCard blog={featuredBlog} variant="featured" />}</main>

                <aside className="md:col-span-2 space-y-4">
                  {rightBlogs.map((blog) => (
                    <article key={blog.slug} className="group relative text-left h-40 overflow-hidden rounded-sm bg-white shadow-xl">
                      <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-white via-white to-white  px-5 py-4  md:translate-y-[20%] translate-y-[0%] transition-transform duration-[500ms] ease-out group-hover:translate-y-0">
                        <p className="mb-2 text-sm dark:text-gray-300 opacity-80">{formatDate(blog.publishedAt)}</p>

                        <h2 className="text-xl line-clamp-1">{blog.title}</h2>

                        <p className="mt-4 text-sm line-clamp-1  ">{blog.description}</p>

                        <Link href={`/blogs/detail/${blog.slug}`} className="mt-4 block font-semibold text-primary opacity-0 transition-opacity duration-[500ms] group-hover:opacity-100">
                          Read More →
                        </Link>
                      </div>
                    </article>
                  ))}
                </aside>
              </div>

              {blogs?.length > 6 && (
                <Link href="/blogs" className="mt-10 inline-block text-blue-500 hover:underline">
                  View All Blogs →
                </Link>
              )}
            </main>
          </div>
        </section>
      )}
    </>
  );
}
