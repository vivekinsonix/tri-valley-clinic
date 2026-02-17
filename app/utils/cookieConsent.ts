export const CONSENT_KEY = 'cookie_consent';

export const getConsent = () => {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem(CONSENT_KEY);
  return data ? JSON.parse(data) : null;
};

export const saveConsent = (consent: any) => {
  localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
};
