import SeoHead from '@/app/components/seo/seoHead';
import TeamPage from './TeamPage';

export const revalidate = 60;

export default async function BlogsPage() {
  const pageSEO = {
    title: 'Latest Blogs | Dolcera',
    description: 'Explore the latest insights, articles, and resources from the Dolcera team.',
    keywords: 'blogs, tech articles, case studies, industry insights',
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/blogs`,
  };

  return (
    <>
      <SeoHead {...pageSEO} image="/default-og.jpg.png" />
      <TeamPage />
    </>
  );
}
