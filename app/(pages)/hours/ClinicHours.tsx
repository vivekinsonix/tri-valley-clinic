// components/ClinicHoursModern.tsx
'use client';

import { Card, Badge } from 'flowbite-react';
import { CalendarClock, Clock, Clock1 } from 'lucide-react';

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
    <div className="rounded-3xl bg-sectiontheme  hover:dark:!sectiontheme p-2">
      {/* Header */}
      <div className="md:flex flex-wrap items-center md:justify-end"></div>
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4 relative">
          <div className="w-7 text-secondary " />
          <div>
            <p className="text-lg text-gray-900">Clinic Hours</p>
            <p className="text-gray-500 text-sm">We are here to care for you</p>
          </div>
          <div className="w-full absolute left-0 h-16 bg-left bg-no-repeat" style={{ backgroundImage: "url('/service/top.png')" }}></div>
        </div>
        <Badge color="success" className="text-sm md:px-4 py-1 rounded-full text-nowrap">
          Open on Weekdays
        </Badge>
      </div>
      {/* Hours Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-5 px-4 ">
        {hours.map((item, index) => (
          <div key={index} className="flex items-center justify-between py-3 border-b border-bordertheme last:border-b-0">
            <span className="text-primary tracking-wide">{item.day}</span>
            <span className={` ${item.closed ? 'text-secondary' : 'text-primary'}`}>{item.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
