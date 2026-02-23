'use client';

import { Avatar, Button } from 'flowbite-react';
import Link from 'next/link';

export default function OfficeHours() {
  return (
    <>
      <main id="about" className=" dark:bg-foreground " aria-labelledby="about-heading">
        <section
          id="doctors"
          className="relative py-24 w-full bg-cover bg-center bg-no-repeat text-white dark:text-white
                 bg-fixed"
          style={{
            backgroundImage: "url('/bg-clinic-hour.jpeg')",
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-primary/95 backdrop-blur-[1px]" />
          {/* Top Curve */}

          <div
            className="absolute md:top-0 -top-0.5 h-14 left-0 w-full  overflow-hidden leading-[0] rotate-360 
                
              "
            style={{ backgroundImage: "url('svgs/top-d.svg')" }}
          />

          <header className="mb-12 text-center">
            <p className="text-sm font-medium text-gray-400 mb-2 uppercase tracking-wider">TRY-VALLEY CLINIC </p>
            <div className="flex items-center justify-center  gap-4 my-0 relative">
              <div className="h-[1px]  w-24 bg-secondary relative">
                <img className="w-10 absolute -right-2.5 -top-2.5 " src="/service/d-v.png" />
              </div>
              <h1 className="font-bold !text-white dark:!text-white">Clinic Hours</h1>
              <div className="h-[1px]  w-24 bg-secondary"></div>
            </div>
          </header>
          <div className="container mx-auto  py-8 px-6 md:px-12 flex flex-col md:flex-row justify-center items-center gap-16 relative ">
            {/* Stat 1 */}

            <div className="text-center">
              {/* Name */}
              <h2 className="text-xl md:text-2xl font-bold">Monday to Friday</h2>

              {/* Designation */}
              <p className="text-gray-200 py-4">9:30 AM - 5:30 PM</p>
            </div>
            <div className="text-center">
              {/* Name */}
              <h2 className="text-xl md:text-2xl font-bold">Saturday and Sunday</h2>

              {/* Designation */}
              <p className="text-gray-200 py-4">Closed</p>
            </div>
          </div>

          {/* Bottom Curve */}
          <div className="text-center py-8">
            <Link target="_blank" href="tel:(510) 598-4921">
              <Button outline size="lg" className="px-8 mx-auto  py-3 text-lg font-semibold shadow-md">
                Call (510) 598-4921
              </Button>
            </Link>
          </div>
          <div
            className="absolute -bottom-0.5 h-12 left-0 w-full z-20 overflow-hidden leading-[0] rotate-180 
                
              "
            style={{ backgroundImage: "url('svgs/top-d.svg')" }}
          />
        </section>
      </main>
    </>
  );
}
