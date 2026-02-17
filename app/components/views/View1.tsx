/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { RichTextViewer } from '@/app/components/richtext/RichTextViewer';
import SeoHead from '@/app/components/seo/seoHead';
import { Badge } from 'flowbite-react';
import Image from 'next/image';
import { useMemo } from 'react';

/* -------------------------------------------
   SKELETON
------------------------------------------- */
const SkeletonSection = () => (
  <section className="container mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 md:grid-cols-2 animate-pulse">
    <div className="h-64 w-full bg-gray-300 dark:bg-gray-700 rounded-3xl" />
    <div className="space-y-4">
      <div className="h-8 w-3/4 bg-gray-300 dark:bg-gray-700 rounded-md" />
      <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded-md" />
      <div className="h-4 w-5/6 bg-gray-300 dark:bg-gray-700 rounded-md" />
      <div className="h-4 w-4/6 bg-gray-300 dark:bg-gray-700 rounded-md" />

      <div className="flex gap-3 pt-2">
        <div className="h-7 w-20 bg-gray-300 dark:bg-gray-700 rounded-md" />
        <div className="h-7 w-20 bg-gray-300 dark:bg-gray-700 rounded-md" />
      </div>
    </div>
  </section>
);

/* -------------------------------------------
   VIEW_1 COMPONENT
------------------------------------------- */
export const VIEW_1 = ({ data, loading }: { data: any; loading: boolean }) => {
  /* --- SEO data memoized --- */
  const seoData = useMemo(() => {
    const first = data?.[0];
    return {
      title: first?.seo_title || 'Section Overview',
      description: first?.seo_description || '',
      image: first?.seo_image || '/default-og.jpg.png',
      url: '',
      keywords: first?.seo_keywords || first?.view_name,
    };
  }, [data]);

  /* --- Show Skeleton while loading --- */
  if (loading) return <SkeletonSection />;

  /* --- No Data --- */
  if (!data?.length) return null;

  return (
    <>
      {/* ------------ Global SEO for this section ------------ */}
      <SeoHead title={seoData.title} description={seoData.description} keywords={seoData.keywords} image={seoData.image} url={seoData.url} />

      {data.map((item: any, index: number) => {
        if (!item?.view_name) return null;

        const position = item?.image_position === 'right' ? 'right' : 'left';
        const isLeft = position === 'left';
        const hasImage = !!item?.image?.url;

        return (
          <section
            key={index}
            id={item.view_name.toLowerCase().replace(/[\/&]/g, '').replace(/\s+/g, '-')}
            className={`container prose prose-headings:mt-0 mx-auto max-w-7xl items-center gap-10 px-0  dark:bg-white dark:text-black
              ${hasImage ? 'grid md:grid-cols-1' : 'grid grid-cols-1'}
            `}
          >
            {/* ---------------- IMAGE LEFT ---------------- */}
            {/* {isLeft && hasImage && (
              <div className="relative h-80 w-full rounded-3xl shadow-lg overflow-hidden">
                <Image
                  src={item.image.url}
                  alt={item.view_name || 'Section image'}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            )} */}

            {/* ---------------- CONTENT ---------------- */}
            <div className={`space-y-4 ${!hasImage ? 'md:col-span-1' : ''}`}>
              <h2 className="dark:text-white">
                <RichTextViewer content={item.view_name} />
              </h2>

              {item?.paragraph_1 && <RichTextViewer content={item.paragraph_1} />}
              {item?.paragraph_2 && <RichTextViewer content={item.paragraph_2} />}
              {item?.paragraph_3 && <RichTextViewer content={item.paragraph_3} />}
              {item?.paragraph_4 && <RichTextViewer content={item.paragraph_4} />}

              {item?.tags?.length > 0 && (
                <div className="flex flex-wrap gap-3 pt-2">
                  {item.tags.map((tag: string, idx: number) => (
                    <Badge key={idx} color="indigo" aria-label={`Tag: ${tag}`}>
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* ---------------- IMAGE RIGHT ---------------- */}
            {/* {!isLeft && hasImage && (
              <div className="relative h-80 w-full rounded-3xl shadow-lg overflow-hidden">
                <Image
                  src={item.image.url}
                  alt={item.view_name || 'Section image'}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            )} */}
          </section>
        );
      })}
    </>
  );
};
