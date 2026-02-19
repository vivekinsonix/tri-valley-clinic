'use client';

import { RichTextViewer } from '@/app/components/richtext/RichTextViewer';
import { Button } from 'flowbite-react';
import Link from 'next/link';

interface Props {
  ourLegacy?: any;
  coreDifferentiars: any;
  loading: boolean;
}

export default function Virtual({ ourLegacy }: Props) {
  return (
    <section
      id="schedule"
      className="relative h-[90vh] w-full bg-cover bg-center bg-no-repeat 
                 flex items-center justify-center bg-fixed"
      style={{
        backgroundImage: "url('/bg-1.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-primarypink/50 backdrop-blur-[1px]" />

      {/* Content */}
      <div className="relative  text-center max-w-3xl px-4">
        {/* Unified Content Card */}
        <div
          className=" 
                         py-20 inline-block  
                        space-y-6 ml-auto"
        >
          {/* Dynamic Text from CMS */}
          <div className="prose mx-auto text-center">
            <RichTextViewer content={ourLegacy?.paragraph_1} />
          </div>

          {/* Heading */}
          <h1 className=" font-normal text-accent headingclass">Schedule Your Appointment.</h1>

          {/* Sub Text */}
          <p className="text-primary leading-relaxed text-lg">For your convenience and safety, Tri-Valley Clinic offers secure virtual visits. Receive high-quality care from the comfort of your home. Contact us today to schedule your telehealth appointment.</p>

          {/* Buttons */}
          <div className="flex flex-col mx-auto sm:flex-row justify-center gap-4 pt-4">
            <Link target="_blank" href="/contact">
              <Button size="lg" className="px-8 py-3 mx-auto w-full text-lg font-semibold shadow-md">
                Request Appointment
              </Button>
            </Link>

            <Link target="_blank" href="tel:(510) 598-4921">
              <Button outline size="lg" className="px-8 mx-auto w-full py-3 text-lg font-semibold shadow-md">
                Call/Text (510) 598-4921
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
