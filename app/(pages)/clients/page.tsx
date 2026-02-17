'use client';

import { getClients } from '@/app/services/clientService';
import { ClientsSection } from '@/app/utils/Interfaces';
import SeoHead from '@/app/components/seo/seoHead';
import { Avatar, Card } from 'flowbite-react';
import { useEffect, useState } from 'react';

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

let cachedClients: ClientsSection | null = null;

const ClientCardSkeleton = () => {
  return (
    <Card className="p-8 rounded-2xl border border-gray-100 dark:border-secondary-dark shadow-lg text-center">
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 mb-4" />
        <div className="h-5 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
    </Card>
  );
};

export default function TeamPage() {
  const [clients, setClients] = useState<ClientsSection | null>(cachedClients);
  const [loading, setLoading] = useState(!cachedClients);

  useEffect(() => {
    // ✅ Use cache if available
    if (cachedClients) {
      setClients(cachedClients);
      setLoading(false);
      return;
    }

    const fetchClients = async () => {
      try {
        const response = await getClients();
        const data = response?.data ?? null;

        cachedClients = data; // store in memory
        setClients(data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const getImageUrl = (card: CardItem) => card.image?.formats?.thumbnail?.url || card.image?.formats?.small?.url || card.image?.url || '';

  return (
    <>
      <SeoHead title="All Clients - Dolcera" description="Browse the complete directory of clients and enterprises partnering with Dolcera for patent analytics and intellectual property management solutions." keywords="all clients, Dolcera partners, enterprise clients," url={`${typeof window !== 'undefined' ? window.location.origin : ''}/clients`} />
      <section className="min-h-screen w-full dark:bg-foreground">
        <main className="container mx-auto max-w-7xl px-4 py-10">
          <header className="my-10 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl mt-5">{clients?.label}</h1>
            <p className="mt-2 text-gray-400">{clients?.description}</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12 md:mt-16">
            {loading && Array.from({ length: 6 }).map((_, idx) => <ClientCardSkeleton key={idx} />)}

            {!loading &&
              clients?.card?.map((member: CardItem) => (
                <Card key={member.id} className="p-8 rounded-2xl border border-gray-100 dark:border-secondary-dark shadow-lg text-center flex flex-col items-center transition-transform duration-300 hover:scale-[1.03]">
                  <Avatar img={getImageUrl(member)} rounded={false} size="xl" className="mb-4" />

                  <h2 className="text-xl md:text-2xl font-bold mb-3 leading-snug dark:text-primary">{member.label}</h2>
                </Card>
              ))}
          </div>
        </main>
      </section>
    </>
  );
}
