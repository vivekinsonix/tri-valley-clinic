'use client';

import { Tooltip } from 'flowbite-react';
import Link from 'next/link';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import NewsletterModal from '../(pages)/newsletter/news-letter';
import ResponsibleDisclosureModal from '../components/responsible-disclosure/ResponsibleDisclosureModal';
import CookiePreferencesModal from '../cookie-preferences/CookiePreferencesModal';
import { apiClient } from '../services/apiService';
import { Facebook, FacebookIcon, Instagram, Linkedin } from 'lucide-react';

const FollowIcons = React.memo(() => {
  const openLink = useCallback((url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

  return (
    <div className="flex gap-3 text-xl">
      <Tooltip className=" shadow-lg" content="Facebook" placement="top">
        <div className="rounded-full w-12 h-12 flex justify-center items-center border border-secondary group group-hover:bg-secondary">
          <FacebookIcon className="w-7 h-7 cursor-pointer hover:scale-130 text-secondary  group-hover:text-white" onClick={() => openLink('https://www.facebook.com')} />
        </div>
      </Tooltip>

      <Tooltip className="shadow-lg" content="Instagram" placement="top">
        <div className="rounded-full w-12 h-12 flex justify-center items-center border border-secondary group group-hover:bg-secondary">
          <Instagram className="w-7 h-7 cursor-pointer  text-secondary  group-hover:text-white hover:scale-130" onClick={() => openLink('https://www.instagram.com')} />
        </div>
      </Tooltip>
      <Tooltip className="shadow-lg" content="Linkedin" placement="top">
        <div className="rounded-full w-12 h-12 flex justify-center items-center border border-secondary group group-hover:bg-secondary">
          <Linkedin className="w-7 h-7 cursor-pointer  text-secondary  group-hover:text-white hover:scale-130" onClick={() => openLink('https://www.linkedin.com')} />
        </div>
      </Tooltip>
    </div>
  );
});
FollowIcons.displayName = 'FollowIcons';

const SkeletonBox = React.memo(({ className }: any) => <div className={`bg-gray-300 animate-pulse rounded ${className}`} />);
SkeletonBox.displayName = 'SkeletonBox';

export default function Footer() {
  const [loading, setLoading] = React.useState(true);
  const [footerData, setFooterData] = React.useState<any>({});
  const [open, setOpen] = useState(false);
  const [openDisclosure, setOpenDisclosure] = useState(false);

  const fetchFooter = useCallback(() => {
    apiClient
      .get('/footer?populate=*')
      .then((res) => setFooterData(res?.data?.data))
      .catch((err) => console.error('Error fetching footer data:', err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchFooter();
  }, [fetchFooter]);

  // Memoized link slices
  const slicedLinks1 = useMemo(() => footerData?.links?.slice(0, 3) || [], [footerData?.links]);
  const slicedLinks2 = useMemo(() => footerData?.links?.slice(3, 5) || [], [footerData?.links]);
  const siteLinks = useMemo(
    () =>
      (footerData?.site_links || []).map((link: any) => ({
        ...link,
        finalUrl: link?.link ? `${window.location.origin}/${link.link}` : '#',
      })),
    [footerData?.site_links]
  );

  useEffect(() => {
    const open = () => setOpen(true);
    window.addEventListener('open-cookie-preferences', open);
    return () => window.removeEventListener('open-cookie-preferences', open);
  }, []);

  useEffect(() => {
    const open = () => setOpenDisclosure(true);
    window.addEventListener('open-responsible-disclosure', open);
    return () => window.removeEventListener('open-responsible-disclosure', open);
  }, []);

  if (loading) {
    return (
      <footer className="dark:bg-primary bg-primary dark:text-white pt-16 pb-10">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <SkeletonBox className="h-10 w-56 mb-3" />
            <SkeletonBox className="h-10 w-44" />
          </div>

          <div className="flex flex-col space-y-3">
            <SkeletonBox className="h-4 w-32" />
            <SkeletonBox className="h-4 w-28" />
            <SkeletonBox className="h-4 w-24" />
          </div>

          <div className="flex flex-col space-y-3">
            <SkeletonBox className="h-4 w-30" />
            <SkeletonBox className="h-4 w-28" />
          </div>

          <div>
            <SkeletonBox className="h-6 w-40 mb-3" />
            <SkeletonBox className="h-4 w-64 mb-3" />
            <SkeletonBox className="h-10 w-32 rounded" />
          </div>
        </div>

        <div className="border-t mt-12 mb-8 border-gray-300"></div>
        <div className="container mx-auto px-6">
          <SkeletonBox className="h-3 w-72 mt-6" />
        </div>
      </footer>
    );
  }

  return (
    <>
      {/* <footer className="dark:bg-primary bg-primary dark:text-white pt-16 pb-10">
        <div className="container mx-auto md:px-0 px-4 grid grid-cols-1 md:grid-cols-4 gap-20">
          <div className="flex flex-col gap-4">
            <div className="flex items-center md:justify-start justify-center gap-3 mt-0">
              <div>
                <div className="mb-2"></div>
                <img src="/logo/tri-valley-clinic-footer.jpg" alt="trv" width="130" className=" mb-2 dark:hidden " />
                <img src="/logo/tri-valley-clinic-footer.jpg" alt="tvc" width="130" className=" mb-2 hidden dark:block " />
                <p className="text-gray-300 mb-0 text-md leading-relaxed ">{footerData?.title}</p>
              </div>
            </div>

            <div className="items-right  flex flex-col gap-1  text-center md:text-left">
              <div className="flex gap-10 justify-center md:justify-start">
                <div>
                  <span className="text-sm block font-medium mb-2 text-gray-300">Follow us on</span>
                  <FollowIcons />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-2 text-white  text-center md:text-left">
            {siteLinks.map((link: any, i: number) => {
              if (link.label === 'Cookie Preferences') {
                return (
                  <button key={i} onClick={() => window.dispatchEvent(new Event('open-cookie-preferences'))} className="text-left hover:underline  cursor-pointer">
                    {link.label}
                  </button>
                );
              }

              if (link.label === 'Responsible Disclosure') {
                return (
                  <button key={i} onClick={() => window.dispatchEvent(new Event('open-responsible-disclosure'))} style={{ cursor: 'pointer' }} className="text-left hover:underline cursor-pointer">
                    {link.label}
                  </button>
                );
              }

              if (link.label === 'Privacy Policy') {
                return (
                  <Link key={i} href={`${window.location.origin}/privacypolicy`} style={{ cursor: 'pointer' }} className="hover:underline">
                    {link.label}
                  </Link>
                );
              }

              if (link.label === 'Terms and Conditions') {
                return (
                  <Link key={i} href={`${window.location.origin}/terms-and-conditions`} style={{ cursor: 'pointer' }} className="hover:underline">
                    {link.label}
                  </Link>
                );
              }

              return (
                <Link key={i} href="#about" className="hover:underline">
                  {link.label}
                </Link>
              );
            })}
          </div>

        
          <div className="flex flex-col space-y-2 text-white text-center md:text-left">
            <Link href="/#about" className="hover:underline">
              About
            </Link>
            <Link href="/blogs" className="hover:underline">
              Blog
            </Link>

            <Link href={`${process.env.NEXT_PUBLIC_BASE_URL || 'https:trivalleyclinic.com'}/sitemap.xml`} style={{ cursor: 'pointer' }} className="hover:underline">
              Sitemap
            </Link>
            <NewsletterModal />
          </div>

          
          <div className="!text-white text-center md:text-left">
            <p className="text-white mb-1 text-sm">TRI-VALLEY CLINIC</p>
            <p className="font-normal text-sm">680 Mowry Avenue Fremont, CA 94536</p>
          </div>
        </div>

   
        <div className="container mx-auto px-2 mt-4 border-t border-gray-600 text-center pt-2 cursor-pointer" onClick={() => window.open('#')}>
          {footerData?.copy_right && <p className="text-xs text-white mt-1" dangerouslySetInnerHTML={{ __html: footerData.copy_right }} />}
        </div>

        <CookiePreferencesModal open={open} onClose={() => setOpen(false)} />
        <ResponsibleDisclosureModal open={openDisclosure} onClose={() => setOpenDisclosure(false)} />
      </footer> */}

      <footer className="w-full text-white">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* LEFT SIDE */}
          <div className="bg-primary px-10 py-14 flex justify-center items-center">
            {/* Logo */}
            <div>
              <div className="mb-6">
                <img src="/logo/tri-valley-clinic-footer.jpg" alt="Logo" className="h-16" />
              </div>

              {/* Address */}
              <div className="flex justify-between gap-8">
                <div className="mb-6">
                  <h5 className="!text-secondary font-bold tracking-wide">Address</h5>
                  <p className="text-gray-300 mt-1">680 Mowry Avenue Fremont, CA 94536</p>
                </div>

                {/* Email */}
                <div className="mb-6">
                  <h5 className="!text-secondary font-bold tracking-wide">EMAIL</h5>
                  <p className="text-gray-300 mt-1"> contact@trivalleyclinic.com</p>
                </div>
              </div>
              {/* Social Icons */}
              <div className="flex gap-4 my-6">
                <FollowIcons />
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="bg-gradient-to-br from-secondary to-secondary px-10 py-14 text-black flex justify-center items-center">
            <div>
              <h2 className="font-extrabold text-3xl md:text-4xl leading-tight mb-4">
                GET THE LATEST
                <br />
                NEWS AND INSIGHTS
              </h2>

              <p className="text-black/70 mb-8">
                For your convenience and safety, Tri-Valley Clinic
                <br />
                offers secure virtual visits.
              </p>

              {/* Email Input */}
              <div className="bg-white flex items-center px-4 py-3 rounded-full w-full max-w-md">
                <input type="email" placeholder="Your Best Email" className="w-full outline-none text-black" />
                <button className="p-2 w-8 cursor-pointer hover:bg-primary/90 h-8 flex items-center justify-center rounded-full bg-primary text-secondary">→</button>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM FOOTER BAR */}
        <div className="bg-black text-gray-400 py-4 text-sm flex flex-col md:flex-row justify-center items-center px-6">
          <div className="flex gap-4 my-2 md:my-0">
            <p>© 2026 Tri Valley Clinic All Rights reserved</p> |
            <a href="/privacypolicy" className="cursor-pointer hover:text-white">
              Privacy Policy
            </a>
            <a href="/paymentpolicy" className="cursor-pointer hover:text-white">
              Payment Policy
            </a>{' '}
            <span className="cursor-pointer hover:text-white">Sitemap</span>
          </div>
        </div>
      </footer>
    </>
  );
}
