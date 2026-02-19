'use client';

import SeoHead from '@/app/components/seo/seoHead';
import { Button, HRText } from 'flowbite-react';
import { useEffect, useRef } from 'react';
import About from './about';
import { ALTERNATE_UI_URL, SEO_IMAGE } from '@/app/constants/appconstants';
import Link from 'next/link';
import { EqualApproximatelyIcon, Mail, MapPin, MessageCircle, PhoneCall, Printer } from 'lucide-react';

interface HeroProps {
  subHeading?: string;
  loading: boolean;
  heading?: string;
  onSchedule?: () => void;
  ourLegacy: any;
  coreDifferentiars: any;
}

export default function Hero({ subHeading, heading, loading, ourLegacy, coreDifferentiars, onSchedule }: HeroProps) {
  const seoTitle = 'Dolcera - Dolcera is one of world’s largest patent analytics companies. Our team of in-house subject-matter experts analyze several million patents a year using our machine-learning platform.';
  const seoDescription = 'We offer industry-leading software platforms, and a suite of services in the intellectual property space for dozens of world’s leading corporations.';
  const seoKeywords = 'Dolcera, Patent Landscaping,Cancer Vaccines,Ureteral Stent,Smart Drug Delivery, Indian Heart Valve Market, Intellectual Property, Patent Analytics, Patent Research, Patent Search, Patent Filing, Patent Strategy, IP Management, Patent Portfolio Management, Competitive Intelligence, Technology Landscaping, Patent Valuation, Freedom to Operate, FTO Analysis, Patent Infringement Analysis, Patent Monitoring, Patent Drafting Services, Cheese analog, Plastic aerosols, Dispenser with applicator, Phytosterol and Phytostanols, Pressure Sensitive Adhesives, Alopecia';
  const seoUrl = `${process.env.NEXT_PUBLIC_BASE_URL || ALTERNATE_UI_URL}/`;
  const seoImage = SEO_IMAGE;

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number | null>(null);

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

  return (
    <>
      <SeoHead title={seoTitle} description={seoDescription} keywords={seoKeywords} image={seoImage} url={seoUrl} />
      <section
        ref={sectionRef}
        id="hero"
        draggable={false}
        onDragStart={(e) => e.preventDefault()}
        onContextMenu={(e) => e.preventDefault()}
        className="relative flex 
             items-center justify-start overflow-hidden bg-sectiontheme
           mt-20"
      >
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
          <source src="video/lp.mp4" type="video/mp4" />
        </video> */}

        {/* Background Image */}
        {/* <div
          className="absolute inset-0 w-full h-[120%] 
               bg-auto bg-right bg-no-repeat  
               will-change-transform"
          style={{ backgroundImage: "url('/hero-banner.jpg')" }}
        /> */}

        {/* <div className="absolute inset-0 bg-sectiontheme/90 dark:bg-sectiontheme/90 md:bg-black/10 md:dark:bg-black/10 pointer-events-none" /> */}
        <div className="container mx-auto ">
          <div className=" grid grid-cols-1 gap-10 md:grid-cols-2 flex items-center lg:grid-cols-12 w-full">
            <div className="lg:col-span-7 col-span-11">
              <div className=" w-full p-10 relative">
                {/* Top Divider */}
                <div className="w-full absolute left-0 h-16 bg-left bg-no-repeat" style={{ backgroundImage: "url('/service/top.png')" }}></div>

                {/* Heading */}
                <h1 className="  text-primary mb-4 flex items-center gap-2">
                  <span className="text-secondary ">Our</span> Mission
                </h1>

                {/* Paragraph */}
                <p className="w-full  text-primary ">{subHeading}</p>

                {/* Contact Details */}
                <div className="space-y-3 mt-6 text-primary  ">
                  <div className="flex items-center gap-2">
                    <Mail className="text-secondary" />
                    contact@trivalleyclinic.com
                  </div>

                  <div className="flex items-center gap-2">
                    <PhoneCall className="text-secondary" />
                    (510) 598-4921
                  </div>

                  <div className="flex items-center gap-2">
                    <Printer className="text-secondary" />
                    (510) 973-2393
                  </div>
                </div>

                {/* Bottom Divider */}
                <div className="absolute bg-contain bg-left bottom-0 left-10 w-full md:h-8 h-6  bg-no-repeat" style={{ backgroundImage: "url('/service/Minimalist-twig-divider.png')" }}></div>
              </div>
            </div>
            <div
              className="lg:col-span-5 col-span-12 inset-0 w-full h-[400px]
              bg-cover  bg-center bg-no-repeat  
               will-change-transform"
              style={{ backgroundImage: "url('/bg-hero.jpg')" }}
            ></div>
          </div>
        </div>
        {/* <Link target="_blank" href="https://calendly.com/d/4kd-jpr-6jx">
            <Button size="lg" className="mx-auto">
              Book Demo
            </Button>
          </Link> */}
      </section>

      {ourLegacy && <About ourLegacy={ourLegacy || {}} coreDifferentiars={coreDifferentiars} loading={loading} />}
    </>
  );
}
