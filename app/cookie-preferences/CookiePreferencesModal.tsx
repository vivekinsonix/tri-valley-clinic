'use client';

import { useEffect, useState } from 'react';
import { getConsent, saveConsent } from '@/app/utils/cookieConsent';
import { Button } from 'flowbite-react';
import Image from 'next/image';
import AppModal from '../components/modal/AppModal';

type Props = {
  open: boolean;
  onClose: () => void;
};

const Logo = () => (
  <div className="flex mt-2 justify-center">
    <Image src="/logo/logo.png" width={130} height={40} className="dark:hidden" alt="Dolcera" />
    <Image src="/logo/logo.png" width={130} height={40} className="hidden dark:block" alt="Dolcera" />
  </div>
);

export default function CookiePreferencesModal({ open, onClose }: Props) {
  const [consent, setConsent] = useState<any>(null);

  useEffect(() => {
    if (open) {
      setConsent(
        getConsent() || {
          essential: true,
          analytics: false,
          marketing: false,
          preferences: false,
        }
      );
    }
  }, [open]);

  if (!consent) return null;

  const toggle = (key: string) => {
    setConsent({ ...consent, [key]: !consent[key] });
  };

  const save = () => {
    saveConsent(consent);
    onClose();
  };

  return (
    <AppModal
      open={open}
      onClose={onClose}
      size="xl"
      showCloseIcon={false}
      footer={
        <div className="flex justify-end gap-3 w-full">
          <Button onClick={onClose} outline className="px-5">
            Cancel
          </Button>
          <Button onClick={save} className="px-5">
            Save
          </Button>
        </div>
      }
    >
      {/* Logo */}
      <div className="mb-6">
        <Logo />
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Cookie Policy</h2>

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">Manage your cookie preferences. Essential cookies are always enabled.</p>

      {/* Section 1 */}
      <section className="mb-6">
        <h3 className="font-semibold mb-2">1. What Are Cookies?</h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          At Dolcera, we use cookies and similar technologies to enhance your experience on our website, understand how visitors interact with our content, and support our security services.
          <br />
          <br />
          Cookies are small text files stored on your device that help websites remember preferences and improve user experience.
        </p>
      </section>

      {/* Section 2 */}
      <section className="mb-6">
        <h3 className="font-semibold mb-2">2. Types of Cookies We Use</h3>

        <div className="flex justify-between items-center py-3 border-b">
          <span>Essential Cookies</span>
          <span className="text-green-600 font-semibold">Always On</span>
        </div>

        {['analytics', 'marketing', 'preferences'].map((key) => (
          <div key={key} className="flex justify-between items-center py-3 border-b">
            <span className="capitalize">{key} Cookies</span>
            <input type="checkbox" checked={consent[key]} onChange={() => toggle(key)} className="h-5 w-5 accent-blue-600" />
          </div>
        ))}
      </section>

      {/* Section 3 */}
      <section className="mb-6">
        <h3 className="font-semibold mb-2">3. Why We Use Cookies</h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">We use cookies to ensure core functionality, analyze performance, personalize content, and improve user experience. Some cookies may be set by third-party services.</p>
      </section>
    </AppModal>
  );
}
