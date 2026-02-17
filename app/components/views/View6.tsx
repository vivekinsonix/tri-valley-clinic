import Head from 'next/head';
import { useMemo } from 'react';
import { RichTextViewer } from '@/app/components/richtext/RichTextViewer';
import { Button } from 'flowbite-react';
import { WhatsAppButton } from '../whatsapp/WhatsAppButton';

/* ----------------------------------------------------
  SKELETON LOADER FOR VIEW_6 (safe & clean)
----------------------------------------------------- */
const SkeletonView6 = () => (
  <section className="mx-auto bg-white dark:bg-primary px-4 py-12 md:py-16 animate-pulse">
    <div className="mx-auto max-w-7xl">
      {/* Title */}
      <div className="h-7 w-48 bg-gray-300 dark:bg-gray-700 rounded-md"></div>

      {/* Subtitle */}
      <div className="mt-4 h-5 w-3/4 bg-gray-300 dark:bg-gray-700 rounded-md"></div>

      {/* Cards */}
      <div className="grid mt-10 max-w-7xl gap-8 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-2xl bg-gray-200 dark:bg-gray-800 p-6 h-80">
            <div className="h-5 w-20 bg-gray-300 dark:bg-gray-700 rounded-md mb-4"></div>
            <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-700 rounded-md mb-3"></div>
            <div className="h-8 w-32 bg-gray-300 dark:bg-gray-700 rounded-md mb-3"></div>
            <div className="h-4 w-2/3 bg-gray-300 dark:bg-gray-700 rounded-md mb-3"></div>
            <div className="h-10 w-full bg-gray-300 dark:bg-gray-700 rounded-md"></div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ----------------------------------------------------
  MAIN COMPONENT: VIEW_6
----------------------------------------------------- */
export const VIEW_6 = ({ data, loading }: { data: any; loading: boolean }) => {
  const { title, pricing_cards, view_name } = data || {};

  // Ensure the popular (isFamous) card is rendered in the visual center
  const orderedCards = useMemo(() => {
    if (!pricing_cards || !Array.isArray(pricing_cards)) return [];
    const arr = [...pricing_cards];
    const popularIndex = arr.findIndex((c: any) => c?.isFamous);
    if (popularIndex === -1) return arr;
    const [popular] = arr.splice(popularIndex, 1);
    const middle = Math.floor(arr.length / 2);
    return [...arr.slice(0, middle), popular, ...arr.slice(middle)];
  }, [pricing_cards]);

  /* ---------------- SEO ---------------- */
  const seoTitle = view_name || 'Outcomes';
  const seoDesc = title || (pricing_cards && pricing_cards[0]?.description?.slice(0, 150)) || 'Outcome and pricing details';

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

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ProductGroup',
              name: seoTitle,
              description: seoDesc,
              hasVariant:
                pricing_cards?.map((card: any) => ({
                  '@type': 'Product',
                  name: card?.title,
                  description: card?.description,
                  offers: {
                    '@type': 'Offer',
                    price: card?.amount,
                    priceCurrency: 'USD',
                  },
                })) || [],
            }),
          }}
        />
      </Head>

      {/* ---------- SKELETON WHILE LOADING ---------- */}
      {loading && <SkeletonView6 />}

      {/* ---------- REAL CONTENT WHEN LOADED ---------- */}
      {!loading && view_name && (
        <section id={view_name?.toLowerCase()?.replace(/[\/&]/g, '').replace(/\s+/g, '-')} className="container mx-auto max-w-7xl prose prose-headings:mt-0 bg-white dark:bg-white px-0 md:px-0 dark:text-black pb-12 pt-4">
          <div className="mx-auto max-w-7xl">
            <h2 className="dark:text-white mb-10">
              <RichTextViewer content={view_name || ''} />
            </h2>
            <div className="mt-2  text-sm dark:text-gray-300">
              <RichTextViewer content={title || ''} />
            </div>
            <div className="grid max-w-7xl gap-8 md:grid-cols-3">
              {orderedCards.map((card: any, index: number) => {
                const isPopular = card?.isFamous;
                const { title, description, amount, plan, feature_list, badge } = card || {};

                return (
                  <div key={index} className="shadow-2xl relative mx-2 md:mx-0 flex scale-105 flex-col rounded-xl items-center shadow-2xl mb-10 hover:scale-110 transition-all">
                    {isPopular ? (
                      /* MOST POPULAR CARD */
                      <div className="flex h-full w-full flex-col bg-gradient-to-b from-primary to-primary p-4 text-center text-white">
                        {/* Badge */}
                        <span className="self-end bg-white/20 px-2 py-1 text-xs font-medium text-white">{badge || ''}</span>

                        {/* Title */}
                        {title && (
                          <h3 className="mt-4 text-2xl font-semibold">
                            <RichTextViewer content={title} />
                          </h3>
                        )}

                        {/* Description */}
                        {description && (
                          <div className="text-blue-100">
                            <RichTextViewer content={description} />
                          </div>
                        )}

                        {/* Amount */}
                        {amount && (
                          <div className="text-3xl font-bold">
                            <RichTextViewer content={amount} />
                          </div>
                        )}

                        {/* Plan */}
                        {plan && (
                          <div className="text-sm text-blue-100">
                            <RichTextViewer content={plan} />
                          </div>
                        )}

                        {/* Feature List */}
                        {feature_list && (
                          <ul className="mt-2 space-y-2 text-left text-blue-50">
                            <RichTextViewer content={feature_list} />
                          </ul>
                        )}

                        {/* Spacer pushes button to bottom */}
                        <div className="mt-auto pt-4">
                          <WhatsAppButton
                            outline
                            className="w-full bg-white text-black hover:bg-white/80  dark:bg-white dark:text-black hover:dark:bg-white/70"
                            label="Contact Us"
                            payload={{
                              title,
                              amount,
                              plan,
                              source: 'Pricing - Popular Plan',
                              pageUrl: typeof window !== 'undefined' ? window.location.href : '',
                            }}
                          />
                        </div>
                      </div>
                    ) : (
                      /* NORMAL CARD */
                      <div className="flex w-full flex-col border-0 bg-white h-full dark:bg-secondary-dark p-4 text-center shadow-md  hover:shadow-xl hover:scale-110 transition-all">
                        <span className="absolute top-4 right-4  bg-blue-100 px-2 py-1 text-xs font-medium text-blue-600">{badge || ''}</span>

                        {title && (
                          <h3 className=" text-2xl !mt-4 font-semibold">
                            <RichTextViewer content={title || ''} />
                          </h3>
                        )}
                        {description && (
                          <div className=" text-gray-600 dark:text-gray-300">
                            <RichTextViewer content={description || ''} />
                          </div>
                        )}
                        {amount && (
                          <div className="text-3xl font-bold">
                            <RichTextViewer content={amount || ''} />
                          </div>
                        )}
                        {plan && (
                          <div className=" text-sm text-gray-500 dark:text-gray-400">
                            <RichTextViewer content={plan || ''} />
                          </div>
                        )}

                        {feature_list && (
                          <ul className="mt-0 space-y-2 text-left text-gray-700 dark:text-gray-700">
                            <RichTextViewer content={feature_list || ''} />
                          </ul>
                        )}
                        <div className="mt-auto pt-4">
                          <WhatsAppButton
                            className="w-full"
                            outline
                            label="Contact Us"
                            payload={{
                              title,
                              amount,
                              plan,
                              source: 'Pricing - Popular Plan',
                              pageUrl: typeof window !== 'undefined' ? window.location.href : '',
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
};
