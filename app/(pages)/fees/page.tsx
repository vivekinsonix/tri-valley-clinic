'use client';

import SeoHead from '@/app/components/seo/seoHead';
import { MAIN } from '@/app/components/views/Main';
import { VIEW_6 } from '@/app/components/views/View6';
import { ALTERNATE_UI_URL } from '@/app/constants/appconstants';
import { get_fees_structure } from '@/app/services/feesSevice';
import Link from 'next/link';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';

const PAGE_HEADER = memo(function PageHeader({ activeSection, sections, onSelect }: { activeSection: string; sections: { id: string; label: string }[]; onSelect: (id: string) => void }) {
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
    <nav className="sticky sm:top-16 md:top-16 top-15 pt-5  bg-linear-to-t from-cardlight via-cardlight to-white list-none shadow-lg  " aria-label="Section Navigation" style={{ zIndex: 8 }}>
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
  if (!data?.views || !Array.isArray(data?.views)) return [];

  return data.views
    .map((view: any, index: number) => {
      const label = view.view_name || view.title;
      if (!label) return null;

      return {
        id: slugify(label, `view-${index + 1}`),
        label,
      };
    })
    .filter(Boolean);
};

const HeaderSkeleton = () => (
  <nav className="sticky top-12 sm:top-16 bg-white shadow z-10">
    <div className="container mx-auto px-4 py-4 flex gap-4 animate-pulse">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-6 w-24 rounded bg-gray-200" />
      ))}
    </div>
  </nav>
);

export default function PricingTable() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await get_fees_structure();

        setData(res.data?.[0] || null);
      } catch (error) {
        console.error('Error fetching fees data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const sections = useMemo(() => extractViewKeys(data), [data]);
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-white dark:text-black">
      <SeoHead title="Legal Fees and Pricing" keywords="Mirror Wills for you and your spouse,Simple Single Will, Settlement Agreements" description="Are you looking for clear, transparent legal fees in Wembley? At The Legal Practice, we believe in straightforward pricing without hidden costs. Our fixed-fee structure covers a comprehensive range of legal services, including wills, probate, conveyancing, family law, and power of attorney." url={ALTERNATE_UI_URL + '/fees'} />
      <MAIN content={data?.main || {}} loading={loading} />
      {loading ? <HeaderSkeleton /> : sections.length > 0 && <PAGE_HEADER activeSection={activeSection} sections={sections} onSelect={setActiveSection} />}
      <main className="relative px-4 py-0 ">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 lg:grid-cols-12 container mx-auto">
          <div className="md:col-span-9">
            {data?.views?.map((view: any, index: number) => {
              const id = sections[index]?.id || `section-${index}`;
              return <VIEW_6 key={id} data={view} loading={false} />;
            })}
          </div>
          {!loading && <div className="col-span-6 md:col-span-3 md:block hidden"></div>}
        </div>
      </main>
    </div>
  );
}
