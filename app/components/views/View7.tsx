import Head from 'next/head';
import { RichTextViewer } from '@/app/components/richtext/RichTextViewer';
import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';

/* ----------------------------------------------------
  SKELETON LOADER FOR FAQ VIEW
----------------------------------------------------- */
const SkeletonView7 = () => (
  <section className="px-4 py-44 md:py-44 animate-pulse">
    <div className="container mx-auto max-w-7xl">
      {/* Title */}
      <div className="h-7 w-48 bg-gray-300 dark:bg-gray-700 rounded-md"></div>

      {/* Subtitle */}
      <div className="mt-4 h-5 w-3/4 bg-gray-300 dark:bg-gray-700 rounded-md"></div>

      {/* FAQ Items */}
      <div className="mt-10 space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-2xl bg-gray-200 dark:bg-gray-800 p-6 h-20">
            <div className="h-4 w-2/3 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ----------------------------------------------------
  MAIN FAQ COMPONENT
----------------------------------------------------- */
export const VIEW_7 = ({ data, loading }: { data: any; loading: boolean }) => {
  const { faq, title, view_name } = data || {};

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  /* ---------------- SEO ---------------- */
  const seoTitle = view_name || 'FAQ';
  const seoDesc = title || (faq && faq[0]?.ques?.slice(0, 120)) || 'Frequently asked questions and helpful answers.';

  return (
    <>
      {/* ---------------- SEO BLOCK ---------------- */}
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDesc} />

        {/* OG */}
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDesc} />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDesc} />

        {/* JSON-LD FAQ Structured Data */}
        {faq && faq.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: faq.map((item: any) => ({
                  '@type': 'Question',
                  name: item?.ques,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: item?.ans,
                  },
                })),
              }),
            }}
          />
        )}
      </Head>

      {/* ---------- Skeleton on Load ---------- */}
      {loading && <SkeletonView7 />}

      {/* ---------- Render UI when Loaded ---------- */}
      {!loading && view_name && (
        <section id={view_name?.toLowerCase()?.replace(/[\/&]/g, '').replace(/\s+/g, '-')}>
          <div
            className="
  container mx-auto max-w-7xl py-4 
  prose prose-headings:mt-0 
  prose-neutral dark:prose-neutral 
  text-gray-800 dark:text-black
"
          >
            {view_name && (
              <h2>
                <RichTextViewer content={view_name || ''} />
              </h2>
            )}
            {title && (
              <div className="mt-2 mb-5 text-sm text-slate-600 dark:text-black">
                <RichTextViewer content={title || ''} />
              </div>
            )}

            {faq?.length > 0 && (
              <div className="space-y-4 mt-2">
                {faq?.map((faq: { id: number; ques: string; ans: string }, index: number) => {
                  const isOpen = openIndex === index;

                  return (
                    <div key={index} className={`rounded-2xl bg-white dark:bg-white shadow-sm transition-all duration-300 ${isOpen ? 'border-blue-200 bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-gray-50 dark:hover:bg-secondary-dark'}`}>
                      <button onClick={() => toggleFAQ(index)} className="flex w-full justify-between items-center px-6 py-3 text-left font-medium text-gray-800 dark:text-black focus:outline-none">
                        <span className="text-lg">
                          <RichTextViewer content={faq?.ques || ''} />
                        </span>

                        <span className="ml-4 text-2xl text-blue-600 dark:text-black transition-transform duration-300">{isOpen ? <Minus /> : <Plus />}</span>
                      </button>

                      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="px-6 pb-6 text-gray-700 dark:text-black">
                          <RichTextViewer content={faq?.ans || ''} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};
