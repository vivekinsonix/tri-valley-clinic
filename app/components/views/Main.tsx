/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Button } from 'flowbite-react';
import SeoHead from '@/app/components/seo/seoHead';
import Image from 'next/image';
import { useMemo } from 'react';
import { WhatsAppButton } from '../whatsapp/WhatsAppButton';

/* -------------------------------------------------------
 SKELETON
--------------------------------------------------------- */
const SkeletonMAIN = () => (
  <section className="relative isolate overflow-hidden pt-24 animate-pulse">
    <div className="absolute inset-0 -z-10">
      <div className="h-full w-full bg-gray-200 dark:bg-gray-700" />
    </div>

    <div className="mx-auto container  px-4 py-8 dark:text-white md:py-8">
      <div className="h-10 w-2/3 bg-gray-300 dark:bg-gray-700 rounded-md mb-4" />
      <div className="h-5 w-1/2 bg-gray-300 dark:bg-gray-700 rounded-md mb-8" />
      <div className="flex gap-3">
        <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded-md" />
        <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded-md" />
      </div>
    </div>
  </section>
);

/* -------------------------------------------------------
 MAIN COMPONENT
--------------------------------------------------------- */
export const MAIN = ({ content, loading }: { content: any; loading: boolean }) => {
  const { title, sub_title, buttons, cover_image, seo } = content || {};

  /* -------------------------------------------------------
   SEO (Memoized to avoid re-renders)
  --------------------------------------------------------- */
  const seoData = useMemo(() => {
    const seoTitle = seo?.metaTitle || title || 'Page';
    const seoDesc = seo?.metaDescription || sub_title || '';
    const seoImage = cover_image?.url || seo?.image || '/default-og.jpg.png';
    const seoURL = seo?.canonicalURL || '';

    return {
      title: seoTitle,
      description: seoDesc,
      keywords: seo?.keywords || title,
      image: seoImage,
      url: seoURL,
    };
  }, [seo, title, sub_title, cover_image]);

  const imageUrl = cover_image?.url || '';

  /* -------------------------------------------------------
   MAIN UI
  --------------------------------------------------------- */

  if (loading) return <SkeletonMAIN />;

  return (
    <>
      {/* --------------------- SEO HEAD --------------------- */}
      <SeoHead title={seoData.title} description={seoData.description} keywords={seoData.keywords} url={seoData.url} image={seoData.image} />

      {/* --------------------- HERO SECTION ------------------ */}
      <section className="relative isolate overflow-hidden pt-24 dark:bg-primary">
        {/* Background image */}
        {imageUrl ? (
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <Image src={imageUrl} alt={title || 'Background Image'} fill priority={true} className="object-cover" />
            {/* Overlay */}
            <div className="absolute inset-0 bg-white dark:bg-primary opacity-70" />
          </div>
        ) : (
          <div className="absolute inset-0 -z-10 bg-white dark:bg-primary" />
        )}

        {/* Content */}
        <div className="mx-auto container md:px-0 px-4  dark:text-white  py-8">
          {/* Title */}
          {title && <h1>{title}</h1>}

          {/* Subtitle */}
          {sub_title && <p className="mt-4  text-lg dark:text-white/90">{sub_title}</p>}

          {/* Buttons */}
          {!!buttons?.length && (
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {buttons?.map((btn: any) => (
                <WhatsAppButton
                  outline
                  className=""
                  key={btn?.name}
                  label={btn?.name}
                  payload={{
                    title,
                    source: btn?.name,
                    pageUrl: typeof window !== 'undefined' ? window.location.href : '',
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};
