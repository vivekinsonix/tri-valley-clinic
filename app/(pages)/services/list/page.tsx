'use client';

import { get_case_studies } from '@/app/services/homePageService';
import { Button, Card } from 'flowbite-react';
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

export default function Page() {
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
        const response = await get_case_studies();
        const caseStudies = response?.data || [];
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
      <div className="p-30">
        <div className="flex flex-col items-center text-center space-y-3 animate-pulse">
          <div className="h-6 w-50 bg-gray-500 rounded" />
          <div className="h-4 w-80 bg-gray-500 rounded" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-10">
          {Array.from({ length: 4 }).map((_, idx) => (
            <ServiceCardSkeleton key={idx} />
          ))}
        </div>
      </div>
    );
  }
  return (
    <>
      {!loading && data?.length > 0 && (
        <section id="services" className="min-h-screen w-full dark:bg-foreground">
          <main className="container mx-auto  px-4 py-16">
            <header className="my-16 text-center">
              <p className="text-sm font-medium  mb-2 uppercase tracking-wider"> What We Do</p>
              <h1 className="text-3xl md:text-5xl  font-extrabold leading-tight">Our Services</h1>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {data.map((item: CaseStudy | any, idx: number) => {
                const caseStudyUrl = `/services/${item.slug}`;
                const caseStudyTitle = item?.main?.title || 'Case Study';
                const caseStudyDescription = item?.main?.sub_title || 'Case Study';
                const caseStudyImage = item?.main?.cover_image?.url || '/tech.jpg';
                return (
                  <Card key={idx} href={caseStudyUrl} title={caseStudyTitle} className={`p-6  text-center transition-all duration-300 rounded-2xl`}>
                    <div className="mb-4 flex justify-center">
                      <img src="/service/brainstorm.png" className="w-10" />
                    </div>

                    <h3 className="text-xl font-semibold text-accent dark:text-accent">{caseStudyTitle}</h3>

                    <p className="mt-3 text-accent dark:text-accent line-clamp-2 text-sm leading-relaxed">{caseStudyDescription}</p>
                    <div className="mx-auto">
                      <Button outline size="md">
                        Learn More
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </main>
        </section>
      )}
    </>
  );
}
