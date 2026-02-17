'use client';

import CookiePreferencesModal from '@/app/cookie-preferences/CookiePreferencesModal';
import { getConsent, saveConsent } from '@/app/utils/cookieConsent';
import { Button } from 'flowbite-react';
import { useEffect, useState } from 'react';

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (!getConsent()) setShow(true);
  }, []);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener('open-cookie-preferences', handler);
    return () => window.removeEventListener('open-cookie-preferences', handler);
  }, []);

  const acceptAll = () => {
    setClosing(true);
    saveConsent({
      essential: true,
      analytics: true,
      marketing: true,
      preferences: true,
    });
    setTimeout(() => setShow(false), 400);
  };

  const rejectAll = () => {
    setClosing(true);
    saveConsent({
      essential: true,
      analytics: false,
      marketing: false,
      preferences: false,
    });
    setTimeout(() => setShow(false), 400);
  };

  if (!show) return null;

  return (
    <div className={`w-full bg-white dark:bg-gray-900 border-t dark:border-gray-700 transform transition-all duration-400 ease-in-out ${closing ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`} aria-hidden={closing}>
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        {/* Text content */}
        <div className="md:max-w-3xl">
          <p className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">We care about your privacy</p>

          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            By clicking <strong>“Accept All”</strong>, you agree to the storing of cookies on your device to enhance site navigation, analyse site usage, and personalise content.
          </p>

          {/* Manage preferences link */}
          <button onClick={() => window.dispatchEvent(new Event('open-cookie-preferences'))} className="mt-2 text-sm font-medium text-blue-600 hover:underline dark:text-blue-400">
            Manage cookie preferences
          </button>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <Button onClick={rejectAll} outline color="gray" className="px-5">
            Reject
          </Button>

          <Button onClick={acceptAll} color="dark" className="px-5">
            Accept All
          </Button>
        </div>
      </div>
      <CookiePreferencesModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
