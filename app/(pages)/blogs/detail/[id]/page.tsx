import SeoHead from '@/app/components/seo/seoHead';
import { getBlogBySlug, getBlogs } from '@/app/services';
import { draftMode } from 'next/headers';
import BlogDetailClient from './BlogDetailClient';

export const dynamicParams = true;
export async function generateStaticParams() {
  try {
    const blogs = await getBlogs();
    return blogs?.data?.map((b: any) => ({
      id: b.slug,
    }));
  } catch (err) {
    console.warn('generateStaticParams: failed to fetch blogs', err);
    return [];
  }
}

export default async function BlogPage({ params }: any) {
  const slug = await params;
  const { isEnabled } = await draftMode();
  const blog = await getBlogBySlug(slug?.id);

  const img = blog?.coverImage?.formats?.medium?.url || blog?.coverImage?.url || '/default-og.jpg.png';
  const root = process.env.NEXT_PUBLIC_BASE_URL || 'https://insonix.com';
  const canonical = blog?.Seo?.canonicalURL || `${root}/blogs/detail/${slug?.id}`;

  const pageSEO = {
    title: blog?.Seo?.metaTitle || blog?.title || 'Blog | Dolcera',
    description: blog?.Seo?.metaDescription || blog?.excerpt || '',
    keywords: blog?.Seo?.keywords || (blog?.tags?.join(', ') ?? 'blog, article'),
    image: img,
    url: canonical,
  };

  return (
    <>
      <SeoHead title={pageSEO.title} description={pageSEO.description} keywords={pageSEO.keywords} image={pageSEO.image} url={pageSEO.url} />
      <BlogDetailClient initialBlog={blog} slug={slug?.id} preview={isEnabled} />
    </>
  );
}
