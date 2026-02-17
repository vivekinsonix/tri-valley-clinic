'use client';

import { getEmployee, getTeams } from '@/app/services/teamService';
import { TeamSection } from '@/app/utils/Interfaces';
import SeoHead from '@/app/components/seo/seoHead';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

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

      <section id="teams" className="relative overflow-hidden">
        <div className="relative text-center mx-auto py-24 px-4">
          {!loading && Array.isArray(teams?.card) && teams?.card?.length > 0 && (
            <div className="absolute inset-0 -z-20">
              <Image src="/bg-teams.png" alt="Background" fill className="object-cover dark:brightness-110 dark:contrast-110" priority />
            </div>
          )}

          <div
            className="
              absolute inset-0 -z-10
              bg-gradient-to-r
              from-white/90 via-white/75 to-white/60
              dark:from-black/70 dark:via-black/50 dark:to-black/30
            "
          />

          {/* HEADER */}
          {loading ? (
            <>
              <div className="mx-auto mb-2 w-40 h-4 bg-gray-200 rounded animate-pulse" />
              <div className="mx-auto mb-16 w-96 h-10 bg-gray-200 rounded animate-pulse" />
            </>
          ) : teams ? (
            <>
              <header className="mb-12">
                <p className="mb-2 text-sm font-medium uppercase tracking-wider text-gray-400">{teams.description}</p>
                <h1>{teams.label}</h1>
              </header>
            </>
          ) : null}

          <div className="container mx-auto">
            <div className="grid grid-cols-1 items-center text-left gap-20 lg:grid-cols-2">
              {/* LEFT CONTENT */}
              <div>
                {loading ? (
                  <>
                    <div className="h-8 w-72 bg-gray-200 rounded animate-pulse" />
                    <div className="mt-6 space-y-3">
                      <TextSkeleton />
                      <TextSkeleton width="w-5/6" />
                      <TextSkeleton width="w-2/3" />
                    </div>
                    <div className="mt-8 w-40 h-5 bg-gray-200 rounded animate-pulse" />
                  </>
                ) : teams ? (
                  <>
                    <h3>{teams.h1}</h3>
                    <p className="mt-6 max-w-xl text-md leading-relaxed">{teams.p1}</p>

                    {teams.link && (
                      <Link href={teams.link} className="mt-8 inline-flex items-center gap-2 text-base font-medium text-primary hover:text-primary-900">
                        Meet the physicians <span className="text-xl">›</span>
                      </Link>
                    )}
                  </>
                ) : null}
              </div>

              {/* RIGHT GRID */}
              <div className="grid grid-cols-3 gap-10">
                {loading
                  ? Array.from({ length: 6 }).map((_, i) => <ImageSkeleton key={i} />)
                  : advisors?.map((advisor: any, i) => {
                      /** Normalize image */
                      const rawImg = advisor?.image;

                      const img = typeof rawImg === 'string' ? rawImg : (rawImg?.url ?? null);

                      const hasImage = typeof img === 'string' && img.trim() !== '';

                      const letter = advisor?.name?.charAt(0)?.toUpperCase() || '?';
                      const colorClass = getColorForAdvisor(letter);

                      return (
                        <div key={i} className="relative aspect-square overflow-hidden rounded-2xl flex items-center justify-center">
                          {hasImage ? <Image src={img} alt="Advisor" fill className="object-cover" /> : <div className={`w-full h-full flex items-center justify-center text-white text-3xl font-bold ${colorClass}`}>{letter}</div>}
                        </div>
                      );
                    })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
