import { MetadataRoute } from 'next';
import { getBlogsIds } from './services';
import { get_case_studies_Ids } from './services/homePageService';

export const revalidate = 3600;
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://dolcera.insonix.com';
  const now = new Date();

  const [blogs, caseStudies] = await Promise.all([getBlogsIds(), get_case_studies_Ids()]);

  return [
    { url: baseUrl, lastModified: now, priority: 1 },
    { url: `${baseUrl}/projects`, lastModified: now, priority: 0.9 },
    { url: `${baseUrl}/clients`, lastModified: now, priority: 0.9 },
    { url: `${baseUrl}/blogs`, lastModified: now, priority: 0.9 },
    { url: `${baseUrl}/teams`, lastModified: now, priority: 0.9 },
    { url: `${baseUrl}/testimonials`, lastModified: now, priority: 0.9 },
    { url: `${baseUrl}/services/list`, lastModified: now, priority: 0.9 },
    { url: `${baseUrl}/privacypolicy`, lastModified: now, priority: 0.7 },
    { url: `${baseUrl}/terms-and-conditions`, lastModified: now, priority: 0.7 },

    ...blogs.map((id: string) => ({
      url: `${baseUrl}/blogs/detail/${id}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    })),

    ...caseStudies.map((id: string) => ({
      url: `${baseUrl}/services/${id}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    })),
  ];
}
