'use client';

import SeoHead from '@/app/components/seo/seoHead';
import ShareBanner from '@/app/components/shareButton/ShareButton';
import { MAIN } from '@/app/components/views/Main';
import { VIEW_1 } from '@/app/components/views/View1';
import { VIEW_2 } from '@/app/components/views/View2';
import { VIEW_3 } from '@/app/components/views/View3';
import { VIEW_4 } from '@/app/components/views/View4';
import { VIEW_5 } from '@/app/components/views/View5';
import { VIEW_6 } from '@/app/components/views/View6';
import { VIEW_7 } from '@/app/components/views/View7';
import { get_case_study_by_slug } from '@/app/services/homePageService';
import { Card } from 'flowbite-react';
import { FacebookIcon, Share2Icon } from 'lucide-react';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';

/* -------------------------------
   ✅ In-memory cache per case study ID
-------------------------------- */
const cachedCaseStudies: Record<string, any> = {};

/* -------------------------------
   ✅ Safe slugify (never returns empty)
-------------------------------- */
const slugify = (input?: string, fallback?: string) => {
  if (!input && fallback) return fallback;
  if (!input) return `section-${Math.random().toString(36).slice(2, 8)}`;

  return input
    .toLowerCase()
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^[-]+|[-]+$/g, '');
};

/* -------------------------------
   ✅ Extract sections safely
-------------------------------- */
const extractViewKeys = (data: any) => {
  const sections: { id: string; label: string }[] = [];

  if (!data || typeof data !== 'object') return sections;

  Object.keys(data)
    .filter((key) => key.startsWith('view'))
    .forEach((key) => {
      const view = data[key];
      if (!view) return;

      if (Array.isArray(view)) {
        view.forEach((item, index) => {
          const label = item?.view_name || item?.title;
          if (!label) return;

          sections.push({
            id: slugify(label, `${key}-${index + 1}`),
            label,
          });
        });
      } else {
        const label = view?.view_name || view?.title;
        if (!label) return;

        sections.push({
          id: slugify(label, key),
          label,
        });
      }
    });

  // ✅ Remove duplicates (absolute safety)
  return Array.from(new Map(sections.map((s) => [s.id, s])).values());
};

/* -------------------------------
   ✅ Page Header (Sticky Nav)
-------------------------------- */
const PAGE_HEADER = React.memo(function PageHeader({ activeSection, sections, onSelect }: { activeSection: string; sections: { id: string; label: string }[]; onSelect: (id: string) => void }) {
  const handleClick = useCallback((event: React.MouseEvent, id: string) => {
    event.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const offset = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: offset - 120, behavior: 'smooth' });
    }
    onSelect(id);
  }, []);

  return (
    <nav className="sticky sm:top-16 md:top-21 top-21  bg-gradient-to-t from-cardlight via-cardlight to-white list-none shadow-lg  " aria-label="Section Navigation" style={{ zIndex: 8 }}>
      <div className="container mx-auto  md:px-0 px-4 overflow-auto">
        <ul className="text-md flex gap-3 py-3 font-semibold md:gap-6">
          {sections.map((s) => (
            <li key={s.id}>
              <Link href={`#${s.id}`} onClick={(e) => handleClick(e, s.id)} className={`inline-flex whitespace-nowrap items-center gap-2 rounded-xl pr-3 py-2 transition-all ${activeSection === s.id ? 'font-bold text-primary hover:text-primary' : 'dark:text-black hover:text-blue-500'}`}>
                {s.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
});

/* -------------------------------
   ✅ Case Study Details Page
-------------------------------- */
export default function Details({ id }: { id: string }) {
  const [data, setData] = useState<any>(null);
  const [activeSection, setActiveSection] = useState('');
  const [loading, setLoading] = useState(false);

  const sections = extractViewKeys(data);
  /* -------------------------------
     ✅ Fetch with cache
  -------------------------------- */
  useEffect(() => {
    const fetchData = async () => {
      if (cachedCaseStudies[id]) {
        setData(cachedCaseStudies[id]);
        return;
      }

      setLoading(true);
      try {
        const res = await get_case_study_by_slug(id);
        const fetched = res?.data?.[0] ?? null;
        cachedCaseStudies[id] = fetched;
        setData(fetched);
      } catch (err) {
        console.error('Failed to fetch case study:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  /* -------------------------------
     ✅ Active section observer
  -------------------------------- */
  useEffect(() => {
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveSection(visible.target.id);
      },
      { threshold: 0.4 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  /* -------------------------------
     ✅ SEO
  -------------------------------- */
  const seoTitle = data?.seo?.metaTitle || data?.main?.title || 'Case Study – Insonix';
  const seoDescription = data?.seo?.metaDescription || data?.main?.sub_title || 'Explore this Insonix case study.';
  const seoKeywords = data?.seo?.keywords || data?.main?.tags?.join(', ') || 'Insonix, Case Study';
  const seoUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/services/${id}`;
  const seoImage = data?.seo?.metaImage || data?.main?.cover_image || '/default-og.jpg.png';

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-white dark:text-s">
      <SeoHead title={seoTitle} description={seoDescription} keywords={seoKeywords} url={seoUrl} image={seoImage} />
      <MAIN content={data?.main || {}} loading={loading} />
      {sections.length > 0 && <PAGE_HEADER activeSection={activeSection} sections={sections} onSelect={setActiveSection} />}
      <main className="relative px-4 py-0 ">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 lg:grid-cols-12 container mx-auto">
          <div className="md:col-span-9">
            <VIEW_1 data={data?.view1 || []} loading={loading} />
            <VIEW_2 data={data?.view2 || {}} loading={loading} />
            {data?.view3 && <VIEW_3 data={data?.view3} loading={loading} />}
            {data?.view4 && <VIEW_4 data={data?.view4} loading={loading} />}
            <VIEW_5 data={data?.view5} loading={loading} />
            {data?.view6 && <VIEW_6 data={data?.view6} loading={loading} />}
            <VIEW_7 data={data?.view_7} loading={loading} />
          </div>
          {!loading && (
            <div className="col-span-6 md:col-span-3 md:block hidden">
              <ShareBanner shareUrl={seoUrl} position="center" />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
