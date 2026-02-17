import SeoHead from '@/app/components/seo/seoHead';
import BlogList from './BlogList';
import { SEO_IMAGE } from '@/app/constants/appconstants';

export const revalidate = 60;

export default async function BlogsPage() {
  const pageSEO = {
    title: 'Latest Blogs | Dolcera',
    description: 'Dolcera projects, patent analytics projects, IP management solutions, patent research case studies',
    keywords: 'Dolcera projects, Dolcera Blogs,  patent analytics projects, IP management solutions, patent research case studiesx',
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/blogs`,
  };

  return (
    <>
      <SeoHead {...pageSEO} image={SEO_IMAGE} />
      <BlogList />
    </>
  );
}
