'use client';

import { get_case_studies_paginated } from '@/app/services/homePageService';
import { Button } from 'flowbite-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
type CaseStudy = {
  documentId: string;
  main?: {
    title?: string;
    sub_title?: string;
    description?: string;
  };
  slug: string;
  view1: Array<{ image: { url: string } }>;
  cover_image?: string;
};
function ServiceCardSkeleton() {
  return (
    <div className="animate-pulse w-full h-[350px] relative overflow-hidden rounded-lg bg-gray-700">
      {/* Background */}
      <div className="absolute inset-0 bg-gray-600" />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-6 space-y-4">
        <div className="h-6 w-2/3 bg-gray-500 rounded" />
        <div className="h-4 w-3/4 bg-gray-500 rounded" />

        <div className="mt-3">
          <div className="h-10 w-44 bg-gray-500 rounded-full" />
        </div>
      </div>
    </div>
  );
}

let cachedCaseStudies: CaseStudy[] | null = null;

export default function ServicesType() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<CaseStudy[]>([]);
  useEffect(() => {
    if (cachedCaseStudies) {
      setData(cachedCaseStudies);
      return;
    }

    const fetchCaseStudies = async () => {
      try {
        setLoading(true);
        const response = await get_case_studies_paginated();
        const caseStudies = response || [];
        setData(caseStudies);
        cachedCaseStudies = caseStudies;
      } catch (error) {
        console.error('Error fetching case studies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudies();
  }, []);

  if (loading) {
    return (
      <div className="p-5">
        <div className="flex flex-col items-center text-center space-y-3 animate-pulse">
          <div className="h-6 w-50 bg-gray-500 rounded" />
          <div className="h-4 w-80 bg-gray-500 rounded" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-10">
          {Array.from({ length: 2 }).map((_, idx) => (
            <ServiceCardSkeleton key={idx} />
          ))}
        </div>
      </div>
    );
  }
  return (
    <>
      {!loading && data?.length > 0 && (
        <section id="services" className="py-16 md:px-0 px-4 md:py-24 dark:bg-white bg-white">
          <div className="container mx-auto text-center">
            <header className="mb-12">
              <p className="text-sm font-medium text-gray-400 mb-2 uppercase tracking-wider"> What We Do</p>
              <h1>Our Services</h1>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4  mt-10">
              {data.map((item: CaseStudy | any, idx: number) => {
                const caseStudyUrl = `/services/${item.slug}`;
                const caseStudyTitle = item?.main?.title || 'Case Study';
                const caseStudyDescription = item?.main?.sub_title || 'Case Study';
                const caseStudyImage = item?.main?.cover_image?.url || '';
                return (
                  <Link key={idx} href={caseStudyUrl} title={caseStudyTitle} className="group w-[100%] h-[350px] relative overflow-hidden shadow-lg cursor-pointer block">
                    {/* Background Image */}
                    <div className="absolute inset-0 bg-cover bg-center transition-transform blur-none group-hover:blur-none duration-500 group-hover:scale-110" style={{ backgroundImage: `url(${caseStudyImage})` }}></div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-linear-to-b from-primary/50 to-black  dark:to-black/90 group-hover:bg-black/20 transition-all duration-500" />

                    {/* Content */}
                    <div className="relative text-left  h-full flex flex-col items-center justify-end text-white group-hover:text-white  p-6 ">
                      <div></div>
                      <div className="text-left w-full">
                        <h2>{caseStudyTitle}</h2>
                        <p className="text-lg my-3 line-clamp-2">{caseStudyDescription}</p>
                      </div>

                      <div className="w-full flex justify-start mb-3">
                        <Button outline>Explore Service</Button>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {data?.length > 2 && (
            <Link href="/services/list" className="mt-10 mx-auto text-center w-full inline-block text-primary hover:underline">
              View All Services →
            </Link>
          )}
        </section>
      )}
    </>
  );
}
