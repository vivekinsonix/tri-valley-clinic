'use client';

import { getEmployee, getTeams } from '@/app/services/teamService';
import { TeamSection } from '@/app/utils/Interfaces';
import SeoHead from '@/app/components/seo/seoHead';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ClinicHoursModern from '../hours/ClinicHours';

/**
 * In-memory cache
 */
let cachedTeams: TeamSection | null = null;

const TextSkeleton = ({ width = 'w-full' }) => <div className={`h-4 ${width} rounded bg-gray-200 animate-pulse`} />;

const ImageSkeleton = () => <div className="aspect-square rounded-2xl bg-gray-200 animate-pulse" />;

export default function PartnerAdvisoryCouncil() {
  const [teams, setTeams] = useState<TeamSection | null>(cachedTeams);
  const [loading, setLoading] = useState(!cachedTeams);
  const [advisors, setAdvisors] = useState([]);

  const getColorForAdvisor = (nameOrIndex: string | number): string => {
    const colors = ['bg-primary', 'bg-green-400', 'bg-gray-900', 'bg-gray-600', 'bg-gray-500', 'bg-gray-400', 'bg-orange-400', 'bg-teal-400'];

    if (!nameOrIndex) return colors[0];

    let hash = 0;
    const str = nameOrIndex.toString();

    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    return colors[Math.abs(hash) % colors.length];
  };

  useEffect(() => {
    const getEmploye = async () => {
      const data = await getEmployee();
      setAdvisors(data?.data?.slice(0, 6) || []);
    };
    getEmploye();
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

  return (
    <>
      <SeoHead title="Our Team & Advisors - Dolcera" description="Meet Dolcera's expert team and advisory council." keywords="Dolcera team, advisors, patent experts" url={`${typeof window !== 'undefined' ? window.location.origin : ''}/teamshome`} />

      <section id="teams" className="  py-24 relative overflow-hidden bg-white">
        <div className="relative text-center mx-auto px-4">
          {loading ? (
            <>
              <div className="mx-auto mb-2 w-40 h-4 bg-gray-200 rounded animate-pulse" />
              <div className="mx-auto mb-16 w-96 h-10 bg-gray-200 rounded animate-pulse" />
            </>
          ) : teams ? (
            <>
              <header className="mb-12">
                <p className="text-sm font-medium text-gray-400 mb-2 uppercase tracking-wider"> {teams.description}</p>
                <div className="flex items-center justify-center  gap-4 my-0 relative">
                  <div className="h-[1px]  w-24 bg-secondary relative">
                    <img className="w-10 absolute -right-2.5 -top-2.5 " src="/service/d-v.png" />
                  </div>
                  <h1 className="font-bold text-gray-900">{teams.label}</h1>
                  <div className="h-[1px]  w-24 bg-secondary"></div>
                </div>
              </header>
            </>
          ) : null}

          <div className="container mx-auto">
            <div className="grid grid-cols-1 items-center bg-sectiontheme text-left gap-0 lg:grid-cols-12">
              {/* LEFT CONTENT */}
              <div
                className="md:col-span-6 col-span-12 inset-0 w-full h-[400px]
              bg-cover  bg-center bg-no-repeat  
               will-change-transform"
                style={{ backgroundImage: "url('/bg-clinic-hour.jpeg')" }}
              ></div>

              {/* RIGHT GRID */}
              <div className=" md:col-span-6">
                <ClinicHoursModern />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
