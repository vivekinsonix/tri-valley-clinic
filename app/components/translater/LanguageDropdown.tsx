'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
type Lang = 'en' | 'zh-CN';

export default function LanguageDropdown() {
  const [open, setOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Lang>('en');

  const languageMap: Record<Lang, { label: string; flag: string }> = {
    en: { label: 'English', flag: '/language/gb.png' },
    'zh-CN': { label: '中文', flag: '/language/cn.png' },
  };

  const changeLanguage = (lang: Lang) => {
    const interval = setInterval(() => {
      const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
      if (select) {
        select.value = lang;
        select.dispatchEvent(new Event('change'));
        clearInterval(interval);
        setSelectedLanguage(lang);
        setOpen(false);
      }
    }, 300);
  };
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const navTextColor = isHomePage ? (scrolled ? 'text-black' : 'text-white') : 'text-black';

  return (
    <div className="relative text-white">
      <button onClick={() => setOpen(!open)} className="flex items-center gap-2 px-2 py-1 cursor-pointer">
        <span className={`${navTextColor}`}> {languageMap[selectedLanguage].label}</span>
        <img src={languageMap[selectedLanguage].flag} width={18} alt={selectedLanguage} />
      </button>

      {open && (
        <div className="absolute right-0 mt-1 w-30 bg-black rounded shadow-lg z-99999">
          {Object.entries(languageMap).map(([lang, { label, flag }]) => (
            <div key={lang} onClick={() => changeLanguage(lang as Lang)} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-800 cursor-pointer">
              <img src={flag} width={18} alt={label} />
              {label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
