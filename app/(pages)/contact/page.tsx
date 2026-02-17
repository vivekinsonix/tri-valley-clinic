'use client';

import { countryFlags } from '@/app/constants/appconstants';
import { getLocation, subMitForm } from '@/app/services/contactService';
import { getTeams } from '@/app/services/teamService';
import { TeamSection } from '@/app/utils/Interfaces';
import { Button, TextInput, Textarea } from 'flowbite-react';
import { Mail, PhoneCall } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

let cachedLocations: any[] | null = null;
let cachedTeams: TeamSection | null = null;

function LocationSkeleton() {
  return (
    <div className="max-w-7xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="border border-gray-200 p-6 animate-pulse">
          <div className="h-6 w-40 bg-gray-200 rounded mb-4" />
          <div className="h-4 w-32 bg-gray-200 rounded mb-3" />
          <div className="space-y-2 mb-6">
            <div className="h-3 w-full bg-gray-200 rounded" />
            <div className="h-3 w-5/6 bg-gray-200 rounded" />
            <div className="h-3 w-4/6 bg-gray-200 rounded" />
          </div>
          <div className="flex items-center gap-3">
            <div className="h-5 w-5 bg-gray-200 rounded-full" />
            <div className="h-4 w-28 bg-gray-200 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

function AdvisorsSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="flex -space-x-3 mb-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="h-12 w-12 rounded-full bg-gray-200 border-2 border-white animate-pulse" />
      ))}
    </div>
  );
}

