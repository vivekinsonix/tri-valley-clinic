import { Badge } from 'flowbite-react';
import Head from 'next/head';
import Link from 'next/link';
import React, { useMemo } from 'react';
import { RichTextViewer } from '../richtext/RichTextViewer';
import { WhatsAppButton } from '../whatsapp/WhatsAppButton';

const Icon = React.memo(({ svg }: { svg: string }) => <div aria-hidden="true" className="[&_svg]:w-6 [&_svg]:h-6 [&_svg]:mx-auto" dangerouslySetInnerHTML={{ __html: svg }} />);

const SkeletonView5 = () => (
  <section className="bg-white dark:bg-primary animate-pulse">
    <div className="container mx-auto max-w-7xl  py-12 md:py-16">
      <div className="h-7 w-48 bg-gray-300 dark:bg-gray-700 rounded-md" />
      <div className="mt-4 h-5 w-2/3 bg-gray-300 dark:bg-gray-700 rounded-md" />
      <div className="flex flex-wrap gap-3 pt-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-8 w-28 bg-gray-300 dark:bg-gray-700 rounded-md" />
        ))}
      </div>
    </div>
  </section>
);

const SkeletonView6 = () => (
  <section className="mx-auto bg-white dark:bg-primary px-4 py-12 md:py-16 animate-pulse">
    <div className="mx-auto max-w-7xl">
      <div className="h-7 w-48 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
      <div className="mt-4 h-5 w-3/4 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
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

const View6_block = ({ data, loading }: { data: any; loading: boolean }) => {
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
        <div className="mx-auto max-w-7xl">
          <h2 className="dark:text-white">
            <RichTextViewer content={view_name || ''} />
          </h2>
          <div className="mt-2 mb-5 text-sm">
            <RichTextViewer content={title || ''} />
          </div>
          <div className="grid max-w-7xl gap-8 md:grid-cols-3">
            {orderedCards.map((card: any, index: number) => {
              const isPopular = card?.isFamous;
              const { title, description, amount, plan, feature_list, badge } = card || {};

              return (
                <div key={index}>
                  {isPopular ? (
                    /* MOST POPULAR CARD */
                    <div className="relative flex scale-105 flex-col items-center rounded-2xl bg-gradient-to-b from-blue-600 to-blue-500 p-8 text-center text-white shadow-2xl hover:scale-110 transition-all">
                      <span className="absolute top-4 right-4 rounded-full bg-white/20 px-2 py-1 text-xs font-medium text-white">{badge || ''}</span>

                      {title && (
                        <h3 className="mb-3 text-2xl font-semibold">
                          <RichTextViewer content={title || ''} />
                        </h3>
                      )}
                      {description && (
                        <div className="mb-6 text-blue-100">
                          <RichTextViewer content={description || ''} />
                        </div>
                      )}
                      {amount && (
                        <div className="mb-4 text-3xl font-bold">
                          <RichTextViewer content={amount || ''} />
                        </div>
                      )}
                      {plan && (
                        <div className="mb-6 text-sm text-blue-100">
                          <RichTextViewer content={plan || ''} />
                        </div>
                      )}

                      {feature_list && (
                        <ul className="mb-6 space-y-2 text-left text-blue-50">
                          <RichTextViewer content={feature_list || ''} />
                        </ul>
                      )}

                      <WhatsAppButton
                        outline
                        label="Book Sprint"
                        payload={{
                          title,
                          amount,
                          plan,
                          source: 'Pricing - Popular Plan',
                          pageUrl: typeof window !== 'undefined' ? window.location.href : '',
                        }}
                      />
                    </div>
                  ) : (
                    /* NORMAL CARD */
                    <div className="relative flex flex-col items-center rounded-2xl border-0 bg-white dark:bg-secondary-dark p-8 text-center shadow-md  hover:shadow-xl hover:scale-110 transition-all">
                      <span className="absolute top-4 right-4 rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-600">{badge || ''}</span>

                      {title && (
                        <h3 className="mb-3 text-2xl font-semibold">
                          <RichTextViewer content={title || ''} />
                        </h3>
                      )}
                      {description && (
                        <div className="mb-6 text-gray-600 dark:text-gray-300">
                          <RichTextViewer content={description || ''} />
                        </div>
                      )}
                      {amount && (
                        <div className="mb-4 text-3xl font-bold">
                          <RichTextViewer content={amount || ''} />
                        </div>
                      )}
                      {plan && (
                        <div className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                          <RichTextViewer content={plan || ''} />
                        </div>
                      )}

                      {feature_list && (
                        <ul className="mb-6 space-y-2 text-left text-gray-700 dark:text-gray-300">
                          <RichTextViewer content={feature_list || ''} />
                        </ul>
                      )}

                      <WhatsAppButton
                        outline
                        label="Get Started"
                        payload={{
                          title,
                          amount,
                          plan,
                          source: 'Pricing - Popular Plan',
                          pageUrl: typeof window !== 'undefined' ? window.location.href : '',
                        }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
export const VIEW_5 = ({ data, loading }: { data: any; loading: boolean }) => {
  const { view_name, links_tags, description, view6_block } = data || {};

  const seoTitle = view_name || 'Resources';
  const seoDesc = description || links_tags?.map((l: any) => l?.label).join(', ') || 'Helpful resource links';

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDesc} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* OG Tags */}
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDesc} />
        <meta property="og:type" content="website" />

        {/* Twitter Tags */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDesc} />

        {/* JSON-LD */}
        <script type="application/ld+json" suppressHydrationWarning>
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: seoTitle,
            description: seoDesc,
            about: links_tags?.map((tag: any) => ({
              '@type': 'WebSite',
              url: tag?.link,
              name: tag?.label,
            })),
          })}
        </script>
      </Head>

      {/* ---------- SKELETON ---------- */}
      {loading && <SkeletonView5 />}

      {/* ---------- REAL CONTENT ---------- */}
      {!loading && view_name && (
        <section id={view_name?.toLowerCase()?.replace(/[\/&]/g, '').replace(/\s+/g, '-')} className="bg-white dark:bg-primary prose prose-headings:mt-0 mx-auto max-w-7xl py-4 dark:text-white">
          <div className="container mx-auto max-w-7xl">
            {/* Accessible main heading */}
            {seoTitle && <h1 className="sr-only">{seoTitle}</h1>}

            <h2 className="dark:text-white">{view_name || ''}</h2>

            {description && (
              <div className="mt-2">
                <RichTextViewer content={description} />
              </div>
            )}

            {links_tags?.length > 0 && (
              <div className="flex flex-wrap gap-3 pt-2">
                {links_tags?.map((tag: any, idx: number) =>
                  tag?.link ? (
                    <Link href={tag?.link || '#'} key={idx} target="_blank" rel="noopener noreferrer">
                      <Badge color="indigo" className="!text-white !bg-indigo-600">
                        <div className="inline-flex items-center gap-2 text-sm font-medium">
                          {tag?.icon && <Icon svg={tag.icon} />}
                          <span>{tag?.label}</span>
                        </div>
                      </Badge>
                    </Link>
                  ) : (
                    <Badge color="indigo" key={idx} className="!text-white !bg-indigo-600">
                      <div className="inline-flex items-center gap-2 text-sm font-medium">
                        {tag?.icon && <Icon svg={tag.icon} />}
                        <span>{tag?.label}</span>
                      </div>
                    </Badge>
                  )
                )}
              </div>
            )}
          </div>
          {view6_block && <View6_block data={view6_block} loading={loading} />}
        </section>
      )}
    </>
  );
};
