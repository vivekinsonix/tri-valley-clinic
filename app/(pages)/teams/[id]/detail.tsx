'use client';

import { RichTextViewer } from '@/app/components/richtext/RichTextViewer';
import { getEmployee, getEmployeeBySlug } from '@/app/services/teamService';
import { Avatar } from 'flowbite-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface PageProps {
  params: {
    slug: string;
  };
}

export default function Detail({ slug }: any) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  console.log(slug);

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      try {
        const response = await getEmployeeBySlug(slug);
        setData(response?.data[0] || null);
      } catch (error) {
        console.error('Failed to fetch employee:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!data) {
    return <div className="min-h-screen flex items-center justify-center">Employee not found.</div>;
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

  const initial = data?.name?.charAt(0)?.toUpperCase() || '?';
  const bgColor = getColorForName(data?.name);
  return (
    <section className="min-h-screen w-full dark:bg-foreground ">
      <main className="container mx-auto max-w-7xl px-4 py-10 prose">
        <header className="my-20 text-center"></header>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 lg:grid-cols-12 container  mx-auto">
          <div className="md:col-span-3 text-center ">
            {data?.image?.url ? <Avatar img={data.image.url} rounded size="xl" /> : <div className={`w-35 h-35 flex items-center mx-auto justify-center rounded-full text-white text-3xl font-bold mb-4 ${bgColor}`}>{initial}</div>}
            <h2 className="mt-0 mb-0">{data?.name}</h2>
            <p className=" text-gray-400">{data?.role}</p>
            {/* Social Links */}
            <div className="flex justify-center">
              {data?.social_links?.map((e: any) => (
                <Link key={e?.id} href={e?.link || '#'} target="_blank" className="my-2 mx-auto">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: e?.icon || '',
                    }}
                  />
                </Link>
              ))}
            </div>
          </div>
          <div className="md:col-span-9 mt-12">
            <RichTextViewer content={data?.description || ''} />
          </div>
        </div>
      </main>
    </section>
  );
}
