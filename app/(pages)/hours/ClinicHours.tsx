// components/ClinicHoursModern.tsx
'use client';

import { Card, Badge } from 'flowbite-react';
import { Clock } from 'lucide-react';

export default function ClinicHoursModern() {
  const hours = [
    { day: 'Monday', time: '9:30 AM – 5:30 PM' },
    { day: 'Tuesday', time: '9:30 AM – 5:30 PM' },
    { day: 'Wednesday', time: '9:30 AM – 5:30 PM' },
    { day: 'Thursday', time: '9:30 AM – 5:30 PM' },
    { day: 'Friday', time: '9:30 AM – 5:30 PM' },
    { day: 'Saturday', time: 'Closed', closed: true },
    { day: 'Sunday', time: 'Closed', closed: true },
  ];

  return (
    <section className="relative">
      <div className="container mx-auto px-4 md:px-0 ">
        <Card className="rounded-3xl border-0 shadow-none bg-transparent ">
          {/* Header */}
          <div className="md:flex flex-wrap items-center justify-end mb-10">
            <Badge color="success" className="text-sm px-4 py-1 rounded-full">
              Open on Weekdays
            </Badge>
          </div>

          {/* Hours Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-5">
            {hours.map((item, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-bordertheme last:border-b-0">
                <span className="text-primary font-medium tracking-wide">{item.day}</span>

                <span className={` font-bold ${item.closed ? 'text-secondary' : 'text-primary'}`}>{item.time}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}
