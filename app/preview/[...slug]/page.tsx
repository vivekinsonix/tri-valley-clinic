// app/preview/[...slug]/page.tsx
import { apiClient } from '@/app/services/apiService';
import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

interface PreviewPageProps {
  params: { slug: string[] };
  searchParams: { locale?: string };
}

export default async function PreviewPage({ params, searchParams }: PreviewPageProps) {
  const { isEnabled } = await draftMode();
  isEnabled ? (await draftMode()).enable() : null;

  const data = await params;

  const [collection, documentId] = data?.slug;

  if (!collection || !documentId) redirect('/');

  const locale = searchParams?.locale || 'en';
  const collection_name = collection === 'case-study' ? 'case-studie' : collection;

  const res = await apiClient.get(`/${collection_name}s`, {
    params: {
      populate: '*',
      locale: locale || 'en',
      status: 'draft',
      'filters[documentId][$eq]': documentId,
    },
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_PREVIEW_TOKEN}`,
    },
  });

  const entry = res?.data?.data?.[0];
  const slug = entry?.attributes?.slug ?? entry?.slug;

  if (!entry || !slug) redirect('/');

  if (collection === 'blog') {
    redirect(`/blogs/detail/${slug}?preview=true&documentId=${documentId}`);
  }

  if (collection === 'job-opening') {
    redirect(`/careers/careersdetail/${slug}?preview=true&documentId=${documentId}`);
  }

  if (collection === 'case-study') {
    redirect(`/services/${slug}?preview=true&documentId=${documentId}`);
  }

  if (collection === 'what-we-build') {
    redirect(`/service/details/${slug}?preview=true&documentId=${documentId}`);
  }

  redirect('/');
}
