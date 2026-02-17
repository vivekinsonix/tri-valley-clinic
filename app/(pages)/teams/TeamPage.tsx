'use client';

import { getEmployee } from '@/app/services/teamService';
import { TeamSection } from '@/app/utils/Interfaces';
import SeoHead from '@/app/components/seo/seoHead';
import { Avatar, Card } from 'flowbite-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

/**
 * In-memory cache
 */
let cachedTeams: TeamSection | null = null;

function TeamCardSkeleton() {
  return (
    <div className="p-8 rounded-2xl bg-primary-50 shadow-lg flex flex-col items-center animate-pulse">
      <div className="w-24 h-24 rounded-full bg-gray-300 mb-4" />
      <div className="h-5 w-40 bg-gray-300 rounded mb-3" />
      <div className="h-4 w-48 bg-gray-200 rounded mb-4" />
      <div className="h-4 w-24 bg-gray-300 rounded" />
    </div>
  );
}

/**
 * Generate stable color for name
 */
const getColorForName = (name?: string) => {
  const colors = ['bg-primary', 'bg-green-400', 'bg-gray-900', 'bg-gray-600', 'bg-gray-500', 'bg-gray-400', 'bg-orange-400', 'bg-teal-400'];

  if (!name) return colors[0];

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  return colors[Math.abs(hash) % colors.length];
};

export default function TeamPage() {
  const [teams, setTeams] = useState<TeamSection | any>(cachedTeams);
  const [loading, setLoading] = useState<boolean>(!cachedTeams);

  useEffect(() => {
    if (cachedTeams) {
      setTeams(cachedTeams);
      setLoading(false);
      return;
    }

    const fetchTeams = async () => {
      try {
        const response = await getEmployee();
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

  if (!loading && teams?.length === 0) {
    return <p className="text-center py-20">No team members found.</p>;
  }

  return (
    <>
      <SeoHead title="Meet Our Team - Dolcera" description="Meet the talented professionals at Dolcera." keywords="Dolcera team, patent experts, IP professionals" url="/teams" />

      <section className="min-h-screen w-full dark:bg-foreground">
        <main className="container mx-auto max-w-7xl px-4 py-16">
          <header className="my-16 text-center">
            <h1 className="mt-5">Meet Our Doctors</h1>
            <p className="mt-2 text-gray-400">Our practice is led by dedicated and experienced physicians committed to providing the highest standard of care.</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12 md:mt-16">
            {loading
              ? Array.from({ length: 9 }).map((_, idx) => <TeamCardSkeleton key={idx} />)
              : teams.map((member: any) => {
                  const initial = member?.name?.charAt(0)?.toUpperCase() || '?';
                  const bgColor = getColorForName(member?.name);

                  return (
                    <Card key={member?.id} className="p-8 rounded-2xl bg-primary-50 shadow-lg text-center flex justify-center flex-col items-center transition-transform duration-300 hover:scale-[1.03]">
                      {/* Avatar or Fallback */}
                      {member?.image?.url ? <Avatar img={member.image.url} rounded size="xl" className="mb-4" /> : <div className={`w-35 h-35 flex items-center mx-auto justify-center rounded-full text-white text-3xl font-bold mb-4 ${bgColor}`}>{initial}</div>}

                      {/* Social Links */}
                      {member?.social_links?.map((e: any) => (
                        <Link key={e?.id} href={e?.link || '#'} target="_blank" className="mb-2 mx-auto">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: e?.icon || '',
                            }}
                          />
                        </Link>
                      ))}

                      {/* Name */}
                      <h2 className="text-xl md:text-2xl font-bold mb-3">{member?.name}</h2>

                      {/* Designation */}
                      <p className="text-gray-600 mb-4">{member?.role}</p>

                      <Link href={`/teams/${member?.slug}`} className="text-primary hover:text-primary/70 hover:underline">
                        Learn More →
                      </Link>
                    </Card>
                  );
                })}
          </div>
        </main>
      </section>
    </>
  );
}
