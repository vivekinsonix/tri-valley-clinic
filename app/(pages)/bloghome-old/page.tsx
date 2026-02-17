'use client';

import SeoHead from '@/app/components/seo/seoHead';
import { SEO_IMAGE } from '@/app/constants/appconstants';
import { getPaginatedBlogs } from '@/app/services';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

/* -------------------------------- TYPES -------------------------------- */
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

/* ----------------------------- IN-MEMORY CACHE ----------------------------- */
const blogCache: {
  data: Blog[] | null;
  fetchedAt: number | null;
} = {
  data: null,
  fetchedAt: null,
};

/* -------------------------------- UTILS -------------------------------- */
const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

/* ------------------------------ SKELETON UI ------------------------------ */
function BlogSkeleton({ variant = 'small' }: { variant?: 'small' | 'featured' }) {
  return (
    <div className="border rounded-lg p-3 dark:bg-secondary-dark animate-pulse">
      <div className={`w-full ${variant === 'featured' ? 'h-60' : 'h-36'} bg-gray-300 dark:bg-gray-700 rounded mb-4`} />
      <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-3" />
      <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-2" />
      <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/3" />
    </div>
  );
}

/* ------------------------------ COMPONENT ------------------------------ */
export default function BlogsHomePageOld() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  /* ------------------------------ DATA FETCH ------------------------------ */
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

  /* ------------------------------ DERIVED DATA ------------------------------ */
  const featuredBlog = blogs.find((b) => b.is_main === true);
  const leftBlogs = blogs.filter((b) => !b.is_main).slice(0, 2);
  const rightBlogs = blogs.filter((b) => !b.is_main).slice(2, 5);

  const seoUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://insonix.com'}/`;

  /* ------------------------------ RENDER ------------------------------ */
  return (
    <>
      {/* SEO */}
      <SeoHead title="Blog Stories | Dolcera" description="Read the latest blog stories, insights, and updates from Dolcera team." keywords="Dolcera blogs,  blogs, Dolcera blogs" image={SEO_IMAGE} url={seoUrl} author="Dolcera Team" />

      <section id="blogs" className="w-full py-16 md:py-24 bg-white dark:bg-foreground ">
        <div className="container mx-auto text-center">
          <p className="text-sm font-medium uppercase tracking-wider mb-2 text-gray-400 ">Recommended Resources</p>

          <h2 className="text-3xl md:text-5xl font-extrabold mb-10 dark:text-white">Insights to Keep You Ahead of the Curve</h2>

          <main className="container mx-auto max-w-full px-4 py-10">
            <div className="grid md:grid-cols-8 gap-6">
              {/* ---------------- LEFT BLOGS ---------------- */}
              <aside className="md:col-span-2 space-y-4">
                <article className="group text-left relative w-full aspect-square overflow-hidden rounded-sm  bg-white shadow-xl">
                  <Image src="/blog3.jpg" alt="alt-title" width={600} height={400} className="transition-transform duration-[500ms] ease-linear group-hover:scale-105" />

                  <div className="absolute inset-x-0 bottom-0 h-[120px] overflow-hidden rounded-t-sm  bg-gradient-to-t from-white via-white to-secondary-50/90  px-5 py-1  backdrop-blur-md transition-all duration-[500ms] ease-linear group-hover:h-full group-hover:px-7 group-hover:py-10">
                    <p className="text-sm  opacity-80 mb-1">Aprail 2, 2024</p>

                    <h2 className="text-xl">The Pulse of American Innovation: A Decade of Patent Filings in the USA</h2>

                    <p className="mt-4 leading-relaxed  text-sm opacity-0 max-h-0 overflow-hidden transition-all duration-[500ms] ease-linear group-hover:opacity-100 group-hover:max-h-40">Protection versus progress. Who will shape the future?</p>

                    <Link href="#" className="mt-4 block font-semibold text-primary opacity-0 transition-opacity duration-[500ms] group-hover:opacity-100">
                      Read More →
                    </Link>
                  </div>
                </article>
                <article className="group text-left relative w-full aspect-square overflow-hidden rounded-sm  bg-white shadow-xl">
                  <Image src="/Qualcomm-and-Samsung.jpg" alt="alt-title" width={600} height={400} className="transition-transform duration-[500ms] ease-linear group-hover:scale-105" />

                  <div className="absolute inset-x-0 bottom-0 h-[120px] overflow-hidden rounded-t-sm  bg-gradient-to-t from-white via-white to-secondary-50/90  px-5 py-1  backdrop-blur-md transition-all duration-[500ms] ease-linear group-hover:h-full group-hover:px-7 group-hover:py-10">
                    <p className="text-sm  opacity-80 mb-1">Aprail 2, 2024</p>

                    <h2 className="text-xl">Qualcomm and Samsung Drive India’s Patent Filing Surge</h2>

                    <p className="mt-4 text-sm opacity-0 max-h-0 overflow-hidden transition-all duration-[500ms] ease-linear group-hover:opacity-100 group-hover:max-h-40">Protection versus progress. Who will shape the future?</p>

                    <Link href="#" className="mt-4 block font-semibold text-primary opacity-0 transition-opacity duration-[500ms] group-hover:opacity-100">
                      Read More →
                    </Link>
                  </div>
                </article>
              </aside>

              {/* ---------------- FEATURED BLOG ---------------- */}
              <main className="md:col-span-4">
                {loading ? (
                  <BlogSkeleton variant="featured" />
                ) : (
                  featuredBlog && (
                    <article className="group relative w-full aspect-square overflow-hidden rounded-sm  bg-white shadow-xl">
                      {featuredBlog.video?.[0]?.url && <video src={featuredBlog.video[0].url} autoPlay muted loop playsInline className="h-48 w-full object-cover" />}

                      <Image src="blogfeature.jpg" alt={featuredBlog.title} width={600} height={400} className="w-full transition-transform duration-[500ms] group-hover:scale-105" />

                      <div className="absolute text-left inset-x-0 bottom-0 md:h-[240px]  h-[110px]  overflow-hidden rounded-t-sm  bg-gradient-to-t from-white via-white to-secondary-50/90  px-5 py-4  backdrop-blur-md transition-all duration-[1200ms] group-hover:h-full group-hover:px-7 group-hover:py-10">
                        <p className="mb-2 text-sm  opacity-80">May 15, 2024</p>

                        <h2 className="text-xl">Summary Report from 3GPP plenaries</h2>

                        <p className="mt-4 text-sm leading-relaxed ">3GPP’s most recent round of plenary gatherings were held in Maastricht, Netherlands, from 18th to 22nd March, 2024. The gathering witnessed a varied spectrum of stakeholders and close to 1700 technical documents (TDoc) were submitted for discussion. In view of 3GPP’s way forward development plans for 5G Advanced</p>

                        <Link href={`/blogs/detail/${featuredBlog?.slug}`} className="mt-4 block font-semibold text-primary opacity-0 transition-opacity duration-[500ms] group-hover:opacity-100">
                          Read More →
                        </Link>
                      </div>
                    </article>
                  )
                )}
              </main>

              {/* ---------------- RIGHT BLOGS ---------------- */}
              <aside className="md:col-span-2 space-y-4">
                {loading
                  ? Array.from({ length: 3 }).map((_, i) => <BlogSkeleton key={i} />)
                  : rightBlogs.map((blog) => (
                      <article key={blog.slug} className="group relative text-left h-[160px] overflow-hidden rounded-sm bg-white  shadow-xl">
                        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-white via-white to-transparent   px-5 py-4   md:translate-y-[20%] translate-y-[0%] transition-transform duration-[500ms] ease-out group-hover:translate-y-0">
                          <p className="mb-2 text-sm dark:text-gray-300 opacity-80">Oct 08, 2020</p>

                          <h2 className="text-xl">Dolcera analysis in IAM</h2>

                          <p className="mt-4 text-sm leading-relaxed ">If Nvidia purchases Arm it will create a processor patent powerhouse</p>

                          <Link href="#" className="mt-4 block font-semibold text-primary opacity-0 transition-opacity duration-[500ms] group-hover:opacity-100">
                            Read More →
                          </Link>
                        </div>
                      </article>
                    ))}
              </aside>
            </div>

            <Link href="/#blogs" className="mt-10 inline-block text-primary hover:underline">
              View All Blogs →
            </Link>
          </main>
        </div>
      </section>
    </>
  );
}
