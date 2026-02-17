'use client';

import { RichTextViewer } from '@/app/components/richtext/RichTextViewer';
import SeoHead from '@/app/components/seo/seoHead';
import ShareBanner from '@/app/components/shareButton/ShareButton';
import { WhatsAppButton } from '@/app/components/whatsapp/WhatsAppButton';
import { getBlogBySlug } from '@/app/services';
import { Blog } from '@/app/utils/Interfaces';
import Image from 'next/image';
import { JSX, useCallback, useEffect, useMemo, useState } from 'react';

export interface RichTextChild {
  type: 'text';
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
}

export interface ParagraphBlock {
  type: 'paragraph';
  children: RichTextChild[];
}

export interface HeadingBlock {
  type: 'heading';
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: RichTextChild[];
}

export type RichTextBlock = ParagraphBlock | HeadingBlock;
export type BlogContent = RichTextBlock[];

interface BlogDetailClientProps {
  initialBlog: Blog | null;
  slug: string;
  preview?: boolean;
}

const BlogSkeleton = () => (
  <section className="mt-10 bg-stone-50 py-16 animate-pulse">
    <div className="container mx-auto max-w-5xl px-6">
      <div className="h-10 w-3/4 bg-gray-300 rounded mb-6" />
      <div className="h-4 w-1/2 bg-gray-300 rounded mb-8" />
      <div className="h-72 w-full bg-gray-300 rounded-xl mb-10" />
      <div className="space-y-4">
        <div className="h-4 w-full bg-gray-300 rounded" />
        <div className="h-4 w-5/6 bg-gray-300 rounded" />
        <div className="h-4 w-4/6 bg-gray-300 rounded" />
        <div className="h-4 w-3/6 bg-gray-300 rounded" />
      </div>
    </div>
  </section>
);

