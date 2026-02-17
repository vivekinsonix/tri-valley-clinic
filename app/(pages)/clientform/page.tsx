'use client';

import SeoHead from '@/app/components/seo/seoHead';
import { ALTERNATE_UI_URL, countryFlags } from '@/app/constants/appconstants';
import { getLocation } from '@/app/services/contactService';
import { get_form_keys, submit_form } from '@/app/services/formService';
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

export default function ClientFormPage() {
  const [locations, setLocations] = useState<any[]>(cachedLocations || []);
  const [teams, setTeams] = useState<TeamSection | null>(cachedTeams);

  const [locationsLoading, setLocationsLoading] = useState(!cachedLocations);
  const [teamsLoading, setTeamsLoading] = useState(!cachedTeams);
  const [formKeys, setFormKeys] = useState<any>([]);
  const [data, setData] = useState<Record<string, any>>(() =>
    formKeys.reduce(
      (acc: any, field: any) => {
        if (field.type === 'checkbox') acc[field.name] = false;
        else if (field.type === 'radio')
          acc[field.name] = ''; // store selected radio
        else acc[field.name] = '';
        return acc;
      },
      {} as Record<string, any>
    )
  );

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

  useEffect(() => {
    const fetchFormKeys = async () => {
      try {
        const keys = await get_form_keys();
        setFormKeys(keys?.data);
      } catch (err) {
        console.error('Error fetching form keys:', err);
      }
    };
    fetchFormKeys();
  }, []);

  const advisors = useMemo(() => {
    if (!teams?.card) return [];
    return teams.card
      .filter((c: any) => c.image?.url)
      .map((c: any) => c.image.url)
      .slice(0, 6);
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

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | any) => {
    const { name, type, value, checked } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }, []);

  const validateForm = () => {
    for (const field of formKeys) {
      if (field.required) {
        const value = data[field.name];

        if (value === undefined || value === '' || (field.type === 'checkbox' && value === false)) {
          setError(`${field.label} is required`);
          return false;
        }
      }
    }

    setError('');
    return true;
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!validateForm()) return;

      const payload = {
        ...data,
        sentAt: new Date(),
      };

      try {
        const { data: resData } = await submit_form(JSON.stringify({ data: { values: payload } }));

        if (!resData) throw new Error('Empty response');

        setSuccess('Form submitted successfully!');
        setError('');

        // Reset form
        setData(
          formKeys.reduce(
            (acc: any, field: any) => {
              if (field.type === 'checkbox') acc[field.name] = false;
              else acc[field.name] = '';
              return acc;
            },
            {} as Record<string, any>
          )
        );
      } catch (err) {
        console.error(err);
        setSuccess('');
        setError('Something went wrong. Please try again.');
      }
    },
    [data, formKeys]
  );

  const BASIC_FIELDS = useMemo(() => {
    const BASIC_KEYWORDS = ['name', 'email', 'phone'];
    return formKeys
      .filter((field: any) => BASIC_KEYWORDS.some((keyword) => field?.name?.toLowerCase().includes(keyword)))
      .map((field: any) => ({
        placeholder: field?.label,
        name: field.name,
        type: field.type ?? 'text',
        required: field.required ?? false,
        options: field?.options || null,
      }));
  }, [formKeys]);

  const LOCATION_FIELDS = useMemo(() => {
    const BASIC_KEYWORDS = ['country', 'city', 'postalCode', 'dob', 'dateofbirth', 'date-of-birth', 'zipcode', 'address'];
    return formKeys
      .filter((field: any) => BASIC_KEYWORDS.some((keyword) => field?.name?.toLowerCase().includes(keyword)))
      .map((field: any) => ({
        placeholder: field?.label,
        name: field.name,
        type: field.type ?? 'text',
        required: field.required ?? false,
        options: field?.options || null,
      }));
  }, [formKeys]);

  const OTHERS_FIELDS = useMemo(() => {
    const EXCLUDED_KEYWORDS = ['name', 'email', 'phone', 'country', 'city', 'postalcode', 'dob', 'dateofbirth', 'date-of-birth', 'zipcode', 'address'];
    return formKeys
      .filter((field: any) => !EXCLUDED_KEYWORDS.some((keyword) => field?.name?.toLowerCase().includes(keyword)))
      .map((field: any) => ({
        placeholder: field?.label,
        name: field.name,
        type: field.type ?? 'text',
        required: field.required ?? false,
        options: field?.options || null,
      }));
  }, [formKeys]);

  const render_fields = (field: any) => {
    const commonProps = {
      key: field.name,
      name: field.name,
      required: field.required,
      onChange: handleChange,
      value: data[field.name] ?? '',
    };

    switch (field.type) {
      case 'text':
      case 'email':
      case 'phone':
      case 'number':
      case 'date':
      case null:
        return <TextInput {...commonProps} type={field.type ?? 'text'} placeholder={field.placeholder} />;

      case 'textarea':
        return <Textarea {...commonProps} placeholder={field.placeholder} rows={4} />;

      case 'select':
        return (
          <select {...commonProps} className="w-full p-3 border rounded-md">
            <option value="" disabled>
              Select {field.placeholder}
            </option>
            {field.options?.map((opt: any) => (
              <option key={opt.value} value={opt.value}>
                {opt.placeholder}
              </option>
            ))}
          </select>
        );

      case 'checkbox':
        return (
          <div key={field.name} className="flex items-center gap-2">
            <input type="checkbox" {...commonProps} checked={data[field.name]} />
            <label>{field.placeholder}</label>
          </div>
        );

      case 'radio':
        return (
          <div key={field.name} className="space-y-1">
            <p>{field.placeholder}</p>
            {field.options?.map((opt: string) => (
              <div key={opt} className="flex items-center gap-2">
                <input type="radio" {...commonProps} value={opt} checked={data[field.name] === opt} />
                <label>{opt}</label>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="min-h-screen w-full">
      <SeoHead title="New Client Intake Form" description="we blend expert legal knowledge with personalised service to protect your interests and achieve your goals" keywords="Legal Practice, will , online form , will generater form , form , contact form , reach form , legal practice reach form" url={ALTERNATE_UI_URL + '/clientform'} />
      <section className="bg-primary-50 dark:bg-primary-50 mt-15 md:py-16 py-10">
        <div className="mx-auto container px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* LEFT */}
          <div>
            <p className="text-4xl font-bold mb-4">
              <span className="text-primary">New Client</span> Intake Form <br />
            </p>

            <p className="text-slate-600 max-w-md mb-8">we blend expert legal knowledge with personalised service to protect your interests and achieve your goals</p>

            <div className="space-y-4 mb-10">
              <a href="tel:+917207050832" className="flex items-center gap-3 cursor-pointer">
                <PhoneCall className="text-primary" />
                <span> 020 8903 7017</span>
              </a>

              <a href="mailto:info@dolcera.com" className="flex items-center gap-3 cursor-pointer">
                <Mail className="text-primary" />
                <span> tlp@thelegalpractice.co.uk</span>
              </a>
            </div>

            <h3 className="text-lg font-semibold mb-3">Discover our team of legal experts below</h3>
            {teamsLoading ? (
              <AdvisorsSkeleton />
            ) : (
              <div className="flex -space-x-3 mb-4">
                {advisors.map((src, i) => (
                  <div key={i} className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-white">
                    <Image src={src} alt="Advisor" fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}

            <Link href="/teams" className="text-primary font-medium hover:underline">
              Meet the Advisors ›
            </Link>
          </div>

          <div className="bg-linear-to-br from-primary to-primary-200 rounded-xl p-8 text-white shadow-lg">
            {formKeys.length > 0 && (
              <form className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">{BASIC_FIELDS.map((field: any) => render_fields(field))}</div>
                <div className="grid sm:grid-cols-2 gap-4">{LOCATION_FIELDS.map((field: any) => render_fields(field))}</div>
                {OTHERS_FIELDS.map((field: any) => render_fields(field))}
                <div className="mb-6">{process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ? <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} onChange={onVerify} ref={captchaRef} /> : <div className="p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg">ReCAPTCHA is not configured.</div>}</div>
                {error && <div className="mb-3 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">{error}</div>}
                {success && <div className="mb-3 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">{success}</div>}
                <Button onClick={handleSubmit} className="bg-secondary ml-auto">
                  Submit
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
      <section className="bg-white py-16 px-6">{locationsLoading ? <LocationSkeleton /> : renderLocations()}</section>
    </section>
  );
}