export default function ContactPage() {
  const [locations, setLocations] = useState<any[]>(cachedLocations || []);
  const [teams, setTeams] = useState<TeamSection | null>(cachedTeams);

  const [locationsLoading, setLocationsLoading] = useState(!cachedLocations);
  const [teamsLoading, setTeamsLoading] = useState(!cachedTeams);

  const [data, setData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [captchaToken, setCaptchaToken] = useState('');
  const captchaRef = useRef<any>(null);

  const onVerify = (token: string | null) => {
    setCaptchaToken(token || '');
  };
  useEffect(() => {
    if (cachedLocations) return;

    const fetchLocations = async () => {
      try {
        setLocationsLoading(true);
        const res = await getLocation();
        cachedLocations = res?.data || [];
        setLocations(cachedLocations || []);
      } catch (err) {
        console.error('Error fetching locations:', err);
      } finally {
        setLocationsLoading(false);
      }
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    if (cachedTeams) return;

    const fetchTeams = async () => {
      try {
        setTeamsLoading(true);
        const res = await getTeams();
        cachedTeams = res?.data || null;
        setTeams(cachedTeams);
      } catch (err) {
        console.error('Failed to fetch teams:', err);
      } finally {
        setTeamsLoading(false);
      }
    };

    fetchTeams();
  }, []);

  const advisors = useMemo(() => {
    if (!teams?.card) return [];

    return teams.card.slice(0, 6).map((c: any) => ({
      title: c.title || '', // advisor name
      name: c.name || '', // fallback name
      src: c.image?.url || '',
    }));
  }, [teams]);

  const renderLocations = () => (
    <div className="container mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {locations.map((item, index) => {
        const flag = countryFlags[item.country];

        return (
          <div key={index} className="border border-gray-200 p-6 rounded-lg hover:shadow-md transition">
            <div className="flex items-center gap-2 mb-3">
              {flag && <img src={flag} alt={`${item.country} flag`} className="w-7 h-5 object-cover rounded-sm border" loading="lazy" />}
              <h3 className="text-xl font-semibold">{item?.country}</h3>
            </div>
            <p className="font-medium mb-1">{item?.name}</p>
            <p className="text-sm leading-relaxed mb-6">
              {Array(item?.address).map((line: string, i: number) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </p>
            {item?.number && (
              <a href={`tel:${item?.number}`} className="flex items-center gap-3">
                <PhoneCall className="text-blue-600" />
                <span>{item.number}</span>
              </a>
            )}
          </div>
        );
      })}
    </div>
  );

  const handlechange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setData({ ...data, [e.target.name]: e.target.value });
    },
    [data]
  );
  const validateForm = () => {
    if (!data.fullName.trim()) return (setError('Full name is required'), false);
    if (!data.email.trim()) return (setError('Email is required'), false);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) return (setError('Please enter a valid email address'), false);

    if (!data.message.trim()) return (setError('Please provide your message'), false);
    if (!captchaToken) return (setError('Please complete the captcha'), false);
    return true;
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validateForm()) return;

      const payload = {
        name: data.fullName,
        email: data.email,
        subject: data.subject,
        message: data.message,
        sentAt: new Date(),
      };

      try {
        const { data: resData } = await subMitForm(payload);
        if (!resData) throw new Error('Empty response');
        setSuccess('Thank you! Your message has been sent successfully. We will get back to you soon.');
        setError('');
        setData({
          fullName: '',
          email: '',
          subject: '',
          message: '',
        });
      } catch (error) {
        console.error('Error submitting contact form:', error);
        setSuccess('');
        setError('Something went wrong. Please try again later.');
      }
    },
    [data.fullName, data.email, data.subject, data.message, validateForm]
  );
  const bgColors = ['bg-primary', 'bg-green-400', 'bg-gray-900', 'bg-gray-600', 'bg-gray-500', 'bg-gray-400', 'bg-orange-400', 'bg-teal-400'];

  function getRandomColor() {
    return bgColors[Math.floor(Math.random() * bgColors.length)];
  }
  return (
    <section className="min-h-screen w-full">
      <section className="bg-primary-50 dark:bg-primary-50 mt-15 md:py-16 py-10">
        <div className="mx-auto container px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* LEFT */}
          <div>
            <h1>
              <span className="text-secondary">Connect</span> with Our <br />
              experienced physicians
            </h1>

            <p className="text-slate-600 max-w-md my-6">Our practice is led by highly skilled and experienced physicians devoted to delivering the highest standard of care</p>

            <div className="space-y-4 mb-10">
              <a href="tel:+917207050832" className="flex items-center gap-3 cursor-pointer">
                <PhoneCall className="text-primary" />
                <span>(510) 598-4921</span>
              </a>

              <a href="mailto:info@dolcera.com" className="flex items-center gap-3 cursor-pointer">
                <Mail className="text-primary" />
                <span> contact@trivalleyclinic.com</span>
              </a>
            </div>

            <h3 className="text-lg font-semibold mb-3">Discover our experienced physicians below</h3>
            {teamsLoading ? (
              <AdvisorsSkeleton />
            ) : (
              <div className="flex -space-x-3 mb-4">
                {advisors.map((item, i) => {
                  const hasImage = item.src && item.src !== '';

                  // First letter from title → fallback to name
                  const firstLetter = item.title?.charAt(0)?.toUpperCase() || item.name?.charAt(0)?.toUpperCase() || '?';

                  return (
                    <div key={i} className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-white flex items-center justify-center">
                      {hasImage ? <Image src={item.src} alt={item.title || item.name} fill className="object-cover" /> : <div className={`h-full w-full flex items-center justify-center text-white font-semibold ${getRandomColor()}`}>{firstLetter}</div>}
                    </div>
                  );
                })}
              </div>
            )}

            <Link href="/teams" className="text-primary font-medium hover:underline">
              Meet the Doctors ›
            </Link>
          </div>

          <div className="bg-linear-to-br from-primary to-primary-200 rounded-xl p-8 text-white shadow-lg">
            <form className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <TextInput placeholder="Full Name" required name="fullName" onChange={handlechange} />
                <TextInput type="email" placeholder="Email Address" name="email" required onChange={handlechange} />
              </div>
              <TextInput placeholder="Subject" required name="subject" onChange={handlechange} />
              <Textarea placeholder="Leave your message here" name="message" rows={4} onChange={handlechange} />
              <div className="mb-6">{process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ? <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} onChange={onVerify} ref={captchaRef} /> : <div className="p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg">ReCAPTCHA is not configured. Please set NEXT_PUBLIC_RECAPTCHA_SITE_KEY in your environment variables.</div>}</div>
              {error && <div className="mb-3 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">{error}</div>}
              {success && <div className="mb-3 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">{success}</div>}
              <Button onClick={handleSubmit} disabled={!data.fullName || !data.email || !data.message || !data.subject} className="ml-auto">
                Submit
              </Button>
            </form>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 px-6">{locationsLoading ? <LocationSkeleton /> : renderLocations()}</section>
    </section>
  );
}
