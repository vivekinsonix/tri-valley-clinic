'use client';

import { useDrawer } from '@/app/context/DrawerContext';
import { Spinner } from 'flowbite-react';
import { ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Links from 'next/link';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { DropdownKey } from './header';
import { useCaseStudies } from './useCaseStudies';

interface Props {
  openDropdown: DropdownKey;
  setOpenDropdown: (key: DropdownKey) => void;
  setIsMenuOpen: () => void;
}

const CaseStudiesDropdown: React.FC<Props> = React.memo(({ openDropdown, setOpenDropdown, setIsMenuOpen }) => {
  const isOpen = openDropdown === 'solutions';
  const { data, loading } = useCaseStudies();
  const { closeDrawer } = useDrawer();

  const wrapperRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const [scrolled, setScrolled] = useState(false);

  // Scroll listener (only matters on home page)
  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  // Text color logic
  const navTextColor = isHomePage ? (scrolled ? 'text-primary' : 'text-primary md:text-primary') : 'text-primary';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen, setOpenDropdown]);

  const toggle = useCallback(() => {
    setOpenDropdown(isOpen ? null : 'solutions');
  }, [isOpen, setOpenDropdown]);

  return (
    <div className="relative md:py-0 pb-4" ref={wrapperRef}>
      <button onClick={toggle} className={` ${navTextColor} hover:text-secondary flex items-center gap-1`}>
        Our Services
        <ChevronDown size={16} className={isOpen ? 'rotate-180' : ''} />
      </button>

      {isOpen && (
        <div className="absolute mt-2 md:w-64 w-full text-primary bg-white dark:bg-white dark:text-primary shadow-lg rounded z-50">
          {loading ? (
            <div className="p-4 flex justify-center">
              <Spinner />
            </div>
          ) : (
            data.map((item) => (
              <Links
                key={item.documentId}
                href={`/services/${item?.slug}`}
                className="block px-4 py-2 text-left text-black hover:text-white hover:bg-primary"
                onClick={() => {
                  (setOpenDropdown(null), setIsMenuOpen(), closeDrawer());
                }}
              >
                {item.main?.title}
              </Links>
            ))
          )}
        </div>
      )}
    </div>
  );
});

export default CaseStudiesDropdown;
