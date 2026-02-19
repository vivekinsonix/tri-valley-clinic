'use client';

import { Card } from 'flowbite-react';

export default function Insurances() {
  return (
    <section className="relative w-full bg-gradient-to-r from-primarylight via-primarylight to-secondarydark/20 bg-cover bg-center flex items-center justify-center" id="doctors">
      {/* Centered content */}
      <div className="relative pt-16">
        <div>
          <Card className="bg-white rounded-2xl p-5 text-center shadow-lg border-0">
            <div className="flex flex-wrap items-center justify-center gap-10">
              <img src="/Aetna_Logo.svg" alt="Alameda Health System" className="h-8 w-auto grayscale-0 hover:grayscale-0 transition" />
              <img src="/UHC_Lockup.svg" alt="Alameda Health System" className="h-12 w-auto grayscale-0 hover:grayscale-0 transition" />
              <img src="/TRICARElogo.svg" alt="Alameda Health System" className="h-15 w-auto grayscale-0 hover:grayscale-0 transition" />
              <img src="/cigma.svg" alt="Alameda Health System" className="h-15 w-auto grayscale-0 hover:grayscale-0 transition" />
              <img src="/blue.svg" alt="Alameda Health System" className="h-12 w-auto grayscale-0 hover:grayscale-0 transition" />
              <img src="/bcbs-logo.svg" alt="Alameda Health System" className="h-8 w-auto grayscale-0 hover:grayscale-0 transition" />
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
