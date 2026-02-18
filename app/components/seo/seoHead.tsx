'use client';

import { ALTERNATE_UI_URL, SEO_IMAGE } from '@/app/constants/appconstants';
import Head from 'next/head';
interface SeoProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  author?: string;
}

export default function SeoHead({ title = 'Private Psychiatry & Weight Management | Tri-Valley Clinic Fremont', description = 'Physician-led psychiatry and medical weight management in Fremont, CA. Personalized, evidence-based care in a private clinical setting', keywords = '', image = SEO_IMAGE, url = ALTERNATE_UI_URL, author = 'TRI-VALLEY CLINIC' }: SeoProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {url && <link rel="canonical" href={url} />}
    </Head>
  );
}
