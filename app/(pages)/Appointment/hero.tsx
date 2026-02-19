'use client';

import { useEffect, useRef } from 'react';
import SeoHead from '@/app/components/seo/seoHead';

import { Button } from 'flowbite-react';
import { ArrowBigRight, ArrowRight } from 'lucide-react';
import ClinicHoursModern from '../hours/ClinicHours';

interface HeroProps {
  subHeading?: string;
  loading: boolean;
  heading?: string;
  onSchedule?: () => void;
  ourLegacy: any;
  coreDifferentiars: any;
}

export default function ClinicHero({ subHeading, heading, loading, ourLegacy, coreDifferentiars, onSchedule }: HeroProps) {
  // -----------------------------
  // SEO
  // -----------------------------
  const seoTitle = 'Insonix - AI & Python Expert Solutions';
  const seoDescription = 'Partner with Insonix to leverage top AI and Python developers for your projects. Schedule a consultation today.';
  const seoKeywords = 'Insonix, AI developers, Python developers, top expertise, consultation';
  const seoUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://insonix.com'}/`;
  const seoImage = '/default-og.jpg.png';

  // -----------------------------
  // Parallax Refs
  // -----------------------------
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number | null>(null);

  // -----------------------------
  // Smooth Parallax Effect
  // -----------------------------
  useEffect(() => {
    const handleScroll = () => {
      if (!videoRef.current || !sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const scrollProgress = Math.min(Math.max(-rect.top, 0), rect.height);

      const speed = 1;
      videoRef.current.style.transform = `translate3d(0, ${scrollProgress * speed}px, 0) scale(1.05)`;
    };

    const onScroll = () => {
      if (rafRef.current) return;

      rafRef.current = requestAnimationFrame(() => {
        handleScroll();
        rafRef.current = null;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // -----------------------------
  // Skeleton UI
  // -----------------------------
  if (loading) {
    return (
      <>
        <SeoHead title={seoTitle} description={seoDescription} keywords={seoKeywords} image={seoImage} url={seoUrl} />

        <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-800 pt-24 pb-12 text-center animate-pulse z-30">
          <div className="absolute inset-0 bg-black opacity-40" />

          <div className="relative container mx-auto px-4">
            <div className="mx-auto mb-6 h-12 w-2/3 rounded bg-gray-600" />
            <div className="mx-auto mb-6 h-12 w-1/3 rounded bg-gray-600" />
            <div className="mx-auto mb-10 h-6 w-3/4 rounded bg-gray-600" />
            <div className="mx-auto h-12 w-48 rounded-full bg-gray-600" />
          </div>
        </section>
      </>
    );
  }

  // -----------------------------
  // Render
  // -----------------------------
  return (
    <>
      <SeoHead title={seoTitle} description={seoDescription} keywords={seoKeywords} image={seoImage} url={seoUrl} />
      <section
        ref={sectionRef}
        id="hero"
        draggable={false}
        onDragStart={(e) => e.preventDefault()}
        onContextMenu={(e) => e.preventDefault()}
        className="relative flex min-h-[500px] md:min-h-[600px]
             items-center justify-center overflow-hidden
             pt-24 pb-12 text-center"
      >
        {/* Background Video */}
        {/* <video
          ref={videoRef}
          className="absolute inset-0 w-full h-[120%]
                     object-cover blur-[0px] dark:blur-[1px]
                     will-change-transform"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="video/h1.mp4" type="video/mp4" />
        </video> */}

        {/* Background Image */}
        <div
          className="absolute inset-0 w-full h-[120%] 
               bg-cover bg-center blur-[2px] dark:blur-[1px] 
               will-change-transform"
          style={{ backgroundImage: "url('/bg-clinic-hour.jpeg')" }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-primary/70 dark:bg-primary/70 pointer-events-none" />

        {/* Content */}
        <div className="relative container mx-auto px-4">
          <h1 className="mb-6 text-4xl text-white font-bold leading-tight tracking-tight dark:text-white md:text-6xl lg:text-7xl">
            Shaping <span className="text-secondary">AI for IP</span> since 2011
          </h1>

          <p className="mx-auto mb-10 max-w-4xl text-lg text-primary-50 dark:text-gray-300 md:text-xl lg:text-2xl">Get started with AI-powered IP excellence</p>

          <Button size="lg" className="mx-auto">
            Book Demo
          </Button>
        </div>
      </section>
    </>
  );
}
