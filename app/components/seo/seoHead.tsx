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

export default function SeoHead({
  title = 'Legal Practice - Leading Patent Analytics Company',
  description = '60 YEARS OF TRUSTED LEGAL SERVICE',
  keywords = 'Legal Fees and Pricing, Legal Fee Structures, Legal Billing Models, Legal Cost Management, Legal Pricing Strategies, Legal Fee Transparency, Legal Fee Comparison, Legal Fee Trends, Legal Fee Analysis, Legal Fee Optimization , Legal Fee Negotiation, Legal Fee Forecasting, Legal Fee Benchmarking, Legal Fee Insights, Legal Fee Solutions, Legal Fee Consultation, Legal Fee Resources, Legal Fee Guides, Legal Fee Articles',
  image = SEO_IMAGE,
  url = ALTERNATE_UI_URL,
  author = 'Legal Practice Team',
}: SeoProps) {
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
