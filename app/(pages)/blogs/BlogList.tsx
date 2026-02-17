'use client';
import { getBlogs, getBlogsCategories } from '@/app/services';
import { Blog } from '@/app/utils/Interfaces';
import { formatDate } from '@/app/utils/utility';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { TextInput, Select } from 'flowbite-react';

interface Category {
  name: string;
  slug: string;
}

const SkeletonCard = () => (
  <div className="rounded-xl bg-gray-800 p-0 shadow-xl animate-pulse" aria-label="Loading blog card">
    <div className="h-58 w-full bg-gray-700"></div>
    <div className="p-4 space-y-3">
      <div className="h-6 w-3/4 bg-gray-700 rounded"></div>
      <div className="h-4 w-1/2 bg-gray-700 rounded"></div>
      <div className="h-4 w-20 bg-gray-700 rounded"></div>
    </div>
  </div>
);

// ---------------- IN-MEMORY CACHE ----------------
let cachedBlogs: Record<string, Blog[]> = {};
let cachedCategories: Category[] | null = null;

export default function BlogList() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(''); // '' = All
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [loading, setLoading] = useState(false);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);
    return () => clearTimeout(handler);
  }, [search]);

  // Fetch categories ONCE with cache
  useEffect(() => {
    const fetchCategories = async () => {
      if (cachedCategories) {
        setCategories(cachedCategories);
        return;
      }

      try {
        const res = await getBlogsCategories();
        const cats = res?.data || [];
        setCategories(cats);

        // Cache in memory
        cachedCategories = cats;
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch blogs whenever category or search changes
  useEffect(() => {
    const key = `${selectedCategory}_${debouncedSearch}`;

    const fetchBlogs = async () => {
      setLoading(true);

      // Serve from memory if cached
      if (cachedBlogs[key]) {
        setBlogs(cachedBlogs[key]);
        setLoading(false);
        return;
      }

      try {
        const res = await getBlogs({
          // categorySlug: selectedCategory || undefined,
          search: debouncedSearch || undefined,
        });
        const data = res?.data || [];
        setBlogs(data);

        // Cache in memory
        cachedBlogs[key] = data;
      } catch (err) {
        console.error('Error fetching blogs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [selectedCategory, debouncedSearch]);

  return (
    <section className="min-h-screen w-full dark:bg-white ">
      <main className="container mx-auto max-w-7xl px-4 py-10">
        {/* Header */}
        <div>
          <header className="my-16 text-center ">
            <h1 className="mt-5">Latest Blogs</h1>
            <p className="mt-2 text-gray-400">Discover articles from our expert team.</p>
          </header>

          {/* Search & Category Filter */}
          <div className="mb-12 flex justify-center gap-2">
            <TextInput className="w-96" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search blogs..." />
            {/* <Select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.slug} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </Select> */}
          </div>
        </div>

        {/* Blog List */}
        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3" aria-busy={loading}>
          {!loading && blogs.length > 0 ? (
            blogs.map((post) => {
              const img = post.coverImage?.formats?.medium?.url || post.coverImage?.url || '/default-blog.jpg';
              return (
                <article key={post.id} className="group relative w-full dark:bg-primary-50 bg-white aspect-[1/1] overflow-hidden rounded-sm shadow-xl">
                  {/* Image */}
                  <Image src={img} alt={post.title} width={600} height={400} className="transition-transform  duration-[500ms] ease-linear group-hover:scale-105" />

                  {/* Overlay Box */}
                  <div
                    className="cursor-pointer absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-primary-50/90  backdrop-blur-md
      rounded-t-sm

     
      h-[180px]
      overflow-hidden
      px-5 py-4
      opacity-100
      translate-y-0

      /* HOVER → FULL EXPAND FROM BOTTOM TO TOP */
      group-hover:h-99
      group-hover:px-7 group-hover:py-10
      group-hover:opacity-100

      transition-all duration-[500ms] ease-linear
    "
                  >
                    <p
                      className=" mb-2
        text-sm opacity-80
        transition-all duration-[500ms] ease-linear
      "
                    >
                      {formatDate(post?.createdAt)}
                    </p>

                    <h2
                      className=" line-clamp-2
        text-xl 
        transition-all duration-[500ms] ease-linear
      "
                    >
                      {post.title}
                    </h2>
                    <p className="text-sm   mt-4 line-clamp-2  "> {post?.description || 'The global debate around AI, education, and technology is often framed as screens versus schools,'}</p>

                    {/* Read More */}
                    <Link
                      href={`/blogs/detail/${post.slug}`}
                      className="
        mt-4 block dark:text-primary text-primary font-semibold
        opacity-0 group-hover:opacity-100
        transition-opacity duration-[500ms] ease-linear
      "
                    >
                      Read More →
                    </Link>
                  </div>
                </article>
              );
            })
          ) : loading ? (
            Array.from({ length: 3 }).map((_, idx) => <SkeletonCard key={idx} />)
          ) : (
            <p className="col-span-full text-center text-gray-400">No blogs found.</p>
          )}
        </div>
      </main>
    </section>
  );
}
