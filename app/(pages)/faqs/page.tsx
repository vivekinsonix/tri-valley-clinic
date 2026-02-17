'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

import { VIEW_7 } from '@/app/components/views/View7';
import { getFaqs } from '@/app/services/faqServices';
import { MAIN } from '@/app/components/views/Main';

/* ---------------------------------- utils --------------------------------- */

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

const extractViewKeys = (data: any) => {
  const sections: { id: string; label: string }[] = [];

  if (!data || typeof data !== 'object') return sections;

  Object.keys(data)
    .filter((key) => key.startsWith('view_'))
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

  return Array.from(new Map(sections.map((s) => [s.id, s])).values());
};

/* ------------------------------ skeletons ---------------------------------- */

const HeaderSkeleton = () => (
  <nav className="sticky top-12 sm:top-16 bg-white shadow z-10">
    <div className="container mx-auto px-4 py-4 flex gap-4 animate-pulse">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-6 w-24 rounded bg-gray-200" />
      ))}
    </div>
  </nav>
);

const FAQSkeleton = () => (
  <div className="space-y-8 animate-pulse">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="space-y-3">
        <div className="h-6 w-2/3 rounded bg-gray-200" />
        <div className="h-4 w-full rounded bg-gray-200" />
        <div className="h-4 w-5/6 rounded bg-gray-200" />
        <div className="h-4 w-4/6 rounded bg-gray-200" />
      </div>
    ))}
  </div>
);

/* ------------------------------ page header -------------------------------- */

const PAGE_HEADER = React.memo(function PageHeader({ activeSection, sections, onSelect }: { activeSection: string; sections: { id: string; label: string }[]; onSelect: (id: string) => void }) {
  const handleClick = useCallback(
    (event: React.MouseEvent, id: string) => {
      event.preventDefault();
      const el = document.getElementById(id);
      if (el) {
        const offset = el.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: offset - 120, behavior: 'smooth' });
      }
      onSelect(id);
    },
    [onSelect]
  );

  return (
    <nav className="sticky sm:top-16 md:top-16 top-12 bg-gradient-to-t from-cardlight via-cardlight to-white shadow-lg" aria-label="Section Navigation" style={{ zIndex: 8 }}>
      <div className="container mx-auto md:px-0 px-4 overflow-auto">
        <ul className="text-md flex gap-3 py-3 font-semibold md:gap-6">
          {sections.map((s) => (
            <li key={s.id}>
              <Link href={`#${s.id}`} onClick={(e) => handleClick(e, s.id)} className={`inline-flex whitespace-nowrap items-center gap-2 rounded-xl pr-3 py-2 transition-all ${activeSection === s.id ? 'font-bold text-primary' : 'hover:text-blue-500'}`}>
                {s.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
});

/* ---------------------------------- page ---------------------------------- */

const Page = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('');

  /* ------------------------------- fetch faqs ------------------------------- */
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        setLoading(true);
        const response = await getFaqs();
        setData(response?.data?.data?.[0] || null);
      } catch (error) {
        console.error('Error fetching FAQs:', error);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  /* ------------------------------- sections -------------------------------- */
  const sections = useMemo(() => extractViewKeys(data), [data]);

  /* --------------------------------- views --------------------------------- */
  const views = useMemo(() => {
    if (!data) return [];

    return Object.entries(data)
      .filter(([key, value]) => key.startsWith('view_') && value !== null && value !== undefined && (Array.isArray(value) ? value.length > 0 : true))
      .map(([_, value]) => value);
  }, [data]);

  /* ---------------------------------- UI ----------------------------------- */
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <MAIN content={data?.main || {}} loading={loading} />

      {loading ? <HeaderSkeleton /> : sections.length > 0 && <PAGE_HEADER activeSection={activeSection} sections={sections} onSelect={setActiveSection} />}

      <main className="relative px-4 py-0">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 container mx-auto">
          <div className="md:col-span-9 mt-10">
            {loading ? (
              <FAQSkeleton />
            ) : views.length > 0 ? (
              views.map((view: any, index: number) => {
                const id = sections[index]?.id || `section-${index}`;
                return <VIEW_7 key={id} data={view} loading={false} />;
              })
            ) : (
              <div className="text-center py-20 text-gray-500 text-lg font-medium">No FAQs available</div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
