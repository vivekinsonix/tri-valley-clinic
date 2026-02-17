import Head from 'next/head';
import Link from 'next/link';
import { Badge } from 'flowbite-react';
import React from 'react';

const Icon = React.memo(({ svg }: { svg: string }) => <div aria-hidden="true" className="[&_svg]:w-6 [&_svg]:h-6" dangerouslySetInnerHTML={{ __html: svg }} />);

/* Skeleton Loader */
const SkeletonView4 = () => (
  <section className="bg-white dark:bg-primary animate-pulse prose ">
    <div className="container mx-auto max-w-7xl  py-12 md:py-16">
      <div className="h-7 w-48 bg-gray-300 dark:bg-gray-700 rounded-md" />
      <div className="flex flex-wrap gap-3 pt-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-8 w-28 bg-gray-300 dark:bg-gray-700 rounded-md" />
        ))}
      </div>
    </div>
  </section>
);

export const VIEW_4 = ({ data, loading }: { data: any; loading: boolean }) => {
  const { view_name, links_tags } = data || {};

  const seoTitle = view_name || 'Useful Links';
  const seoDesc = links_tags?.map((l: any) => l?.label).join(', ') || 'Important resource links';

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDesc} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDesc} />

        <script type="application/ld+json" suppressHydrationWarning>
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: seoTitle,
            description: seoDesc,
            about: links_tags?.map((t: any) => ({
              '@type': 'WebSite',
              name: t?.label,
              url: t?.link,
            })),
          })}
        </script>
      </Head>

      {loading && <SkeletonView4 />}

      {!loading && view_name && (
        <section id={view_name?.toLowerCase()?.replace(/[\/&]/g, '').replace(/\s+/g, '-')} className="bg-white dark:bg-primary prose prose-headings:mt-0">
          <div className="container mx-auto max-w-7xl  py-0">
            {seoTitle && <h1 className="sr-only dark:text-white">{seoTitle}</h1>}
            {view_name && <h2 className="dark:text-white">{view_name}</h2>}

            {links_tags?.length > 0 && (
              <div className="flex flex-wrap gap-3 pt-2">
                {links_tags?.map((tag: any, idx: number) =>
                  tag?.link ? (
                    <Link href={tag?.link || '#'} key={idx} target="_blank" rel="noopener noreferrer">
                      <Badge color="indigo">
                        <div className="inline-flex items-center gap-2 text-sm font-medium">
                          {tag?.icon && <Icon svg={tag.icon} />}
                          <span>{tag?.label}</span>
                        </div>
                      </Badge>
                    </Link>
                  ) : (
                    <Badge color="indigo" key={idx}>
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
        </section>
      )}
    </>
  );
};
