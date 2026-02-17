'use client';

import { useDrawer } from '@/app/context/DrawerContext';
import { Spinner } from 'flowbite-react';
import { Briefcase, ChevronDown, ClipboardList, FileChartColumn, MicVocal, Newspaper, PencilLine, Podcast, Shapes, TextSearch } from 'lucide-react';
import Links from 'next/link';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { DropdownKey } from './header';

interface Props {
  openDropdown: DropdownKey;
  setOpenDropdown: (key: DropdownKey) => void;
  setIsMenuOpen: () => void;
}

interface LinkItem {
  id: string;
  label: string;
  slug: string;
}

const CACHE_KEY = 'who_we_serve_data';

const WhoWeServe: React.FC<Props> = React.memo(({ openDropdown, setOpenDropdown, setIsMenuOpen }) => {
  const { closeDrawer } = useDrawer();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const isOpen = openDropdown === 'who';
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Close dropdown when clicking outside
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
    setOpenDropdown(isOpen ? null : 'who');
  }, [isOpen, setOpenDropdown]);

  const selectedLink = useCallback(() => {
    setOpenDropdown(null);
    closeDrawer();
    setIsMenuOpen();
  }, [closeDrawer, setOpenDropdown]);

  // Products with Lucide icons instead of images
  const Products = [
    {
      name: 'IP Author',
      icon: Podcast,
    },
    {
      name: 'PCS',
      icon: FileChartColumn,
    },
    {
      name: 'Patent Drafting ',
      icon: PencilLine,
    },
    {
      name: 'Office Action Response',
      icon: Newspaper,
    },
    {
      name: 'Prior art Search',
      icon: TextSearch,
    },
    {
      name: 'Patent Classification',
      icon: Shapes,
    },
    {
      name: 'Invention Disclosures ',
      icon: MicVocal,
    },
    {
      name: 'EoU Assistant',
      icon: ClipboardList,
    },
    {
      name: 'IP Author Enterprise ',
      icon: Briefcase,
    },
  ];

  return (
    <div ref={wrapperRef} className="relative md:py-0 pb-4">
      <button onClick={toggle} className="flex items-center gap-1 dark:text-primary-50 hover:text-blue-400 cursor-pointer text-lg md:text-base">
        Products
        <ChevronDown size={16} className={isOpen ? 'rotate-180' : ''} />
      </button>

      {isOpen && (
        <div className="absolute mt-2 md:w-64 w-full text-primary bg-white dark:bg-primary dark:text-secondary shadow-lg rounded z-50">
          {loading ? (
            <div className="p-4 flex justify-center">
              <Spinner />
            </div>
          ) : (
            Products.map((product, index) => {
              const IconComponent = product.icon; // get the product-specific icon
              return (
                <Links key={index} href="" className="flex items-center gap-3   px-4 py-2 text-left dark:text-white hover:text-white hover:bg-primary-200" onClick={selectedLink}>
                  <IconComponent size={22} /> {/* render Lucide icon */}
                  <div>
                    <p className="text-lg font-semibold">{product.name}</p>
                  </div>
                </Links>
              );
            })
          )}
        </div>
      )}
    </div>
  );
});

export default WhoWeServe;
