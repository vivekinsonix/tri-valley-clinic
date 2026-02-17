'use client';

import { useEffect, useState } from 'react';
import { getConsent, saveConsent } from '@/app/utils/cookieConsent';

export default function CookiePreferencesPage() {
  const [consent, setConsent] = useState<any>(null);

  useEffect(() => {
    setConsent(getConsent());
  }, []);

  if (!consent) return null;

  const update = (key: string) => {
    setConsent({ ...consent, [key]: !consent[key] });
  };

  const save = () => {
    saveConsent(consent);
    alert('Preferences saved');
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Cookie Preferences</h1>

      {['analytics', 'marketing', 'preferences'].map((key) => (
        <div key={key} className="flex justify-between py-3 border-b">
          <span className="capitalize">{key} Cookies</span>
          <input type="checkbox" checked={consent[key]} onChange={() => update(key)} />
        </div>
      ))}

      <button onClick={save} className="mt-6 px-6 py-2 bg-blue-600 text-white rounded">
        Save Preferences
      </button>
    </div>
  );
}
