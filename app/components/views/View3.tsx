'use client';

import { RichTextViewer } from '@/app/components/richtext/RichTextViewer';
import SeoHead from '@/app/components/seo/seoHead';
import { Badge, Button, Card } from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

/* ----------------------------------------------------
  SKELETON LOADER
----------------------------------------------------- */
const SkeletonView3 = () => (
  <section className="container mx-auto max-w-7xl  py-12 md:py-16 animate-pulse">
    <div className="h-8 w-56 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
    <div className="h-4 w-full max-w-xl mt-4 bg-gray-300 dark:bg-gray-700 rounded-md"></div>

    <div className="mt-6 flex flex-wrap gap-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-10 w-28 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
      ))}
    </div>

    <div className="mt-6 grid gap-6 md:grid-cols-2">
      {[1, 2].map((i) => (
        <div key={i} className="overflow-hidden rounded-3xl bg-secondary dark:bg-secondary-dark shadow-lg">
          <div className="h-80 w-full bg-gray-300 dark:bg-gray-700"></div>
          <div className="p-6 space-y-2">
            <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded-md"></div>
            <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
          </div>
        </div>
      ))}
    </div>

    <div className="h-4 w-full max-w-xl mt-6 bg-gray-300 dark:bg-gray-700 rounded-md"></div>

    <div className="p-6 mt-5 bg-white dark:bg-secondary-dark rounded-xl shadow-lg">
      <div className="h-6 w-48 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
      <div className="h-4 w-full mt-3 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
      <div className="h-40 w-full mt-4 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
    </div>

    <div className="flex gap-3 mt-4">
      <div className="h-7 w-24 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
      <div className="h-7 w-24 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
    </div>
  </section>
);

/* ----------------------------------------------------
  MAIN COMPONENT
----------------------------------------------------- */

type Tech = {
  id: number;
  label: string;
  icon?: string;
};

type TechCard = {
  id: number;
  name: string;
  technologies: Tech[];
};

interface Props {
  tech_card: TechCard;
}

const Technologies = ({ tech_card }: Props) => {
  return (
    <div className="mt-10 space-y-5">
      <h3 className="text-1xl  mb-3 font-bold">{tech_card?.name} Technologies</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 ">
        {tech_card?.technologies.map((tech) => (
          <div key={tech.id} className="flex">
            <p className="text-sm md:text-base font-medium dark:text-white leading-tight">{tech.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const VIEW_3 = ({ data, loading }: { data: any; loading: boolean }) => {
  const [active, setActive] = useState<number>();

  const { view_name, description_1, description_2, image_card, card_2_title, card_2_description, card_2_image, link_tags, tech_card } = data || {};

  useEffect(() => {
    setActive(image_card?.[0]?.id);
  }, [data]);

  const content = image_card?.find((e: any) => e.id === active);

  /* ------ SEO ------ */
  const seoTitle = view_name || 'Solutions';
  const seoDesc = description_1?.[0]?.children?.[0]?.text || '';
  const seoImg = content?.images?.[0]?.image?.url || '/default-og.jpg.png';

  return (
    <>
      <SeoHead title={seoTitle} description={seoDesc} image={seoImg} />

      {loading && <SkeletonView3 />}

      {!loading && view_name && (
        <section id={view_name?.toLowerCase()?.replace(/[\/&]/g, '').replace(/\s+/g, '-')} className="container mx-auto max-w-7xl prose prose-headings:mt-0  py-12 dark:text-white">
          {view_name && <h2 className="dark:text-white">{view_name}</h2>}

          {description_1 && (
            <div className="mt-3 dark:text-white">
              <RichTextViewer content={description_1} />
            </div>
          )}

          {/* FILTER BUTTONS */}
          <div className="mt-6 flex flex-wrap gap-2">
            {image_card?.map(({ icon, label, id }: any) => {
              const isActive = active === id;

              return (
                <Button key={id} outline={!isActive} onClick={() => setActive(id)} aria-pressed={isActive} className={`flex items-center gap-2 transition-all${isActive ? 'bg-primary-600 text-white border-primary-600 hover:bg-primary-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                  {icon && <span aria-hidden="true" dangerouslySetInnerHTML={{ __html: icon }} className={`[&_svg]:w-6 [&_svg]:h-6 ${isActive ? '[&_svg]:fill-white' : ''}`} />}

                  {label && <span className="text-sm font-bold  ">{label}</span>}
                </Button>
              );
            })}
          </div>

          {/* IMAGES SECTION */}
          {content?.images && (
            <div className="mt-6 grid gap-6 md:grid-cols-2" role="list">
              {content?.images?.map((c: any, i: number) => (
                <article role="listitem" key={i} className="overflow-hidden rounded-3xl bg-secondary dark:bg-secondary-dark shadow-lg">
                  {c?.image?.url && <Image src={c?.image?.url} alt={c?.image?.alt || 'Solution image'} width={900} height={600} loading="lazy" className="h-80 w-full object-cover" />}
                  {c?.description && (
                    <div className="p-6">
                      <RichTextViewer content={c?.description} />
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}

          {/* Description 2 */}
          {description_2 && (
            <div className="mt-3 dark:text-white">
              <RichTextViewer content={description_2} />
            </div>
          )}

          {/* SECOND CARD */}
          {card_2_image ||
            card_2_title ||
            (card_2_description && (
              <Card className="p-0 px-0 my-5">
                {card_2_title && (
                  <h5 className="text-3xl font-bold dark:text-white">
                    <RichTextViewer content={card_2_title} />
                  </h5>
                )}

                {card_2_description && (
                  <div className="font-normal ">
                    <RichTextViewer content={card_2_description} />
                  </div>
                )}

                {card_2_image?.url && (
                  <div className="mt-4 dark:bg-primary/60 bg-secondary p-5 shadow-lg rounded-lg">
                    <Image src={card_2_image.url} alt={card_2_image.alt || 'Solution'} width={1200} height={700} loading="lazy" className="w-full object-cover rounded-lg" />
                  </div>
                )}
              </Card>
            ))}

          {/* TAGS */}
          {link_tags?.length > 0 && (
            <div className="flex flex-wrap gap-3 pt-2">
              {link_tags?.map((tag: any, idx: number) =>
                tag?.link ? (
                  <Link href={tag?.link || '#'} key={idx} target="_blank" rel="noopener noreferrer">
                    <Badge color="indigo">
                      <div className="inline-flex items-center gap-2 text-sm font-medium">
                        {tag?.icon && <span aria-hidden="true" dangerouslySetInnerHTML={{ __html: tag?.icon }} className="[&_svg]:w-6 [&_svg]:h-6" />}
                        {tag?.label}
                      </div>
                    </Badge>
                  </Link>
                ) : (
                  <Badge color="indigo" key={idx}>
                    <div className="inline-flex items-center gap-2 text-sm font-medium">
                      {tag?.icon && <span aria-hidden="true" dangerouslySetInnerHTML={{ __html: tag?.icon }} className="[&_svg]:w-6 [&_svg]:h-6" />}
                      {tag?.label}
                    </div>
                  </Badge>
                )
              )}
            </div>
          )}

          {tech_card && <Technologies tech_card={tech_card} />}
        </section>
      )}
    </>
  );
};
