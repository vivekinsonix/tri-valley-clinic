'use client';

import { Button, Navbar, NavbarBrand, NavbarCollapse, NavbarToggle } from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { useDrawer } from '../../context/DrawerContext';
import GoogleTranslateLoader from '../translater/GoogleTranslateLoader';
import LanguageDropdown from '../translater/LanguageDropdown';
import AppDrawer from './AppDrawer';
import CaseStudiesDropdown from './CaseStudiesDropdown';
import ClientInfo from './ClientInfo';
// import WhoWeServe from './WhoWeServe';

const Logo = ({ scrolled }: { scrolled: boolean }) => {
  return (
    <NavbarBrand as={Link} href="/">
      {/* Default Logo (before scroll) */}
      <Image src="/logo/tri-valley-clinic-logo.jpg" width={150} height={40} alt="Logo" className={`transition-all hidden md:flex duration-300 ease-in-out ${scrolled ? 'opacity-0 md:absolute' : 'md:opacity-100 opacity-0'}`} />

      {/* Logo shown when scrolled */}
      <Image src="/logo/tri-valley-clinic-logo.jpg" width={150} height={40} alt="Scrolled Logo" className={`transition-all duration-300 ease-in-out ${scrolled ? 'opacity-100' : 'md:opacity-0 opacity-100 md:absolute'}`} />
    </NavbarBrand>
  );
};

export type DropdownKey = 'who' | 'solutions' | null;

const Header: React.FC = () => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const { isDrawerOpen, closeDrawer } = useDrawer();
  const [openDropdown, setOpenDropdown] = useState<DropdownKey>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  return (
    <>
      <GoogleTranslateLoader />
      <Navbar fluid rounded className={`fixed top-0 left-0 right-0 z-10 py-2   overflow-visible shadow-none transition-colors duration-300 ${isHomePage ? (scrolled ? 'bg-white shadow dark:bg-white' : 'bg-white  dark:bg-white dark:md:bg-white  md:bg-white') : 'bg-white shadow dark:bg-white'}`}>
        <div className="flex w-full items-center justify-between gap-2">
          <div className="w-7xl md:w-auto">
            <Logo scrolled={scrolled} />
          </div>
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            <CaseStudiesDropdown openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} setIsMenuOpen={() => setIsMenuOpen(false)} />

            <Link href="/#teams" className={` ${navTextColor} hover:text-secondary`}>
              Doctors
            </Link>
            {/* <ClientInfo openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} setIsMenuOpen={() => setIsMenuOpen(false)} /> */}
            {/* <Link href="/#clients" className={` ${navTextColor} hover:text-primary`}>
              Our Clients
            </Link> */}

            <Link href="/faqs" className={` ${navTextColor} hover:text-secondary`}>
              FAQs
            </Link>
            <Link href="/blogs" className={` ${navTextColor} hover:text-secondary`}>
              Blogs
            </Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            {/* <div className="me-2">
              <LanguageDropdown />
            </div> */}
            <Link href="/contact">
              <Button>Contact Us</Button>
            </Link>
          </div>
          <div className="flex md:hidden items-center w-xl justify-end">{/* <LanguageDropdown /> */}</div>
          {/* Mobile Toggle */}
          <NavbarToggle onClick={() => setIsMenuOpen((prev) => !prev)} />
        </div>

        {/* Mobile Menu */}
        <NavbarCollapse className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden text-center px-3`}>
          <CaseStudiesDropdown openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} setIsMenuOpen={() => setIsMenuOpen(false)} />
          <Link href="/#projects" className={`inline-block text-left mt-3  pb-4 ${navTextColor} hover:text-primary`}>
            Projects
          </Link>

          <Link href="/#teams" className={`inline-block text-left mt-3   pb-4 ${navTextColor} hover:text-primary`}>
            Doctors
          </Link>
          <Link href="/blogs" onClick={() => setIsMenuOpen(false)} className={`inline-block text-left mt-3   pb-4 ${navTextColor} hover:text-primary`}>
            Blogs
          </Link>

          <div className="flex gap-4 my-5 w-full justify-between">
            <Link href="/contact">
              <Button onClick={() => setIsMenuOpen(false)} className="w-full">
                Contact Us
              </Button>
            </Link>
          </div>
        </NavbarCollapse>
      </Navbar>

      <AppDrawer isOpen={isDrawerOpen} onClose={closeDrawer} />
    </>
  );
};

export default Header;
