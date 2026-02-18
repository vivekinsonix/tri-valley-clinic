'use client';

import { save_newsletter_subscription } from '@/app/services/homePageService';
import SpinnerService from '@/app/services/SpinnerService';
import ToastService from '@/app/services/toasterService';
import { Button, Card, TextInput, Tooltip } from 'flowbite-react';
import { Mail, Share2, X } from 'lucide-react';
import { useEffect, useState } from 'react';

type ShareBannerProps = {
  shareUrl: string;
  position?: 'center' | 'bottom';
};

export default function ShareBanner({ shareUrl, position = 'center' }: ShareBannerProps) {
  const [open, setOpen] = useState(false); // default closed
  const [email, setEmail] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = position === 'center' ? ' z-50 bottom-10 -translate-y-40%' : 'bottom-10';

  useEffect(() => {
    if (window.innerWidth >= 768) {
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.body.scrollHeight;

      const isPastTop = scrollTop >= 100;
      const isBeforeBottom = scrollTop + windowHeight <= docHeight - 200;

      setIsVisible(isPastTop && isBeforeBottom);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubscribe = async () => {
    SpinnerService.showSpinner();
    try {
      await save_newsletter_subscription({ email });
      ToastService.showToast('You have successfully subscribed to the newsletter.', 'success');
    } catch (err) {
      console.error('Subscription error:', err);
    } finally {
      setEmail('');
      SpinnerService.hideSpinner();
    }
  };

  const getShareLinks = () => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedText = encodeURIComponent('Check this out:');

    return {
      whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      teams: `https://teams.microsoft.com/share?url=${encodedUrl}&text=${encodedText}&preview=true&referrer=web_client`,
    };
  };

  const shareLinks = getShareLinks();

  if (!isVisible) return null;

  return (
    <>
      {/* Toggle Button */}
      <div className={`sm:sticky fixed top-1/4 right-0 sm:flex sm:justify-end sm:-mr-6  z-30 ${positionClasses}`}>
        <Button outline type="button" onClick={() => setOpen((prev) => !prev)} className="border-0 rounded-full bg-white dark:bg-white focus:ring-0 transition-transform duration-300 hover:scale-110 active:scale-95">
          {open ? <X /> : <Share2 />}
        </Button>
      </div>

      {open && (
        <div className="sm:sticky fixed left-4 right-4 lg:left-auto lg:right-12 top-1/4 z-30 transition-all duration-300 ease-in-out">
          {/* Share Card */}
          <Card className="p-5 shadow-lg rounded-none gap-3 mb-4 max-w-3xl mt-4">
            <div className="flex gap-2 items-center">
              <div className="flex h-8 w-8 items-center justify-center">
                <Share2 className="h-5 w- text-secondary dark:text-secondary" />
              </div>
              <h3 className="text-sm font-semibold dark:text-white">Share this Page</h3>
            </div>

            <div className="flex gap-5 items-center">
              <Tooltip content="WhatsApp">
                <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer">
                  <img className="w-11 hover:scale-110 transition-transform duration-200" src="/WHATSAPP_ICON.svg" alt="WhatsApp" />
                </a>
              </Tooltip>

              <Tooltip content="Facebook">
                <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer">
                  <img className="w-10 hover:scale-110 transition-transform duration-200" src="/FACEBOOK_ICON.svg" alt="Facebook" />
                </a>
              </Tooltip>

              <Tooltip content="X (Twitter)">
                <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer">
                  <img className="w-7 hover:scale-110 transition-transform duration-200 dark:bg-white p-1 rounded" src="/TWITTER_ICON.svg" alt="X" />
                </a>
              </Tooltip>

              <Tooltip content="LinkedIn">
                <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer">
                  <img className="w-10 hover:scale-110 transition-transform duration-200" src="/LINKEDIN_ICON.svg" alt="LinkedIn" />
                </a>
              </Tooltip>

              <Tooltip content="Teams">
                <a href={shareLinks.teams} target="_blank" rel="noopener noreferrer">
                  <img className="w-10 hover:scale-110 transition-transform duration-200" src="/TEAMS_ICON.svg" alt="Teams" />
                </a>
              </Tooltip>
            </div>
          </Card>

          {/* Newsletter Card */}
          <Card className="p-5 rounded-none">
            <div className="space-y-4 mt-4">
              <div className="flex gap-2 items-center">
                <div className="flex h-8 w-8 items-center justify-center">
                  <Mail className="h-5 w-5 text-secondary dark:text-secondary" />
                </div>
                <h3 className="text-sm font-semibold dark:text-primary">Join our Newsletter</h3>
              </div>

              <p className="text-sm dark:text-primary">Subscribe to receive the latest updates, articles & insights.</p>

              <TextInput type="email" placeholder="name@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />

              <Button className="w-full" onClick={handleSubscribe}>
                Subscribe Now
              </Button>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
