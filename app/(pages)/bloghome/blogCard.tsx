// app/components/blog/BlogCard.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useInView } from '../bloghome/useInView';

type Blog = {
  coverImage?: { url?: string };
  title: string;
  slug: string;
  publishedAt: string;
  description?: string;
  video?: { url?: string }[];
};

type Variant = 'left' | 'featured' | 'right';

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

export default function BlogCard({ blog, variant }: { blog: Blog; variant: Variant }) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: '0px 0px -70% 0px',
  });

  const isFeatured = variant === 'featured';
  const isRight = variant === 'right';

  return (
    <article
      ref={ref}
      className={`
        group relative overflow-hidden rounded-sm shadow-xl
        ${isFeatured ? 'aspect-square' : ''}
        ${isRight ? 'h-[160px]' : 'aspect-square'}
        bg-white dark:bg-white
      `}
    >
      {/* VIDEO (FEATURED ONLY) */}
      {isFeatured && blog.video?.[0]?.url && <video src={blog.video[0].url} autoPlay muted loop playsInline className="h-48 w-full object-cover" />}

      {/* IMAGE */}
      {!isRight && (
        <Image
          src={blog.coverImage?.url || '/placeholder.jpg'}
          alt={blog.title}
          width={600}
          height={400}
          className={`
            w-full transition-transform duration-[500ms]
            ${inView ? 'scale-105' : 'scale-100'}
            md:group-hover:scale-105
          `}
        />
      )}

      {/* CONTENT */}
      <div
        className={`
          absolute inset-x-0 bottom-0 text-left duration-[500ms]
          bg-gradient-to-t from-white via-white to-primary-50/90
          dark:from-secondary-dark/95 dark:via-white dark:to-primary-50/90
          backdrop-blur-md dark:text-black
          transition-all ease-linear

          ${isRight ? 'h-full px-5 py-4' : inView ? 'h-full px-7 py-10' : isFeatured ? 'h-[110px] md:h-[240px] px-5 py-4' : 'h-[150px] px-5 py-3 '}

          md:group-hover:h-full
          md:group-hover:px-7
          md:group-hover:py-10
        `}
      >
        <p className="mb-1 text-sm opacity-80">{formatDate(blog.publishedAt)}</p>

        <h2 className="text-xl line-clamp-2">{blog.title}</h2>

        {blog.description && (
          <p
            className={`
              mt-1   ${isFeatured ? 'line-clamp-4 ' : 'line-clamp-2'} text-sm overflow-hidden transition-all duration-[500ms]
              ${isRight || inView ? 'opacity-100 max-h-40' : 'opacity-100 max-h-40'}
              md:group-hover:opacity-100 md:group-hover:max-h-40
            `}
          >
            {blog.description}
          </p>
        )}

        <Link
          href={`/blogs/detail/${blog.slug}`}
          className={`
            mt-4 block font-semibold text-primary
            ${inView || isRight ? 'opacity-100' : 'opacity-0'}
            transition-opacity duration-500
            md:group-hover:opacity-100
          `}
        >
          Read More →
        </Link>
      </div>
    </article>
  );
}
