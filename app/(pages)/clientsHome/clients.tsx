'use client';

import SeoHead from '@/app/components/seo/seoHead';
import { getClients } from '@/app/services/clientService';
import { ClientsSection } from '@/app/utils/Interfaces';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import CardSlider from './ClinetCards';

const ClientsSkeleton = () => {
  return (
    <section className="py-16 md:py-24 bg-primary-50">
      <div className="px-6 mx-auto text-center animate-pulse">
        <div className="h-4 w-24 bg-gray-300 mx-auto mb-3 rounded" />
        <div className="h-10 w-2/3 bg-gray-300 mx-auto rounded" />
        <div className="mt-10 flex justify-center gap-4 overflow-hidden">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="w-[320px] h-48 rounded-xl bg-gray-200 shadow-md" />
          ))}
        </div>
      </div>
    </section>
  );
};
let clientsCache: ClientsSection | null = null;

export default function Clients() {
  const [clients, setClients] = useState<ClientsSection | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      if (clientsCache) {
        setClients(clientsCache);
        setLoading(false);
        return;
      }

      try {
        const response = await getClients();
        const data = response?.data ?? null;

        clientsCache = data;
        setClients(data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  if (loading) {
    return <ClientsSkeleton />;
  }

  if (!clients) {
    return null;
  }

  return (
    <>
      <SeoHead title="Our Clients - Dolcera" description="Discover the leading companies and enterprises that trust Dolcera for patent analytics solutions and IP management services." keywords="Dolcera clients, patent analytics clients, IP management partners, enterprise solutions" url={`${typeof window !== 'undefined' ? window.location.origin : ''}/clients`} />
      <section id="clients" className="pb-16 md:pb-24 bg-sectiontheme">
        <div className="px-6 mx-auto text-center">
          <p className="text-sm font-medium mb-2 uppercase tracking-wider">{clients.label}</p>
          <h1>{clients.description}</h1>
          <CardSlider data={clients.card || []} />
        </div>
        {/* <Link href="/clients" className="mt-10 mx-auto text-center text-primary w-full inline-block hover:underline">
          View All Clients →
        </Link> */}
      </section>
    </>
  );
}
