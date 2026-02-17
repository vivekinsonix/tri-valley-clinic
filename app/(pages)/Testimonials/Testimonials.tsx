'use client';

import { getTestimonials } from '@/app/services/testimonialsService';
import SeoHead from '@/app/components/seo/seoHead';
import { useEffect, useState } from 'react';
import VideoTestimonials from './TestimonialsList';

/**
 * In-memory cache
 */
let cachedTestimonials: TestimonialsSection | null = null;

const TestimonialsSkeleton = () => {
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-foreground">
      <div className="container mx-auto text-center animate-pulse">
        {/* Label */}
        <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 mx-auto mb-4 rounded" />

        {/* Title */}
        <div className="h-10 w-2/3 bg-gray-300 dark:bg-gray-700 mx-auto rounded" />

        {/* Cards */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-1 gap-6">
          <div className="rounded-xl bg-gray-200 dark:bg-gray-700 h-72" />
        </div>
      </div>
    </section>
  );
};

export interface TestimonialCard {
  id: number;
  text: string;
  name: string;
  designation: string;
}

export interface TestimonialsSection {
  id: number;
  documentId: string;
  label: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  card: TestimonialCard[];
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<TestimonialsSection | null>(cachedTestimonials);
  const [loading, setLoading] = useState(!cachedTestimonials);

  useEffect(() => {
    if (cachedTestimonials) {
      setTestimonials(cachedTestimonials);
      setLoading(false);
      return;
    }

    const fetchTestimonials = async () => {
      try {
        const response = await getTestimonials();
        const data = response?.data ?? null;

        cachedTestimonials = data;
        setTestimonials(data);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return <TestimonialsSkeleton />;
  }

  if (!testimonials) {
    return null;
  }

  return (
    <>
      <SeoHead title="Customer Testimonials - Dolcera" description="Read what our clients say about Dolcera. Discover how we've helped businesses solve their patent analytics and IP management challenges." keywords="Dolcera testimonials, client reviews, customer feedback, patent analytics success stories" url={`${typeof window !== 'undefined' ? window.location.origin : ''}/testimonials`} />
      <section id="testimonials" className="py-16 md:py-24 dark:bg-foreground bg-white">
        <div className="container mx-auto text-center">
          <header>
            <p className="text-sm font-medium text-gray-400 mb-2 uppercase tracking-wider">{testimonials?.label}</p>
            <h1>{testimonials?.description}</h1>
          </header>
          <div className="mt-10">
            <VideoTestimonials data={testimonials?.card} />
          </div>
        </div>
      </section>
    </>
  );
}
