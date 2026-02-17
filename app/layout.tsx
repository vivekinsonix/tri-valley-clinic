import { ThemeModeScript } from 'flowbite-react';
import type { Metadata } from 'next';
import { Comfortaa, Libre_Baskerville, Montserrat, Playfair_Display, Inter } from 'next/font/google';
import { ThemeInit } from '../.flowbite-react/init';

import './globals.css';

import CookieBanner from './components/CookieBanner/CookieBanner';
import Header from './components/drawer/header';
import GlobalSpinner from './components/spinner/GlobalSpinner';
import Toaster from './components/toaster/Toaster';
import { DrawerProvider } from './context/DrawerContext';
import Footer from './layout/footer';
import ThemeWrapper from './theme';

// ====== FONTS ======

const comfortaa = Comfortaa({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
});

const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-alt',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-heading',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-playfair',
});

// ⭐ Added: Inter Font
const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Private Psychiatry & Weight Management | Tri-Valley Clinic Fremont',
  description: 'Physician-led psychiatry and medical weight management in Fremont, CA. Personalized, evidence-based care in a private clinical setting.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`
        ${comfortaa.variable}
        ${libreBaskerville.variable}
        ${montserrat.variable}
        ${playfair.variable}
        ${inter.variable}   
      `}
    >
      <head>
        <ThemeModeScript mode="light" />
      </head>

      <body className="font-sans bg-white dark:bg-primary">
        <DrawerProvider>
          <ThemeWrapper>
            <ThemeInit />
            <Toaster />
            <GlobalSpinner />
            <Header />
            {children}
            <Footer />

            <div style={{ paddingBottom: 'env(safe-area-inset-bottom)' }} className="fixed bottom-0 left-0 right-0 z-50 flex justify-center">
              <CookieBanner />
            </div>
          </ThemeWrapper>
        </DrawerProvider>
      </body>
    </html>
  );
}
