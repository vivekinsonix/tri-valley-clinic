'use client';

import { get_case_studies_paginated } from '@/app/services/homePageService';
import { getEmployee, getTeams } from '@/app/services/teamService';
import { TeamSection } from '@/app/utils/Interfaces';
import { Avatar, Button, Card, HRText } from 'flowbite-react';
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
  icon_img?: string;
};
interface CardItem {
  id: number;
  label: string;
  image?: {
    url?: string;
    formats?: {
      thumbnail?: { url: string };
      small?: { url: string };
    };
  };
}
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
let cachedTeams: TeamSection | null = null;
export default function ServicesType() {
  const [teams, setTeams] = useState<TeamSection | null>(cachedTeams);
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
  useEffect(() => {
    if (cachedTeams) {
      setTeams(cachedTeams);
      setLoading(false);
      return;
    }

    const fetchTeams = async () => {
      try {
        const response = await getTeams();
        const data = response?.data || null;

        cachedTeams = data;
        setTeams(data);
      } catch (error) {
        console.error('Failed to fetch teams:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
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
  const getImageUrl = (card: CardItem) => card.image?.formats?.thumbnail?.url || card.image?.formats?.small?.url || card.image?.url || '';
  return (
    <>
      {!loading && data?.length > 0 && (
        <section id="services" className="pt-16   md:pt-24 dark:bg-sectiontheme bg-sectiontheme">
          <div className="container mx-auto text-center px-4 md:px-0">
            <header className="mb-12">
              <p className="text-sm font-medium text-gray-400 mb-2 uppercase tracking-wider"> What We Do</p>
              <div className="flex items-center justify-center  gap-4 my-0 relative">
                <div className="h-[1px]  w-24 bg-secondary relative">
                  <img className="w-10 absolute -right-2.5 -top-2.5 " src="/service/d-v.png" />
                </div>
                <h1 className="font-bold text-gray-900">Our Services</h1>
                <div className="h-[1px]  w-24 bg-secondary"></div>
              </div>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4  mt-10">
              {data.map((item: CaseStudy | any, idx: number) => {
                const caseStudyUrl = `/services/${item.slug}`;
                const caseStudyTitle = item?.main?.title || 'Case Study';
                const caseStudyDescription = item?.main?.sub_title || 'Case Study';
                const caseStudyImage = item?.main?.cover_image?.url || '';
                const iconImage = item?.main?.icon_img?.url || '/tech.jpg';
                return (
                  <Card key={idx} href={caseStudyUrl} title={caseStudyTitle} className={`p-6  text-center transition-all duration-300 rounded-2xl`}>
                    <div className="mb-4 flex justify-center">
                      <img src={iconImage} className="w-10" />
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
          </div>

          {data?.length > 2 && (
            <Link href="/services/list" className="mt-10 mx-auto text-center w-full inline-block text-primary hover:underline">
              View All Services →
            </Link>
          )}

          <section className="relative bg-primary text-white py-24">
            {/* Top Curve */}

            <div
              className="absolute top-0 h-12 left-0 w-full  overflow-hidden leading-[0] rotate-360 
                
              "
              style={{ backgroundImage: "url('svgs/top-d.svg')" }}
            />

            <header className="my-12 text-center">
              <p className="text-sm font-medium text-gray-400 mb-2 uppercase tracking-wider">Experienced Physicians </p>
              <div className="flex items-center justify-center  gap-4 my-0 relative">
                <div className="h-[1px]  w-24 bg-secondary relative">
                  <img className="w-10 absolute -right-2.5 -top-2.5 " src="/service/d-v.png" />
                </div>
                <h1 className="font-bold !text-white dark:!text-white">Meet Our Doctors</h1>
                <div className="h-[1px]  w-24 bg-secondary"></div>
              </div>
            </header>
            <div className="container mx-auto  py-8 px-6 md:px-12 flex flex-col md:flex-row justify-center items-center gap-16 relative ">
              {/* Stat 1 */}

              <div className="text-center">
                <div className="w-48 h-48 border-[4px] border-white rounded-full flex items-center justify-center text-4xl font-semibold">
                  <Avatar img="/teams/dr_shabeg.jpg" rounded={true} size="2xl" className=" h-44 w-44" />
                </div>
                {/* Name */}
                <h2 className="text-xl md:text-2xl font-bold">Dr. Shabeg S. Gondara</h2>

                {/* Designation */}
                <p className="text-gray-200">MD, Psychiatrist</p>
              </div>

              {/* Stat 2 */}
              <div className="text-center">
                <div className="w-48 h-48 border-[4px] border-white rounded-full flex items-center justify-center text-4xl font-semibold">
                  <Avatar img="/teams/dr_japsharan_gill.jpg" rounded={true} size="2xl" className=" h-44 w-44" />
                </div>
                {/* Name */}
                <h2 className="text-xl md:text-2xl font-bold">Dr. Japsharan Gill</h2>

                {/* Designation */}
                <p className="text-sectiontheme">MD, Psychiatrist</p>
              </div>
            </div>

            {/* Bottom Curve */}
            <div className="text-center">
              <Link href="/doctors" className="pt-4 inline-flex items-center gap-2 text-base font-medium text-white hover:text-white">
                <Button outline>Meet the physicians </Button>
              </Link>
            </div>
            <div
              className="absolute bottom-0 h-12 left-0 w-full z-20 overflow-hidden leading-[0] rotate-180 
                
              "
              style={{ backgroundImage: "url('svgs/top-d.svg')" }}
            />
          </section>
        </section>
      )}
    </>
  );
}