export default function BlogDetailClient({ initialBlog, slug, preview }: BlogDetailClientProps) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(!initialBlog);

  const fetchBlog = useCallback(async () => {
    if (!blog) {
      setLoading(true);
      try {
        const res = await getBlogBySlug(slug);
        setBlog(res || null);
      } finally {
        setLoading(false);
      }
    }
  }, [slug, blog]);

  useEffect(() => {
    fetchBlog();
  }, [fetchBlog]);

  const seoData = useMemo(() => {
    if (!blog) {
      return {
        seoTitle: '',
        seoDescription: '',
        seoKeywords: '',
        seoCanonical: '',
        imageUrl: '/placeholder.jpg',
      };
    }

    const seo = blog.Seo;
    const hasSeo = !!seo?.id;
    const img = blog.coverImage?.formats?.medium?.url || blog.coverImage?.url || '/placeholder.jpg';

    const root = process.env.NEXT_PUBLIC_BASE_URL || 'https://insonix.com';

    return {
      seoTitle: hasSeo ? seo.metaTitle : blog.title,
      seoDescription: hasSeo ? seo.metaDescription : blog.excerpt || blog.title,
      seoKeywords: hasSeo ? seo.keywords : blog.tags?.join(', ') || 'blog, article',
      seoCanonical: seo?.canonicalURL || `${root}/blogs/detail/${slug}`,
      imageUrl: img,
    };
  }, [blog, slug]);

  /* ---------------- Center Famous Pricing Card ---------------- */

  const orderedPricingCards = useMemo(() => {
    if (!blog?.pricing_cards?.length) return [];

    const cards = [...blog.pricing_cards];
    const famousIndex = cards.findIndex((c: any) => c?.isFamous);

    if (famousIndex === -1) return cards;

    const [famousCard] = cards.splice(famousIndex, 1);
    const centerIndex = Math.floor(cards.length / 2);

    cards.splice(centerIndex, 0, famousCard);
    return cards;
  }, [blog?.pricing_cards]);

  /* ---------------- Render Rich Content ---------------- */

  const renderedContent = useMemo(() => {
    if (!blog?.content?.length) return null;

    return (blog.content as RichTextBlock[]).map((block, index) => {
      const plainText = block.children
        .map((c) => c.text)
        .join('')
        .trim();
      if (!plainText) return null;

      if (block.type === 'heading') {
        const HeadingTag = `h${block.level}` as keyof JSX.IntrinsicElements;
        return (
          <HeadingTag key={index} className="mt-8 mb-3 text-xl font-semibold text-gray-900 dark:text-white">
            {block.children.map((child, i) => (
              <span key={i} className={[child.bold && 'font-semibold', child.italic && 'italic', child.underline && 'underline', child.code && 'font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded'].filter(Boolean).join(' ')}>
                {child.text}
              </span>
            ))}
          </HeadingTag>
        );
      }

      return (
        <p key={index} className="mb-4 leading-7 text-gray-700 dark:text-gray-300">
          {block.children.map((child, i) => (
            <span key={i} className={[child.bold && 'font-semibold', child.italic && 'italic', child.underline && 'underline', child.code && 'font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded'].filter(Boolean).join(' ')}>
              {child.text}
            </span>
          ))}
        </p>
      );
    });
  }, [blog?.content]);

  /* ---------------- States ---------------- */

  if (loading) return <BlogSkeleton />;

  if (!blog) {
    return <div className="flex min-h-screen items-center justify-center bg-gray-50 text-red-600">Blog not found.</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      {!loading && <ShareBanner shareUrl={seoData?.seoCanonical} position="center" />}
      <SeoHead title={seoData.seoTitle} description={seoData.seoDescription} keywords={seoData.seoKeywords} image={seoData.imageUrl} url={seoData.seoCanonical} />

      <section className="mt-10 py-16 " aria-labelledby="blog-title">
        <article className="container mx-auto max-w-7xl px-6 prose dark:prose-invert">
          <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-12 lg:grid-cols-12 container mx-auto">
            <div className="md:col-span-9">
              <header className="mb-8">
                <h1 className="mb-4 text-3xl font-bold md:text-4xl">{blog.title}</h1>
                {blog.excerpt && <p className="text-lg leading-relaxed">{blog.excerpt}</p>}
              </header>

              <figure className="mb-10">
                <Image src={seoData.imageUrl} alt={blog.title} width={1200} height={600} className="w-full rounded-xl object-cover shadow-xl" priority />
              </figure>

              <div className="prose max-w-none prose-lg dark:prose-invert">{renderedContent}</div>

              {blog?.video?.[0]?.url && <video src={blog.video[0].url} className="mt-10 w-full rounded-xl" autoPlay muted loop playsInline />}

              {/* ---------------- Pricing Cards ---------------- */}

              <div className="grid mt-10 gap-8 md:grid-cols-3">
                {orderedPricingCards.map((card: any, index: number) => {
                  const isPopular = card?.isFamous;
                  const { title, description, amount, plan, feature_list, badge } = card || {};

                  return (
                    <div key={index}>
                      {isPopular ? (
                        <div className="relative prose dark:prose-invert  flex scale-105 flex-col items-center rounded-2xl bg-gradient-to-b from-blue-600 to-blue-500 p-8 text-center text-white shadow-2xl transition-all hover:scale-110">
                          <span className="absolute top-4 right-4 rounded-full bg-white/20 px-2 py-1 text-xs">{badge}</span>

                          <h3 className="mb-3 text-2xl font-semibold">
                            <RichTextViewer content={title} />
                          </h3>

                          <div className="mb-6 text-blue-100">
                            <RichTextViewer content={description} />
                          </div>

                          <div className="mb-4 text-3xl font-bold">
                            <RichTextViewer content={amount} />
                          </div>

                          <div className="mb-6 text-sm text-blue-100">
                            <RichTextViewer content={plan} />
                          </div>

                          <RichTextViewer content={feature_list} />

                          <WhatsAppButton
                            outline
                            label="Book Sprint"
                            payload={{
                              title,
                              amount,
                              plan,
                              source: 'Pricing - Popular Plan',
                              pageUrl: typeof window !== 'undefined' ? window.location.href : '',
                            }}
                          />
                        </div>
                      ) : (
                        <div className="relative flex flex-col items-center rounded-2xl bg-white p-8 text-center shadow-md transition-all hover:scale-110 hover:shadow-xl ">
                          <span className="absolute top-4 right-4 rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-600">{badge}</span>

                          <h3 className="mb-3 text-2xl font-semibold">
                            <RichTextViewer content={title} />
                          </h3>

                          <div className="mb-6 text-gray-600 dark:text-gray-300">
                            <RichTextViewer content={description} />
                          </div>

                          <div className="mb-4 text-3xl font-bold">
                            <RichTextViewer content={amount} />
                          </div>

                          <div className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                            <RichTextViewer content={plan} />
                          </div>

                          <RichTextViewer content={feature_list} />

                          <WhatsAppButton
                            outline
                            label="Get Started"
                            payload={{
                              title,
                              amount,
                              plan,
                              source: 'Pricing - Popular Plan',
                              pageUrl: typeof window !== 'undefined' ? window.location.href : '',
                            }}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}
