'use client';

import Image from 'next/image';
import { memo } from 'react';
import SeoHead from '../../components/seo/seoHead';
import { RichTextViewer } from '@/app/components/richtext/RichTextViewer';
import { Button } from 'flowbite-react';
import Link from 'next/link';

interface Props {
  ourLegacy?: any;
  coreDifferentiars: any;
  loading: boolean;
}

const Skeleton = memo(() => (
  <section className="dark:bg-primary py-16 md:py-24 animate-pulse" aria-busy="true" aria-label="Loading About Section">
    <div className="container mx-auto px-4 text-center">
      {/* Section Header */}
      <div className="mb-12">
        <div className="mx-auto mb-3 h-4 w-32 bg-gray-700 rounded"></div>
        <div className="mx-auto h-8 w-64 bg-gray-700 rounded"></div>
      </div>

      {/* Main Grid */}
      <div className="mt-12 grid grid-cols-1 items-center gap-12 md:mt-16 md:grid-cols-2">
        <div className="order-2 max-w-xl space-y-6 md:order-1">
          <div className="h-4 w-full bg-gray-700 rounded"></div>
          <div className="h-4 w-5/6 bg-gray-700 rounded"></div>
          <div className="h-4 w-3/4 bg-gray-700 rounded"></div>
        </div>

        <div className="order-1 flex justify-center md:order-2">
          <div className="h-72 w-full max-w-md bg-gray-700 rounded-xl"></div>
        </div>
      </div>

      {/* Differentiators */}
      <div className="mt-16 md:mt-24">
        <div className="mx-auto mb-8 h-6 w-60 bg-gray-700 rounded"></div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <article key={i} className="rounded-xl bg-gray-800 p-6 shadow-lg" aria-label="Metric placeholder">
              <div className="h-6 w-32 mx-auto bg-gray-600 rounded mb-3"></div>
              <div className="h-4 w-20 mx-auto bg-gray-600 rounded"></div>
            </article>
          ))}
        </div>
      </div>
    </div>
  </section>
));
Skeleton.displayName = 'Skeleton';

export default function About({ ourLegacy, coreDifferentiars, loading }: Props) {
  if (loading) return <Skeleton />;

  const teamImageUrl = ourLegacy?.our_team?.url || '/team.svg';
  const teamAltText = ourLegacy?.our_team?.alternativeText || 'Dolcera Team';

  return (
    <>
      <SeoHead title={ourLegacy?.heading} description={ourLegacy?.paragraph_1} image={ourLegacy?.og_image?.url || undefined} url={ourLegacy?.url || undefined} />
      <main id="about" className=" py-16 dark:bg-foreground " aria-labelledby="about-heading">
        <div className="container mx-auto px-4 text-center">
          <header className="mb-4">
            <p className="mb-2 text-sm font-medium tracking-wider  text-gray-400 uppercase" aria-label="Section name">
              {ourLegacy?.section_name}
            </p>

            <h1 id="about-heading" aria-describedby="about-description">
              {ourLegacy?.heading}
            </h1>
          </header>

          <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-1">
            <article className="mx-auto space-y-2 text-center  prose " id="about-description">
              <RichTextViewer content={ourLegacy?.paragraph_1} />
            </article>
            <div className="md:flex flex-wrap gap-2 justify-center">
              <Link target="_blank" href="/contact">
                <Button size="lg" className="mx-auto md:mb-0 mb-10">
                  Request Appointment
                </Button>
              </Link>
              <Link target="_blank" href="tel:(510) 598-4921">
                <Button outline size="lg" className="mx-auto">
                  Call/Text (510) 598-4921
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
