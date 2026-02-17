'use client';

import { RichTextViewer } from '@/app/components/richtext/RichTextViewer';
import SeoHead from '@/app/components/seo/seoHead';
import { ALTERNATE_UI_URL } from '@/app/constants/appconstants';
import { getGlobalPageDataBySlug } from '@/app/services/globalPageService';
import { About, MediaImage } from '@/app/utils/Interfaces';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

/* =======================
   Interfaces
======================= */

let cachedAbout: About | null = null;

const SkeletonAbout = () => (
  <div className="mx-auto max-w-7xl px-6">
    <div className="mb-6 h-10 w-48 animate-pulse rounded bg-gray-300 dark:bg-gray-700"></div>
    <div className="mb-6 h-6 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
    <div className="relative mb-6 h-[420px] w-full overflow-hidden rounded-xl bg-gray-200 dark:bg-gray-800 animate-pulse" />
    <div className="space-y-3">
      <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
      <div className="h-4 w-5/6 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
      <div className="h-4 w-11/12 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
      <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
    </div>
  </div>
);

const ImageCarousel = ({ images, alt }: { images: MediaImage[]; alt?: string }) => {
  const [current, setCurrent] = useState(0);

  if (!images?.length) return null;

  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

  return (
    <div className="relative mb-12">
      <div className="relative h-[420px] w-full overflow-hidden rounded-xl shadow-xl">
        <Image src={images[current]?.url} alt={alt || ''} fill priority className="object-cover" />
      </div>

      {images.length > 1 && (
        <>
          <button onClick={prev} aria-label="Previous image" className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70">
            <ChevronLeft size={22} />
          </button>

          <button onClick={next} aria-label="Next image" className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70">
            <ChevronRight size={22} />
          </button>
        </>
      )}

      <div className="mt-4 flex justify-center gap-2">
        {images.map((_, idx) => (
          <button key={idx} onClick={() => setCurrent(idx)} className={`h-2 rounded-full transition-all ${current === idx ? 'w-6 bg-gray-900 dark:bg-white' : 'w-2 bg-gray-400'}`} />
        ))}
      </div>
    </div>
  );
};

const Details = ({ slug }: { slug: Record<string, string> }) => {
  const [dataObj, setDataObj] = useState<About | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchAbout = async () => {
    if (cachedAbout) {
      setDataObj(cachedAbout);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const res = await getGlobalPageDataBySlug(slug?.id);

      const data = res || null;

      setDataObj(data);

      if (data) {
        cachedAbout = data;
      }
    } catch (err) {
      console.error('Error fetching about page:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAbout();
  }, []);

  const seoData = useMemo(() => {
    if (!dataObj) {
      return {
        seoTitle: '',
        seoDescription: '',
        seoKeywords: '',
        seoCanonical: '',
        imageUrl: '/placeholder.jpg',
      };
    }

    const seo = dataObj.Seo;
    const img = dataObj.images?.[0]?.formats?.medium?.url || dataObj.images?.[0]?.url || '/default-og.jpg.png';

    const root = process.env.NEXT_PUBLIC_BASE_URL || ALTERNATE_UI_URL;

    return {
      seoTitle: seo?.metaTitle || dataObj?.title,
      seoDescription: seo?.metaDescription || dataObj.title,
      seoKeywords: seo?.keywords || 'About Dolcera, Dolcera Services',
      seoCanonical: seo?.canonicalURL || `${root}/page/${slug?.id}`,
      imageUrl: img,
    };
  }, [dataObj]);

  return (
    <>
      <SeoHead title={seoData.seoTitle} description={seoData.seoDescription} keywords={seoData.seoKeywords} image={seoData.imageUrl} url={seoData.seoCanonical} />
      <section className="mt-10 py-16 dark:bg-primary dark:text-white">
        <article className="container mx-auto max-w-7xl px-6">
          {loading ? (
            <SkeletonAbout />
          ) : (
            <>
              <header className="mb-8 mt-5 text-center">
                <h2 className="text-3xl font-bold md:text-4xl">{dataObj?.title}</h2>
              </header>

              {dataObj?.images?.length ? <ImageCarousel images={dataObj.images} alt={dataObj.title} /> : null}

              <div className="prose max-w-none prose-lg dark:prose-invert">
                <RichTextViewer content={dataObj?.content || ''} />
              </div>
            </>
          )}
        </article>
      </section>
    </>
  );
};

export default Details;
